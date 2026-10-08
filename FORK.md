# Sevengo / Beloil fork

Рабочая копия **не** в DevReport.

| | |
|---|---|
| Каталог | `D:\Beloil\vscode_abap_remote_fs` |
| origin | https://github.com/Sevengo/vscode_abap_remote_fs |
| upstream | https://github.com/marcellourbani/vscode_abap_remote_fs |
| ID в Cursor | `sevengo.vscode-abap-remote-fs` (не `murbani.*`, иначе Marketplace предложит стоковый апдейт) |

Версия форка: **2.9.1** (выбранные патчи апстрима 2.9.0/2.9.1 + патчи Cursor).

## Что своё

- Publisher `sevengo` — Cursor не предлагает обновить форк стоковым `murbani.vscode-abap-remote-fs`.
- Cursor: не показывать Copilot QuickPick «Start MCP Anyway» — иначе `autoStart` сбрасывается и порт 4847 пустой.
- MCP HTTP не прыгает на 4848+ при `EADDRINUSE` — в `.cursor/mcp.json` всегда 4847.
- MCP в Cursor: тулы из `package.json` / `toolRegistry`, не из пустого `vscode.lm.tools` (иначе остаются только `replace_string_in_abap_object` и `get_abap_diagnostics`).
- Транспорт без QuickPick: `transportNumber` / `transportPreference`, `manage_transport_requests` (`set_default`, `get_default`, `clear_default`, `use_latest`).

Не тащим в Cursor: Copilot-субагенты, heartbeat, SAP UI Testing, skills UI.

## Что взято из апстрима 2.9.x

- Production SQL permission (`abapfs.productionSqlControl`) — без подтверждения на каждый SELECT в прод.
- XML-редактор для доменов и table types.
- Исправление ABAP code completion (include context URL).

## Синхронизация с апстримом

```text
git fetch upstream
git log HEAD..upstream/master --oneline
```

Забирать только MCP / ADT / connect. Перед патчем — сверка с `upstream/master`, не слепой overlay всей старой папки из DevReport (там ещё старые имена тулов до 2.8.8).

Сборка VSIX: `npm install`, затем `.\node_modules\.bin\vsce.cmd package --no-dependencies --allow-missing-repository`.
После установки удалить старый `murbani.vscode-abap-remote-fs-*`, иначе два плагина активируются вместе.
