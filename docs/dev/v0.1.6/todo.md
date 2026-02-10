# FlowMark v0.1.6 開発計画（TODO）

前提: v0.1.5 の成果を踏襲し、v0.1.6 の差分のみ更新する。  
対象: `docs/dev/v0.1.6/*` の spec と背景ドキュメントに基づく。

## 0. 方針

- [x] 背景は IdeaMark として参照する（仕様ではない）
- [x] v0.1.6 は normalize / group / alias を中心に更新
- [x] CLI / Docker / npm を更新対象とする

## 1. 仕様の差分確認

- [x] AI authoring spec の更新点を確認（group / params normalize / alias）
- [x] validator spec の更新点を確認（requirement alias / group / status）

## 2. 実装変更

- [x] `flowmark params normalize` を追加
- [x] group を正規キーとして受け入れる
- [x] `requirement` を `description` の別名として受け入れる
- [x] item status に `doing` を追加
- [x] extension keys（`x_*`, `x-...`）は警告対象から除外
- [x] normalize ガイドを `docs/guides` に追加

## 3. 仕様ドキュメント（最新）更新

- [x] `docs/specs/flowmark.md` を v0.1.6 に更新
- [x] `docs/specs/validator.md` を v0.1.6 に更新
- [x] `docs/specs/README.md` のバージョン更新

## 4. リリースノート

- [x] `docs/releases/v0.1.6.md` を作成

## 5. テスト

- [x] `flowmark params normalize` が出力できる
- [x] requirement / group を含む文書で validate できる

## 6. 受け入れ基準

- [x] v0.1.6 の CLI が正常に動作する
- [ ] npm / Docker の v0.1.6 が公開済み
