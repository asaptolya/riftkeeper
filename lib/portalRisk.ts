import type { Portal, RiskLevel } from "@/types/portal";

export interface RiskBreakdown {
  energyRisk: number;
  instabilityRisk: number;
  collapseRisk: number;
  total: number;
  level: RiskLevel;
}

function getCollapseRisk(collapseMinutes: number): number {
  if (collapseMinutes <= 5) return 100;
  if (collapseMinutes <= 15) return 80;
  if (collapseMinutes <= 30) return 60;
  if (collapseMinutes <= 60) return 40;
  if (collapseMinutes <= 120) return 20;

  return 5;
}

function getRiskLevel(score: number): RiskLevel {
  if (score >= 80) return "critical";
  if (score >= 60) return "high";
  if (score >= 30) return "moderate";

  return "low";
}

export function calculatePortalRisk(portal: Portal): RiskBreakdown {
  if (portal.status === "closed") {
    return {
      energyRisk: 0,
      instabilityRisk: 0,
      collapseRisk: 0,
      total: 0,
      level: "low",
    };
  }

  const energyRisk = portal.energy * 0.3;
  const instabilityRisk = (100 - portal.stability) * 0.4;
  const collapseRisk = getCollapseRisk(portal.collapseMinutes) * 0.3;

  const total = Math.min(
    100,
    Math.max(
      0,
      Math.round(energyRisk + instabilityRisk + collapseRisk)
    )
  );

  return {
    energyRisk: Math.round(energyRisk),
    instabilityRisk: Math.round(instabilityRisk),
    collapseRisk: Math.round(collapseRisk),
    total,
    level: getRiskLevel(total),
  };
}