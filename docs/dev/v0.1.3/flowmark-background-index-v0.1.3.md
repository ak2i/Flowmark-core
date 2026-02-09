# FlowMark Background Index (v0.1.3)

**Last updated:** 2026-02-09

This index describes the recommended reading order and roles of
background IdeaMark documents related to FlowMark v0.1.3.

Background documents are **design history assets**.
They explain *why* decisions were made, not only *what* was specified.

---

## Recommended Reading Order

### 1. Spec Versioning Background

**File:**  
`flowmark-background-spec-versioning-v0.1.3.ideamark.md`

**Purpose:**  
- Explains why FlowMark specifications are incremental rather than cumulative
- Introduces the concept of **spec stack**
- Clarifies why spec application order matters for AI-assisted development

This document establishes the **foundational principle** of FlowMark v0.1.3.

---

### 2. aiwf Separation Background

**File:**  
`flowmark-background-aiwf-separation-v0.1.3.ideamark.md`

**Purpose:**  
- Explains why aiwf is treated as an external Runner / Workflow Engine
- Clarifies responsibility separation between:
  - FlowMark (expectations and structure)
  - Tools (generation / validation logic)
  - aiwf (execution, logging, reproducibility)
- Positions spec stack storage as a Runner responsibility

This document builds on the versioning background and applies it
to execution architecture.

---

## Notes

- Background documents are **not specifications**
- They MUST NOT be interpreted as normative rules
- They exist to preserve design intent, rationale, and evolution history

---

*FlowMark Project*
