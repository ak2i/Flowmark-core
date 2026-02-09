# FlowMark Specification (Latest)

Version: 0.1

FlowMark is a Markdown format that embeds YAML blocks for checklist-style coverage documents.

## Block Types

Recognized fenced YAML blocks use triple backticks and exact info strings:

- `yaml flowmark` (header, required, exactly once)
- `yaml flowmark-section` (section, optional, repeatable)
- `yaml flowmark-item` (item, required, repeatable)
- `yaml flowmark-registry` (registry, optional, 0 or 1)

All other Markdown and code blocks are ignored by tools.

## Header Block

Required keys:

- `id` (non-empty string)
- `title` (non-empty string)
- `version` (non-empty string)

Recommended keys:

- `status`: `draft` | `active` | `archived`
- `created_at`: `YYYY-MM-DD`
- `inputs`: list of `{ type, ref }`

## Section Block

Required keys:

- `id` (non-empty string)

Optional keys:

- `scope`: `in-scope` | `out-of-scope`
- `notes`: short string

## Item Block

Required keys:

- `id` (non-empty string)
- `status`: `todo` | `done` | `skipped` | `blocked`

Optional keys:

- `refs`: list of strings
- `batch`: string

## Registry Block

Required keys:

- `expected_items`: list of item ids

Registry is used for coverage validation to ensure no items are missing.

## Authoring Guidance

- Use stable, unique item IDs
- Use one item per `flowmark-item` block
- When registry is present, it should list every item ID

## Minimal Example

```markdown
```yaml flowmark
id: fm-example
title: Example
version: "0.1"
```

### Item
```yaml flowmark-item
id: ex-001
status: todo
```

```yaml flowmark-registry
expected_items:
  - ex-001
```
```
