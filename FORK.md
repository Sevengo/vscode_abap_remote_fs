# Sevengo / Beloil fork

Рабочая копия **не** в DevReport.

| | |
|---|---|
| Каталог | `D:\Beloil\vscode_abap_remote_fs` |
| origin | https://github.com/Sevengo/vscode_abap_remote_fs |
| upstream | https://github.com/marcellourbani/vscode_abap_remote_fs |

Версия форка: **2.8.10** (база апстрима **2.8.9** + патчи Cursor).

## Что своё

- Cursor: не показывать Copilot QuickPick «Start MCP Anyway» — иначе `autoStart` сбрасывается и порт 4847 пустой.
- MCP HTTP не прыгает на 4848+ при `EADDRINUSE` — в `.cursor/mcp.json` всегда 4847.
- Транспорт без QuickPick: `transportNumber` / `transportPreference`, `manage_transport_requests` (`set_default`, `get_default`, `clear_default`, `use_latest`).

Не тащим в Cursor: Copilot-субагенты, heartbeat, SAP UI Testing.

## Синхронизация с апстримом

```text
git fetch upstream
git log HEAD..upstream/master --oneline
```

Забирать только MCP / ADT / connect. Перед патчем — сверка с `upstream/master`, не слепой overlay всей старой папки из DevReport (там ещё старые имена тулов до 2.8.8).

Сборка VSIX: `npm install`, затем `.\node_modules\.bin\vsce.cmd package --no-dependencies --allow-missing-repository`.
