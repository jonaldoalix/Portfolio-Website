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
        name: /systems that hold up in production/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /real products and long-running ownership/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /toolbox/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /where the work has lived/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /a person behind the practice/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /start a conversation/i }),
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
});
