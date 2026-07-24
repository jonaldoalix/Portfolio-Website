import { describe, expect, it, beforeEach } from "vitest";
import { applyTheme, cyclePalette, initialTheme, PALETTES } from "./theme";

describe("theme", () => {
  beforeEach(() => {
    document.documentElement.dataset.mode = "";
    document.documentElement.dataset.palette = "";
    window.history.replaceState({}, "", "/");
  });

  it("cycles through every palette", () => {
    let current = PALETTES[0].key;
    const seen = new Set<string>();
    for (let i = 0; i < PALETTES.length; i += 1) {
      current = cyclePalette(current);
      seen.add(current);
    }
    expect(seen.size).toBe(PALETTES.length);
  });

  it("applies light mode and palette to the document", () => {
    const theme = applyTheme({ mode: "light", palette: "copper" });
    expect(theme.mode).toBe("light");
    expect(theme.palette).toBe("copper");
    expect(document.documentElement.dataset.mode).toBe("light");
    expect(document.documentElement.dataset.palette).toBe("copper");
    expect(document.documentElement.style.colorScheme).toBe("light");
  });

  it("falls back to base palette for unknown values", () => {
    const theme = applyTheme({ mode: "dark", palette: "not-real" });
    expect(theme.palette).toBe("base");
  });

  it("reads mode and palette from the URL", () => {
    window.history.replaceState({}, "", "/?mode=light&palette=sage");
    expect(initialTheme()).toEqual({ mode: "light", palette: "sage" });
  });
});
