import type { Portal } from "@/types/portal";
import type { PortalEvent } from "@/types/event";

export interface LaboratoryState {
  portals: Portal[];
  eventLog: PortalEvent[];
}