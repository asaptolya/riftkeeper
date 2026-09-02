import type { Portal } from "@/types/portal";
import { calculatePortalRisk } from "@/lib/portalRisk";

export type RecommendedAction =
  | "no_action"
  | "monitor"
  | "stabilize"
  | "close"
  | "evacuate"
  | "send_observer";

export interface PortalRecommendation {
  action: RecommendedAction;
  title: string;
  reason: string;
}

export function getPortalRecommendation(
  portal: Portal
): PortalRecommendation {
  const risk = calculatePortalRisk(portal);

  if (portal.status === "closed") {
    return {
      action: "no_action",
      title: "No action required",
      reason: "This portal is already closed.",
    };
  }

  if (risk.level === "critical") {
    if (portal.creaturesInside > 0) {
      return {
        action: "evacuate",
        title: "Evacuate and stabilize immediately",
        reason:
          "The portal is critically unstable and still contains lifeforms.",
      };
    }

    return {
      action: "stabilize",
      title: "Stabilize immediately",
      reason:
        "The portal has reached a critical risk level and may collapse soon.",
    };
  }

  if (risk.level === "high") {
    return {
      action: "stabilize",
      title: "Stabilization recommended",
      reason:
        "Current energy, stability, and collapse timing indicate elevated risk.",
    };
  }

  if (portal.status === "questionable") {
    return {
      action: "send_observer",
      title: "Investigate portal",
      reason:
        "The portal has been marked as questionable and requires further observation.",
    };
  }

  if (risk.level === "moderate") {
    if (!portal.observerDeployed) {
      return {
        action: "send_observer",
        title: "Send observer",
        reason:
          "The portal is currently manageable, but additional field data is recommended.",
      };
    }

    return {
      action: "monitor",
      title: "Continue monitoring",
      reason:
        "An observer is already deployed and the portal does not require immediate intervention.",
    };
  }

  return {
    action: "monitor",
    title: "Keep portal open",
    reason:
      "The portal is stable and currently presents a low operational risk.",
  };
}