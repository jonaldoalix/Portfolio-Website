import { useContentContext } from "./ContentContext";
import type { PortfolioContent } from "./content";
import { CONTENT_TTL_MS, type ContentSource } from "./contentLoader";

export function useContent(): PortfolioContent {
  return useContentContext().content;
}

export function useContentStatus(): {
  source: ContentSource;
  ready: boolean;
} {
  const { source, ready } = useContentContext();
  return { source, ready };
}

export { CONTENT_TTL_MS };
