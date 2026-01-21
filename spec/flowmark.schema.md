# FlowMark Schema Specification

Version: 0.1.0 (Draft)

## Overview

This document defines the schema and format for FlowMark files - engineering checklists designed for human-AI collaboration.

## Design Principles

1. **Completeness**: All necessary steps and conditions should be explicitly represented
2. **Conditional Flow**: Support for branching logic based on context
3. **Token-Aware**: Optimized for AI parsing and generation

## File Format

FlowMark files use Markdown format with structured metadata and special syntax for conditional logic.

### Basic Structure

```markdown
# Checklist Title

## Metadata
- Type: [checklist|workflow|template]
- Version: X.Y.Z
- Tags: [tag1, tag2, ...]

## Tasks

- [ ] Task 1: Description
- [ ] Task 2: Description
  - Condition: [when to perform this task]
  - [ ] Subtask 2.1
  - [ ] Subtask 2.2
- [ ] Task 3: Description
```

### Conditional Logic

```markdown
- [ ] Task: Description
  - IF: [condition]
  - THEN: [action or subtasks]
  - ELSE: [alternative action]
```

### Token Optimization

- Use concise, clear language
- Avoid redundant information
- Structure for easy parsing
- Support incremental completion tracking

## Validation Rules

1. All tasks must have clear descriptions
2. Conditions must be evaluable
3. Nested tasks must maintain hierarchy
4. Checklist must have a title

## Examples

See the `examples/` directory for sample FlowMark files.

## Future Considerations

- Support for parallel execution paths
- Integration with development tools
- Automated validation and linting
- Version control integration
- Progress tracking and analytics
