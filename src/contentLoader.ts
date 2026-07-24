import { doc, getDoc } from "firebase/firestore";
import {
  defaultContent,
  type PortfolioContent,
} from "./content";
import {
  getDb,
  isFirebaseConfigured,
  PORTFOLIO_COLLECTION,
  PORTFOLIO_DOC_ID,
} from "./firebase";

const CACHE_KEY = "portfolio.template.content.v1";
/** Content changes quarterly. Revalidate at most weekly. */
export const CONTENT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type CacheEnvelope = {
  fetchedAt: number;
  content: PortfolioContent;
};

export type ContentSource = "cache" | "network" | "fallback";

export type LoadedContent = {
  content: PortfolioContent;
  source: ContentSource;
  fromCache: boolean;
};

function canUseStorage(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

function readCache(): CacheEnvelope | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEnvelope;
    if (!parsed?.content || typeof parsed.fetchedAt !== "number") return null;
    if (!isPortfolioContent(parsed.content)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(content: PortfolioContent): void {
  if (!canUseStorage()) return;
  const envelope: CacheEnvelope = {
    fetchedAt: Date.now(),
    content,
  };
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(envelope));
  } catch {
    // Quota or private mode. Ignore.
  }
}

export function clearContentCache(): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignore.
  }
}

function isPortfolioContent(value: unknown): value is PortfolioContent {
  if (!value || typeof value !== "object") return false;
  const docValue = value as Partial<PortfolioContent>;
  return (
    typeof docValue.version === "number" &&
    !!docValue.profile &&
    !!docValue.hero &&
    Array.isArray(docValue.work) &&
    Array.isArray(docValue.experience) &&
    !!docValue.skills &&
    !!docValue.about &&
    !!docValue.contact
  );
}

function shouldForceRefresh(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("refresh") === "1" || params.get("content") === "refresh";
}

async function fetchPublishedContent(): Promise<PortfolioContent | null> {
  if (!isFirebaseConfigured()) return null;
  const snapshot = await getDoc(doc(getDb(), PORTFOLIO_COLLECTION, PORTFOLIO_DOC_ID));
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  if (!isPortfolioContent(data)) return null;
  return data;
}

/**
 * Resolve portfolio content with a long-lived local cache.
 * Fresh cache (< 7 days): return immediately, no network.
 * Stale/missing: return bundled or stale cache first when possible, then refresh.
 */
export async function loadPortfolioContent(): Promise<LoadedContent> {
  const forceRefresh = shouldForceRefresh();
  if (forceRefresh) clearContentCache();

  const cached = readCache();
  const cacheIsFresh =
    !!cached && Date.now() - cached.fetchedAt < CONTENT_TTL_MS && !forceRefresh;

  if (cacheIsFresh && cached) {
    return { content: cached.content, source: "cache", fromCache: true };
  }

  try {
    const remote = await fetchPublishedContent();
    if (remote) {
      writeCache(remote);
      return { content: remote, source: "network", fromCache: false };
    }
  } catch {
    // Fall through to cache or bundled defaults.
  }

  if (cached) {
    return { content: cached.content, source: "cache", fromCache: true };
  }

  return {
    content: defaultContent,
    source: "fallback",
    fromCache: false,
  };
}

/**
 * Background revalidation for stale cache. Does not block first paint.
 */
export async function revalidatePortfolioContent(
  current: PortfolioContent,
): Promise<PortfolioContent | null> {
  try {
    const remote = await fetchPublishedContent();
    if (!remote) return null;
    if (remote.version === current.version && remote.updatedAt === current.updatedAt) {
      writeCache(remote);
      return null;
    }
    writeCache(remote);
    return remote;
  } catch {
    return null;
  }
}
