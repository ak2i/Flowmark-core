# FlowMark Specification (Latest)

Version: 0.1.4

FlowMark is a Markdown format that embeds YAML blocks for checklist-style coverage documents.

## Block Types

Recognized fenced YAML blocks use triple backticks and exact info strings:

- `yaml flowmark` (header, required, exactly once)
- `yaml flowmark-section` (section, optional, repeatable)
- `yaml flowmark-item` (item, required, repeatable)
- `yaml flowmark-registry` (registry, optional, 0 or 1)

All other Markdown and code blocks are ignored by tools.

## Relationship to aiwf (v0.1.3)

- FlowMark does not depend on aiwf for validity.
- aiwf MAY be used to generate, validate, or fix FlowMark documents.
- aiwf is responsible for execution, logging, and reproducibility.
- FlowMark defines expectations and structure only.

FlowMark MUST NOT require aiwf-specific fields inside FlowMark documents.

## Spec Versioning and Application Order (v0.1.3)

FlowMark specifications in the v0.1.x series are **incremental**.

Normative guidance:

- `v0.1` MUST be treated as the base specification.
- Later `v0.1.x` specifications MUST be applied in ascending order.
- Later specifications extend or override earlier ones unless explicitly stated.

When instructing AI systems, the **spec stack MUST be made explicit**.
FlowMark documents themselves do **not** contain spec stack information.

## References, Evidence, Provenance (v0.1.4)

Non-normative guidance:

- Documents SHOULD list input references (e.g., `inputs`, `refs`).
- Items MAY include `evidence` (informational only).
- Provenance SHOULD be stored in aiwf sessions; FlowMark remains execution-agnostic.

## Header Block

Required keys:

- `id` (non-empty string)
- `title` (non-empty string)
- `version` (non-empty string)

Recommended keys:

- `status`: `draft` | `active` | `archived`
- `created_at`: `YYYY-MM-DD`
- `inputs`: list of `{ type, ref }`
- `contract` (optional, v0.1.1)

### Coverage Contract (v0.1.1)

Contract is optional and **not validated** in v0.1.x. It exists for authoring and review.

```yaml
contract:
  enumeration_target: string
  required_groups: [string, ...]
  min_total_items: number
  min_items_by_group:
    GroupName: number
  anti_omission_rules: [string, ...]
  exception_policy:
    <key>: string
```

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
- `evidence`: list or string (informational)

## Registry Block

Required keys:

- `expected_items`: list of item ids

Registry is used for coverage validation to ensure no items are missing.

## Authoring Guidance

- Use stable, unique item IDs
- Use one item per `flowmark-item` block
- When registry is present, it should list every item ID

## Minimal Example (v0.1.4)

```markdown
```yaml flowmark
id: fm-example
title: Example
version: "0.1.4"
contract:
  enumeration_target: "Example scope"
inputs:
  - type: repo
    ref: "/path/to/repo"
```

### Item
```yaml flowmark-item
id: ex-001
status: todo
refs:
  - doc://spec
```

```yaml flowmark-registry
expected_items:
  - ex-001
```
```
