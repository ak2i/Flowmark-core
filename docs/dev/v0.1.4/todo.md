# FlowMark v0.1.4 開発計画（TODO）

前提: v0.1.3 の成果を踏襲し、v0.1.4 の差分（addendum）を反映する。
対象: `docs/dev/v0.1.4/flowmark-addendum-v0.1.4.md` に基づく。

## 0. 方針

- [x] Addendum は非規範（non-normative）ガイダンスとして扱う
- [x] Validator ルールは変更しない
- [x] CLI / Docker / npm を更新対象とする

## 1. 仕様の差分確認

- [x] References 推奨の記述を確認
- [x] Evidence（任意）記述を確認
- [x] Provenance（aiwf側記録）記述を確認

## 2. 実装変更

- [x] `evidence` を item の許容フィールドに追加（warning回避）

## 3. 仕様ドキュメント（最新）更新

- [x] `docs/specs/flowmark.md` を v0.1.4 に更新（References/Evidence/Provenance 追記）
- [x] `docs/specs/validator.md` を v0.1.4 に更新
- [x] `docs/specs/README.md` のバージョン更新

## 4. リリースノート

- [x] `docs/releases/v0.1.4.md` を作成

## 5. サンプル

- [x] v0.1.4 最小サンプル（version 更新のみ）
- [x] v0.1.4 の spec 準拠サンプルを追加（refs/evidence 例）
- [x] v0.1.4 の AI 生成テンプレを追加

## 6. テスト

- [x] v0.1.4 minimal が validate で通る

## 7. 受け入れ基準

- [x] v0.1.4 のドキュメントが CLI で正常に処理できる
- [ ] npm / Docker の v0.1.4 が公開済み
