import * as vscode from "vscode"

export const ABAPFS_PUBLISHER = "sevengo"
export const ABAPFS_NAME = "vscode-abap-remote-fs"
export const EXTENSION_ID = `${ABAPFS_PUBLISHER}.${ABAPFS_NAME}`
export const LEGACY_EXTENSION_ID = "murbani.vscode-abap-remote-fs"

export function getAbapFsExtension(): vscode.Extension<unknown> | undefined {
  return (
    vscode.extensions.getExtension(EXTENSION_ID) ??
    vscode.extensions.getExtension(LEGACY_EXTENSION_ID) ??
    vscode.extensions.all.find(e => e.packageJSON?.name === ABAPFS_NAME)
  )
}
