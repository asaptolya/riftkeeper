import type { Portal } from "@/types/portal";

export const initialPortals: Portal[] = [
  {
    id: "void-reach",
    name: "Void Reach",
    destination: "Unknown Realm",

    energy: 91,
    stability: 18,
    collapseMinutes: 7,
    creaturesInside: 4,

    status: "open",
    observerDeployed: false,

    history: [
      {
        id: "void-reach-created",
        timestamp: "2026-09-01T10:00:00.000Z",
        message: "Portal registered in the laboratory.",
      },
    ],
  },

  {
    id: "verdant-overlook",
    name: "Verdant Overlook",
    destination: "Elaris",

    energy: 42,
    stability: 78,
    collapseMinutes: 180,
    creaturesInside: 0,

    status: "open",
    observerDeployed: false,

    history: [
      {
        id: "verdant-overlook-created",
        timestamp: "2026-09-01T10:04:00.000Z",
        message: "Portal registered in the laboratory.",
      },
    ],
  },

  {
    id: "burning-fissure",
    name: "Burning Fissure",
    destination: "Ashen Wastes",

    energy: 86,
    stability: 24,
    collapseMinutes: 12,
    creaturesInside: 8,

    status: "questionable",
    observerDeployed: false,

    history: [
      {
        id: "burning-fissure-created",
        timestamp: "2026-09-01T10:08:00.000Z",
        message: "Portal registered in the laboratory.",
      },
      {
        id: "burning-fissure-questionable",
        timestamp: "2026-09-01T10:10:00.000Z",
        message: "Portal marked as questionable after energy fluctuations.",
      },
    ],
  },

  {
    id: "frostbound-gate",
    name: "Frostbound Gate",
    destination: "Nivora",

    energy: 58,
    stability: 63,
    collapseMinutes: 70,
    creaturesInside: 2,

    status: "open",
    observerDeployed: false,

    history: [
      {
        id: "frostbound-gate-created",
        timestamp: "2026-09-01T10:12:00.000Z",
        message: "Portal registered in the laboratory.",
      },
    ],
  },

  {
    id: "silent-wharf",
    name: "Silent Wharf",
    destination: "Drowned Coast",

    energy: 29,
    stability: 87,
    collapseMinutes: 260,
    creaturesInside: 1,

    status: "open",
    observerDeployed: true,

    history: [
      {
        id: "silent-wharf-created",
        timestamp: "2026-09-01T10:16:00.000Z",
        message: "Portal registered in the laboratory.",
      },
      {
        id: "silent-wharf-observer",
        timestamp: "2026-09-01T10:20:00.000Z",
        message: "Observer deployed successfully.",
      },
    ],
  },

  {
    id: "echoing-depths",
    name: "Echoing Depths",
    destination: "The Hollow Deep",

    energy: 73,
    stability: 46,
    collapseMinutes: 34,
    creaturesInside: 0,

    status: "open",
    observerDeployed: false,

    history: [
      {
        id: "echoing-depths-created",
        timestamp: "2026-09-01T10:24:00.000Z",
        message: "Portal registered in the laboratory.",
      },
    ],
  },

  {
    id: "solaris-gate",
    name: "Solaris Gate",
    destination: "Helion Prime",

    energy: 64,
    stability: 56,
    collapseMinutes: 95,
    creaturesInside: 3,

    status: "open",
    observerDeployed: false,

    history: [
      {
        id: "solaris-gate-created",
        timestamp: "2026-09-01T10:28:00.000Z",
        message: "Portal registered in the laboratory.",
      },
    ],
  },

  {
    id: "mosswalk-hollow",
    name: "Mosswalk Hollow",
    destination: "Greenveil",

    energy: 36,
    stability: 75,
    collapseMinutes: 150,
    creaturesInside: 0,

    status: "open",
    observerDeployed: false,

    history: [
      {
        id: "mosswalk-hollow-created",
        timestamp: "2026-09-01T10:32:00.000Z",
        message: "Portal registered in the laboratory.",
      },
    ],
  },

  {
    id: "shattered-edge",
    name: "Shattered Edge",
    destination: "Fracture Plane",

    energy: 95,
    stability: 12,
    collapseMinutes: 4,
    creaturesInside: 6,

    status: "open",
    observerDeployed: false,

    history: [
      {
        id: "shattered-edge-created",
        timestamp: "2026-09-01T10:36:00.000Z",
        message: "Portal registered in the laboratory.",
      },
    ],
  },

  {
    id: "sealed-archive",
    name: "Sealed Archive",
    destination: "Archive Realm",

    energy: 0,
    stability: 100,
    collapseMinutes: 0,
    creaturesInside: 0,

    status: "closed",
    observerDeployed: false,

    history: [
      {
        id: "sealed-archive-created",
        timestamp: "2026-09-01T09:30:00.000Z",
        message: "Portal registered in the laboratory.",
      },
      {
        id: "sealed-archive-closed",
        timestamp: "2026-09-01T09:45:00.000Z",
        message: "Portal closed successfully.",
      },
    ],
  },
];