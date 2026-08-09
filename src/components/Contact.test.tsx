import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Contact from "./Contact";

describe("Contact", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("submits the inquiry form successfully", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<Contact />);

    await user.type(screen.getByLabelText(/^name$/i), "Ada Lovelace");
    await user.type(screen.getByLabelText(/^email$/i), "ada@example.com");
    await user.clear(screen.getByLabelText(/^subject$/i));
    await user.type(
      screen.getByLabelText(/^message$/i),
      "Need help with a stalled platform.",
    );
    await user.click(screen.getByRole("button", { name: /^send$/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/message sent\. replace this confirmation copy/i),
      ).toBeInTheDocument();
    });
    expect(fetchMock).toHaveBeenCalledOnce();
    const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(body._subject).toBe("Inquiry");
  });

  it("shows a fallback when the send fails", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    render(<Contact />);

    await user.type(screen.getByLabelText(/^name$/i), "Ada Lovelace");
    await user.type(screen.getByLabelText(/^email$/i), "ada@example.com");
    await user.type(screen.getByLabelText(/^message$/i), "Hello");
    await user.click(screen.getByRole("button", { name: /^send$/i }));

    await waitFor(() => {
      expect(screen.getByText(/could not send/i)).toBeInTheDocument();
    });
  });

  it("coerces blank FormData fields before sending", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<Contact />);
    const form = screen.getByRole("button", { name: /^send$/i })
      .closest("form") as HTMLFormElement;
    form.querySelectorAll("[required]").forEach((el) => el.removeAttribute("required"));
    form.querySelector('input[name="name"]')?.remove();
    form.querySelector('input[name="email"]')?.remove();
    form.querySelector('input[name="subject"]')?.remove();
    form.querySelector('textarea[name="message"]')?.remove();
    form.requestSubmit();

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
    const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(body.name).toBe("");
    expect(body.email).toBe("");
    expect(body.message).toBe("");
    expect(body._subject).toBe("Inquiry");
  });
});
