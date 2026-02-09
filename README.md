# FlowMark-core

Core CLI for FlowMark v0.1.

## Install (npm)

```bash
npm install @flowmark/core-cli
```

## Usage

```bash
flowmark validate path/to/file.md
cat path/to/file.md | flowmark validate
flowmark parse path/to/file.md
flowmark lint path/to/file.md
```

## Options

- `--strict` : strict mode
- `--lenient` : lenient mode (default)
- `--stdin` : read from STDIN even if file is provided
- `--version`
- `--help`

## Docker

Image: `ghcr.io/centimani/flowmark-core-cli`

```bash
docker run --rm -v "$(pwd)":/work -w /work ghcr.io/centimani/flowmark-core-cli validate path/to/file.md
cat path/to/file.md | docker run --rm -i -v "$(pwd)":/work -w /work ghcr.io/centimani/flowmark-core-cli validate --stdin
```

## Test Samples (MVP)

```bash
node bin/flowmark.js validate docs/dev/v0.1/samples/minimal.md
node bin/flowmark.js validate docs/dev/v0.1/samples/invalid-duplicate-header.md
node bin/flowmark.js validate docs/dev/v0.1/samples/invalid-no-item.md
node bin/flowmark.js validate docs/dev/v0.1/samples/invalid-status.md
node bin/flowmark.js validate docs/dev/v0.1/samples/invalid-coverage.md
node bin/flowmark.js validate docs/dev/v0.1/samples/invalid-yaml.md
node bin/flowmark.js validate docs/dev/v0.1/samples/lenient-unexpected.md
```

Note: If `E_YAML_PARSE` occurs, derived errors/warnings (e.g. `E_ITEM_NONE`, `W_REGISTRY_MISSING`) are suppressed.

## Strict vs Lenient (Example)

```bash
node bin/flowmark.js validate docs/dev/v0.1/samples/lenient-unexpected.md
node bin/flowmark.js validate --strict docs/dev/v0.1/samples/lenient-unexpected.md
```

In `lenient`, unexpected items are warnings (`W_UNEXPECTED_ITEM`).  
In `strict`, they become errors (`E_UNEXPECTED_ITEM`).

## Unknown Keys Warning

Unknown keys are allowed but produce `W_UNKNOWN_KEYS` warnings.

## npm pack (Publish Check)

```bash
npm pack
tar -tf flowmark-core-cli-0.1.0.tgz
```

Check that `bin/`, `src/`, `README.md`, and `LICENSE` are included.
