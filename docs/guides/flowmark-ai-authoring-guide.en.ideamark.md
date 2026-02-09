```yaml
ideamark_version: 1
doc_id: "flowmark.ai.authoring.guide.en"
doc_type: "guide"
status: "draft"
created_at: "2026-02-09"
updated_at: "2026-02-09"
lang: "en-US"
```

# FlowMark AI Authoring Guide (Canonical, EN)

This is the canonical IdeaMark source for the AI authoring guide.
It retains rationale and intent that may be trimmed from the prompt-friendly version.

## 1. Intent

FlowMark is designed to make omissions **detectable**. The registry is the enforcement mechanism.

## 2. Contract

Use `contract` to express expectations (enumeration target, required groups, minimum counts).
Contract is **not validated** in v0.1.x, but is critical for review.

## 3. Registry

Registry MUST list all item IDs. Any missing ID is a validation error.

## 4. Authoring Pattern

- One item per `flowmark-item`
- Stable IDs
- Use `refs` for inputs and `evidence` for optional proof

## 5. Non-goals

FlowMark is not an execution DSL. It does not encode dependencies or branching.
