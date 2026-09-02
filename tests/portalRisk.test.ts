import { describe, expect, it } from "vitest";

import { initialPortals } from "@/lib/seed";
import { calculatePortalRisk } from "@/lib/portalRisk";
import { stabilizePortal } from "@/lib/portalActions";

describe("portal risk engine", () => {
  it("marks a dangerous unstable portal as critical", () => {
    const portal = initialPortals.find(
      (item) => item.id === "void-reach"
    )!;

    const risk = calculatePortalRisk(portal);

    expect(risk.level).toBe("critical");
    expect(risk.total).toBeGreaterThanOrEqual(80);
  });

  it("keeps risk score between 0 and 100", () => {
    for (const portal of initialPortals) {
      const risk = calculatePortalRisk(portal);

      expect(risk.total).toBeGreaterThanOrEqual(0);
      expect(risk.total).toBeLessThanOrEqual(100);
    }
  });

  it("reduces risk after stabilization", () => {
    const portal = initialPortals.find(
      (item) => item.id === "void-reach"
    )!;

    const riskBefore = calculatePortalRisk(portal).total;

    const result = stabilizePortal(portal);

    const riskAfter = calculatePortalRisk(result.portal).total;

    expect(result.success).toBe(true);
    expect(riskAfter).toBeLessThan(riskBefore);
  });
});