import { describe, expect, it } from "vitest";
import { experience, profile, work } from "./content";

describe("content", () => {
  it("keeps a usable profile and contact surface", () => {
    expect(profile.name).toBe("Alex Rivera");
    expect(profile.email).toContain("@");
    expect(profile.site).toBe("https://example.com");
    expect(profile.practice.url).toMatch(/^https:\/\//);
  });

  it("lists real work with visit or repo links", () => {
    expect(work.length).toBeGreaterThan(0);
    for (const item of work) {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.href || item.repo).toBeTruthy();
    }
  });

  it("keeps experience entries dated and concrete", () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const job of experience) {
      expect(job.org.length).toBeGreaterThan(0);
      expect(job.dates.length).toBeGreaterThan(0);
      expect(job.points.length).toBeGreaterThan(0);
    }
  });
});
