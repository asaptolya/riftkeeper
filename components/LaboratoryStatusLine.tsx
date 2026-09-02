"use client";

import { useLaboratory } from "@/components/LaboratoryProvider";
import { calculatePortalRisk } from "@/lib/portalRisk";

export default function LaboratoryStatusLine() {
  const { state } = useLaboratory();

  const criticalCount = state.portals.filter(
    (portal) =>
      portal.status !== "closed" &&
      calculatePortalRisk(portal).level === "critical"
  ).length;

  const unstable = criticalCount > 0;

  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-white/[0.04] py-4">
      <div className="flex items-center gap-3">
        <span
          className={`
            h-1.5 w-1.5 rounded-full
            ${
              unstable
                ? "animate-pulse bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]"
                : "bg-emerald-400/60"
            }
          `}
        />

        <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-600">
          {unstable ? "Veil unstable" : "Veil stable"}
        </span>
      </div>

      <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-700">
        {criticalCount} critical{" "}
        {criticalCount === 1 ? "gate" : "gates"}
      </span>
    </div>
  );
}