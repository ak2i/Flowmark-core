# FlowMark v0.1.3 — AI-Friendly Authoring Spec (Revised)

**Version:** 0.1.3  
**Last updated:** 2026-02-09

This revision clarifies the relationship between FlowMark and **aiwf**,
which is now treated as an **external Runner / Workflow Engine**.

FlowMark remains a document format and specification.
aiwf is one possible execution environment.

---

## 0. Relationship to aiwf (Revised)

- FlowMark does **not** depend on aiwf for validity.
- aiwf MAY be used to generate, validate, or fix FlowMark documents.
- aiwf is responsible for execution, logging, and reproducibility.
- FlowMark defines expectations and structure only.

FlowMark MUST NOT require aiwf-specific fields inside FlowMark documents.

---

## 1. Spec versioning and application order (v0.1.3)

FlowMark specifications in the v0.1.x series are **incremental**.

Normative guidance:

- `v0.1` MUST be treated as the base specification.
- Later `v0.1.x` specifications MUST be applied in ascending order.
- Later specifications extend or override earlier ones unless explicitly stated.

When instructing AI systems, the **spec stack MUST be made explicit**.

FlowMark documents themselves do **not** contain spec stack information.

---

## 2. Interaction with aiwf

When FlowMark is used with aiwf:

- The spec stack SHOULD be recorded by aiwf as execution metadata.
- Session artifacts SHOULD preserve generated FlowMark documents.
- Validation and fix operations SHOULD be repeatable via session logs.

FlowMark does not interpret or enforce how aiwf records this information.

---

## 3. No structural changes

This revision introduces **no changes** to:

- YAML block structure
- Required fields
- Registry semantics
- Contract semantics

All document-level rules remain unchanged from earlier versions.

---
