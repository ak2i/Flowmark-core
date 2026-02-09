#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parseFlowmark, toDocument } = require('../src/parser/flowmark');
const { validateDocument, lintDocument } = require('../src/validator/validate');

function printHelp() {
  const msg = `FlowMark CLI (v0.1)

Usage:
  flowmark validate <file>
  flowmark parse <file>
  flowmark lint <file>
  cat file.md | flowmark validate

Options:
  --strict      Use strict mode
  --lenient     Use lenient mode (default)
  --stdin       Read from STDIN even if a file is provided
  --version     Print version
  --help        Show help
`;
  process.stdout.write(msg);
}

function readVersion() {
  const pkgPath = path.resolve(__dirname, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  return pkg.version || '0.0.0';
}

function parseArgs(argv) {
  const opts = {
    mode: 'lenient',
    stdin: false,
    help: false,
    version: false
  };
  let command = null;
  let file = null;

  for (const arg of argv) {
    if (arg === '--help' || arg === '-h') {
      opts.help = true;
    } else if (arg === '--version') {
      opts.version = true;
    } else if (arg === '--strict') {
      opts.mode = 'strict';
    } else if (arg === '--lenient') {
      opts.mode = 'lenient';
    } else if (arg === '--stdin') {
      opts.stdin = true;
    } else if (!command) {
      command = arg;
    } else if (!file) {
      file = arg;
    } else {
      // ignore extra args for now
    }
  }

  return { command, file, opts };
}

function readInput({ file, stdin }) {
  if (stdin) {
    return fs.readFileSync(0, 'utf8');
  }
  if (file) {
    return fs.readFileSync(file, 'utf8');
  }
  if (process.stdin.isTTY) {
    throw new Error('No input provided. Pass a file or pipe STDIN.');
  }
  return fs.readFileSync(0, 'utf8');
}

function run() {
  const { command, file, opts } = parseArgs(process.argv.slice(2));

  if (opts.version) {
    process.stdout.write(readVersion() + '\n');
    return process.exit(0);
  }

  if (opts.help || !command) {
    printHelp();
    return process.exit(opts.help ? 0 : 2);
  }

  if (command !== 'validate') {
    if (command !== 'parse' && command !== 'lint') {
      process.stderr.write(`Unknown command: ${command}\n`);
      printHelp();
      return process.exit(2);
    }
  }

  let input;
  try {
    input = readInput({ file, stdin: opts.stdin });
  } catch (err) {
    process.stderr.write(String(err.message || err) + '\n');
    return process.exit(2);
  }

  const parsed = parseFlowmark(input);

  if (command === 'parse') {
    const output = {
      document: toDocument(parsed),
      errors: parsed.errors || []
    };
    process.stdout.write(JSON.stringify(output, null, 2) + '\n');
    return process.exit(output.errors.length > 0 ? 2 : 0);
  }

  if (command === 'lint') {
    const result = lintDocument(parsed, { mode: opts.mode });
    const output = {
      mode: opts.mode,
      errors: result.errors,
      warnings: result.warnings
    };
    process.stdout.write(JSON.stringify(output, null, 2) + '\n');
    if (output.errors.length > 0) return process.exit(2);
    if (output.warnings.length > 0) return process.exit(1);
    return process.exit(0);
  }

  const result = validateDocument(parsed, { mode: opts.mode });
  const output = {
    mode: opts.mode,
    errors: result.errors,
    warnings: result.warnings
  };
  process.stdout.write(JSON.stringify(output, null, 2) + '\n');

  if (output.errors.length > 0) {
    return process.exit(2);
  }
  if (output.warnings.length > 0) {
    return process.exit(1);
  }
  return process.exit(0);
}

run();
