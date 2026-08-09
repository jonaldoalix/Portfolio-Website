import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { applyTheme, type AppliedTheme } from "../theme";
import Nav from "./Nav";

describe("Nav", () => {
  it("opens the palette menu, selects a palette, and closes on Escape", async () => {
    const user = userEvent.setup();
    const onThemeChange = vi.fn();
    const theme = applyTheme({ mode: "dark", palette: "base" });

    render(<Nav theme={theme} onThemeChange={onThemeChange} />);

    await user.click(
      screen.getByRole("button", { name: /color palette, base/i }),
    );
    expect(screen.getByRole("listbox", { name: /color palettes/i })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Tab" });
    expect(screen.getByRole("listbox", { name: /color palettes/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /copper/i }));
    expect(onThemeChange).toHaveBeenCalledWith({
      mode: "dark",
      palette: "copper",
    });
    expect(
      screen.queryByRole("listbox", { name: /color palettes/i }),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /color palette, base/i }),
    );
    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("listbox", { name: /color palettes/i }),
    ).not.toBeInTheDocument();
  });

  it("toggles to dark mode from light mode", async () => {
    const user = userEvent.setup();
    const onThemeChange = vi.fn();
    const theme = applyTheme({ mode: "light", palette: "base" });
    render(<Nav theme={theme} onThemeChange={onThemeChange} />);
    await user.click(screen.getByRole("button", { name: /switch to dark mode/i }));
    expect(onThemeChange).toHaveBeenCalledWith({
      mode: "dark",
      palette: "base",
    });
  });

  it("cycles palette on context menu and closes menu on outside pointerdown", async () => {
    const user = userEvent.setup();
    const onThemeChange = vi.fn();
    const theme = applyTheme({ mode: "dark", palette: "base" });

    render(
      <div>
        <Nav theme={theme} onThemeChange={onThemeChange} />
        <button type="button">Outside</button>
      </div>,
    );

    const paletteBtn = screen.getByRole("button", {
      name: /color palette, base/i,
    });
    fireEvent.contextMenu(paletteBtn);
    expect(onThemeChange).toHaveBeenCalledWith({
      mode: "dark",
      palette: "copper",
    });

    await user.click(paletteBtn);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.pointerDown(screen.getByRole("button", { name: /outside/i }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("falls back to the default swatch for unknown palettes", () => {
    const theme = {
      mode: "dark",
      palette: "missing",
      label: "Dark · missing",
    } as unknown as AppliedTheme;
    render(<Nav theme={theme} onThemeChange={vi.fn()} />);
    const swatch = document.querySelector(".nav-tool__swatch") as HTMLElement;
    expect(swatch.style.background).toBe("rgb(79, 127, 214)");
  });
});
