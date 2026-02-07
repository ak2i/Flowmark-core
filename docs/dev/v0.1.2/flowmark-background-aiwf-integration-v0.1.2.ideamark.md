```yaml
ideamark_version: 1
doc_id: "flowmark.background.aiwf-integration.v0.1.2"
doc_type: "derived"
status: "completed"
created_at: "2026-02-07"
updated_at: "2026-02-07"
lang: "ja-JP"

refs:
  sources:
    - id: flowmark-background-v0
      uri: ./flowmark-background-coverage-contract-v0.ideamark.md
      role: background
    - id: flowmark-ai-spec-v011
      uri: ./flowmark-ai-authoring-spec-v0.1.1.md
      role: background
    - id: flowmark-validator-spec-v011
      uri: ./flowmark-validator-spec-v0.1.1.md
      role: background
```

# FlowMark v0.1.2 背景整理  
## ― aiwf（AI Workflow Framework）導入の設計意図 ―

本ドキュメントは、FlowMark v0.1.2 において **aiwf** を導入するに至った
設計背景と判断理由を IdeaMark document として記録するものである。

aiwf は FlowMark 専用ツールではなく、IdeaMark / TPCG / RSME を含む
**AI思考フレームワーク群を共通に実行するための基盤**として構想されている。

---

## Meta
```yaml
intent: >
  FlowMark v0.1.2 において、CLI/WebUI 共通基盤である aiwf を
  なぜ導入するのか、どの責務を担わせるのかを明確化する。
domain:
  - flowmark
  - aiwf
  - ai-collaboration
  - workflow
```
---

## Section 001 : Chat中心運用の限界

```yaml
section_id: "SEC-001"
anchorage:
  view: "problem"
  phase: "confirmed"
```
従来の Chat ベース運用では、以下の課題が顕在化していた。

- プロンプト・再試行・検証の履歴が残りにくい
- LLMの端折りを検出して再実行する導線が弱い
- 議論・入力・成果物が分断され、再現性が低い

FlowMark の「端折られたら検出する」という思想は、
Chat UI 単体では十分に活かしきれない。

---

## Section 002 : aiwf 導入の目的

```yaml
section_id: "SEC-002"
anchorage:
  view: "solution"
  phase: "confirmed"
```
aiwf（AI Workflow Framework）は、以下を目的として導入される。

- FlowMark / IdeaMark 等の **生成・検証フローをコマンド化**
- OpenAI API互換インターフェースを用いた **モデル切替可能な実行**
- 実行履歴・成果物を **Session として保存**
- 人間・AI・別AIによるチェック工程を **再現可能なパイプライン**にする

---

## Section 003 : aiwf の責務分離

```yaml
section_id: "SEC-003"
anchorage:
  view: "design"
  phase: "confirmed"
```
aiwf は次の責務を担う。

| レイヤ | 責務 |
|------|------|
| Provider | OpenAI互換APIへの接続 |
| Runner | プロンプト実行・再試行・分割 |
| Session | JSONLログ + 成果物保存 |
| Framework plugin | FlowMark / IdeaMark 固有ロジック |

FlowMark 自体は aiwf に依存しない。
aiwf は FlowMark を「実行する側」に立つ。

---

## Section 004 : Session 形式の意義

```yaml
section_id: "SEC-004"
anchorage:
  view: "mechanism"
  phase: "confirmed"
```
aiwf における Session は以下を保持する。

- events.jsonl : 実行イベントログ
- artifacts/ : 生成物（FlowMark文書など）
- inputs/ : 入力スナップショット or メタ情報
- run.json : モデル・温度・設定

これにより、FlowMark生成は
**再実行可能・検証可能・差分確認可能**となる。

---

## Section 005 : v0.1.2 における方針

```yaml
section_id: "SEC-005"
anchorage:
  view: "decision"
  phase: "confirmed"
```
FlowMark v0.1.2 では：

- aiwf の存在を **仕様上明示**
- FlowMark は aiwf の **最初の公式ユースケース**
- aiwf は FlowMark-core 内で実装を開始し、将来切り出す

これにより、spec と実装が乖離しない形で進化できる。

---

*IdeaMark document — FlowMark / aiwf Project*
