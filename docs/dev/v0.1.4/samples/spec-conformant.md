```yaml flowmark
id: fm-spec-conformant

title: Spec Conformant Example
version: "0.1.4"
status: draft
created_at: 2026-02-09
inputs:
  - type: url
    ref: "https://example.com/spec"
contract:
  enumeration_target: "Sample scope"
  required_groups:
    - "auth"
  min_total_items: 2
```

# Spec Conformant Example

## Section A
```yaml flowmark-section
id: section-a
scope: in-scope
notes: Demonstration section.
```

### Item A-1
```yaml flowmark-item
id: a-001
status: todo
refs:
  - doc://example
batch: A
evidence:
  - "log://run/123"
```

### Item A-2
```yaml flowmark-item
id: a-002
status: done
```

## Registry
```yaml flowmark-registry
expected_items:
  - a-001
  - a-002
```
