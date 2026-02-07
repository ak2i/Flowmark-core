# FlowMark v0.1.2 — AI-Friendly Authoring Spec (Markdown + YAML)

**Version:** 0.1.2  
**Last updated:** 2026-02-07

This version introduces **aiwf (AI Workflow Framework)** as the
recommended execution environment for FlowMark generation and validation.

FlowMark itself remains a document format.
aiwf is an external runner.

---

## 0. Relationship to aiwf

- FlowMark documents MAY be generated, reviewed, and validated via aiwf.
- FlowMark does NOT require aiwf to be valid.
- aiwf provides repeatability, logging, and automation.

---

## 1. Authoring pipeline (informative)

Recommended pipeline when using aiwf:

1. Contract drafting (`aiwf fm contract draft`)
2. Contract review (`aiwf fm contract review`)
3. Item generation (`aiwf fm generate`)
4. Validation (`aiwf fm validate`)
5. Fix missing items (`aiwf fm fix`)

This pipeline corresponds to Section 006 of the background document.

---

## 2. Session-aware authoring

When FlowMark is generated via aiwf:

- Each generation SHOULD be associated with a Session.
- Generated documents SHOULD be stored as artifacts.
- Registry validation results SHOULD be recorded as events.

---

## 3. Spec changes from v0.1.1

- No breaking changes to document structure.
- Added normative notes about aiwf usage.
- Clarified that Contract + Registry is designed for automated workflows.

---

All other sections are unchanged from v0.1.1.
