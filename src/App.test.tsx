import { render, screen, renderHook, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getDoc } from "firebase/firestore";
import App from "./App";
import { ContentProvider, useContentContext } from "./ContentContext";
import { defaultContent } from "./content";
import {
  clearContentCache,
  CONTENT_TTL_MS,
  loadPortfolioContent,
  revalidatePortfolioContent,
} from "./contentLoader";

vi.mock("./firebase", async () => {
  const actual = await vi.importActual<typeof import("./firebase")>("./firebase");
  return {
    ...actual,
    isFirebaseConfigured: () => true,
    getDb: () => ({}),
  };
});

describe("App", () => {
  it("renders the core portfolio sections", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /building websites and apps for the web/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /sample work section/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /skills list/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /work history/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /about me/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /^contact$/i }),
    ).toBeInTheDocument();
  });

  it("toggles light and dark mode from the nav", async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole("button", { name: /switch to light mode/i });
    await user.click(toggle);
    expect(document.documentElement.dataset.mode).toBe("light");
    expect(
      screen.getByRole("button", { name: /switch to dark mode/i }),
    ).toBeInTheDocument();
  });

  it("reveals in-viewport sections and observes the rest", () => {
    const observe = vi.fn();
    const unobserve = vi.fn();
    const disconnect = vi.fn();
    let callback: IntersectionObserverCallback = () => {};

    class TrackingObserver {
      constructor(cb: IntersectionObserverCallback) {
        callback = cb;
      }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
      takeRecords() {
        return [];
      }
      readonly root = null;
      readonly rootMargin = "";
      readonly thresholds: ReadonlyArray<number> = [];
    }

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: TrackingObserver,
    });

    const rectSpy = vi
      .spyOn(Element.prototype, "getBoundingClientRect")
      .mockImplementation(function (this: Element) {
        const near = this.classList.contains("reveal--delay");
        return {
          top: near ? window.innerHeight * 0.5 : window.innerHeight * 2,
          bottom: 0,
          left: 0,
          right: 0,
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          toJSON() {
            return {};
          },
        } as DOMRect;
      });

    const { unmount } = render(<App />);
    expect(observe).toHaveBeenCalled();

    const observed = observe.mock.calls[0][0] as Element;
    callback(
      [
        {
          isIntersecting: false,
          target: observed,
        } as IntersectionObserverEntry,
        {
          isIntersecting: true,
          target: observed,
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );
    expect(observed.classList.contains("is-visible")).toBe(true);
    expect(unobserve).toHaveBeenCalledWith(observed);

    unmount();
    expect(disconnect).toHaveBeenCalled();
    rectSpy.mockRestore();
  });

  it("falls back when IntersectionObserver is unavailable", () => {
    const original = window.IntersectionObserver;
    // @ts-expect-error intentional coverage of missing API
    delete window.IntersectionObserver;

    render(<App />);
    document.querySelectorAll(".reveal").forEach((node) => {
      expect(node.classList.contains("is-visible")).toBe(true);
    });

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: original,
    });
  });

  it("updates theme when prefers-color-scheme changes", () => {
    let matches = false;
    let listener: (() => void) | undefined;
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: (query: string) => ({
        get matches() {
          return matches;
        },
        media: query,
        onchange: null,
        addListener() {},
        removeListener() {},
        addEventListener(_type: string, cb: () => void) {
          listener = cb;
        },
        removeEventListener() {
          listener = undefined;
        },
        dispatchEvent() {
          return false;
        },
      }),
    });

    render(<App />);
    expect(listener).toBeTypeOf("function");
    act(() => {
      listener?.();
    });
    expect(document.documentElement.dataset.mode).toBe("dark");
    act(() => {
      matches = true;
      listener?.();
    });
    expect(document.documentElement.dataset.mode).toBe("light");
  });
});

describe("ContentProvider", () => {
  beforeEach(() => {
    clearContentCache();
    window.history.replaceState({}, "", "/");
    vi.mocked(getDoc).mockReset();
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => false,
      data: () => undefined,
    } as never);
  });

  it("revalidates when the first load came from cache", async () => {
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 2, updatedAt: "2026-01-01" }),
    } as never);
    await loadPortfolioContent();

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 3, updatedAt: "2026-02-01" }),
    } as never);

    const { result } = renderHook(() => useContentContext(), {
      wrapper: ({ children }) => <ContentProvider>{children}</ContentProvider>,
    });

    await waitFor(() => {
      expect(result.current.ready).toBe(true);
      expect(result.current.content.version).toBe(3);
      expect(result.current.source).toBe("network");
    });
  });

  it("keeps cached content when revalidate finds nothing new", async () => {
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 2, updatedAt: "2026-01-01" }),
    } as never);
    await loadPortfolioContent();

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 2, updatedAt: "2026-01-01" }),
    } as never);

    const { result } = renderHook(() => useContentContext(), {
      wrapper: ({ children }) => <ContentProvider>{children}</ContentProvider>,
    });

    await waitFor(() => {
      expect(result.current.ready).toBe(true);
      expect(result.current.content.version).toBe(2);
      expect(result.current.source).toBe("cache");
    });
  });
});

describe("contentLoader extras", () => {
  beforeEach(() => {
    clearContentCache();
    window.history.replaceState({}, "", "/");
    vi.mocked(getDoc).mockReset();
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => false,
      data: () => undefined,
    } as never);
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
    const again = await loadPortfolioContent();
    expect(again.content.version).toBe(11);
  });

  it("treats missing storage as unusable", async () => {
    const descriptor = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new Error("denied");
      },
    });
    const loaded = await loadPortfolioContent();
    expect(loaded.source).toBe("fallback");
    if (descriptor) Object.defineProperty(window, "localStorage", descriptor);
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

  it("ignores incomplete cache envelopes and empty storage", async () => {
    window.localStorage.setItem("portfolio.template.content.v1", "");
    expect((await loadPortfolioContent()).source).toBe("fallback");

    window.localStorage.setItem(
      "portfolio.template.content.v1",
      JSON.stringify({ fetchedAt: Date.now() }),
    );
    expect((await loadPortfolioContent()).source).toBe("fallback");

    window.localStorage.setItem(
      "portfolio.template.content.v1",
      JSON.stringify({
        fetchedAt: Date.now(),
        content: { version: 1, profile: {}, hero: {} },
      }),
    );
    expect((await loadPortfolioContent()).source).toBe("fallback");

    window.localStorage.setItem("portfolio.template.content.v1", "{not-json");
    expect((await loadPortfolioContent()).source).toBe("fallback");
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
    const loaded = await loadPortfolioContent();
    expect(loaded.source).toBe("network");
    if (descriptor) Object.defineProperty(window, "localStorage", descriptor);
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
    const loaded = await loadPortfolioContent();
    expect(loaded.source).toBe("network");

    getItem.mockRestore();
    setItem.mockRestore();
    removeItem.mockRestore();
  });

  it("returns null from revalidate on failure or unchanged content", async () => {
    vi.mocked(getDoc).mockRejectedValue(new Error("offline"));
    expect(await revalidatePortfolioContent(defaultContent)).toBeNull();

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => false,
      data: () => undefined,
    } as never);
    expect(await revalidatePortfolioContent(defaultContent)).toBeNull();

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent }),
    } as never);
    expect(await revalidatePortfolioContent(defaultContent)).toBeNull();

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ ...defaultContent, version: 99, updatedAt: "changed" }),
    } as never);
    const refreshed = await revalidatePortfolioContent(defaultContent);
    expect(refreshed?.version).toBe(99);
  });

  it("rejects non-object Firestore payloads", async () => {
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => null,
    } as never);
    const loaded = await loadPortfolioContent();
    expect(loaded.source).toBe("fallback");
  });
});
