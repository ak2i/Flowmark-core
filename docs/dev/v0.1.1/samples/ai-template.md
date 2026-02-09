```yaml flowmark
id: fm-template

title: Template Title
version: "0.1.1"
status: draft
created_at: 2026-02-09
contract:
  enumeration_target: "Describe what is being enumerated"
  required_groups:
    - "GroupA"
  min_total_items: 1
```

# Title

## Section Name
```yaml flowmark-section
id: section-id
scope: in-scope
notes: Short scope note.
```

### Checklist Item
```yaml flowmark-item
id: item-001
status: todo
refs:
  - doc://reference
batch: A
```

## Registry
```yaml flowmark-registry
expected_items:
  - item-001
```
