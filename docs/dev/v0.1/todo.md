# FlowMark v0.1 開発計画（TODO）

前提: 仕様は `flowmark-ai-authoring-spec-v0.1.md` と `flowmark-validator-spec-v0.1.md` に準拠する。  
目的: Markdown + YAML 形式の FlowMark 文書をパース・検証し、AI 生成の運用に耐える最低限のツールとテストを整備する。

## 0. 準備

- [x] 実装対象の言語/ランタイムを確定する（Node.js）
- [x] Node.js のバージョンと package manager を決定する（LTS + npm）
- [x] 既存のリポジトリ構成と公開方法を確認する（CLI優先、npmパッケージで公開）
- [x] npm パッケージ名を決定する（`@flowmark/core-cli`）
- [x] CLI バイナリ名を決定する（`flowmark`）
- [x] Docker イメージ名を決定する（`ghcr.io/centimani/flowmark-core-cli`）
- [x] 仕様の“normative”項目と“recommended”項目を区分したチェックリストを作成する
- [x] 初期のディレクトリ構成（`src/cli`, `src/parser`, `src/validator` など）を決定する

## 1. 仕様区分チェックリスト（v0.1, 細粒度）

### Authoring Spec（AI‑Friendly Authoring）

- [x] MUST: FlowMark は Markdown に fenced YAML ブロックを埋め込む形式
- [x] MUST: YAML ブロックの info string は厳密に指定値と一致する
- [x] MUST: `yaml flowmark` ヘッダは必須で 1 つのみ
- [x] MUST: `yaml flowmark-item` は必須で複数可
- [x] SHOULD: `yaml flowmark-registry` は 1 つ推奨
- [x] MUST: YAML は有効である（タブ禁止・インデント整合）
- [x] MUST: `flowmark` ヘッダに `id`/`title`/`version` を含む
- [x] SHOULD: `flowmark` ヘッダに `status`/`created_at`/`inputs` を含む
- [x] MUST: `flowmark-item` に `id`/`status` を含む
- [x] SHOULD: `flowmark-item` に `refs`/`batch` を含む
- [x] MUST: `flowmark-registry` に `expected_items` を含む
- [x] SHOULD: Registry を最初に決め、全 item を網羅する
- [x] SHOULD: item は 1 ブロック 1 件を守る

### Validator/Parser Spec

- [x] MUST: 認識する fenced block は指定の 4 種のみ
- [x] MUST: 上記以外の Markdown/コードブロックは無視する
- [x] MUST: YAML 1.2 互換でパースする
- [x] MUST: ドキュメントを上からスキャンしてブロック抽出する
- [x] MUST: ヘッダは exactly 1（欠落/重複はエラー）
- [x] MUST: item は >= 1（0 件はエラー）
- [x] MAY: registry は 0 or 1（推奨は 1）
- [x] MUST: item `id` はグローバルに一意
- [x] MUST: `status` は `todo|done|skipped|blocked` のみ
- [x] MUST: registry がある場合 `missing = E - I` はエラー
- [x] SHOULD: registry の `unexpected = I - E` は warning（strict では error）
- [x] SHOULD: `expected_items` の重複はエラー推奨
- [x] SHOULD: section `id` 重複は警告
- [x] SHOULD: unknown keys は許可し warning

## 2. 仕様準拠のパーサ設計

- [x] Markdown の fenced code block を抽出する方式を決める（依存最小: 行スキャン方式）
- [x] 認識対象の info string を固定で列挙する
- [x] YAML 1.2 互換でパースする方針を決定する（最小依存の YAML パーサ 1 つ）
- [x] 位置情報（行番号）の保持可否を決め、設計に反映する
- [x] 仕様区分チェックリストの各 MUST/SHOULD を実装タスクに紐付ける
- [x] Node.js ライブラリの選定（YAML パーサのみ）
- [x] ブロック抽出アルゴリズムの詳細設計（fence 検出 / info string 判定 / YAML パース手順）
- [x] 依存数は最小化し、Node.js 標準機能を優先する方針とする
- [x] 行スキャン方式の仕様メモを `docs/dev/v0.1/dev-memo.md` に作成する
- [x] 入力読み込みの方針を決める（ファイル/STDINの優先順位）
- [x] エラー報告に必要な行番号の算出方法を決める
- [x] MVP 用の最小パーサ（fence 抽出 + YAML parse）の実装に必要なタスクを分解する
- [x] `flowmark validate` の入出力フローを `dev-memo.md` に記述する

## 3. データモデルの定義

- [x] `header`, `sections`, `items`, `registry` の構造を定義する
- [x] 省略可能フィールドの扱いとデフォルト方針を決める
- [x] unknown keys の扱い（warning）を仕様通りに整理する
- [x] 位置情報（start/end line）を保持する場合の型を定義する
- [x] エラー/警告の型（code/message/location）を決める
- [x] CLI 出力スキーマの共通型（mode/errors/warnings）を定義する
- [x] location 型は `{start_line,end_line}` を標準とする

## 4. バリデーション実装（MUST）

- [x] ヘッダが 1 つのみであることを検証する
- [x] `flowmark-item` が 1 つ以上存在することを検証する
- [x] `id` の重複（item）をエラーにする
- [x] `status` が許容値のみであることを検証する
- [x] Registry が存在する場合の coverage check を実装する（missing はエラー）
- [x] YAML パース失敗時に `E_YAML_PARSE` を返す
- [x] header 欠落時に `E_HEADER_MISSING` を返す
- [x] header 重複時に `E_HEADER_DUPLICATE` を返す
- [x] item 0 件時に `E_ITEM_NONE` を返す
- [x] MVP 用の最小バリデータ（MUST のみ）を実装する

## 5. バリデーション実装（SHOULD）

- [x] Registry 未設定時に `W_REGISTRY_MISSING` を出す
- [x] Section の `id` 重複を警告にする
- [x] Registry の `expected_items` 重複を検出する
- [x] `unexpected` の扱いを strict/lenient で切り替える
- [x] unknown keys の警告を出す（必要なら）

## 6. エラー/警告フォーマット

- [x] `errors` / `warnings` の構造を決定する
- [x] error code を仕様の推奨セットで実装する
- [x] location を付与できる場合は一貫した形式で返す
- [x] CLI の exit code に errors/warnings をマッピングする
- [x] `validate` のエラー/警告コード一覧を `cli-design.md` に固定する

## 7. テスト（最小 + 境界）

- [x] 正常系の最小ドキュメントが通る
- [x] ヘッダ重複で `E_HEADER_DUPLICATE` が出る
- [x] item 不在で `E_ITEM_NONE` が出る
- [x] status 不正で `E_ITEM_STATUS_INVALID` が出る
- [x] Registry 不整合で `E_COVERAGE_MISSING` が出る
- [x] YAML パース失敗で `E_YAML_PARSE` が出る
- [x] Registry なしで `W_REGISTRY_MISSING` が出る
- [x] unexpected item の扱いが strict/lenient で分岐する
- [x] unknown keys が warning になる（または無視するならその挙動を固定）
- [x] parse コマンドのテストは MVP 後に回す
- [x] lint コマンドのテストは MVP 後に回す
- [x] `--stdin` 指定時に STDIN が優先される
- [x] `<file>` 指定時に STDIN よりファイルが優先される（`--stdin` 未指定）

## 8. 使い勝手（CLI）

- [x] CLI: 入力ファイル/標準入力を受け取れる
- [x] CLI: strict/lenient を切り替え可能にする
- [x] CLI: デフォルトは lenient とする（`--strict` で切り替え）
- [x] CLI: JSON で結果を出力できる
- [x] CLI: 一通りのコマンド（`validate` / `parse` / `lint` など）を用意する
- [x] CLI: exit code 方針（`0=OK`, `1=警告`, `2=エラー`）を定義する
- [x] npm パッケージとして公開できる構成にする（`bin` 設定など）
- [x] npm パッケージ公開用の `files`/`.npmignore` を整備する
- [x] CLI: 結果 JSON は stdout、エラー/ログは stderr に出す
- [x] CLI: コマンド別の出力スキーマを決定する（validate/parse/lint）
- [x] parse/lint の出力スキーマ決定は MVP 後に回す
- [x] CLI: `--strict`/`--lenient` を明示的にサポートする
- [x] CLI 設計メモを作成する（`docs/dev/v0.1/cli-design.md`）
- [x] CLI: `validate/parse/lint` の引数仕様（ファイル/STDIN）を実装する
- [x] CLI: `--stdin` 指定時の優先順位を実装する
- [x] CLI: `--version` に package.json の version を出す
- [x] CLI: 最小 MVP のコマンドセットを決める（初期は `validate` のみ、後で `parse`/`lint` を追加）
- [x] MVP: `flowmark validate` の最小パイプライン（read→parse→validate→JSON→exit code）を実装する
- [x] CLI: 入力優先順位（`<file>` 優先、無ければ STDIN）を実装する

## 9. 例/サンプル

- [x] 仕様に準拠したサンプル FlowMark を追加する
- [x] AI 生成向けの最小テンプレートを同梱する
- [x] CLI 用サンプル入力（検証用）を追加する
- [x] MVP 用サンプル（正常系/エラー系）を追加する

## 10. Docker コンテナ版

- [x] Dockerfile を用意する（Node.js LTS）
- [x] `flowmark` CLI をコンテナで実行できるエントリポイントを用意する
- [x] 使い方例（`docker run ...`）を README に記載する
- [x] バージョンタグ戦略（`latest` / semver）を決める
- [x] Docker はローカル Node を使いたくないユーザー向けの代替手段として提供する
- [x] イメージ内での作業ディレクトリとボリュームマウント方針を決める
- [x] 例: `/work` を `-v "$(pwd)":/work -w /work` で使う前提にする

## 11. 受け入れ基準

- [x] Spec の MUST 条件をすべて満たす
- [x] strict/lenient の差分が確認できる
- [x] テストで主要エラーコードが網羅される
- [x] `npm install` 後に CLI が実行できる
- [x] Docker 版で CLI が `docker run` から実行できる
- [x] MVP の最小機能が CLI として動作する
