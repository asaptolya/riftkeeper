export type PortalStatus =
  | "open"
  | "questionable"
  | "closed";

export type RiskLevel =
  | "low"
  | "moderate"
  | "high"
  | "critical";

export type PortalAction =
  | "stabilize"
  | "close"
  | "send_observer"
  | "mark_questionable";

export interface PortalHistoryEntry {
  id: string;
  timestamp: string;
  message: string;
}

export interface Portal {
  id: string;

  name: string;
  destination: string;

  energy: number;
  stability: number;
  collapseMinutes: number;
  creaturesInside: number;

  status: PortalStatus;

  observerDeployed: boolean;

  history: PortalHistoryEntry[];
}