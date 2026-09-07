import {
  pickLatestTrkorr,
  latestModifiableFromUserTransports,
  getDefaultTransport,
  setDefaultTransport,
  clearDefaultTransport,
  initDefaultTransportStore,
  runWithMcpTransport,
  getMcpTransportOverride
} from "./defaultTransport"

describe("pickLatestTrkorr", () => {
  it("picks the highest SAP number", () => {
    expect(
      pickLatestTrkorr([{ TRKORR: "DHVK900010" }, { TRKORR: "DHVK900099" }, { TRKORR: "DHVK900020" }])
    ).toBe("DHVK900099")
  })

  it("returns undefined for empty list", () => {
    expect(pickLatestTrkorr([])).toBeUndefined()
  })
})

describe("latestModifiableFromUserTransports", () => {
  it("reads modifiable workbench requests", () => {
    expect(
      latestModifiableFromUserTransports({
        workbench: [
          {
            modifiable: [{ "tm:number": "DHVK900001" }, { "tm:number": "DHVK900015" }]
          }
        ]
      })
    ).toBe("DHVK900015")
  })
})

describe("default transport store", () => {
  beforeEach(async () => {
    await clearDefaultTransport("dhv")
  })

  it("remembers a transport per connection", async () => {
    await setDefaultTransport("DHV", "dhvk900123")
    expect(getDefaultTransport("dhv")).toBe("DHVK900123")
  })

  it("clears the remembered transport", async () => {
    await setDefaultTransport("dhv", "DHVK900123")
    await clearDefaultTransport("dhv")
    expect(getDefaultTransport("dhv")).toBeUndefined()
  })
})

describe("runWithMcpTransport", () => {
  it("exposes override only inside the callback", async () => {
    expect(getMcpTransportOverride()).toBeUndefined()
    await runWithMcpTransport({ number: "DHVK1", remember: true }, async () => {
      expect(getMcpTransportOverride()?.number).toBe("DHVK1")
    })
    expect(getMcpTransportOverride()).toBeUndefined()
  })
})

describe("initDefaultTransportStore", () => {
  it("loads workspaceState into memory", () => {
    const ctx = {
      workspaceState: {
        get: jest.fn().mockReturnValue({ crd: "CRDK900001" }),
        update: jest.fn()
      }
    }
    initDefaultTransportStore(ctx as any)
    expect(getDefaultTransport("crd")).toBe("CRDK900001")
  })

  afterAll(() => {
    initDefaultTransportStore({
      workspaceState: { get: () => ({}), update: jest.fn() }
    } as any)
  })
})
