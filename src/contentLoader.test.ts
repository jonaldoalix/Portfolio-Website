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
