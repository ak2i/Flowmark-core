# FlowMark v0.1 — AI‑Friendly Authoring Spec (Markdown + YAML)

**Version:** 0.1 (draft)  
**Last updated:** 2026-02-05

This document is written for LLMs (and humans) to **generate FlowMark documents reliably** without accidentally summarizing or dropping checklist items.

FlowMark is a **coverage document format**:
- **Primary purpose:** guarantee listability and omission detection for enumerated engineering items.
- **Secondary purpose:** may be consumed by agents/tools, but FlowMark is **not** an execution DSL.

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
So you are free to write narrative without breaking parsers.

---

## 2. Authoring strategy for LLMs (how not to drop items)

### 2.1 Always write the Registry

To avoid silent omission:
1) Decide the full set of items (IDs) first.
2) Write a `flowmark-registry` block listing all `expected_items`.
3) Ensure every ID in the registry appears as a `flowmark-item`.

If you add/remove items, update the registry.

### 2.2 Use batches for token-limited workflows

If the checklist is large:
- Assign each item a `batch` (e.g., `A`, `B`, `auth-core`, `session-edges`).
- Keep each batch small enough to be processed in a single LLM call.
- Processing order is tool-defined; `batch` is a **hint** only.

### 2.3 Use stable IDs

IDs should be:
- unique across the whole document
- stable over time
- short but meaningful

Recommended patterns:
- `area-001` (e.g., `auth-001`)
- `api-101` (category + serial)
- `section-keyword-001` (if needed)

---

## 3. Field requirements (v0.1)

### 3.1 Header block (`yaml flowmark`) — required

Minimal required fields:
- `id` (document id)
- `title`
- `version`

Recommended fields:
- `status`: `draft` | `active` | `archived`
- `created_at`: `YYYY-MM-DD`
- `inputs`: list of sources used to derive items

**Example**

```yaml flowmark
id: fm-auth-quickstart
title: Quickstart Checklist — Auth & Session
version: 0.1
status: draft
created_at: 2026-02-05
inputs:
  - type: repository
    ref: https://github.com/acme/app
  - type: ideamark
    ref: ideamark://auth-design-v2
```

### 3.2 Section block (`yaml flowmark-section`) — optional, repeatable

Required:
- `id`

Optional:
- `scope`: `in-scope` | `out-of-scope`
- `notes`: short explanation

**Example**

```yaml flowmark-section
id: auth
scope: in-scope
notes: Login, password reset, MFA, credential storage.
```

### 3.3 Item block (`yaml flowmark-item`) — required, repeatable

Required:
- `id`
- `status`: `todo` | `done` | `skipped` | `blocked`

Optional:
- `refs`: list of references (strings)
- `batch`: segmentation hint

**Example**

```yaml flowmark-item
id: auth-001
status: todo
refs:
  - code://src/auth/password.ts
  - ideamark://auth-design-v2#password-policy
batch: auth-core
```

### 3.4 Registry block (`yaml flowmark-registry`) — recommended, exactly once

Required:
- `expected_items`: list of item IDs

**Example**

```yaml flowmark-registry
expected_items:
  - auth-001
  - auth-002
  - auth-003
```

---

## 4. AI generation checklist (for the model)

When generating FlowMark:

1. Emit header block first.
2. Create sections (optional) and label them clearly in Markdown.
3. For each checklist requirement:
   - create a Markdown heading (e.g., `### Title`)
   - immediately follow with a `flowmark-item` YAML block
   - keep one item per block
4. Assign `batch` when item count is large or when requested.
5. Emit the registry last and ensure it includes **all** item IDs.
6. Validate:
   - every registry ID exists as an item
   - no duplicate item IDs
   - statuses are one of the allowed values
   - YAML is valid

---

## 5. Example templates

### 5.1 Minimal template

```markdown
```yaml flowmark
id: fm-example
title: Example
version: 0.1
status: draft
created_at: 2026-02-05
```

# Example

## Section A

```yaml flowmark-section
id: a
scope: in-scope
```

### Do thing 1
```yaml flowmark-item
id: a-001
status: todo
```

### Do thing 2
```yaml flowmark-item
id: a-002
status: todo
```

## Registry
```yaml flowmark-registry
expected_items:
  - a-001
  - a-002
```
```

### 5.2 Token-aware template (batches)

```markdown
### Item
```yaml flowmark-item
id: api-001
status: todo
batch: A
```
```

---

## 6. Non-goals (v0.1)

FlowMark v0.1 intentionally does not define:
- conditional branching (`if/then/else`)
- dependencies / DAGs
- auto-completion rules
- agent execution semantics

Those may appear in v0.2+.

---
