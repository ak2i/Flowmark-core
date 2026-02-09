const ALLOWED_STATUS = new Set(['todo', 'done', 'skipped', 'blocked']);

const ALLOWED_KEYS = {
  header: new Set(['id', 'title', 'version', 'status', 'created_at', 'inputs']),
  section: new Set(['id', 'scope', 'notes']),
  item: new Set(['id', 'status', 'refs', 'batch']),
  registry: new Set(['expected_items'])
};

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function addSchemaError(errors, message, location) {
  errors.push({
    code: 'E_SCHEMA_INVALID',
    message,
    location: location || null
  });
}

function addUnknownKeyWarnings(kind, entry, warnings) {
  if (!entry || !entry.data || typeof entry.data !== 'object' || Array.isArray(entry.data)) {
    return;
  }
  const allowed = ALLOWED_KEYS[kind];
  if (!allowed) return;
  const unknown = Object.keys(entry.data).filter((k) => !allowed.has(k));
  if (unknown.length === 0) return;
  warnings.push({
    code: 'W_UNKNOWN_KEYS',
    message: `Unknown keys in ${kind}: ${unknown.join(', ')}`,
    location: entry.location || null
  });
}

function validateDocument(parsed, { mode }) {
  const errors = [...(parsed.errors || [])];
  const warnings = [];
  const hasParseError = errors.some((e) => e && e.code === 'E_YAML_PARSE');

  if (parsed.headers.length === 0) {
    errors.push({
      code: 'E_HEADER_MISSING',
      message: 'Header block is missing.',
      location: null
    });
  } else if (parsed.headers.length > 1) {
    for (let i = 1; i < parsed.headers.length; i++) {
      errors.push({
        code: 'E_HEADER_DUPLICATE',
        message: 'Header block is duplicated.',
        location: parsed.headers[i].location || null
      });
    }
  }

  if (parsed.headers.length > 0) {
    const header = parsed.headers[0];
    const data = header.data;
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      addSchemaError(errors, 'Header block must be a mapping.', header.location);
    } else {
      if (!isNonEmptyString(data.id)) {
        addSchemaError(errors, 'Header id is required.', header.location);
      }
      if (!isNonEmptyString(data.title)) {
        addSchemaError(errors, 'Header title is required.', header.location);
      }
      if (!isNonEmptyString(data.version)) {
        addSchemaError(errors, 'Header version must be a non-empty string.', header.location);
      }
    }
  }

  if (!hasParseError && parsed.items.length === 0) {
    errors.push({
      code: 'E_ITEM_NONE',
      message: 'No item blocks found.',
      location: null
    });
  }

  const itemIds = new Set();
  for (const item of parsed.items) {
    if (hasParseError) break;
    const data = item.data;
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      addSchemaError(errors, 'Item block must be a mapping.', item.location);
      continue;
    }
    const id = data.id;
    const status = data.status;

    if (isNonEmptyString(id)) {
      if (itemIds.has(id)) {
        errors.push({
          code: 'E_ITEM_ID_DUPLICATE',
          message: `Duplicate item id: ${id}`,
          location: item.location || null
        });
      } else {
        itemIds.add(id);
      }
    } else {
      addSchemaError(errors, 'Item id is required.', item.location);
    }

    if (!isNonEmptyString(status)) {
      addSchemaError(errors, 'Item status is required.', item.location);
    } else if (!ALLOWED_STATUS.has(status)) {
      errors.push({
        code: 'E_ITEM_STATUS_INVALID',
        message: `Invalid item status: ${status}`,
        location: item.location || null
      });
    }

    addUnknownKeyWarnings('item', item, warnings);
  }

  for (const section of parsed.sections) {
    addUnknownKeyWarnings('section', section, warnings);
  }
  for (const header of parsed.headers) {
    addUnknownKeyWarnings('header', header, warnings);
  }

  if (!hasParseError && parsed.registries.length === 0) {
    warnings.push({
      code: 'W_REGISTRY_MISSING',
      message: 'Registry block is missing.',
      location: null
    });
  } else if (parsed.registries.length > 1) {
    for (let i = 1; i < parsed.registries.length; i++) {
      errors.push({
        code: 'E_REGISTRY_DUPLICATE',
        message: 'Registry block is duplicated.',
        location: parsed.registries[i].location || null
      });
    }
  }

  if (!hasParseError && parsed.registries.length > 0) {
    const registry = parsed.registries[0];
    addUnknownKeyWarnings('registry', registry, warnings);

    const expected = registry.data && typeof registry.data === 'object' && !Array.isArray(registry.data)
      ? registry.data.expected_items
      : null;

    if (!Array.isArray(expected)) {
      addSchemaError(errors, 'Registry expected_items must be an array.', registry.location);
    } else {
      const expectedSet = new Set();
      const duplicates = new Set();
      for (const id of expected) {
        if (expectedSet.has(id)) duplicates.add(id);
        expectedSet.add(id);
      }
      if (duplicates.size > 0) {
        errors.push({
          code: 'E_REGISTRY_DUPLICATE',
          message: `Duplicate registry ids: ${Array.from(duplicates).join(', ')}`,
          location: registry.location || null
        });
      }

      const missing = Array.from(expectedSet).filter((id) => !itemIds.has(id));
      const unexpected = Array.from(itemIds).filter((id) => !expectedSet.has(id));

      if (missing.length > 0) {
        errors.push({
          code: 'E_COVERAGE_MISSING',
          message: `Missing items: ${missing.join(', ')}`,
          location: registry.location || null
        });
      }

      if (unexpected.length > 0) {
        if (mode === 'strict') {
          errors.push({
            code: 'E_UNEXPECTED_ITEM',
            message: `Unexpected items: ${unexpected.join(', ')}`,
            location: registry.location || null
          });
        } else {
          warnings.push({
            code: 'W_UNEXPECTED_ITEM',
            message: `Unexpected items: ${unexpected.join(', ')}`,
            location: registry.location || null
          });
        }
      }
    }
  }

  const sectionIds = new Set();
  for (const section of parsed.sections) {
    const data = section.data;
    const id = data && typeof data === 'object' && !Array.isArray(data) ? data.id : null;
    if (typeof id === 'string' && id.trim() !== '') {
      if (sectionIds.has(id)) {
        warnings.push({
          code: 'W_SECTION_ID_DUPLICATE',
          message: `Duplicate section id: ${id}`,
          location: section.location || null
        });
      } else {
        sectionIds.add(id);
      }
    }
  }

  return { errors, warnings };
}

function lintDocument(parsed, { mode }) {
  const errors = [...(parsed.errors || [])];
  const warnings = [];
  const hasParseError = errors.some((e) => e && e.code === 'E_YAML_PARSE');
  if (hasParseError) {
    return { errors, warnings };
  }

  const itemIds = new Set();
  for (const item of parsed.items) {
    const data = item.data;
    if (data && typeof data === 'object' && !Array.isArray(data) && isNonEmptyString(data.id)) {
      itemIds.add(data.id);
    }
    addUnknownKeyWarnings('item', item, warnings);
  }
  for (const section of parsed.sections) {
    addUnknownKeyWarnings('section', section, warnings);
  }
  for (const header of parsed.headers) {
    addUnknownKeyWarnings('header', header, warnings);
  }

  if (parsed.registries.length === 0) {
    warnings.push({
      code: 'W_REGISTRY_MISSING',
      message: 'Registry block is missing.',
      location: null
    });
  }

  if (parsed.registries.length > 0) {
    const registry = parsed.registries[0];
    addUnknownKeyWarnings('registry', registry, warnings);
    const expected = registry.data && typeof registry.data === 'object' && !Array.isArray(registry.data)
      ? registry.data.expected_items
      : null;
    if (Array.isArray(expected)) {
      const expectedSet = new Set();
      const duplicates = new Set();
      for (const id of expected) {
        if (expectedSet.has(id)) duplicates.add(id);
        expectedSet.add(id);
      }
      if (duplicates.size > 0) {
        warnings.push({
          code: 'W_REGISTRY_DUPLICATE',
          message: `Duplicate registry ids: ${Array.from(duplicates).join(', ')}`,
          location: registry.location || null
        });
      }
      const unexpected = Array.from(itemIds).filter((id) => !expectedSet.has(id));
      if (unexpected.length > 0) {
        warnings.push({
          code: 'W_UNEXPECTED_ITEM',
          message: `Unexpected items: ${unexpected.join(', ')}`,
          location: registry.location || null
        });
      }
    }
  }

  const sectionIds = new Set();
  for (const section of parsed.sections) {
    const data = section.data;
    const id = data && typeof data === 'object' && !Array.isArray(data) ? data.id : null;
    if (isNonEmptyString(id)) {
      if (sectionIds.has(id)) {
        warnings.push({
          code: 'W_SECTION_ID_DUPLICATE',
          message: `Duplicate section id: ${id}`,
          location: section.location || null
        });
      } else {
        sectionIds.add(id);
      }
    }
  }

  return { errors, warnings };
}

module.exports = { validateDocument, lintDocument };
