# FlowMark v0.1.1 — Validator/Parser Spec (Markdown + YAML)

**Version:** 0.1.1  
**Last updated:** 2026-02-06

This document updates v0.1 to clarify the relationship between
**Coverage Contract** and validation.

---

## 0. Scope clarification

Validator v0.1.1:

- **MUST** validate registry-based coverage
- **MUST NOT** enforce or interpret Contract fields
- **MAY** surface Contract as opaque metadata

This preserves backward compatibility and keeps validation deterministic.

---

## 1. Normative model

(Unchanged from v0.1)

A FlowMark document is Markdown with fenced YAML blocks.
Only recognized blocks are parsed.

---

## 2. Header schema update

Header (`yaml flowmark`) MAY include:

```yaml
contract: object
```

Validation rules:
- Contract presence MUST NOT affect validation outcome.
- Unknown keys inside `contract` MUST be ignored.

---

## 3. Coverage validation (registry)

Unchanged from v0.1.

Registry remains the sole normative coverage mechanism.

---

## 4. Forward compatibility note

Implementations SHOULD:
- preserve the parsed Contract object
- expose it in structured output
- avoid assumptions about its semantics

This enables v0.2+ validators to add optional Contract checks without
breaking v0.1.x behavior.

---

## 5. Versioning note

A document declaring `version: 0.1.1` is fully compatible with v0.1 validators,
provided they ignore unknown header fields.

---
