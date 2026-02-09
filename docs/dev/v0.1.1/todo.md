# FlowMark v0.1.1 開発計画（TODO）

前提: v0.1 の成果を踏襲し、v0.1.1 の差分のみ更新する。
対象: `docs/dev/v0.1.1/*` の spec と背景ドキュメントに基づく。

## 0. 方針

- [x] 背景は IdeaMark として参照する（仕様ではない）
- [x] v0.1.1 では Contract を **記録のみ** とし、検証はしない
- [x] v0.1.x は後方互換必須ではない（必要に応じて変更）
- [x] CLI / Docker / npm を更新対象とする

## 1. 仕様の差分確認

- [x] Authoring spec v0.1.1 の Contract 追加を確認
- [x] Validator spec v0.1.1 の「Contract非検証」を確認
- [x] 背景ドキュメントを参照して解釈の基準を明文化

## 2. 実装変更

- [x] header に `contract` を許可（unknown key警告を出さない）
- [x] Contract を **validation 対象外** とする
- [ ] `parse` 出力に Contract を保持していることを確認

## 3. 仕様ドキュメント（最新）更新

- [x] `docs/specs/flowmark.md` を v0.1.1 に更新
- [x] `docs/specs/validator.md` を v0.1.1 に更新
- [x] `docs/specs/README.md` のバージョン更新

## 4. リリースノート

- [x] `docs/releases/v0.1.1.md` を作成

## 5. サンプル

- [x] v0.1.1 最小サンプル（contract 付き）を追加
- [x] v0.1.1 の spec 準拠サンプルを追加
- [x] v0.1.1 の AI 生成テンプレを追加

## 6. テスト

- [x] v0.1.1 minimal が validate で通る
- [x] Contract を含むドキュメントで `W_UNKNOWN_KEYS` が出ない

## 7. 受け入れ基準

- [x] Contract が validation されないことが確認できる
- [x] v0.1.1 のドキュメントが CLI で正常に処理できる
