"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";

import type { LaboratoryState } from "@/types/laboratory";
import type { Portal } from "@/types/portal";
import type { PortalEvent } from "@/types/event";

import { initialPortals } from "@/lib/seed";
import {
  loadLaboratoryState,
  saveLaboratoryState,
} from "@/lib/storage";

interface LaboratoryContextValue {
  state: LaboratoryState;
  updatePortal: (portal: Portal, event: PortalEvent) => void;
  resetLaboratory: () => void;
}

type LaboratoryAction =
  | {
      type: "UPDATE_PORTAL";
      portal: Portal;
      event: PortalEvent;
    }
  | {
      type: "LOAD_STATE";
      state: LaboratoryState;
    }
  | {
      type: "RESET";
    };

const initialState: LaboratoryState = {
  portals: initialPortals,
  eventLog: [],
};

function laboratoryReducer(
  state: LaboratoryState,
  action: LaboratoryAction
): LaboratoryState {
  switch (action.type) {
    case "UPDATE_PORTAL":
      return {
        portals: state.portals.map((portal) =>
          portal.id === action.portal.id
            ? action.portal
            : portal
        ),
        eventLog: [action.event, ...state.eventLog],
      };

    case "LOAD_STATE":
      return action.state;

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

const LaboratoryContext =
  createContext<LaboratoryContextValue | null>(null);

export function LaboratoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    laboratoryReducer,
    initialState
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedState = loadLaboratoryState();

    if (savedState) {
      dispatch({
        type: "LOAD_STATE",
        state: savedState,
      });
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    saveLaboratoryState(state);
  }, [state, hydrated]);

  function updatePortal(
    portal: Portal,
    event: PortalEvent
  ) {
    dispatch({
      type: "UPDATE_PORTAL",
      portal,
      event,
    });
  }

  function resetLaboratory() {
    dispatch({
      type: "RESET",
    });
  }

  return (
    <LaboratoryContext.Provider
      value={{
        state,
        updatePortal,
        resetLaboratory,
      }}
    >
      {children}
    </LaboratoryContext.Provider>
  );
}

export function useLaboratory() {
  const context = useContext(LaboratoryContext);

  if (!context) {
    throw new Error(
      "useLaboratory must be used inside LaboratoryProvider"
    );
  }

  return context;
}