# FlowMark v0.1.1 — AI‑Friendly Authoring Spec (Markdown + YAML)

**Version:** 0.1.1  
**Last updated:** 2026-02-06

This document updates v0.1 based on the background document
*FlowMark-background-coverage-contract-v0.ideamark.md* and clarifies how
**Coverage Contract** fits into FlowMark authoring.

FlowMark remains a **coverage document format**:
- **Primary purpose:** guarantee listability and omission detection for enumerated engineering items.
- **Secondary purpose:** may be consumed by agents/tools, but FlowMark is **not** an execution DSL.

---

## 0. Design context (informative)

FlowMark v0.1.1 assumes the following separation of concerns:

- **Contract**: declares the *expected shape* of enumeration (what should exist).
- **Items + Registry**: record the *actual enumeration* (what does exist).
- **Validator v0.1.x**: enforces registry‑based coverage only.

Contract is declarative and review‑oriented. It is not executed or enforced in v0.1.x.

---

## 1. Output format (hard rules)

A FlowMark file is **Markdown** containing **fenced YAML blocks**.  
Machines only parse the YAML blocks with specific info strings.

### 1.1 Required YAML block types

Use these fenced blocks exactly:

- Header: ` ```yaml flowmark ` (required; exactly once; near the top)
- Section: ` ```yaml flowmark-section ` (optional; repeatable)
- Item: ` ```yaml flowmark-item ` (required; repeatable)
- Registry: ` ```yaml flowmark-registry ` (optional but recommended; exactly once)

✅ YAML blocks must be fenced with triple backticks and the info string must match exactly.  
✅ YAML must be valid (no tabs; proper indentation).

### 1.2 Everything outside YAML is “free text”

Markdown outside the YAML blocks is for:
- explanations
- rationale
- notes
- links
- human readability

**Tools MUST ignore it.**

---

## 2. Coverage Contract (v0.1.1 addition)

### 2.1 Purpose

Coverage Contract declares *expectations* about enumeration so that:
- LLMs know what they are trying to list
- humans / other AIs can review assumptions
- omissions become detectable when comparing expectation vs result

### 2.2 Placement

Contract is an **optional field inside the header block**.

```yaml
```yaml flowmark
id: fm-example
title: Example
version: 0.1.1
contract:
  enumeration_target: "..."
```
```

### 2.3 Contract fields (declarative)

All fields are optional but strongly recommended.

```yaml
contract:
  enumeration_target: string                # what is being enumerated
  required_groups: [string, ...]            # mandatory viewpoints
  min_total_items: number                   # expected lower bound
  min_items_by_group:                       # optional per-group bounds
    GroupName: number
  anti_omission_rules: [string, ...]        # natural-language guidance
  exception_policy:                         # how to record ambiguity
    <key>: string
```

**Normative note:**  
In v0.1.x, Contract is **not validated** by tools. It exists for generation,
review, and future extensibility.

---

## 3. Authoring strategy for LLMs (updated)

### 3.1 Write the Contract first

1) Draft the Contract from requirements and inputs.  
2) Review the Contract (human or separate AI).  
3) Generate items *against the Contract*.

### 3.2 Always write the Registry

Registry remains the **only enforced coverage mechanism** in v0.1.x.

### 3.3 Use batches for token-limited workflows

(unchanged from v0.1)

### 3.4 Use stable IDs

(unchanged from v0.1)

---

## 4. Field requirements (v0.1.1)

### 4.1 Header block (`yaml flowmark`)

Minimal required fields:
- `id`
- `title`
- `version`

Optional:
- `status`
- `created_at`
- `inputs`
- `contract` (new in v0.1.1)

### 4.2 Section, Item, Registry blocks

Unchanged from v0.1.

---

## 5. AI generation checklist (updated)

When generating FlowMark v0.1.1:

1. Emit header with **contract (if available)**.
2. Ensure the Contract is internally consistent.
3. Enumerate items against the Contract.
4. Emit registry listing *all* item IDs.
5. Self-check:
   - registry completeness
   - ID uniqueness
   - status validity

---

## 6. Non-goals (v0.1.x)

FlowMark v0.1.x intentionally does not define:
- enforcement of Contract rules
- conditional branching
- dependency graphs
- execution semantics

These are reserved for v0.2+.

---
