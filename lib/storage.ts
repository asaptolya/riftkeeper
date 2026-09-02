import type { LaboratoryState } from "@/types/laboratory";

const STORAGE_KEY = "portal-laboratory-state";

export function saveLaboratoryState(state: LaboratoryState): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadLaboratoryState(): LaboratoryState | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return null;

    return JSON.parse(stored) as LaboratoryState;
  } catch {
    return null;
  }
}

export function clearLaboratoryState(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}