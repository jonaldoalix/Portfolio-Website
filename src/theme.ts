export type ThemeMode = "light" | "dark";

export type PaletteKey = "base" | "copper" | "mark" | "sage";

export type Palette = {
  key: PaletteKey;
  label: string;
  swatch: Record<ThemeMode, string>;
};

export type ThemeInput = {
  mode: ThemeMode | string;
  palette: PaletteKey | string;
};

export type AppliedTheme = {
  mode: ThemeMode;
  palette: PaletteKey;
  label: string;
};

export const PALETTES: Palette[] = [
  {
    key: "base",
    label: "Base",
    swatch: { dark: "#4f7fd6", light: "#2f5d57" },
  },
  {
    key: "copper",
    label: "Copper",
    swatch: { dark: "#c47a3a", light: "#b56a2e" },
  },
  {
    key: "mark",
    label: "JA mark",
    swatch: { dark: "#3b6fd4", light: "#3b6fd4" },
  },
  {
    key: "sage",
    label: "Sage",
    swatch: { dark: "#6f8f78", light: "#4f7358" },
  },
];

const THEME_COLORS: Record<ThemeMode, Record<PaletteKey, string>> = {
  dark: {
    base: "#0b0f14",
    copper: "#100e0c",
    mark: "#080c16",
    sage: "#0c0f0d",
  },
  light: {
    base: "#ebe7e0",
    copper: "#efe6db",
    mark: "#e8eaf0",
    sage: "#e7ebe6",
  },
};

function isPaletteKey(value: string | null | undefined): value is PaletteKey {
  return PALETTES.some((item) => item.key === value);
}

function systemMode(): ThemeMode {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function randomPalette(): PaletteKey {
  return PALETTES[Math.floor(Math.random() * PALETTES.length)].key;
}

export function initialTheme(): { mode: ThemeMode; palette: PaletteKey } {
  const params = new URLSearchParams(window.location.search);
  const modeParam = params.get("mode");
  const paletteParam = params.get("palette");
  const root = document.documentElement;

  const mode: ThemeMode =
    modeParam === "light" || modeParam === "dark"
      ? modeParam
      : root.dataset.mode === "light" || root.dataset.mode === "dark"
        ? root.dataset.mode
        : systemMode();

  const palette: PaletteKey = isPaletteKey(paletteParam)
    ? paletteParam
    : isPaletteKey(root.dataset.palette)
      ? root.dataset.palette
      : randomPalette();

  return { mode, palette };
}

export function applyTheme({ mode, palette }: ThemeInput): AppliedTheme {
  const nextMode: ThemeMode = mode === "light" ? "light" : "dark";
  const nextPalette: PaletteKey = isPaletteKey(palette) ? palette : "base";
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  const themeColor = THEME_COLORS[nextMode][nextPalette];
  const paletteMeta = PALETTES.find((item) => item.key === nextPalette);

  root.dataset.mode = nextMode;
  root.dataset.palette = nextPalette;
  delete root.dataset.dark;
  delete root.dataset.variant;

  root.style.colorScheme = nextMode;
  root.style.background = themeColor;
  if (meta) meta.setAttribute("content", themeColor);

  return {
    mode: nextMode,
    palette: nextPalette,
    label: `${nextMode === "light" ? "Light" : "Dark"} · ${paletteMeta?.label ?? nextPalette}`,
  };
}

export function cyclePalette(current: string): PaletteKey {
  const index = PALETTES.findIndex((item) => item.key === current);
  const safeIndex = index >= 0 ? index : 0;
  return PALETTES[(safeIndex + 1) % PALETTES.length].key;
}
