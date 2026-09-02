import type { PortalAction } from "./portal";

export type EventType =
  | "action"
  | "warning"
  | "blocked";

export interface PortalEvent {
  id: string;

  portalId: string;
  portalName: string;

  type: EventType;
  action: PortalAction;

  message: string;

  timestamp: string;

  riskBefore?: number;
  riskAfter?: number;
}