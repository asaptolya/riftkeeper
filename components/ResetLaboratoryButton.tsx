"use client";

import { useState } from "react";
import { useLaboratory } from "@/components/LaboratoryProvider";

export default function ResetLaboratoryButton() {
  const { resetLaboratory } = useLaboratory();

  const [confirming, setConfirming] = useState(false);

  function handleReset() {
    resetLaboratory();
    setConfirming(false);
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs text-neutral-600">
          Reset all portal data?
        </span>

        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-xs text-neutral-600 transition hover:text-neutral-300"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-red-400 transition hover:text-red-300"
        >
          Reset
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-xs uppercase tracking-[0.18em] text-neutral-700 transition hover:text-neutral-400"
    >
      Reset Laboratory
    </button>
  );
}