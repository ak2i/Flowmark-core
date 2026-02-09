# FlowMark v0.1 CLI Design (Draft)

目的: 実装前の CLI 仕様を固定するための一時ドキュメント。最終版は `docs/design` に移す。

## CLI 名

- バイナリ名: `flowmark`
- npm パッケージ: `@flowmark/core-cli`

## 共通仕様

- 入力: ファイルパスまたは標準入力
- 入力優先順位: `<file>` 引数があればそれを優先、無ければ STDIN（`--stdin` は明示）
- 出力: JSON を stdout
- エラー/ログ: stderr
- デフォルトモード: lenient
- strict/lenient 切替: `--strict` / `--lenient`
- exit code:
  - `0`: errors=0, warnings=0
  - `1`: errors=0, warnings>0
  - `2`: errors>0
- JSON スキーマ（validate/lint 共通）:
  - `mode`: `strict` | `lenient`
  - `errors`: 配列（各要素に `code`, `message`, `location`）
  - `warnings`: 配列（各要素に `code`, `message`, `location`）
- `location` 形式:
  - `{ "start_line": number, "end_line": number }`
  - 取得できない場合は `null`

## コマンド一覧

### `flowmark validate`

目的: 仕様に沿ったバリデーション結果を返す。

エラー/警告コード（v0.1）:

- errors:
  - `E_HEADER_MISSING`
  - `E_HEADER_DUPLICATE`
  - `E_ITEM_NONE`
  - `E_YAML_PARSE`
  - `E_SCHEMA_INVALID`
  - `E_ITEM_ID_DUPLICATE`
  - `E_ITEM_STATUS_INVALID`
  - `E_COVERAGE_MISSING`
  - `E_REGISTRY_DUPLICATE`（registry 内重複をエラーにする場合）
  - `E_UNEXPECTED_ITEM`（strict モード）
- warnings:
  - `W_REGISTRY_MISSING`
  - `W_UNEXPECTED_ITEM`（lenient）
  - `W_SECTION_ID_DUPLICATE`
  - `W_UNKNOWN_KEYS`
  - `W_REGISTRY_DUPLICATE`（lint 時の registry 重複）

入力:
- `flowmark validate <file>`
- `cat file.md | flowmark validate`

出力（例）:

```json
{
  "mode": "lenient",
  "errors": [],
  "warnings": [
    {
      "code": "W_REGISTRY_MISSING",
      "message": "Registry block is missing.",
      "location": null
    }
  ]
}
```

### `flowmark parse`

目的: パース結果の構造を返す（検証は最小限）。

出力（例）:

```json
{
  "document": {
    "header": {
      "id": "fm-example",
      "title": "Example",
      "version": "0.1",
      "location": { "start_line": 1, "end_line": 6 }
    },
    "sections": [],
    "items": [
      {
        "id": "a-001",
        "status": "todo",
        "location": { "start_line": 12, "end_line": 16 }
      }
    ],
    "registry": null
  },
  "errors": []
}
```

### `flowmark lint`

目的: 推奨事項（SHOULD）中心の指摘を返す。

出力（例）:

```json
{
  "mode": "lenient",
  "errors": [],
  "warnings": [
    {
      "code": "W_SECTION_ID_DUPLICATE",
      "message": "Section id 'auth' is duplicated.",
      "location": {
        "start_line": 12,
        "end_line": 16
      }
    }
  ]
}
```

## オプション

- `--strict`: strict モード
- `--lenient`: lenient モード
- `--stdin`: 標準入力を明示（`<file>` があっても STDIN を優先）
- `--format json`: 予約（将来拡張用）
- `--version`
- `--help`

## 位置情報

- 可能な場合のみ `location` を付与
- `start_line` / `end_line` は 1-based
