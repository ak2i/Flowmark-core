```yaml flowmark
id: fm-template
title: Template Title
version: "0.1"
status: draft
created_at: 2026-02-08
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
