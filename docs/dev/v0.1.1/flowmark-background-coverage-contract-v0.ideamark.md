```yaml
ideamark_version: 1
doc_id: "flowmark.background.coverage-contract.v0"
doc_type: "derived"
status: "completed"
created_at: "2026-02-06"
updated_at: "2026-02-06"
lang: "ja-JP"

refs:
  sources:
    - id: ideamark-spec
      uri: ./ideamark-document-spec-v1.md
      role: background
    - id: ideamark-yaml
      uri: ./ideamark-yaml-spec-v1.md
      role: background
```

# FlowMark v0.1 における背景整理  
## ― Coverage・Contract・AI協調設計の設計意図 ―

本ドキュメントは、**FlowMark-ai-authoring-spec-v0.1** を定義するにあたっての
設計背景・思想・議論経緯を **IdeaMark document** として記録するものである。

FlowMark の仕様そのものではなく、  
「なぜその仕様に至ったのか」「どの問題を解こうとしているのか」を保存する目的を持つ。

---

## Meta
```yaml
intent: >
  FlowMark v0.1 のAI親和仕様を定義する前提として、
  IdeaMark の設計原則と、LLMの構造的制約を踏まえた
  網羅性保証アプローチ（Coverage + Contract）の背景を記録する。
domain:
  - flowmark
  - ideamark
  - ai-collaboration
```

---

## Section 001 : 問題意識 — LLMは列挙を端折る

```yaml
section_id: "SEC-001"
anchorage:
  view: "problem"
  phase: "confirmed"
```

LLMを用いてエンジニアリング課題（設計・実装・移行など）を扱う際、
**多数の列挙事項が暗黙にサマライズされ、抜け落ちる**問題が繰り返し観測された。

これは単なるプロンプト設計の問題ではなく、

- トークン制限
- 内部表現の圧縮
- 要約を「善」とする最適化

といった **LLMの構造的性質** に起因する。

したがって、
> 「LLMに頑張らせて端折らせない」
ではなく、
> 「端折られたら必ず分かる構造を先に作る」
という発想転換が必要になった。

---

## Section 002 : IdeaMarkから継承する設計原則

```yaml
section_id: "SEC-002"
anchorage:
  view: "background"
  phase: "confirmed"
```

FlowMark は新規フォーマットではあるが、
**IdeaMark の以下の設計原則を強く継承する**。

- Markdown本文は人間とAIのための自由記述
- YAMLは機械処理のための構造情報
- fenced code block による明確なパース境界
- 文書は「読む順」と「処理順」が一致する

一方で FlowMark は、
IdeaMark が扱う **思考・意味・文脈の構造化** ではなく、
**列挙・確認・網羅性** に特化する。

---

## Section 003 : FlowMarkの第一義と第二義

```yaml
section_id: "SEC-003"
anchorage:
  view: "structural_hypothesis"
  phase: "confirmed"
```

FlowMark の役割は以下のように再定義された。

### 第一義（Primary Purpose）

> **多数の列挙事項に対して、網羅性と一覧性を保証する文書形式**

- 抜け漏れが「発生しない」ことを目指すのではない
- 抜け漏れが「検出可能」であることを保証する

### 第二義（Secondary Purpose）

> **AI Agent が入力として利用できるが、FlowMark自体は実行DSLではない**

- FlowMark は「計画」や「制御」を表現しない
- Agent は FlowMark を *読む* 側に立つ

---

## Section 004 : Coverage と Registry の分離

```yaml
section_id: "SEC-004"
anchorage:
  view: "mechanism"
  phase: "confirmed"
```

FlowMark v0.1 では、網羅性を二段階で扱う。

| 要素 | 役割 |
|----|----|
| FlowMark Items | 実体として列挙された項目 |
| Registry | 列挙された項目集合の固定と検証 |

Registry により、
「列挙された *結果*」は検証可能になる。

しかしこれだけでは、
> 「そもそも何を列挙すべきだったのか」
が曖昧なまま残る。

---

## Section 005 : Contract（Coverage Contract）の導入

```yaml
section_id: "SEC-005"
anchorage:
  view: "solution"
  phase: "confirmed"
```

そこで導入されたのが **Coverage Contract** という考え方である。

Contract は：

- 列挙対象の境界（enumeration_target）
- 最低限存在するはずの数（min_total_items）
- 必須観点（required_groups）
- 例外時の扱い（exception_policy）

といった **期待される集合（Should be）** を宣言する。

重要なのは：

- Contract は命令ではない
- Contract は検証対象でもない（v0.1では）
- Contract は *レビュー対象* である

---

## Section 006 : 人間・AI・別AIによるチェックフロー

```yaml
section_id: "SEC-006"
anchorage:
  view: "process"
  phase: "confirmed"
```

想定されるフローは以下である。

1. Contract Drafting  
   人間またはAIが Contract を記述する
2. Contract Review  
   別の人間または別AIが穴をチェックする
3. FlowMark Generation  
   Contract を前提に item と registry を生成
4. Validation  
   Registry による機械検証
5. Iteration  
   Contract または抽出手順を更新

これにより、
**「端折れない生成」ではなく「端折れたら必ず分かる工程」**
が実現される。

---

## Section 007 : なぜ v0.1 に Contract を入れるのか

```yaml
section_id: "SEC-007"
anchorage:
  view: "decision"
  phase: "confirmed"
```

v0.1 における方針は次の通りである。

- Contract は *任意フィールド* として header に置く
- Validator は Contract を解釈しない
- 将来拡張（v0.2+）への明確なフックとして残す

FlowMark は **ノギス** であり、
Contract は **「どの長さを測るか」という宣言**である。

---

## Section 008 : 本ドキュメントの位置づけ

```yaml
section_id: "SEC-008"
anchorage:
  view: "background"
  phase: "confirmed"
```

本ドキュメントは、

- FlowMark-ai-authoring-spec-v0.1
- FlowMark-validator-spec-v0.1

より **前段に置かれる背景文書**であり、
各バージョンごとに作成・更新されることを想定する。

仕様が変わっても、
「なぜその判断をしたのか」はここに残される。

---

*IdeaMark document — FlowMark Project*
