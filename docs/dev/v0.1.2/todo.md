# FlowMark v0.1.2 開発計画（TODO）

前提: v0.1.1 の成果を踏襲し、v0.1.2 の差分のみ更新する。
対象: `docs/dev/v0.1.2/*` の spec と背景ドキュメントに基づく。

## 0. 方針

- [x] 背景は IdeaMark として参照する（仕様ではない）
- [x] v0.1.2 は **aiwf の関係性を明記するのみ**で、仕様構造は変更しない
- [x] v0.1.x は後方互換必須ではない
- [x] CLI / Docker / npm を更新対象とする

## 1. 仕様の差分確認

- [x] Authoring spec v0.1.2 の aiwf 関連追記を確認
- [x] Validator spec v0.1.2 の aiwf 関係追記を確認
- [x] 背景ドキュメント（aiwf導入意図）を参照して解釈基準を明文化

## 2. 実装変更

- [x] v0.1.2 での validator ルール変更なしを確認
- [x] CLI 動作は v0.1.1 と同一で問題ない

## 3. 仕様ドキュメント（最新）更新

- [x] `docs/specs/flowmark.md` を v0.1.2 に更新（aiwf追記）
- [x] `docs/specs/validator.md` を v0.1.2 に更新（aiwf追記）
- [x] `docs/specs/README.md` のバージョン更新

## 4. リリースノート

- [x] `docs/releases/v0.1.2.md` を作成

## 5. サンプル

- [x] v0.1.2 最小サンプル（aiwf記述を含める場合は注記のみ）
- [x] v0.1.2 の spec 準拠サンプルを追加
- [x] v0.1.2 の AI 生成テンプレを追加

## 6. テスト

- [x] v0.1.2 minimal が validate で通る

## 7. 受け入れ基準

- [x] v0.1.2 のドキュメントが CLI で正常に処理できる
- [ ] npm / Docker の v0.1.2 が公開済み
