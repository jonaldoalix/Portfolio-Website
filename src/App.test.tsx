import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

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
      screen.getByRole("heading", { name: /sample work section/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /skills list/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /work history/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /about me/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^contact$/i })).toBeInTheDocument();
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
});
