# FlowMark Validator Spec v0.1.6

**Version:** 0.1.6  
**Last updated:** 2026-02-10

This document updates validator expectations to reduce purely mechanical failures observed in LLM-generated FlowMark documents.

---

## 001. Changes in v0.1.6

1. **Header now strictly requires `id` and `version`** (if not already strict).
2. **Item `group` is officially supported** (no warning as “unknown key”).
3. **Item `requirement` is accepted as an alias for `description`**:
   - Validator MAY internally normalize it to `description`.
   - Validator SHOULD emit a warning like: “W_ALIAS_KEY: requirement treated as description”.
4. Unknown keys remain allowed only if they match extension policy:
   - `x_*` or `x-...` keys are allowed (warn or allow silently, implementation choice).
   - Non-extension unknown keys SHOULD warn (except `group`, which is now official).

---

## 002. Header Schema (`yaml flowmark`)

Validator MUST require:

- `id`: non-empty string
- `version`: non-empty string
- `title`: non-empty string

Validator SHOULD validate (if present):
- `doc_type`: string
- `status`: string

---

## 003. Item Schema (`yaml flowmark-item`)

Validator MUST require:
- `id`: non-empty string
- `status`: one of `todo|doing|done|blocked|skipped`
- `description`: string  **OR** `requirement`: string

Validator MUST accept:
- `group`: string (optional)

Validator MAY accept:
- `if`, `then`, `else` (optional; if supported by current spec)
- extension keys (`x_*` or `x-...`)

Validator MUST fail if:
- YAML is invalid / cannot be parsed
- required keys are missing
- `status` is outside allowed enum

---

## 004. Alias Normalization Rules

If item has `requirement` but not `description`:
- treat `requirement` as `description`
- emit `W_ALIAS_KEY` warning (recommended)

If item has both:
- validator SHOULD fail (recommended) OR warn and prefer `description` (implementation choice).  
  **Recommended:** fail with `E_AMBIGUOUS_KEY` to force deterministic output.

---

## 005. Group Semantics

Validator treats `group` as metadata only in v0.1.6.
It MUST NOT enforce cross-item group constraints (that belongs to Coverage Contract / higher-level checks).
Future versions MAY add optional checks (e.g., “required_groups coverage”).

---

## 006. Backward Compatibility Notes

- v0.1.5 documents without `group` remain valid.
- v0.1.5 documents using `requirement` will become valid (with warning) in v0.1.6.
- Documents relying on arbitrary unknown keys without `x_*` prefix may warn more strictly.

---
