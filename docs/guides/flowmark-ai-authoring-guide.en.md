# FlowMark AI Authoring Guide (v0.1.5)

_Last updated: 2026-02-09_

This guide explains **how an AI system should generate valid FlowMark documents**
while preserving omission-detection through Coverage Contracts.

---

## Key Principles

- FlowMark detects omissions; it does not prevent them
- Coverage Contracts define expected completeness
- Enumeration must never be silently reduced

---

## Mandatory Rule

**If a Coverage Contract exists, you MUST satisfy it or explicitly explain why not.**

---

## Coverage Contract Example

```yaml
coverage_contract:
  enumeration_target: "deployment requirements"
  minimum_expected_items: 8
  required_groups:
    - build
    - release
    - rollback
```

---

## Checklist Item Example

```yaml
- id: DEPLOY-001
  description: Deployment procedure is documented
  status: pending
```

---

## Prohibited Content

- Execution metadata
- aiwf session identifiers
- Model names or timestamps

---

This document is intended to be used directly as an AI system prompt.

---
