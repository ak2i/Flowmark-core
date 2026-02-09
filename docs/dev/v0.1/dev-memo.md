# FlowMark v0.1 Dev Memo

目的: `todo.md` に書ききれない設計メモを集約する。

## 行スキャン方式メモ（fenced block 抽出）

- 対象は triple-backtick の fenced code block のみ
- 認識対象の info string は以下に厳密一致:
  - `yaml flowmark`
  - `yaml flowmark-section`
  - `yaml flowmark-item`
  - `yaml flowmark-registry`
- 行スキャンで以下を検出:
  - fence 開始: 行頭（または空白インデント許容範囲内）に ``` がある
  - info string: ``` に続く文字列は前後空白をトリムして判定（空白許容）
  - fence 終了: ``` のみの行（開始と同じインデント、または空白許容）
- nested fence は無視（最初に開いた fence が閉じるまで中身は raw として扱う）
- Windows 改行（CRLF）を許容
- 認識対象以外の fenced block は完全に無視
- 厳密条件は暫定（実運用で調整する方針）

## 位置情報メモ

- 可能であれば start/end line を保持
- line は 1-based で統一
- パースエラーの location も start_line/end_line を優先する

## YAML パーサ

- 最小依存方針のため `yaml` パッケージを採用する
- YAML パースエラーは自動修復せず、`E_YAML_PARSE` を返す
- 可能なら error の位置情報（行/列）を location に載せる
- `E_YAML_PARSE` がある場合は派生エラー（例: `E_ITEM_NONE`）を抑制する

## ディレクトリ構成（案）

- `src/cli/` CLI エントリとコマンド定義
- `src/parser/` Markdown + YAML の抽出とパース
- `src/validator/` バリデーションロジック
- `src/types/` 共通型（error/warning/output）

## MVP: `flowmark validate` の処理フロー

1. 入力を決定: `<file>` 引数があればそれを読む。無ければ STDIN。
   - `--stdin` が指定されている場合は STDIN を優先。
2. 文字列を行スキャンして fenced block を抽出。
3. 認識対象 info string の YAML のみ `yaml` でパース。
4. parse 結果を構造化 (`header`, `sections`, `items`, `registry`)。
5. MUST のバリデーションを実行（header/item/status/coverage）。
6. JSON を stdout に出力（`mode`, `errors`, `warnings`）。
7. exit code を決定（0/1/2）。

## Docker タグ戦略

- レジストリ: `ghcr.io`
- `latest` は main のリリース時のみ付与
- semver は `v0.1.0` と `0.1.0` の両方を付与

## MVP テスト用サンプル

- `docs/dev/v0.1/samples/minimal.md` : 正常系
- `docs/dev/v0.1/samples/spec-conformant.md` : 仕様準拠サンプル
- `docs/dev/v0.1/samples/ai-template.md` : AI 生成向けテンプレート
- `docs/dev/v0.1/samples/invalid-duplicate-header.md` : `E_HEADER_DUPLICATE`
- `docs/dev/v0.1/samples/invalid-no-item.md` : `E_ITEM_NONE`
- `docs/dev/v0.1/samples/invalid-status.md` : `E_ITEM_STATUS_INVALID`
- `docs/dev/v0.1/samples/invalid-coverage.md` : `E_COVERAGE_MISSING`
- `docs/dev/v0.1/samples/invalid-yaml.md` : `E_YAML_PARSE`
- `docs/dev/v0.1/samples/lenient-unexpected.md` : `W_UNEXPECTED_ITEM`（lenient）

注: `E_YAML_PARSE` が出ている場合、派生エラー/警告（例: `E_ITEM_NONE`, `W_REGISTRY_MISSING`）は抑制する。
