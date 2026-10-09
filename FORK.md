# Sevengo / Beloil fork

Рабочая копия **не** в DevReport.

| | |
|---|---|
| Каталог | `D:\Beloil\vscode_abap_remote_fs` |
| origin | https://github.com/Sevengo/vscode_abap_remote_fs |
| upstream | https://github.com/marcellourbani/vscode_abap_remote_fs |
| ID в Cursor | `sevengo.vscode-abap-remote-fs` (не `murbani.*`) |

Версия форка: **2.11.1** (= upstream **2.11.0** + Cursor/sevengo overlay).

## Что своё (Cursor overlay)

- Publisher `sevengo` — Marketplace не перезапишет форк стоковым murbani.
- Cursor MCP: `listAbapFsToolsForMcp` регистрирует тулы из `package.json` / `toolRegistry`, когда `vscode.lm.tools` пустой.
- MCP HTTP не прыгает на 4848+ при `EADDRINUSE` — порт всегда 4847.
- autoStart в Cursor без Copilot QuickPick «Start MCP Anyway».
- Транспорт без QuickPick: `transportNumber` / `transportPreference`, `manage_transport_requests` (`set_default` / `get_default` / `clear_default` / `use_latest`).
- `getAbapFsExtension()` — единый lookup sevengo + legacy murbani.

## Что взято из апстрима 2.10–2.11

Полный upstream `2.11.0`: ESM + tsdown, Repository Comparison, SAP Data Workbook (export, named cells, per-system markers, cell settings LM tool), Laya/system-one models, skills visibility, code completion fixes, change-password fix, Vitest, и пр.

## Синхронизация

```text
git fetch upstream
git log HEAD..upstream/master --oneline
git merge upstream/master
# затем снова publisher sevengo + Cursor overlay
```

Сборка: `pnpm install` / `npm install`, затем `pnpm build` (или `npm run build`) и `vsce package`.
После установки удалить старый `murbani.vscode-abap-remote-fs-*`.
