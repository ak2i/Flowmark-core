```yaml
ideamark_version: 1
doc_id: "flowmark.background.spec-versioning.v0.1.3"
doc_type: "derived"
status: "completed"
created_at: "2026-02-08"
updated_at: "2026-02-08"
lang: "ja-JP"

refs:
  sources:
    - id: flowmark-background-aiwf
      uri: ./flowmark-background-aiwf-integration-v0.1.2.ideamark.md
      role: background
    - id: flowmark-ai-spec-v012
      uri: ./flowmark-ai-authoring-spec-v0.1.2.md
      role: background
```
# FlowMark v0.1.3 背景整理  
## ― Spec Versioning / Spec Stack をFlowMarkの対象に含める理由 ―

本ドキュメントは、FlowMark v0.1.3 において  
**「spec の読み方・適用方法そのもの」を FlowMark の管理対象に含める**
という判断に至った背景を記録する IdeaMark document である。

---

## Meta
```yaml
intent: >
  FlowMark v0.1.x における spec が累積ではなく差分である理由と、
  AIコーディング時に spec stack（適用順）を明示的に扱う必要性を整理する。
domain:
  - flowmark
  - spec-versioning
  - aiwf
  - ai-collaboration
```
---

## Section 001 : 累積specがAIコーディングに与える問題

```yaml
section_id: "SEC-001"
anchorage:
  view: "problem"
  phase: "confirmed"
```
累積された巨大な仕様書は、人間にとっては便利である一方、
AIコーディングにおいては次の問題を引き起こしやすい。

- 変更点と不変点の区別がつきにくい
- どの判断が「いつ導入されたか」が不明瞭
- 実装時に不要な再解釈や再設計が起きる

特に進化中のフレームワークでは、
**差分として仕様を適用する方がAIの認知特性に合致する**。

---

## Section 002 : 差分specと適用順の重要性

```yaml
section_id: "SEC-002"
anchorage:
  view: "solution"
  phase: "confirmed"
```
FlowMark v0.1.x では、各 spec は以下の前提で書かれている。

- v0.1 は完全なベース仕様
- v0.1.x (x>0) は常に差分仕様
- 後続 spec は前 spec を上書き・拡張する

このため、**spec の適用順（spec stack）自体が意味を持つ**。

---

## Section 003 : Spec Stack という概念

```yaml
section_id: "SEC-003"
anchorage:
  view: "concept"
  phase: "confirmed"
```
Spec Stack とは、実装や生成の際に適用された spec の列である。

例：
- flowmark-ai-authoring-spec-v0.1.md
- flowmark-ai-authoring-spec-v0.1.1.md
- flowmark-ai-authoring-spec-v0.1.2.md
- flowmark-ai-authoring-spec-v0.1.3.md

Spec Stack を明示することで：
- 実装の前提条件が再現可能になる
- 後から判断理由を追跡できる
- aiwf Session による履歴管理と整合する

---

## Section 004 : なぜこれがFlowMarkの対象なのか

```yaml
section_id: "SEC-004"
anchorage:
  view: "decision"
  phase: "confirmed"
```
FlowMark は「抜け漏れを検出可能にする」ための文書形式である。

spec の読み方や適用順が曖昧であれば、
**実装上の抜け漏れや誤解も検出できない**。

したがって、
> spec 運用そのものを明示的に管理する

ことは、FlowMark の第一義と矛盾しない。

---

## Section 005 : v0.1.3 における判断

```yaml
section_id: "SEC-005"
anchorage:
  view: "decision"
  phase: "confirmed"
```
FlowMark v0.1.3 では：

- spec は差分適用であることを明文化
- AIコーディング時の spec stack 運用を推奨
- aiwf Session に spec stack を記録することを推奨

これにより、FlowMark は
**自らの進化過程も管理対象に含めるフレームワーク**
となる。

---

*IdeaMark document — FlowMark Project*
