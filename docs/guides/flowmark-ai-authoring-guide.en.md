# FlowMark AI Authoring Guide (EN)

This guide is designed to be pasted into LLM prompts. It summarizes how to author FlowMark documents without omitting items.

## Purpose

FlowMark is a coverage document format. Its goal is **not** to prevent omission, but to make omissions **detectable**.

## Output Format (Hard Rules)

FlowMark documents are Markdown with fenced YAML blocks. Only these YAML blocks are parsed:

- `yaml flowmark` (header, exactly once)
- `yaml flowmark-section` (optional)
- `yaml flowmark-item` (repeatable, required)
- `yaml flowmark-registry` (optional, recommended)

Everything outside YAML is free text and ignored by tools.

## Coverage Contract (Recommended)

Use `contract` in the header to declare expectations. Contract is **not validated** in v0.1.x but helps humans and AIs review omissions.

```yaml
contract:
  enumeration_target: "..."
  required_groups: ["..."]
  min_total_items: 5
  min_items_by_group:
    GroupA: 2
  anti_omission_rules: ["..."]
  exception_policy:
    note: "..."
```

## Registry (Required for Coverage)

- Decide the full list of item IDs first
- Write `flowmark-registry` with `expected_items`
- Ensure **every** item ID appears as a `flowmark-item`

## Item Rules

Each checklist requirement should be:

1. A short Markdown heading
2. Immediately followed by **one** `flowmark-item` block

Example:

```yaml
```yaml flowmark-item
id: ex-001
status: todo
```
```

## Validation Checklist

Before finishing:

- Exactly one header
- At least one item
- All item IDs are unique
- Status is one of: `todo`, `done`, `skipped`, `blocked`
- Registry includes all item IDs

