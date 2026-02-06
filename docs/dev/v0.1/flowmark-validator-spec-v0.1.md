# FlowMark v0.1 — Validator/Parser Spec (Markdown + YAML)

**Version:** 0.1 (draft)  
**Last updated:** 2026-02-05

This document is written for implementers building **parsers and validators** in Python/Node.js.
It defines **normative parsing rules**, required fields, and validation behavior.

---

## 1. Normative model

A FlowMark document is a Markdown text containing zero or more YAML blocks.
Only YAML blocks with specific info strings are parsed.

### 1.1 Recognized block types (normative)

A fenced block is recognized if and only if:
- it is a triple-backtick fenced code block
- the info string is exactly one of:
  - `yaml flowmark`
  - `yaml flowmark-section`
  - `yaml flowmark-item`
  - `yaml flowmark-registry`
- the block body parses as YAML (YAML 1.2 compatible)

All other Markdown and code blocks MUST be ignored.

---

## 2. Parsing rules (normative)

### 2.1 Block scanning

Validators MUST scan the document from top to bottom and extract all recognized blocks.
Recommended algorithm:
1. Parse Markdown enough to identify fenced code blocks (do not rely on regex only if avoidable).
2. For each fenced block:
   - read info string
   - if recognized, parse YAML body
   - attach source location metadata (line numbers) if available

### 2.2 Cardinality constraints

- Header (`yaml flowmark`): MUST appear exactly once
- Registry (`yaml flowmark-registry`): MAY appear 0 or 1 times (recommended 1)
- Sections (`yaml flowmark-section`): MAY appear any number of times
- Items (`yaml flowmark-item`): MUST appear >= 1

If a document contains multiple header blocks, validation MUST fail.

### 2.3 Document object model (suggested)

Implementations should construct:

- `header`: dict
- `sections`: list[dict]
- `items`: list[dict]
- `registry`: dict or None

Optionally add:
- `locations`: map of block to (start_line, end_line)

---

## 3. YAML schemas (v0.1)

### 3.1 Header schema (`flowmark`)

Required keys:
- `id`: string (non-empty)
- `title`: string (non-empty)
- `version`: string

Optional keys:
- `status`: one of `draft`, `active`, `archived`
- `created_at`: string (ISO date recommended)
- `inputs`: list of objects:
  - `type`: string
  - `ref`: string

Validation:
- unknown keys: SHOULD be allowed (forward compatibility), but MAY be warned

### 3.2 Section schema (`flowmark-section`)

Required keys:
- `id`: string (non-empty)

Optional keys:
- `scope`: `in-scope` | `out-of-scope`
- `notes`: string

Validation:
- section ids SHOULD be unique (warn or error; recommended warn in v0.1)

### 3.3 Item schema (`flowmark-item`)

Required keys:
- `id`: string (non-empty)
- `status`: one of `todo`, `done`, `skipped`, `blocked`

Optional keys:
- `refs`: list[string]
- `batch`: string

Validation:
- item ids MUST be globally unique across the document (error on duplicates)
- `refs` entries should be strings; allow empty list

### 3.4 Registry schema (`flowmark-registry`)

Required keys:
- `expected_items`: list[string] (non-empty list recommended)

Validation:
- IDs in `expected_items` SHOULD be unique (error on duplicates recommended)

---

## 4. Coverage validation (registry)

If registry exists:

### 4.1 Required coverage checks (normative)

Let:
- E = set of `expected_items`
- I = set of item `id`

Validators MUST compute:

- `missing = E - I`
- `unexpected = I - E`

Rules:
- If `missing` is non-empty, validation MUST fail (coverage failure).
- `unexpected` MAY be:
  - warning (recommended), or
  - error (stricter mode)

### 4.2 Reporting

Validators SHOULD report:
- list of missing IDs
- list of unexpected IDs
- source locations for missing/duplicate blocks if available

---

## 5. Status validation

Allowed status values:
- `todo`
- `done`
- `skipped`
- `blocked`

Validation MUST fail on any other value.

(Implementers may add alias normalization in non-strict mode, but this is out of scope for the spec.)

---

## 6. Error taxonomy (recommended)

Return a structured result for tooling:

- `errors`: list of objects (each has `code`, `message`, optional `location`)
- `warnings`: list of objects (each has `code`, `message`, optional `location`)

Suggested error codes:
- `E_HEADER_MISSING`
- `E_HEADER_DUPLICATE`
- `E_ITEM_NONE`
- `E_YAML_PARSE`
- `E_ITEM_ID_DUPLICATE`
- `E_ITEM_STATUS_INVALID`
- `E_REGISTRY_DUPLICATE`
- `E_COVERAGE_MISSING`

Suggested warning codes:
- `W_REGISTRY_MISSING`
- `W_UNEXPECTED_ITEM`
- `W_SECTION_ID_DUPLICATE`
- `W_UNKNOWN_KEYS`

---

## 7. Strict vs lenient modes (recommended)

Implementations SHOULD provide:
- strict mode: enforce all MUST rules + treat `unexpected` as error
- lenient mode: enforce MUST rules, treat `unexpected` as warning, allow unknown keys

---

## 8. Interop notes (IdeaMark family)

FlowMark uses the same host strategy as IdeaMark:
- Markdown for free-form narrative
- fenced YAML for machine-readable attributes

Validators MUST ignore Markdown narrative and parse only recognized YAML blocks.

---

## 9. Non-goals (v0.1)

Validators MUST NOT assume:
- conditional logic or branching semantics
- dependency resolution
- execution ordering beyond what a tool decides

---

## 10. Minimal conformance test (recommended)

A document is conformant if:
1) exactly one header exists
2) at least one item exists
3) all item IDs are unique
4) all statuses are valid
5) if registry exists, missing is empty

---
