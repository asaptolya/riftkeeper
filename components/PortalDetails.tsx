"use client";

import type { Portal } from "@/types/portal";

import { calculatePortalRisk } from "@/lib/portalRisk";
import { getPortalRecommendation } from "@/lib/recommendations";
import { useState } from "react";

import { useLaboratory } from "@/components/LaboratoryProvider";

import {
  stabilizePortal,
  sendObserver,
  markPortalQuestionable,
  closePortal,
} from "@/lib/portalActions";

interface PortalDetailsProps {
  portal: Portal;
  onClose: () => void;
}

function getRiskColor(level: string) {
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

export default function PortalDetails({
    portal,
    onClose,
    }: PortalDetailsProps) {
    const risk = calculatePortalRisk(portal);
    const recommendation = getPortalRecommendation(portal);
    const isClosed = portal.status === "closed";
    const isCritical = risk.level === "critical";
    const observerAlreadyDeployed = portal.observerDeployed;
    const isQuestionable = portal.status === "questionable";
    const { updatePortal } = useLaboratory();
    const [closeWarningOpen, setCloseWarningOpen] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    
    function applyResult(
    result: ReturnType<typeof stabilizePortal>
    ) {
    updatePortal(result.portal, result.event);
    setFeedback(result.event.message);
    }

    function handleStabilize() {
    applyResult(stabilizePortal(portal));
    }

    function handleSendObserver() {
    applyResult(sendObserver(portal));
    }

    function handleMarkQuestionable() {
    applyResult(markPortalQuestionable(portal));
    }

    function handleClosePortal() {
    const result = closePortal(portal);

    if (result.requiresConfirmation) {
        updatePortal(result.portal, result.event);
        setCloseWarningOpen(true);
        return;
    }

    applyResult(result);
    }

    function confirmClosePortal() {
    const result = closePortal(portal, true);

    applyResult(result);
    setCloseWarningOpen(false);
    }

    return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close portal details"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-[520px] overflow-y-auto border-l border-white/[0.07] bg-[#070706]/95 shadow-[-30px_0_80px_rgba(0,0,0,0.6)]">
        <div className="p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">
                {portal.destination}
              </p>

              <h2 className="mt-3 font-serif text-4xl text-neutral-100">
                {portal.name}
              </h2>

              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-600">
                {portal.status}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-2xl text-neutral-600 transition hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="my-8 h-px bg-white/[0.06]" />

          <section>
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">
              Risk Assessment
            </p>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <span
                  className={`font-serif text-5xl ${getRiskColor(risk.level)}`}
                >
                  {risk.total}
                </span>

                <span className="ml-2 text-sm text-neutral-600">
                  / 100
                </span>
              </div>

              <p
                className={`text-xs uppercase tracking-[0.25em] ${getRiskColor(
                  risk.level
                )}`}
              >
                {risk.level}
              </p>
            </div>

            <div className="mt-7 space-y-5">
              <RiskRow
                label="Energy"
                value={portal.energy}
                contribution={risk.energyRisk}
              />

              <RiskRow
                label="Instability"
                value={100 - portal.stability}
                contribution={risk.instabilityRisk}
              />

              <RiskRow
                label="Collapse urgency"
                value={Math.min(
                  100,
                  Math.round((risk.collapseRisk / 30) * 100)
                )}
                contribution={risk.collapseRisk}
              />
            </div>

            <p className="mt-5 text-xs leading-5 text-neutral-600">
              Risk is calculated from 30% energy, 40% instability
              and 30% collapse urgency.
            </p>
          </section>

          <div className="my-8 h-px bg-white/[0.06]" />

          <section>
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">
              Portal State
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <StatBox
                label="Energy"
                value={`${portal.energy}%`}
              />

              <StatBox
                label="Stability"
                value={`${portal.stability}%`}
              />

              <StatBox
                label="Collapse"
                value={
                  portal.status === "closed"
                    ? "Sealed"
                    : `${portal.collapseMinutes} min`
                }
              />

              <StatBox
                label="Creatures"
                value={String(portal.creaturesInside)}
              />

              <StatBox
                label="Observer"
                value={portal.observerDeployed ? "Deployed" : "None"}
              />
            </div>
          </section>

          <div className="my-8 h-px bg-white/[0.06]" />

          <section>
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">
              Recommended Action
            </p>

            <h3 className="mt-4 font-serif text-2xl text-neutral-200">
              {recommendation.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              {recommendation.reason}
            </p>
          </section>

          <div className="my-8 h-px bg-white/[0.06]" />

        <section>
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">
            Actions
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleStabilize}
              disabled={isClosed}
              title={
                isClosed
                  ? "Closed portals cannot be stabilized."
                  : "Increase stability and reduce portal risk."
              }
              className="
                border border-white/10 bg-white/[0.03]
                px-4 py-3 text-sm text-neutral-300
                transition
                hover:border-white/20 hover:bg-white/[0.06]
                disabled:cursor-not-allowed
                disabled:opacity-30
                disabled:hover:border-white/10
                disabled:hover:bg-white/[0.03]
              "
            >
              Stabilize
            </button>

            <button
              type="button"
              onClick={handleSendObserver}
              disabled={
                isClosed ||
                isCritical ||
                observerAlreadyDeployed
              }
              title={
                isClosed
                  ? "Observers cannot enter a closed portal."
                  : isCritical
                    ? "Observer deployment is forbidden at critical risk."
                    : observerAlreadyDeployed
                      ? "An observer is already deployed."
                      : "Send an observer through the portal."
              }
              className="
                border border-white/10 bg-white/[0.03]
                px-4 py-3 text-sm text-neutral-300
                transition
                hover:border-white/20 hover:bg-white/[0.06]
                disabled:cursor-not-allowed
                disabled:opacity-30
                disabled:hover:border-white/10
                disabled:hover:bg-white/[0.03]
              "
            >
              {observerAlreadyDeployed
                ? "Observer Deployed"
                : "Send Observer"}
            </button>

            <button
              type="button"
              onClick={handleMarkQuestionable}
              disabled={isClosed || isQuestionable}
              title={
                isClosed
                  ? "Closed portals cannot be flagged."
                  : isQuestionable
                    ? "This portal is already marked as questionable."
                    : "Flag this portal for additional monitoring."
              }
              className="
                border border-white/10 bg-white/[0.03]
                px-4 py-3 text-sm text-neutral-300
                transition
                hover:border-white/20 hover:bg-white/[0.06]
                disabled:cursor-not-allowed
                disabled:opacity-30
                disabled:hover:border-white/10
                disabled:hover:bg-white/[0.03]
              "
            >
              {isQuestionable
                ? "Marked Questionable"
                : "Mark Questionable"}
            </button>

            <button
              type="button"
              onClick={handleClosePortal}
              disabled={isClosed}
              title={
                isClosed
                  ? "This portal is already sealed."
                  : "Seal this portal."
              }
              className="
                border border-red-500/20 bg-red-500/[0.03]
                px-4 py-3 text-sm text-red-300
                transition
                hover:border-red-500/35 hover:bg-red-500/[0.06]
                disabled:cursor-not-allowed
                disabled:opacity-30
                disabled:hover:border-red-500/20
                disabled:hover:bg-red-500/[0.03]
              "
            >
              {isClosed ? "Portal Sealed" : "Close Portal"}
            </button>
        </div>

        {feedback && (
            <p className="mt-4 border-l border-white/10 pl-3 text-xs leading-5 text-neutral-500">
            {feedback}
            </p>
        )}
        </section>

          <section>
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">
              History
            </p>

            <div className="mt-5 space-y-5">
              {[...portal.history]
                .reverse()
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="border-l border-white/10 pl-4"
                  >
                    <p className="text-sm text-neutral-400">
                      {entry.message}
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-700">
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </aside>
        {closeWarningOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 px-6 backdrop-blur-sm">
            <div className="w-full max-w-md border border-red-500/20 bg-[#0a0808] p-7 shadow-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-red-400/70">
                Warning
            </p>

            <h3 className="mt-4 font-serif text-2xl text-neutral-100">
                Creatures remain inside
            </h3>

            <p className="mt-4 text-sm leading-6 text-neutral-500">
                {portal.creaturesInside} creature(s) are still inside this portal.
                Closing it may permanently isolate them from this realm.
            </p>

            <div className="mt-7 flex justify-end gap-3">
                <button
                type="button"
                onClick={() => setCloseWarningOpen(false)}
                className="border border-white/10 px-4 py-2 text-sm text-neutral-400 transition hover:text-white"
                >
                Cancel
                </button>

                <button
                type="button"
                onClick={confirmClosePortal}
                className="border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/15"
                >
                Close Anyway
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
  );
}

function RiskRow({
  label,
  value,
  contribution,
}: {
  label: string;
  value: number;
  contribution: number;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-neutral-500">
          {label}
        </span>

        <span className="text-neutral-400">
          +{contribution}
        </span>
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-white/30"
          style={{
            width: `${Math.max(0, Math.min(100, value))}%`,
          }}
        />
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border border-white/[0.06] bg-white/[0.015] p-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-700">
        {label}
      </p>

      <p className="mt-2 font-serif text-xl text-neutral-300">
        {value}
      </p>
    </div>
  );
}