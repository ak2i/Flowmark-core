# FlowMark v0.1.3 — AI-Friendly Authoring Spec (Markdown + YAML)

**Version:** 0.1.3  
**Last updated:** 2026-02-08

This version formalizes **spec versioning and application order**
for AI-assisted implementation and generation.

---

## X. Spec versioning and application order (v0.1.3)

FlowMark specifications in the v0.1.x series are **incremental**.

Normative guidance:

- v0.1 MUST be treated as the base specification.
- Later v0.1.x specifications MUST be applied in ascending order.
- Later specifications extend or override earlier ones unless explicitly stated.

When instructing AI systems, the **spec stack MUST be made explicit**.

---

## Y. Interaction with aiwf

When used with aiwf:

- The applied spec stack SHOULD be recorded in the session metadata
  (e.g. `spec_stack` in run.json).
- Generated artifacts SHOULD be traceable to the spec stack used.

---

No other normative changes from v0.1.2.
