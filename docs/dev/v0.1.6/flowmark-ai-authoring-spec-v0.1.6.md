# FlowMark AI Authoring Spec v0.1.6

**Version:** 0.1.6  
**Last updated:** 2026-02-10

This document updates the AI-authoring guidance with:
- **official `group` support**
- **`flowmark params normalize` topic** (prompt material for normalization rules)
- **key alias rules** to reduce mechanical failures

---

## 001. What’s New in v0.1.6

### 001.1 `group` is now a first-class field
LLMs naturally add `group` to items to improve readability and to align with Coverage Contract’s `required_groups`.
In v0.1.6, this is **recommended** and **validator-supported**.

### 001.2 `flowmark params normalize` exists
`flowmark params normalize --lang en` MUST output a prompt-ready text that explains:
- required header keys
- canonical item keys
- accepted aliases
- unknown keys policy
- minimal, mechanical fix policy (“do not change semantics”)

This is intended for Responder Bridge–style orchestration:
`describe + params + materials → generate → validate → fix-loop`

### 001.3 Alias rule (AI-facing)
For items, AI MAY output:
- `description` (canonical)
- or `requirement` (alias)

Preferred is `description`. If AI uses `requirement`, it MUST be semantically equivalent to `description`.

---

## 002. Canonical YAML Keys (AI-facing)

### 002.1 Header block (`yaml flowmark`)
AI MUST include:

- `id` (string; stable identifier)
- `version` (string; e.g., "0.1.6")
- `title` (string)

AI SHOULD include:
- `doc_type` (string; e.g., "checklist")
- `status` (string; e.g., "draft")

### 002.2 Coverage Contract
No change in concept: AI SHOULD include a Coverage Contract early, with explicit numeric constraints.

### 002.3 Item block (`yaml flowmark-item`)
AI MUST include:
- `id` (string)
- `status` (enum: todo|doing|done|blocked|skipped)  *(keep aligned with current validator)*
- `description` (string) **OR** `requirement` (string)

AI SHOULD include:
- `group` (string) — recommended for alignment with `required_groups`
- `if` / `then` style conditional attributes where applicable

AI MAY include:
- `x_*` or `x-...` extension keys (must not break parsing)

---

## 003. Grouping Rules

- `group` SHOULD be a short machine-friendly label: `scope`, `sessions`, `packaging`, etc.
- If Coverage Contract declares `required_groups`, AI MUST ensure that at least one item exists for each required group.
- If an item belongs to multiple groups, AI SHOULD prefer a single primary `group` and express secondary grouping via `x_groups: [...]` (extension) or via section structure.

---

## 004. Normalization Guidance (for prompt composition)

When asked to “fix to pass validator”, AI MUST perform only mechanical changes:

- add missing required keys (e.g., header `id`, `version`)
- convert alias keys (e.g., `requirement` → `description`) if requested
- ensure all YAML blocks are valid and correctly fenced
- do NOT reduce enumeration
- do NOT rewrite large sections unless required to pass validation

---

## 005. Recommended Prompt Template (AI-facing)

System: output of `flowmark describe ai --lang en`  
System (optional): output of `flowmark params normalize --lang en`  
User: Materials (files/urls/chat logs) + task instruction

---
