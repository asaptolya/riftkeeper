"use client";

import type { Portal } from "@/types/portal";
import { calculatePortalRisk } from "@/lib/portalRisk";

interface PortalVisualProps {
  portal: Portal;
  size?: number;
}

const runes = [
  "ᚠ",
  "ᚢ",
  "ᚦ",
  "ᚨ",
  "ᚱ",
  "ᚲ",
  "ᚷ",
  "ᚹ",
  "ᚺ",
  "ᚾ",
];

function getPortalColors(id: string) {
  switch (id) {
    case "burning-fissure":
      return {
        primary: "#fb923c",
        secondary: "#dc2626",
        glow: "rgba(249,115,22,0.48)",
        center: "#100301",
      };

    case "frostbound-gate":
      return {
        primary: "#67e8f9",
        secondary: "#2563eb",
        glow: "rgba(103,232,249,0.4)",
        center: "#020617",
      };

    case "verdant-overlook":
      return {
        primary: "#86efac",
        secondary: "#16a34a",
        glow: "rgba(34,197,94,0.38)",
        center: "#021109",
      };

    case "mosswalk-hollow":
      return {
        primary: "#a3e635",
        secondary: "#3f6212",
        glow: "rgba(132,204,22,0.32)",
        center: "#080e03",
      };

    case "silent-wharf":
      return {
        primary: "#cbd5e1",
        secondary: "#475569",
        glow: "rgba(148,163,184,0.28)",
        center: "#04070c",
      };

    case "shattered-edge":
      return {
        primary: "#e879f9",
        secondary: "#9333ea",
        glow: "rgba(217,70,239,0.5)",
        center: "#0c0112",
      };

    case "sealed-archive":
      return {
        primary: "#78716c",
        secondary: "#44403c",
        glow: "rgba(120,113,108,0.08)",
        center: "#090807",
      };

    default:
      return {
        primary: "#c084fc",
        secondary: "#7c3aed",
        glow: "rgba(168,85,247,0.48)",
        center: "#07010d",
      };
  }
}

export default function PortalVisual({
  portal,
  size = 170,
}: PortalVisualProps) {
  const risk = calculatePortalRisk(portal);
  const colors = getPortalColors(portal.id);

  const isClosed = portal.status === "closed";
  const isCritical = risk.level === "critical";

  return (
    <div
      className={`
        group/portal relative shrink-0
        transition-transform duration-500
        group-hover/portal:scale-[1.04]
        ${isClosed ? "opacity-45 grayscale" : ""}
      `}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* ambient glow */}
      <div
        className={`
          absolute inset-[8%] rounded-full blur-3xl
          transition-all duration-500
          group-hover/portal:scale-110
          group-hover/portal:opacity-100
          ${
            isCritical
              ? "animate-[portalCriticalPulse_1.8s_ease-in-out_infinite]"
              : "opacity-70"
          }
        `}
        style={{ background: colors.glow }}
      />

      {/* animated vortex */}
      {!isClosed && (
        <div className="absolute inset-[22%] overflow-hidden rounded-full">
          <div
            className="absolute inset-[-45%] animate-[portalVortex_11s_linear_infinite] transition-transform duration-500 group-hover/portal:scale-110"
            style={{
              background: `
                conic-gradient(
                  from 0deg,
                  transparent 0deg,
                  ${colors.secondary} 38deg,
                  transparent 85deg,
                  ${colors.primary} 135deg,
                  transparent 185deg,
                  ${colors.secondary} 240deg,
                  transparent 295deg,
                  ${colors.primary} 335deg,
                  transparent 360deg
                )
              `,
              filter: "blur(8px)",
              opacity: 0.88,
            }}
          />

          {/* second energy flow */}
          <div
            className="absolute inset-[-28%] animate-[portalVortexReverse_17s_linear_infinite]"
            style={{
              background: `
                conic-gradient(
                  from 90deg,
                  transparent 0deg,
                  ${colors.primary}55 40deg,
                  transparent 90deg,
                  ${colors.secondary}88 175deg,
                  transparent 220deg,
                  ${colors.primary}66 300deg,
                  transparent 360deg
                )
              `,
              filter: "blur(11px)",
              opacity: 0.7,
            }}
          />

          {/* dark depth */}
          <div
            className="absolute inset-[12%] rounded-full"
            style={{
              background: `
                radial-gradient(
                  circle at center,
                  ${colors.center} 0%,
                  ${colors.center} 34%,
                  transparent 70%
                )
              `,
            }}
          />

          {/* unstable ring */}
          <div
            className="absolute inset-[4%] rounded-full border opacity-50 animate-[portalInnerSpin_18s_linear_infinite]"
            style={{
              borderColor: colors.primary,
              boxShadow: `
                inset 0 0 14px ${colors.glow},
                0 0 12px ${colors.glow}
              `,
            }}
          />

          {/* off-center magical arc */}
          <div
            className="absolute left-[14%] top-[18%] h-[64%] w-[70%] rounded-full border-l border-t opacity-40 animate-[portalArcDrift_8s_ease-in-out_infinite]"
            style={{
              borderColor: colors.primary,
            }}
          />
        </div>
      )}

      {/* closed center */}
      {isClosed && (
        <div className="absolute inset-[24%] rounded-full border border-white/[0.08] bg-[#0a0908]">
          <div className="absolute inset-[14%] rounded-full border border-dashed border-white/[0.07]" />
          <div className="absolute inset-[31%] rounded-full border border-white/[0.05]" />
        </div>
      )}

      {/* inner magical ring */}
      <div
        className="absolute inset-[18%] rounded-full border opacity-40"
        style={{
          borderColor: colors.primary,
          boxShadow: `0 0 12px ${colors.glow}`,
        }}
      />

      {/* rune ring */}
      <div className="absolute inset-0 animate-[portalRuneSpin_48s_linear_infinite] transition-transform duration-500 group-hover/portal:scale-[1.05]">
        {runes.map((rune, index) => {
          const angle = (360 / runes.length) * index;

          return (
            <span
              key={`${rune}-${index}`}
              className="absolute left-1/2 top-1/2 font-serif text-[14px]"
              style={{
                color: colors.primary,
                opacity: isClosed ? 0.15 : 0.65,
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translateY(-${size * 0.43}px)
                  rotate(-${angle}deg)
                `,
                textShadow: `0 0 10px ${colors.glow}`,
              }}
            >
              {rune}
            </span>
          );
        })}
      </div>

      {/* orbit ring */}
      <div className="absolute inset-[2%] animate-[portalOuterSpin_30s_linear_infinite_reverse]">
        {["◇", "✦", "ᛉ", "✧"].map((symbol, index) => {
          const angle = index * 90;

          return (
            <span
              key={symbol}
              className="absolute left-1/2 top-1/2 text-[10px]"
              style={{
                color: colors.primary,
                opacity: 0.45,
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translateY(-${size * 0.49}px)
                  rotate(-${angle}deg)
                `,
                textShadow: `0 0 8px ${colors.glow}`,
              }}
            >
              {symbol}
            </span>
          );
        })}
      </div>

      {/* fine circles */}
      <div
        className="absolute inset-[10%] rounded-full border border-dashed opacity-20 animate-[portalOuterSpin_27s_linear_infinite]"
        style={{ borderColor: colors.secondary }}
      />

      <div
        className="absolute inset-[14%] rounded-full border opacity-15 animate-[portalOuterSpin_38s_linear_infinite_reverse]"
        style={{ borderColor: colors.primary }}
      />

      {/* critical fracture */}
      {isCritical && !isClosed && (
        <>
          <div
            className="absolute left-[72%] top-[20%] h-[34%] w-px rotate-[24deg] animate-[portalFracture_2.2s_ease-in-out_infinite]"
            style={{
              background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)`,
              boxShadow: `0 0 8px ${colors.glow}`,
            }}
          />

          <div
            className="absolute left-[28%] top-[64%] h-[23%] w-px -rotate-[38deg] animate-[portalFracture_2.8s_ease-in-out_infinite]"
            style={{
              background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)`,
              boxShadow: `0 0 8px ${colors.glow}`,
            }}
          />
        </>
      )}

      {/* portal-specific details */}
      {portal.id === "burning-fissure" && !isClosed && (
        <>
          <span className="absolute left-[18%] top-[16%] text-orange-400/70 animate-pulse">
            ✦
          </span>
          <span className="absolute bottom-[16%] right-[18%] text-red-400/60 animate-pulse">
            ✦
          </span>
          <span className="absolute right-[7%] top-[28%] h-1 w-1 rounded-full bg-orange-300 shadow-[0_0_10px_#fb923c]" />
        </>
      )}

      {portal.id === "frostbound-gate" && !isClosed && (
        <>
          <span className="absolute left-[11%] top-[20%] rotate-[-20deg] text-cyan-200/60">
            ❄
          </span>
          <span className="absolute bottom-[13%] right-[14%] rotate-[20deg] text-cyan-300/50">
            ❄
          </span>
        </>
      )}

      {portal.id === "verdant-overlook" && !isClosed && (
        <>
          <span className="absolute left-[8%] top-[38%] rotate-[-25deg] text-green-300/60">
            ❧
          </span>
          <span className="absolute bottom-[12%] right-[19%] rotate-[30deg] text-green-400/50">
            ❧
          </span>
        </>
      )}

      {portal.id === "mosswalk-hollow" && !isClosed && (
        <>
          <span className="absolute left-[13%] top-[13%] text-lime-400/40">
            ✧
          </span>
          <span className="absolute bottom-[8%] left-[35%] text-lime-300/30">
            ·
          </span>
        </>
      )}

      {portal.id === "silent-wharf" && !isClosed && (
        <div className="absolute inset-[20%] rounded-full bg-slate-300/[0.04] blur-xl animate-pulse" />
      )}

      {portal.id === "shattered-edge" && !isClosed && (
        <>
          <span className="absolute -right-1 top-[22%] rotate-[25deg] text-fuchsia-300/70">
            ◇
          </span>
          <span className="absolute bottom-[15%] left-[5%] rotate-[-15deg] text-purple-300/60">
            ◇
          </span>
          <span className="absolute right-[14%] bottom-[5%] text-fuchsia-400/40">
            ◆
          </span>
        </>
      )}

      {/* particles */}
      {!isClosed && (
        <>
          <Particle
            className="left-[7%] top-[22%]"
            color={colors.primary}
            glow={colors.glow}
            animation="portalParticleA"
          />

          <Particle
            className="right-[4%] top-[42%]"
            color={colors.primary}
            glow={colors.glow}
            animation="portalParticleB"
          />

          <Particle
            className="bottom-[8%] left-[28%]"
            color={colors.secondary}
            glow={colors.glow}
            animation="portalParticleC"
          />

          <Particle
            className="right-[18%] top-[8%]"
            color={colors.primary}
            glow={colors.glow}
            animation="portalParticleD"
          />
        </>
      )}
    </div>
  );
}

function Particle({
  className,
  color,
  glow,
  animation,
}: {
  className: string;
  color: string;
  glow: string;
  animation: string;
}) {
  return (
    <span
      className={`absolute h-1 w-1 rounded-full ${className}`}
      style={{
        background: color,
        boxShadow: `0 0 9px ${glow}`,
        animation: `${animation} 5s ease-in-out infinite`,
      }}
    />
  );
}