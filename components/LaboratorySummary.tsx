"use client";

import { useLaboratory } from "@/components/LaboratoryProvider";
import { calculatePortalRisk } from "@/lib/portalRisk";

export default function LaboratorySummary() {
  const { state } = useLaboratory();

  const openPortals = state.portals.filter(
    (portal) => portal.status !== "closed"
  );

  const closedPortals = state.portals.filter(
    (portal) => portal.status === "closed"
  );

  const criticalPortals = openPortals.filter(
    (portal) => calculatePortalRisk(portal).level === "critical"
  );

  const needsAttention = openPortals
    .map((portal) => ({
      portal,
      risk: calculatePortalRisk(portal),
    }))
    .filter(
      ({ portal, risk }) =>
        risk.level === "critical" ||
        risk.level === "high" ||
        portal.status === "questionable"
    )
    .sort((a, b) => b.risk.total - a.risk.total);

  return (
    <section className="mx-auto max-w-[1500px] px-8 pb-20">
      <div className="grid gap-px border border-white/[0.06] bg-white/[0.05] md:grid-cols-4">
        <SummaryBox
          label="Open Gates"
          value={openPortals.length}
        />

        <SummaryBox
          label="Critical"
          value={criticalPortals.length}
          critical
        />

        <SummaryBox
          label="Sealed"
          value={closedPortals.length}
        />

        <SummaryBox
          label="Need Attention"
          value={needsAttention.length}
        />
      </div>

      {needsAttention.length > 0 && (
        <div className="mt-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-700">
            Priority Watch
          </p>

          <div className="mt-5 divide-y divide-white/[0.05] border-y border-white/[0.05]">
            {needsAttention.slice(0, 4).map(({ portal, risk }, index) => (
              <div
                key={portal.id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-5">
                  <span className="text-xs text-neutral-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="font-serif text-lg text-neutral-300">
                      {portal.name}
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-neutral-700">
                      {portal.destination}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-serif text-xl text-neutral-300">
                    {risk.total}
                  </p>

                  <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600">
                    {risk.level}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function SummaryBox({
  label,
  value,
  critical = false,
}: {
  label: string;
  value: number;
  critical?: boolean;
}) {
  return (
    <div className="relative bg-[#030303] px-6 py-8">
      <p
        className={`
          font-serif text-6xl font-light tracking-[-0.07em]
          ${
            critical
              ? "text-red-300/75"
              : "text-neutral-100"
          }
        `}
      >
        {String(value).padStart(2, "0")}
      </p>

      <p className="mt-5 text-[9px] uppercase tracking-[0.3em] text-neutral-700">
        {label}
      </p>
    </div>
  );
}