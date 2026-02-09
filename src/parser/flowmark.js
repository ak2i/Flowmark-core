const YAML = require('yaml');
const { scanFencedBlocks } = require('./scan');

const INFO_MAP = {
  'yaml flowmark': 'header',
  'yaml flowmark-section': 'section',
  'yaml flowmark-item': 'item',
  'yaml flowmark-registry': 'registry'
};

function parseYamlBlock(block) {
  const doc = YAML.parseDocument(block.content, { prettyErrors: false });
  if (doc.errors && doc.errors.length > 0) {
    const err = doc.errors[0];
    let location = null;
    if (err.linePos && err.linePos.start && typeof err.linePos.start.line === 'number') {
      const base = block.startLine + 1;
      const start = err.linePos.start.line;
      const end = err.linePos.end && typeof err.linePos.end.line === 'number'
        ? err.linePos.end.line
        : start;
      location = {
        start_line: base + start - 1,
        end_line: base + end - 1
      };
    }
    return {
      error: {
        code: 'E_YAML_PARSE',
        message: `YAML parse error: ${err.message}`,
        location
      }
    };
  }

  return { data: doc.toJSON() };
}

function parseFlowmark(text) {
  const blocks = scanFencedBlocks(text);
  const result = {
    headers: [],
    sections: [],
    items: [],
    registries: [],
    errors: []
  };

  for (const block of blocks) {
    const type = INFO_MAP[block.info];
    if (!type) {
      continue;
    }

    const parsed = parseYamlBlock(block);
    if (parsed.error) {
      result.errors.push(parsed.error);
      continue;
    }

    const entry = {
      data: parsed.data,
      location: { start_line: block.startLine, end_line: block.endLine }
    };

    if (type === 'header') result.headers.push(entry);
    if (type === 'section') result.sections.push(entry);
    if (type === 'item') result.items.push(entry);
    if (type === 'registry') result.registries.push(entry);
  }

  return result;
}

function toDocument(parsed) {
  const header = parsed.headers[0]
    ? { ...parsed.headers[0].data, location: parsed.headers[0].location }
    : null;
  const sections = parsed.sections.map((s) => ({ ...s.data, location: s.location }));
  const items = parsed.items.map((i) => ({ ...i.data, location: i.location }));
  const registry = parsed.registries[0]
    ? { ...parsed.registries[0].data, location: parsed.registries[0].location }
    : null;

  return { header, sections, items, registry };
}

module.exports = { parseFlowmark, toDocument };
