# FlowMark Validator Specification (Latest)

Version: 0.1

This document defines parser and validator behavior for FlowMark tooling.

## Parsing Rules

- Scan Markdown top to bottom for fenced code blocks
- Recognize only the following info strings:
  - `yaml flowmark`
  - `yaml flowmark-section`
  - `yaml flowmark-item`
  - `yaml flowmark-registry`
- Parse YAML 1.2
- Ignore all other Markdown and code blocks

## Cardinality Rules

- Header: exactly 1
- Items: at least 1
- Registry: 0 or 1
- Sections: any count

## Validation Rules (MUST)

- Header exists and is unique
- Item exists (at least 1)
- Item IDs are globally unique
- Item status is one of: `todo`, `done`, `skipped`, `blocked`
- If registry exists, missing items are an error

## Validation Rules (SHOULD)

- Registry missing produces a warning
- Unexpected items produce warning in lenient, error in strict
- Duplicate section IDs produce a warning
- Unknown keys produce a warning

## Error and Warning Codes (v0.1)

Errors:

- `E_HEADER_MISSING`
- `E_HEADER_DUPLICATE`
- `E_ITEM_NONE`
- `E_YAML_PARSE`
- `E_SCHEMA_INVALID`
- `E_ITEM_ID_DUPLICATE`
- `E_ITEM_STATUS_INVALID`
- `E_COVERAGE_MISSING`
- `E_REGISTRY_DUPLICATE`
- `E_UNEXPECTED_ITEM` (strict)

Warnings:

- `W_REGISTRY_MISSING`
- `W_UNEXPECTED_ITEM` (lenient)
- `W_SECTION_ID_DUPLICATE`
- `W_UNKNOWN_KEYS`
- `W_REGISTRY_DUPLICATE` (lint)

## Strict vs Lenient

- Strict: unexpected items are errors
- Lenient: unexpected items are warnings

## Lint Behavior

- Lint focuses on SHOULD warnings
- YAML parse errors are reported
- Derived errors and warnings are suppressed when `E_YAML_PARSE` occurs
