import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { defaultContent } from "../content";
import Work from "./Work";

vi.mock("../useContent", () => ({
  useContent: () => ({
    work: [
      {
        ...defaultContent.work[0],
        title: "No visit link",
        href: null,
        repo: "https://github.com/example/repo",
        image: null,
      },
      {
        ...defaultContent.work[0],
        title: "With screenshot",
        href: "https://example.com",
        repo: null,
        image: "/sample.png",
      },
    ],
  }),
}));

describe("Work", () => {
  it("renders placeholders, images, and optional visit/repo links", () => {
    render(<Work />);
    expect(screen.getByRole("heading", { name: /no visit link/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^repo$/i })).toHaveAttribute(
      "href",
      "https://github.com/example/repo",
    );
    expect(screen.getByRole("heading", { name: /with screenshot/i })).toBeInTheDocument();
    expect(document.querySelector('img[src="/sample.png"]')).toBeTruthy();
    expect(screen.getByRole("link", { name: /^visit$/i })).toHaveAttribute(
      "href",
      "https://example.com",
    );
  });
});
