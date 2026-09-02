"use client";

import { useLaboratory } from "@/components/LaboratoryProvider";
import { calculatePortalRisk } from "@/lib/portalRisk";
import { useState } from "react";
import type { Portal } from "@/types/portal";
import PortalDetails from "@/components/PortalDetails";
import PortalVisual from "@/components/PortalVisual";

const portalPositions = [
  { top: "8%", left: "56%" },
  { top: "18%", left: "26%" },
  { top: "29%", left: "72%" },
  { top: "39%", left: "42%" },
  { top: "50%", left: "18%" },
  { top: "61%", left: "67%" },
  { top: "71%", left: "35%" },
  { top: "81%", left: "76%" },
  { top: "91%", left: "46%" },
  { top: "97%", left: "20%" },
];

function getPortalTheme(id: string) {
  switch (id) {
    case "void-reach":
      return {
        core:
          "bg-[radial-gradient(circle_at_center,#c084fc_0%,#7e22ce_25%,#2e1065_52%,#020202_78%)]",
        glow: "shadow-[0_0_80px_rgba(168,85,247,0.45)]",
        rune: "border-purple-400/30",
      };

    case "burning-fissure":
      return {
        core:
          "bg-[radial-gradient(circle_at_center,#fde68a_0%,#f97316_20%,#991b1b_45%,#050505_78%)]",
        glow: "shadow-[0_0_80px_rgba(249,115,22,0.4)]",
        rune: "border-orange-400/30",
      };

    case "frostbound-gate":
      return {
        core:
          "bg-[radial-gradient(circle_at_center,#ecfeff_0%,#67e8f9_22%,#155e75_50%,#020617_80%)]",
        glow: "shadow-[0_0_75px_rgba(103,232,249,0.32)]",
        rune: "border-cyan-300/30",
      };

    case "verdant-overlook":
    case "mosswalk-hollow":
      return {
        core:
          "bg-[radial-gradient(circle_at_center,#d9f99d_0%,#4d7c0f_27%,#1a2e05_54%,#020202_80%)]",
        glow: "shadow-[0_0_75px_rgba(132,204,22,0.28)]",
        rune: "border-lime-300/25",
      };

    case "silent-wharf":
      return {
        core:
          "bg-[radial-gradient(circle_at_center,#cbd5e1_0%,#475569_30%,#172033_56%,#020202_82%)]",
        glow: "shadow-[0_0_70px_rgba(148,163,184,0.22)]",
        rune: "border-slate-300/25",
      };

    case "shattered-edge":
      return {
        core:
          "bg-[radial-gradient(circle_at_center,#f5d0fe_0%,#d946ef_20%,#581c87_48%,#020202_80%)]",
        glow: "shadow-[0_0_95px_rgba(217,70,239,0.45)]",
        rune: "border-fuchsia-300/30",
      };

    default:
      return {
        core:
          "bg-[radial-gradient(circle_at_center,#ddd6fe_0%,#7c3aed_25%,#312e81_52%,#020202_80%)]",
        glow: "shadow-[0_0_70px_rgba(124,58,237,0.28)]",
        rune: "border-violet-300/25",
      };
  }
}

function getRiskText(level: string) {
  switch (level) {
    case "critical":
      return "text-red-400";
    case "high":
      return "text-orange-400";
    case "moderate":
      return "text-amber-300";
    default:
      return "text-emerald-300";
  }
}

export default function PortalMap() {
  const { state } = useLaboratory();
  const [selectedPortalId, setSelectedPortalId] = useState<string | null>(null);
  const selectedPortal =
    state.portals.find(
        (portal) => portal.id === selectedPortalId
    ) ?? null;

    const activePortals = state.portals.filter(
      (portal) => portal.status !== "closed"
    );


  return (
    <section className="relative min-h-[2600px] overflow-hidden">
      {/* faint parchment / fog */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(88,28,135,0.08),transparent_35%),radial-gradient(circle_at_20%_70%,rgba(30,64,175,0.05),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:repeating-radial-gradient(circle_at_center,#fff_0_1px,transparent_1px_5px)]" />

      {/* wandering path */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        viewBox="0 0 1000 2600"
        preserveAspectRatio="none"
      >
        <path
          d="M560 80 C420 240, 230 300, 300 500 S780 700, 650 900 S170 1150, 260 1380 S760 1600, 600 1810 S280 2050, 470 2240 S250 2450, 180 2580"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="2"
          strokeDasharray="5 13"
        />
      </svg>

      {activePortals.length === 0 && (
        <div className="flex min-h-[700px] items-center justify-center px-8 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-700">
              Realm Map
            </p>

            <h2 className="mt-5 font-serif text-4xl text-neutral-300">
              No active gates remain.
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-neutral-600">
              Every known portal has been sealed. The veil between realms is
              currently quiet.
            </p>
          </div>
        </div>
      )}

      {activePortals.map((portal, index) => {
        const risk = calculatePortalRisk(portal);
        const position =
          portalPositions[index % portalPositions.length];
        const theme = getPortalTheme(portal.id);

        const isClosed = portal.status === "closed";

        return (
          <button
            key={portal.id}
            type="button"
            onClick={() => setSelectedPortalId(portal.id)}
            className="group absolute -translate-x-1/2 -translate-y-1/2 text-left"
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            <div className="flex items-center gap-6">
              <div className="transition-transform duration-500 group-hover:scale-125">
                <PortalVisual
                  portal={portal}
                  size={225}
                />
              </div>
              <div className="min-w-64 opacity-55 transition-all duration-300 group-hover:translate-x-3 group-hover:opacity-100">
                <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-600">
                  {portal.destination}
                </p>

                <h3 className="mt-2 font-serif text-2xl tracking-tight text-neutral-200">
                  {portal.name}
                </h3>

                <div className="mt-3 space-y-1 text-xs text-neutral-500">
                  <p>Stability — {portal.stability}%</p>
                  <p>Energy — {portal.energy}%</p>
                  <p>
                    Collapse —{" "}
                    {portal.status === "closed"
                      ? "sealed"
                      : `${portal.collapseMinutes} min`}
                  </p>
                </div>

                <p
                  className={`mt-3 text-[10px] uppercase tracking-[0.25em] ${
                    isClosed
                      ? "text-neutral-600"
                      : getRiskText(risk.level)
                  }`}
                >
                  {isClosed
                    ? "sealed"
                    : `${risk.level} · ${risk.total}`}
                </p>

                <p className="mt-3 max-w-48 text-xs italic text-neutral-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {risk.level === "critical"
                    ? "The veil grows thin."
                    : risk.level === "high"
                      ? "The gate trembles."
                      : risk.level === "moderate"
                        ? "Uncertain currents stir."
                        : "The passage remains calm."}
                </p>
              </div>
            </div>
          </button>
        );
      })}
      {selectedPortal && (
        <PortalDetails
            portal={selectedPortal}
            onClose={() => setSelectedPortalId(null)}
        />
        )}
    </section>
  );
}