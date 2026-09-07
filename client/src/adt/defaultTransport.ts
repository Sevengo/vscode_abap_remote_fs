/**
 * Default transport for MCP / headless ABAP writes.
 * Per SAP connection (e.g. dhv), remembered in workspaceState.
 */

import { AsyncLocalStorage } from "async_hooks"
import type { ExtensionContext } from "vscode"

const STATE_KEY = "abapfs.mcpDefaultTransport"

export interface McpTransportOverride {
  /** Explicit TRKORR for this write */
  number?: string
  /** Pick the newest TR from ADT's modifiable list */
  useLatest?: boolean
  /** Persist the resolved TR as the connection default */
  remember?: boolean
}

const als = new AsyncLocalStorage<McpTransportOverride>()

let memory: Record<string, string> = {}
let context: ExtensionContext | undefined

export function initDefaultTransportStore(ctx: ExtensionContext): void {
  context = ctx
  memory = { ...(ctx.workspaceState.get<Record<string, string>>(STATE_KEY) ?? {}) }
}

export function normalizeConnId(connectionId: string): string {
  return connectionId.trim().toLowerCase()
}

export function getDefaultTransport(connectionId: string): string | undefined {
  const id = normalizeConnId(connectionId)
  const stored = memory[id]?.trim()
  return stored || undefined
}

export async function setDefaultTransport(connectionId: string, transportNumber: string): Promise<string> {
  const id = normalizeConnId(connectionId)
  const number = transportNumber.trim().toUpperCase()
  if (!number) {
    throw new Error("transportNumber is required to set the default transport")
  }
  memory[id] = number
  await context?.workspaceState.update(STATE_KEY, { ...memory })
  return number
}

export async function clearDefaultTransport(connectionId: string): Promise<void> {
  const id = normalizeConnId(connectionId)
  delete memory[id]
  await context?.workspaceState.update(STATE_KEY, { ...memory })
}

export function getMcpTransportOverride(): McpTransportOverride | undefined {
  return als.getStore()
}

export function runWithMcpTransport<T>(
  override: McpTransportOverride,
  fn: () => Promise<T>
): Promise<T> {
  return als.run(override, fn)
}

export function pickLatestTrkorr(transports: Array<{ TRKORR?: string }>): string | undefined {
  const numbers = transports.map(t => t.TRKORR?.trim()).filter((n): n is string => !!n)
  if (numbers.length === 0) return undefined
  return [...numbers].sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))[0]
}

/** Extract TRKORR list from ADT user-transport dump (readTransports). */
export function latestModifiableFromUserTransports(transports: unknown): string | undefined {
  const numbers: string[] = []
  const root = transports as Record<string, any> | undefined
  if (!root) return undefined
  for (const category of ["workbench", "customizing", "transportofcopies"]) {
    for (const target of root[category] || []) {
      for (const t of target.modifiable || []) {
        const n = t["tm:number"]
        if (typeof n === "string" && n.trim()) numbers.push(n.trim())
      }
    }
  }
  return pickLatestTrkorr(numbers.map(TRKORR => ({ TRKORR })))
}
