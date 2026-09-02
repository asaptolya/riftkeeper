"use client";

import { useLaboratory } from "@/components/LaboratoryProvider";
import { calculatePortalRisk } from "@/lib/portalRisk";

const runes = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ"];

export default function VeilStatus() {
  const { state } = useLaboratory();

  const activePortals = state.portals.filter(
    (portal) => portal.status !== "closed"
  );

  const criticalPortals = activePortals.filter(
    (portal) => calculatePortalRisk(portal).level === "critical"
  );

  const averageRisk =
    activePortals.length > 0
      ? activePortals.reduce(
          (sum, portal) => sum + calculatePortalRisk(portal).total,
          0
        ) / activePortals.length
      : 0;

  const veilIntegrity = Math.max(
    0,
    Math.min(100, Math.round(100 - averageRisk))
  );

  const unstable = criticalPortals.length > 0;

  return (
    <div className="relative flex h-[430px] w-[430px] items-center justify-center">
      {/* ambient glow */}
      <div className="absolute inset-[20%] rounded-full bg-violet-500/[0.05] blur-[80px]" />

      {/* outer orbit */}
      <div className="absolute inset-[3%] animate-[veilSpin_100s_linear_infinite]">
        {runes.map((rune, index) => {
          const angle = (360 / runes.length) * index;

          return (
            <span
              key={`${rune}-${index}`}
              className="absolute left-1/2 top-1/2 font-serif text-sm text-violet-300/20"
              style={{
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translateY(-190px)
                  rotate(-${angle}deg)
                `,
              }}
            >
              {rune}
            </span>
          );
        })}
      </div>

      {/* large circles */}
      <div className="absolute inset-[13%] rounded-full border border-white/[0.04]" />

      <div className="absolute inset-[20%] animate-[veilSpinReverse_70s_linear_infinite] rounded-full border border-dashed border-violet-300/[0.10]" />

      <div className="absolute inset-[29%] rounded-full border border-white/[0.06]" />

      {/* cross lines */}
      <div className="absolute left-1/2 top-[17%] h-[66%] w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />

      <div className="absolute left-[17%] top-1/2 h-px w-[66%] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      {/* diagonal marks */}
      <div className="absolute left-[24%] top-[24%] h-[52%] w-px rotate-45 bg-white/[0.025]" />
      <div className="absolute right-[24%] top-[24%] h-[52%] w-px -rotate-45 bg-white/[0.025]" />

      {/* orbiting dots */}
      <div className="absolute inset-[8%] animate-[veilSpin_30s_linear_infinite]">
        <span className="absolute left-1/2 top-0 h-1 w-1 rounded-full bg-violet-300/60 shadow-[0_0_8px_rgba(196,181,253,0.4)]" />
        <span className="absolute bottom-[8%] right-[12%] h-[3px] w-[3px] rounded-full bg-violet-300/35" />
      </div>

      <div className="absolute inset-[18%] animate-[veilSpinReverse_43s_linear_infinite]">
        <span className="absolute left-0 top-1/2 h-[3px] w-[3px] rounded-full bg-white/30" />
      </div>

      {/* center */}
      <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/[0.05]">
        <div className="absolute inset-[14%] rounded-full border border-violet-300/[0.08]" />

        <div className="text-center">
          <p className="font-serif text-6xl tracking-[-0.07em] text-neutral-200">
            {String(veilIntegrity).padStart(2, "0")}
          </p>

          <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-neutral-700">
            Veil integrity
          </p>
        </div>
      </div>

      {/* subtle critical pulse */}
      {unstable && (
        <div className="pointer-events-none absolute inset-[27%] animate-[veilCriticalPulse_3s_ease-in-out_infinite] rounded-full border border-red-400/[0.10]" />
      )}
    </div>
  );
}