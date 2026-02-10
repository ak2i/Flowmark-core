```yaml
ideamark_version: 1
doc_id: "flowmark.background.normalize-group.v0.1.6"
doc_type: "background"
status: "draft"
created_at: "2026-02-10"
updated_at: "2026-02-10"
lang: "ja-JP"

project:
  name: FlowMark
  repo: "ak2i/Flowmark-core"
  spec_version: "0.1.6"

intent: >
  FlowMark v0.1.6 で「normalize と group の正式化」を導入する背景を記録する。
  実証実験（Responder Bridge）で観測された YAML の機械的ズレを、
  仕様と validator の両面で吸収し、LLM には意味生成と列挙（Coverage）に集中させる。
```
# FlowMark v0.1.6 背景：normalize と group の正式化

## Section 001 : 観測された課題（実験結果）

Responder（LLM）に FlowMark 文書を生成させ、`flowmark validate` で検証したところ、
文書の「意味」や「網羅性」は良好でも、YAML 部分で機械的な不一致が発生した。典型例：

- Header の必須キー（`id`, `version`）が欠落
- item に `requirement` を使い、spec が想定する `description` とズレる
- item に `group` を付与する（人間に分かりやすい）が、spec 上は未知キー扱い

これらは「LLM が端折る/要約する」問題とは別で、
**形式の揺れ**（表記ゆれ、必須キー漏れ、自然発生する拡張）に起因する。

## Section 002 : v0.1.6 の狙い

v0.1.6 は次を狙う：

1. **group の正式化**  
   - LLM が自然に生成する `group` を spec の正規要素として取り込む。
   - これにより「Coverage Contract の required_groups」と checklist items の対応が明確になる。
2. **normalize の導入（“仕様として”）**  
   - `flowmark params normalize` を追加し、LLM に渡す “正規化規則” を文書として提供する。
   - 実装は「正規化ルールの提示（params 出力）」であり、
     FlowMark-core が文書変換処理を担うことを必須とはしない。
3. **validator の許容範囲を明確化**  
   - v0.1.6 の validator は、`requirement` を `description` の別名として許容し、警告または自動正規化（内部）する。
   - group を正規キーとして受け入れ、警告の対象から外す。

## Section 003 : 役割分担（FlowMark / Responder Bridge）

- FlowMark は「文書形式」「describe」「params」「validator」を提供する。
- Responder Bridge は「describe + params + materials → generate → validate → fix-loop → artifacts」をオーケストレーションする。

v0.1.6 の normalize は、Responder Bridge（または同等の外部ツール）が
LLM に渡すプロンプト素材として利用することを想定する。

## Section 004 : 互換性方針

- v0.1.6 以降で生成される FlowMark 文書は、可能な限り v0.1.5 系とも互換を保つ。
- ただし validator の厳密性（警告/エラーの扱い）は、安定運用のために段階的に調整してよい。
- 拡張キーは `x_*` または `x-` プレフィクスで表現できる方針を維持し、group のように一般化したものは正規キーに昇格する。

---

*End of Background*
