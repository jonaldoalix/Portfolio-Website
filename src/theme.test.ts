import { describe, expect, it, beforeEach, vi } from "vitest";
import { applyTheme, cyclePalette, initialTheme, PALETTES } from "./theme";

describe("theme", () => {
  beforeEach(() => {
    document.documentElement.dataset.mode = "";
    document.documentElement.dataset.palette = "";
    document.documentElement.removeAttribute("style");
    window.history.replaceState({}, "", "/");
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((node) => node.remove());
  });

  it("cycles through every palette and unknown values", () => {
    let current = PALETTES[0].key;
    const seen = new Set<string>();
    for (let i = 0; i < PALETTES.length; i += 1) {
      current = cyclePalette(current);
      seen.add(current);
    }
    expect(seen.size).toBe(PALETTES.length);
    expect(cyclePalette("not-a-palette")).toBe(PALETTES[1].key);
  });

  it("applies light mode and palette to the document", () => {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);

    const theme = applyTheme({ mode: "light", palette: "copper" });
    expect(theme.mode).toBe("light");
    expect(theme.palette).toBe("copper");
    expect(theme.label).toContain("Light");
    expect(document.documentElement.dataset.mode).toBe("light");
    expect(document.documentElement.dataset.palette).toBe("copper");
    expect(document.documentElement.style.colorScheme).toBe("light");
    expect(meta.getAttribute("content")).toBeTruthy();
  });

  it("falls back to base palette for unknown values", () => {
    const theme = applyTheme({ mode: "dark", palette: "not-real" });
    expect(theme.palette).toBe("base");
    expect(theme.label).toContain("Dark");
  });

  it("reads mode and palette from the URL", () => {
    window.history.replaceState({}, "", "/?mode=light&palette=sage");
    expect(initialTheme()).toEqual({ mode: "light", palette: "sage" });
  });

  it("reads mode and palette from the document when URL is empty", () => {
    document.documentElement.dataset.mode = "light";
    document.documentElement.dataset.palette = "mark";
    expect(initialTheme()).toEqual({ mode: "light", palette: "mark" });
  });

  it("uses the system preference and a random palette as last resort", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: (query: string) => ({
        matches: query.includes("light"),
        media: query,
        onchange: null,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() {
          return false;
        },
      }),
    });
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(initialTheme()).toEqual({ mode: "light", palette: "base" });
    vi.restoreAllMocks();
  });
});
