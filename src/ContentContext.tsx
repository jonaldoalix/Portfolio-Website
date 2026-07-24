import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { defaultContent, type PortfolioContent } from "./content";
import {
  loadPortfolioContent,
  revalidatePortfolioContent,
  type ContentSource,
} from "./contentLoader";

type ContentContextValue = {
  content: PortfolioContent;
  source: ContentSource;
  ready: boolean;
};

const ContentContext = createContext<ContentContextValue>({
  content: defaultContent,
  source: "fallback",
  ready: false,
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(defaultContent);
  const [source, setSource] = useState<ContentSource>("fallback");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      const loaded = await loadPortfolioContent();
      if (cancelled) return;
      setContent(loaded.content);
      setSource(loaded.source);
      setReady(true);

      if (loaded.fromCache) {
        const refreshed = await revalidatePortfolioContent(loaded.content);
        if (!cancelled && refreshed) {
          setContent(refreshed);
          setSource("network");
        }
      }
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ContentContext.Provider value={{ content, source, ready }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext(): ContentContextValue {
  return useContext(ContentContext);
}
