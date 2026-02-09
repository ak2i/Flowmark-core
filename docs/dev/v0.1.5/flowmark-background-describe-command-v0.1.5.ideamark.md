```yaml
ideamark_version: 1
doc_id: "flowmark.background.describe-command.v0.1.5"
doc_type: "derived"
status: "draft"
created_at: "2026-02-09"
updated_at: "2026-02-09"
lang: "ja-JP"

refs:
  sources:
    - id: flowmark-ai-authoring-guide-en-ideamark
      uri: docs/guides/flowmark-ai-authoring-guide.en.ideamark.md
      role: canonical_source
    - id: flowmark-ai-authoring-guide-en-rendered
      uri: docs/guides/flowmark-ai-authoring-guide.en.md
      role: distribution
```
# FlowMark v0.1.5 背景整理（改訂）  
## ― `describe` サブコマンドと AI Authoring Guide の同梱 ―

本ドキュメントは、FlowMark v0.1.5 における
`describe` サブコマンド導入と、AI向けのガイド文書を
リポジトリに同梱する判断の背景を記録する。

本改訂では、`describe` の topic として
**原典（IdeaMark）**も参照できるようにする判断を追記する。

---

## Section 001 : 問題意識（LLM 実証実験の前提不足）

FlowMark を LLM（Responder）に生成させて実証実験を行うには、
**フォーマット仕様をプロンプトに安定的に渡す仕組み**が必要である。

しかし現状では、FlowMark-core のコード内に
「AIが参照できる形の仕様（Authoring Guide）」が存在せず、
validator 実装が暗黙に“唯一の仕様”となっていた。

この状態では、実験の再現性が低く、
プロンプトのブレが出やすい。

---

## Section 002 : 解決方針（AI向けガイドを成果物として同梱）

FlowMark v0.1.5 では以下を採用する：

- AI向けの Authoring Guide を **成果物（Markdown）**としてリポジトリに同梱する
- CLI から **常に同じ内容を出力**できるようにする（= `describe`）
- 実験ログ（aiwf session）に「どのガイドを使ったか」を残せるようにする

これにより、LLM 実証実験のプロンプトは
`flowmark describe ai --lang en` の出力を
system prompt / context として取り込める。

---

## Section 003 : 原典（IdeaMark）を参照できるようにする理由

```yaml
section_id: "SEC-003"
anchorage:
  view: "decision"
  phase: "confirmed"
```
`docs/guides/flowmark-ai-authoring-guide.en.md` は、
LLM に投入しやすいように **圧縮・整形**された配布版である。

一方で、巨大LLMや人間の読者は、背景や意図、判断理由を含む
**原典（IdeaMark）**を参照したい場合がある。

そこで `describe` の topic として **原典参照**を追加し、
以下を可能にする：

- 配布版（prompt向け）と原典（解説向け）の両方を CLI で取得
- 同一 commit 上で「どの文書を参照したか」を明確化
- 後続のガイド改訂時にも参照パスを固定し、運用を安定化

---

## Section 004 : 参照パス固定の判断（運用契約）

v0.1.5 では `describe` の参照先を以下に固定する：

- `docs/guides/flowmark-ai-authoring-guide.en.md`（配布 / prompt向け）
- `docs/guides/flowmark-ai-authoring-guide.en.ideamark.md`（原典 / 解説向け）

更新は **ファイル内容のみ**を行い、コード側の参照は固定する。
履歴は Git で追跡する。

---

## Section 005 : Coverage Contract をガイドの中心に置く

FlowMark の第一義は「抜け漏れ防止」ではなく
**抜け漏れの検出可能性**である。

LLM は多数列挙事項を要約・端折りやすいという性質があるため、
AI向けガイドでは Coverage Contract を
**Critical Concept** として扱う。

---

## Section 006 : v0.1.5 の位置づけ

v0.1.5 は FlowMark 文書フォーマット自体を変更しない。
追加されるのは、運用上の“道具”である：

- `describe` サブコマンド（配布版 + 原典）
- AI Authoring Guide の同梱

---

*IdeaMark document — FlowMark Project*
