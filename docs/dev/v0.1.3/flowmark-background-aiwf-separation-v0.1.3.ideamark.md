```yaml
ideamark_version: 1
doc_id: "flowmark.background.aiwf-separation.v0.1.3"
doc_type: "derived"
status: "completed"
created_at: "2026-02-09"
updated_at: "2026-02-09"
lang: "ja-JP"

refs:
  sources:
    - id: flowmark-background-versioning
      uri: ./flowmark-background-spec-versioning-v0.1.3.ideamark.md
      role: background
    - id: aiwf-background
      uri: ../aiwf/aiwf-background-v0.1.1.ideamark.md
      role: background
```
# FlowMark v0.1.3 背景整理（改訂）  
## ― aiwf を外部 Runner として扱う判断 ―

本ドキュメントは、FlowMark v0.1.3 において
aiwf を **独立した外部 Runner** として位置付ける判断を
明確化するための背景整理である。

---

## Meta
```yaml
intent: >
  FlowMark と aiwf の責務境界を明確にし、
  FlowMark が execution framework に依存しないことを保証する。
domain:
  - flowmark
  - aiwf
  - spec-versioning
  - responsibility-separation
```
---

## Section 001 : なぜ分離を明確化する必要があったか

```yaml
section_id: "SEC-001"
anchorage:
  view: "problem"
  phase: "confirmed"
```
aiwf の実装が独立リポジトリとして進展したことで、
FlowMark spec 内に存在していた「実行環境の暗黙的前提」は
整理される必要が生じた。

FlowMark が特定の Runner に依存すると、
文書形式としての独立性が損なわれる。

---

## Section 002 : 改訂後の責務分離

```yaml
section_id: "SEC-002"
anchorage:
  view: "decision"
  phase: "confirmed"
```
改訂後の責務分離は以下の通りである。

| レイヤ | 責務 |
|------|------|
| FlowMark | 期待・構造・網羅性の定義 |
| Tool | 生成・検証・修正ロジック |
| aiwf | 実行・記録・再現 |

各レイヤは相互に意味論を侵害しない。

---

## Section 003 : spec stack の扱い

```yaml
section_id: "SEC-003"
anchorage:
  view: "clarification"
  phase: "confirmed"
```
spec stack は FlowMark の **運用上の要請**であり、
FlowMark 文書の一部ではない。

- FlowMark は spec stack の存在を要求する
- spec stack の保持・記録は Runner 側の責務である

---

## Section 004 : v0.1.3 改訂の位置づけ

```yaml
section_id: "SEC-004"
anchorage:
  view: "decision"
  phase: "confirmed"
```
本改訂は意味論的変更ではない。

- 既存 FlowMark 文書との互換性は完全に維持される
- Validator の挙動は変更されない

本改訂は **仕様の読み方と責務境界の明確化**を目的とする。

---

*IdeaMark document — FlowMark Project*
