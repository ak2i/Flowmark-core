# FlowMark v0.1.5 — CLI Spec: `describe` Subcommand (Revised)

**Version:** 0.1.5  
**Last updated:** 2026-02-09

This specification defines the `describe` subcommand for FlowMark-core CLI.

FlowMark document format is unchanged in v0.1.5.
This version adds stable CLI outputs for AI-facing authoring guidance,
including both a **prompt-friendly distribution** and an **IdeaMark canonical source**.

---

## 1. Goals

- Provide stable, version-controlled authoring guidance via CLI output
- Make it easy to copy/paste a prompt-friendly guide into LLM prompts
- Allow humans / large LLMs to view the canonical IdeaMark source
- Keep implementation independent from aiwf

---

## 2. Command Overview

### 2.1 Syntax

```bash
flowmark describe <topic> [--lang <lang>] [--format <format>]
```

### 2.2 Topics (Normative)

v0.1.5 MUST support:

- `ai` : AI authoring guide (prompt-friendly distribution)
- `ai-source` : AI authoring guide (canonical IdeaMark source)

Other topics MAY be added in future versions (non-normative):

- `format`
- `validator`
- `examples`

---

## 3. Language Selection

- `--lang` default MUST be `en`
- v0.1.5 MUST support `--lang en`
- Other languages MAY be added later (e.g., `ja`)

Recommended file naming uses language suffixes:

- `.en` for English
- `.ja` for Japanese (future)

---

## 4. Output Format

- `--format` default MUST be `md`
- v0.1.5 MUST support Markdown output (`md`)

Outputs MUST be suitable for their intended audience:

- `topic=ai` MUST be prompt-friendly
- `topic=ai-source` MUST preserve the full IdeaMark document

---

## 5. Canonical File Locations (Normative)

For `lang=en`, FlowMark-core MUST read from these fixed paths:

### 5.1 topic=ai (distribution)

- `docs/guides/flowmark-ai-authoring-guide.en.md`

### 5.2 topic=ai-source (IdeaMark canonical source)

- `docs/guides/flowmark-ai-authoring-guide.en.ideamark.md`

The repo MUST keep both files.

---

## 6. Behavior

- On success, the command MUST print the selected document to STDOUT.
- Exit code MUST be `0` on success.
- If a topic/lang is unsupported, exit code MUST be non-zero and a helpful error MUST be printed to STDERR.

---

## 7. Non-goals

`describe` MUST NOT:

- Call any network resources
- Parse or validate FlowMark documents
- Generate content dynamically

It only outputs version-controlled documentation.

---

## 8. Compatibility

- Existing commands and validators are unchanged.
- FlowMark documents created prior to v0.1.5 remain valid.

---
