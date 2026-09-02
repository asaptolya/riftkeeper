"use client";

import { useLaboratory } from "@/components/LaboratoryProvider";

function getEventStyle(type: string) {
  switch (type) {
    case "blocked":
      return "text-red-400 border-red-500/20";
    case "warning":
      return "text-amber-300 border-amber-400/20";
    default:
      return "text-neutral-300 border-white/10";
  }
}

export default function EventLog() {
  const { state } = useLaboratory();

  if (state.eventLog.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-3xl text-neutral-300">
          The chronicle is empty.
        </p>

        <p className="mt-3 text-sm text-neutral-600">
          Portal actions will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {state.eventLog.map((event) => (
        <article
          key={event.id}
          className={`border-l pl-5 ${getEventStyle(event.type)}`}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="font-serif text-lg text-neutral-200">
              {event.portalName}
            </h3>

            <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">
              {event.type}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            {event.message}
          </p>

          {event.riskBefore !== undefined &&
            event.riskAfter !== undefined &&
            event.riskBefore !== event.riskAfter && (
              <p className="mt-2 text-xs text-neutral-600">
                Risk {event.riskBefore} → {event.riskAfter}
              </p>
            )}

          <p className="mt-2 text-[10px] uppercase tracking-wider text-neutral-700">
            {new Date(event.timestamp).toLocaleString()}
          </p>
        </article>
      ))}
    </div>
  );
}