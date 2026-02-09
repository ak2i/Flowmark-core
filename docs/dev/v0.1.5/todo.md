# FlowMark v0.1.5 開発計画（TODO）

前提: v0.1.4 の成果を踏襲し、v0.1.5 の差分のみ更新する。
対象: `docs/dev/v0.1.5/*` の spec と背景ドキュメントに基づく。

## 0. 方針

- [x] 背景は IdeaMark として参照する（仕様ではない）
- [x] v0.1.5 は CLI の `describe` 追加とガイド同梱が中心
- [x] CLI / Docker / npm を更新対象とする

## 1. 仕様の差分確認

- [x] describe サブコマンドの仕様を確認
- [x] ガイドファイルの固定パス方針を確認

## 2. 実装変更

- [x] `describe` サブコマンドを実装
- [x] `--lang en` / `--format md` をサポート
- [x] topic `ai` / `ai-source` をサポート
- [x] ガイドファイルを `docs/guides` に追加

## 3. 仕様ドキュメント（最新）更新

- [x] `docs/specs/flowmark.md` を v0.1.5 に更新（describe 追記）
- [x] `docs/specs/validator.md` を v0.1.5 に更新
- [x] `docs/specs/README.md` のバージョン更新

## 4. リリースノート

- [x] `docs/releases/v0.1.5.md` を作成

## 5. テスト

- [x] `flowmark describe ai` が出力できる
- [x] `flowmark describe ai-source` が出力できる
- [x] `--lang en` / `--format md` が動作する

## 6. 受け入れ基準

- [x] v0.1.5 の CLI が正常に動作する
- [ ] npm / Docker の v0.1.5 が公開済み
