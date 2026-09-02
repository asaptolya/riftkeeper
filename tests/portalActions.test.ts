import { describe, expect, it } from "vitest";

import { initialPortals } from "@/lib/seed";
import {
  closePortal,
  sendObserver,
  stabilizePortal,
} from "@/lib/portalActions";

describe("portal actions", () => {
  it("cannot stabilize a closed portal", () => {
    const portal = initialPortals.find(
      (item) => item.id === "sealed-archive"
    )!;

    const result = stabilizePortal(portal);

    expect(result.success).toBe(false);
    expect(result.event.type).toBe("blocked");
  });

  it("cannot send an observer into a critical portal", () => {
    const portal = initialPortals.find(
      (item) => item.id === "void-reach"
    )!;

    const result = sendObserver(portal);

    expect(result.success).toBe(false);
    expect(result.event.type).toBe("blocked");
  });

  it("requires confirmation before closing a portal with creatures inside", () => {
    const portal = initialPortals.find(
      (item) => item.id === "frostbound-gate"
    )!;

    const result = closePortal(portal);

    expect(result.success).toBe(false);
    expect(result.requiresConfirmation).toBe(true);
    expect(result.event.type).toBe("warning");
  });
});