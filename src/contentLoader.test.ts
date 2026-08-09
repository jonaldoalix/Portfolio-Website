import { beforeEach, describe, expect, it, vi } from "vitest";
import { getDoc } from "firebase/firestore";
import { defaultContent } from "./content";
import {
  clearContentCache,
  CONTENT_TTL_MS,
  loadPortfolioContent,
} from "./contentLoader";

vi.mock("./firebase", async () => {
  const actual = await vi.importActual<typeof import("./firebase")>("./firebase");
  return {
    ...actual,
    isFirebaseConfigured: () => true,
    getDb: () => ({}),
  };
});

describe("contentLoader", () => {
  beforeEach(() => {
    clearContentCache();
    window.history.replaceState({}, "", "/");
    vi.mocked(getDoc).mockReset();
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => false,
      data: () => undefined,
    } as never);
  });

  it("returns networked content and caches it", async () => {
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 3 }),
    } as never);

    const loaded = await loadPortfolioContent();
    expect(loaded.source).toBe("network");
    expect(loaded.content.version).toBe(3);

    vi.mocked(getDoc).mockClear();
    const cached = await loadPortfolioContent();
    expect(cached.source).toBe("cache");
    expect(cached.content.version).toBe(3);
    expect(getDoc).not.toHaveBeenCalled();
  });

  it("falls back to bundled content when Firestore is unavailable", async () => {
    vi.mocked(getDoc).mockRejectedValue(new Error("offline"));
    const loaded = await loadPortfolioContent();
    expect(loaded.source).toBe("fallback");
    expect(loaded.content.profile.name).toBe(defaultContent.profile.name);
  });

  it("refetches after the weekly TTL", async () => {
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 4 }),
    } as never);
    await loadPortfolioContent();

    const realNow = Date.now;
    Date.now = () => realNow() + CONTENT_TTL_MS + 1;
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 5 }),
    } as never);

    const loaded = await loadPortfolioContent();
    expect(loaded.source).toBe("network");
    expect(loaded.content.version).toBe(5);
    Date.now = realNow;
  });
});

describe("contentLoader when Firebase is unset", () => {
  beforeEach(() => {
    clearContentCache();
    window.history.replaceState({}, "", "/");
  });

  it("skips network when the template has no Firebase config", async () => {
    vi.resetModules();
    vi.doMock("./firebase", async () => {
      const actual = await vi.importActual<typeof import("./firebase")>("./firebase");
      return {
        ...actual,
        isFirebaseConfigured: () => false,
        getDb: () => ({}),
      };
    });
    const { loadPortfolioContent: load } = await import("./contentLoader");
    const loaded = await load();
    expect(loaded.source).toBe("fallback");
  });

  it("force-refreshes when refresh=1 or content=refresh", async () => {
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 9 }),
    } as never);
    await loadPortfolioContent();

    window.history.replaceState({}, "", "/?refresh=1");
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 10 }),
    } as never);
    const loaded = await loadPortfolioContent();
    expect(loaded.source).toBe("network");
    expect(loaded.content.version).toBe(10);

    window.history.replaceState({}, "", "/?content=refresh");
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 11 }),
    } as never);
    expect((await loadPortfolioContent()).content.version).toBe(11);
  });

  it("returns stale cache when the network fails", async () => {
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 4 }),
    } as never);
    await loadPortfolioContent();

    const realNow = Date.now;
    Date.now = () => realNow() + CONTENT_TTL_MS + 1;
    vi.mocked(getDoc).mockRejectedValue(new Error("offline"));
    const loaded = await loadPortfolioContent();
    expect(loaded.source).toBe("cache");
    expect(loaded.content.version).toBe(4);
    Date.now = realNow;
  });

  it("ignores incomplete cache envelopes", async () => {
    window.localStorage.setItem("portfolio.template.content.v1", "");
    expect((await loadPortfolioContent()).source).toBe("fallback");
    window.localStorage.setItem(
      "portfolio.template.content.v1",
      JSON.stringify({ fetchedAt: Date.now() }),
    );
    expect((await loadPortfolioContent()).source).toBe("fallback");
    window.localStorage.setItem("portfolio.template.content.v1", "{not-json");
    expect((await loadPortfolioContent()).source).toBe("fallback");
  });

  it("tolerates storage failures", async () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    const removeItem = vi
      .spyOn(Storage.prototype, "removeItem")
      .mockImplementation(() => {
        throw new Error("blocked");
      });
    clearContentCache();
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 7 }),
    } as never);
    expect((await loadPortfolioContent()).source).toBe("network");
    getItem.mockRestore();
    setItem.mockRestore();
    removeItem.mockRestore();
  });

  it("skips storage helpers when localStorage is unavailable", async () => {
    const descriptor = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: undefined,
    });
    clearContentCache();
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 8 }),
    } as never);
    expect((await loadPortfolioContent()).source).toBe("network");
    if (descriptor) Object.defineProperty(window, "localStorage", descriptor);
  });

});
