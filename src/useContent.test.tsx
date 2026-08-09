import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { ContentProvider } from "./ContentContext";
import { defaultContent } from "./content";
import { useContent, useContentStatus, CONTENT_TTL_MS } from "./useContent";

describe("useContent", () => {
  it("exposes portfolio content and status from context", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ContentProvider>{children}</ContentProvider>
    );

    const content = renderHook(() => useContent(), { wrapper });
    expect(content.result.current.profile.name).toBe(defaultContent.profile.name);

    const status = renderHook(() => useContentStatus(), { wrapper });
    expect(status.result.current.source).toMatch(/fallback|cache|network/);
    expect(typeof status.result.current.ready).toBe("boolean");
    expect(CONTENT_TTL_MS).toBe(7 * 24 * 60 * 60 * 1000);
  });
});
