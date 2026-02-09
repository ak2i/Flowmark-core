```yaml
ideamark_version: 1
doc_id: "flowmark.ai-authoring-guide.v0.1.5"
doc_type: "guide"
status: "draft"
created_at: "2026-02-09"
updated_at: "2026-02-09"
lang: "en-US"

intent: >
  Provide an AI-oriented authoring guide for generating valid FlowMark documents,
  with explicit emphasis on Coverage Contracts to prevent omissions.
audience:
  - llm
  - ai_responder
  - ai_agent
```
# FlowMark AI Authoring Guide
## How to Generate Valid FlowMark Documents

This document explains **how an AI system should generate FlowMark documents**
that are expected to pass the FlowMark validator **and** preserve omission-detection capability.

This guide is written **for AI systems**, not for humans.

---

## 1. What is FlowMark

FlowMark is a **checklist-oriented document format** designed to make omissions
**detectable**, not to claim that omissions never occur.

A FlowMark document:

- Is written in Markdown
- Contains one or more **Fenced YAML blocks**
- Focuses on **enumeration, conditions, and verification**
- Is validated by a strict validator

Your goal is to produce a document that is:

- Structurally valid
- Explicit and exhaustive
- Reviewable by humans and other AI systems

---

## 2. Document Structure

A FlowMark document consists of:

1. Markdown headings and text
2. One or more Fenced YAML blocks
3. Coverage Contracts (when applicable)
4. Checklist items described in YAML

You MUST:

- Use fenced code blocks with `yaml`
- Keep YAML syntactically valid
- Avoid free-form execution metadata

---

## 3. Fenced YAML Basics

Example:

```yaml
doc_type: checklist
title: Example FlowMark
version: 0.1
```

Rules:

- YAML keys MUST be explicit
- Avoid ambiguous natural language inside YAML
- Do not invent unknown keys

---

## 4. Coverage Contract (Critical Concept)

FlowMark assumes that AI systems may omit items due to summarization or abstraction.
To counter this, FlowMark introduces the concept of a **Coverage Contract**.

A Coverage Contract defines the **expected shape of enumeration**
*before* checklist items are generated.

A Contract is:

- A declaration of *what must exist*
- A review artifact for humans or other AI
- A constraint for generation
- NOT executable
- NOT validated by the validator (v0.1.x)

---

### 4.1 When to Write a Coverage Contract

You SHOULD write a Coverage Contract when:

- The checklist may contain many items
- Omission would be costly
- The domain has known completeness constraints
- You are continuing an existing project

---

### 4.2 Typical Contract Fields

Example:

```yaml
coverage_contract:
  enumeration_target: "authentication-related requirements"
  minimum_expected_items: 12
  required_groups:
    - user_authentication
    - authorization
    - credential_storage
  exception_policy:
    description: >
      If a required group has zero items,
      the reason MUST be explicitly documented.
```

---

### 4.3 Contract-Driven Generation Rule (MANDATORY)

If a Coverage Contract exists, you MUST:

1. Read the Contract first
2. Generate checklist items to satisfy the Contract
3. Explicitly document deviations or shortages
4. Allow reviewers to detect omissions

You MUST NOT silently reduce or summarize items
below what the Contract implies.

---

## 5. Checklist Items

Checklist items represent **things that must not be forgotten**.

Each item SHOULD include:

- `id`: unique identifier
- `description`: what must be done or checked
- `status`: one of `pending`, `done`, `skipped`
- `conditions`: optional if/then logic

Example:

```yaml
- id: AUTH-001
  description: Authentication mechanism is defined
  status: pending
```

---

## 6. Conditions (If / Then)

FlowMark supports conditional logic.

Example:

```yaml
conditions:
  if: user_authentication_required == true
  then:
    - AUTH-001
    - AUTH-002
```

Conditions must be explicit and deterministic.

---

## 7. References and Evidence (Recommended)

You SHOULD include references when possible.

Examples:

```yaml
refs:
  - type: file
    path: docs/requirements.md
  - type: url
    value: https://example.com/spec
```

Evidence supports checklist items but is not validated.

---

## 8. What NOT to Include

You MUST NOT include:

- Execution metadata (timestamps, model names)
- aiwf session IDs
- spec stack information

These belong to the execution environment, not the document.

---

## 9. Validator Expectations

The validator checks:

- YAML validity
- Required fields
- Structural consistency

The validator does NOT guarantee completeness.
Completeness is assessed through Coverage Contracts and review.

---

## 10. Generation Strategy (Important)

When generating FlowMark:

1. Write or read the Coverage Contract
2. Enumerate all relevant items (do NOT summarize)
3. Prefer explicit lists over prose
4. Use conditions instead of vague language
5. Preserve all required fields

If many items exist, generate them all.

---

*End of AI Authoring Guide*
