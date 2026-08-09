import { beforeEach, describe, expect, it, vi } from "vitest";

describe("firebase", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("reports unconfigured Firebase in the template defaults", async () => {
    const mod = await import("./firebase");
    expect(mod.isFirebaseConfigured()).toBe(false);
    expect(mod.PORTFOLIO_COLLECTION).toBe("portfolio");
    expect(mod.PORTFOLIO_DOC_ID).toBe("published");
  });

  it("memoizes the Firebase app and Firestore client once configured", async () => {
    vi.stubEnv("VITE_FIREBASE_API_KEY", "test-key");
    vi.stubEnv("VITE_FIREBASE_PROJECT_ID", "test-project");
    vi.resetModules();
    const mod = await import("./firebase");
    expect(mod.isFirebaseConfigured()).toBe(true);
    const firstApp = mod.getFirebaseApp();
    const secondApp = mod.getFirebaseApp();
    expect(secondApp).toBe(firstApp);
    const firstDb = mod.getDb();
    const secondDb = mod.getDb();
    expect(secondDb).toBe(firstDb);
    vi.unstubAllEnvs();
  });
});
