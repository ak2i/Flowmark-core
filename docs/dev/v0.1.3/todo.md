# FlowMark v0.1.3 開発計画（TODO）

前提: v0.1.2 の成果を踏襲し、v0.1.3 の差分のみ更新する。
対象: `docs/dev/v0.1.3/*` の spec と背景ドキュメントに基づく。

## 0. 方針

- [x] 背景は IdeaMark として参照する（仕様ではない）
- [x] v0.1.3 は **aiwf の外部 Runner 化**を明確化する
- [x] v0.1.x は後方互換必須ではない
- [x] CLI / Docker / npm を更新対象とする

## 1. 仕様の差分確認

- [x] Authoring spec v0.1.3 の「spec stack」運用を確認
- [x] Validator spec v0.1.3 の「aiwf 分離」記述を確認
- [x] 背景ドキュメント（spec versioning / aiwf separation）を参照

## 2. 実装変更

- [x] v0.1.3 での validator ルール変更なしを確認
- [x] CLI 動作は v0.1.2 と同一で問題ない

## 3. 仕様ドキュメント（最新）更新

- [x] `docs/specs/flowmark.md` を v0.1.3 に更新（spec stack / aiwf 分離）
- [x] `docs/specs/validator.md` を v0.1.3 に更新（aiwf 分離）
- [x] `docs/specs/README.md` のバージョン更新

## 4. リリースノート

- [x] `docs/releases/v0.1.3.md` を作成

## 5. サンプル

- [x] v0.1.3 最小サンプル（構造変更なし、version 更新のみ）
- [x] v0.1.3 の spec 準拠サンプルを追加
- [x] v0.1.3 の AI 生成テンプレを追加

## 6. テスト

- [x] v0.1.3 minimal が validate で通る

## 7. 受け入れ基準

- [x] v0.1.3 のドキュメントが CLI で正常に処理できる
- [ ] npm / Docker の v0.1.3 が公開済み
