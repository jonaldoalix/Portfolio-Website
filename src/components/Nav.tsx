import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { PALETTES, cyclePalette, type AppliedTheme, type ThemeInput } from "../theme";
import { useContent } from "../useContent";

const links = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

type NavProps = {
  theme: AppliedTheme;
  onThemeChange: (next: ThemeInput) => void;
};

export default function Nav({ theme, onThemeChange }: NavProps) {
  const { profile } = useContent();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const menuId = useId();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!paletteOpen) return undefined;
    function onPointerDown(event: PointerEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setPaletteOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setPaletteOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [paletteOpen]);

  const activeSwatch =
    PALETTES.find((item) => item.key === theme.palette)?.swatch[theme.mode] ||
    "#4f7fd6";

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top" aria-label={`${profile.name} home`}>
          <img
            className="brand__mark"
            src="/mark.png"
            alt=""
            width="36"
            height="36"
          />
          <span className="brand__signature" aria-hidden="true">
            {profile.name}
          </span>
        </a>
        <nav className="nav" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-tools">
          <div className="nav-palette" ref={wrapRef}>
            <button
              type="button"
              className="nav-tool"
              aria-label={`Color palette, ${theme.palette}`}
              aria-haspopup="listbox"
              aria-expanded={paletteOpen}
              aria-controls={menuId}
              title="Color palette"
              onClick={() => setPaletteOpen((open) => !open)}
              onContextMenu={(event: MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                onThemeChange({
                  mode: theme.mode,
                  palette: cyclePalette(theme.palette),
                });
              }}
            >
              <span
                className="nav-tool__swatch"
                style={{ background: activeSwatch }}
                aria-hidden="true"
              />
              <span className="nav-tool__text">Palette</span>
            </button>
            {paletteOpen ? (
              <ul
                className="nav-palette__menu"
                id={menuId}
                role="listbox"
                aria-label="Color palettes"
              >
                {PALETTES.map((item) => (
                  <li
                    key={item.key}
                    role="option"
                    aria-selected={theme.palette === item.key}
                  >
                    <button
                      type="button"
                      className={
                        theme.palette === item.key
                          ? "nav-palette__option is-active"
                          : "nav-palette__option"
                      }
                      onClick={() => {
                        onThemeChange({ mode: theme.mode, palette: item.key });
                        setPaletteOpen(false);
                      }}
                    >
                      <span
                        className="nav-tool__swatch"
                        style={{
                          background: item.swatch[theme.mode],
                        }}
                        aria-hidden="true"
                      />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <button
            type="button"
            className="nav-tool"
            aria-label={
              theme.mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title={theme.mode === "dark" ? "Light mode" : "Dark mode"}
            onClick={() =>
              onThemeChange({
                mode: theme.mode === "dark" ? "light" : "dark",
                palette: theme.palette,
              })
            }
          >
            <span className="nav-tool__text">
              {theme.mode === "dark" ? "Light" : "Dark"}
            </span>
          </button>
          <a className="nav-cta" href="#contact">
            Inquire
          </a>
        </div>
      </div>
    </header>
  );
}
