# FlowMark Params: normalize (EN)

Use this as a prompt add-on for mechanical normalization only.

## Required Header Keys

- `id` (string, non-empty)
- `version` (string, non-empty)
- `title` (string, non-empty)

Optional header keys: `doc_type`, `status`, `created_at`, `inputs`, `contract`.

## Item Keys (Canonical)

Required:
- `id` (string, non-empty)
- `status` (one of `todo`, `doing`, `done`, `blocked`, `skipped`)
- `description` (string)

Alias:
- `requirement` may be used instead of `description` (treat as identical).

Recommended:
- `group` (short label aligned with Coverage Contract `required_groups`).

## Unknown Keys Policy

- Extension keys are allowed if they start with `x_` or `x-`.
- Other unknown keys should be avoided.

## Normalization Rules (Mechanical Only)

When asked to "fix to pass validator":

1. Add missing required keys (header/item) without changing meaning.
2. If `requirement` is present and `description` is missing, treat `requirement` as `description`.
3. Do **not** reduce enumeration or remove items.
4. Do **not** rewrite large sections; only minimal edits to pass validation.
