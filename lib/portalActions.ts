import type { Portal, PortalAction } from "@/types/portal";
import type { PortalEvent } from "@/types/event";
import { calculatePortalRisk } from "@/lib/portalRisk";

export interface ActionResult {
  success: boolean;
  portal: Portal;
  event: PortalEvent;
  requiresConfirmation?: boolean;
}

function createEvent(
  portal: Portal,
  action: PortalAction,
  type: PortalEvent["type"],
  message: string,
  riskBefore?: number,
  riskAfter?: number
): PortalEvent {
  return {
    id: crypto.randomUUID(),
    portalId: portal.id,
    portalName: portal.name,
    type,
    action,
    message,
    timestamp: new Date().toISOString(),
    riskBefore,
    riskAfter,
  };
}

export function stabilizePortal(portal: Portal): ActionResult {
  const riskBefore = calculatePortalRisk(portal).total;

  if (portal.status === "closed") {
    return {
      success: false,
      portal,
      event: createEvent(
        portal,
        "stabilize",
        "blocked",
        "Stabilization blocked: portal is already closed.",
        riskBefore,
        riskBefore
      ),
    };
  }

  const updatedPortal: Portal = {
    ...portal,
    stability: Math.min(100, portal.stability + 25),
    energy: Math.max(0, portal.energy - 10),
    collapseMinutes: portal.collapseMinutes + 30,
    history: [
      ...portal.history,
      {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        message: "Portal stabilized successfully.",
      },
    ],
  };

  const riskAfter = calculatePortalRisk(updatedPortal).total;

  return {
    success: true,
    portal: updatedPortal,
    event: createEvent(
      portal,
      "stabilize",
      "action",
      `Portal stabilized. Risk changed from ${riskBefore} to ${riskAfter}.`,
      riskBefore,
      riskAfter
    ),
  };
}

export function sendObserver(portal: Portal): ActionResult {
  const risk = calculatePortalRisk(portal);

  if (portal.status === "closed") {
    return {
      success: false,
      portal,
      event: createEvent(
        portal,
        "send_observer",
        "blocked",
        "Observer deployment blocked: portal is closed.",
        risk.total,
        risk.total
      ),
    };
  }

  if (risk.level === "critical") {
    return {
      success: false,
      portal,
      event: createEvent(
        portal,
        "send_observer",
        "blocked",
        "Observer deployment blocked: portal risk is critical.",
        risk.total,
        risk.total
      ),
    };
  }

  if (portal.observerDeployed) {
    return {
      success: false,
      portal,
      event: createEvent(
        portal,
        "send_observer",
        "blocked",
        "Observer deployment blocked: an observer is already deployed.",
        risk.total,
        risk.total
      ),
    };
  }

  const updatedPortal: Portal = {
    ...portal,
    observerDeployed: true,
    history: [
      ...portal.history,
      {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        message: "Observer deployed successfully.",
      },
    ],
  };

  return {
    success: true,
    portal: updatedPortal,
    event: createEvent(
      portal,
      "send_observer",
      "action",
      "Observer deployed successfully.",
      risk.total,
      risk.total
    ),
  };
}

export function markPortalQuestionable(portal: Portal): ActionResult {
  const risk = calculatePortalRisk(portal).total;

  if (portal.status === "closed") {
    return {
      success: false,
      portal,
      event: createEvent(
        portal,
        "mark_questionable",
        "blocked",
        "Portal cannot be marked as questionable because it is closed.",
        risk,
        risk
      ),
    };
  }

  if (portal.status === "questionable") {
    return {
      success: false,
      portal,
      event: createEvent(
        portal,
        "mark_questionable",
        "blocked",
        "Portal is already marked as questionable.",
        risk,
        risk
      ),
    };
  }

  const updatedPortal: Portal = {
    ...portal,
    status: "questionable",
    history: [
      ...portal.history,
      {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        message: "Portal marked as questionable.",
      },
    ],
  };

  return {
    success: true,
    portal: updatedPortal,
    event: createEvent(
      portal,
      "mark_questionable",
      "action",
      "Portal marked as questionable.",
      risk,
      risk
    ),
  };
}

export function closePortal(
  portal: Portal,
  confirmed = false
): ActionResult {
  const riskBefore = calculatePortalRisk(portal).total;

  if (portal.status === "closed") {
    return {
      success: false,
      portal,
      event: createEvent(
        portal,
        "close",
        "blocked",
        "Portal is already closed.",
        riskBefore,
        riskBefore
      ),
    };
  }

  if (portal.creaturesInside > 0 && !confirmed) {
    return {
      success: false,
      portal,
      requiresConfirmation: true,
      event: createEvent(
        portal,
        "close",
        "warning",
        `Closing requires confirmation: ${portal.creaturesInside} creature(s) are still inside.`,
        riskBefore,
        riskBefore
      ),
    };
  }

  const updatedPortal: Portal = {
    ...portal,
    status: "closed",
    energy: 0,
    stability: 100,
    collapseMinutes: 0,
    observerDeployed: false,
    history: [
      ...portal.history,
      {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        message:
          portal.creaturesInside > 0
            ? `Portal force-closed with ${portal.creaturesInside} creature(s) still inside.`
            : "Portal closed successfully.",
      },
    ],
  };

  const riskAfter = calculatePortalRisk(updatedPortal).total;

  return {
    success: true,
    portal: updatedPortal,
    event: createEvent(
      portal,
      "close",
      portal.creaturesInside > 0 ? "warning" : "action",
      portal.creaturesInside > 0
        ? `Portal force-closed with ${portal.creaturesInside} creature(s) still inside.`
        : "Portal closed successfully.",
      riskBefore,
      riskAfter
    ),
  };
}