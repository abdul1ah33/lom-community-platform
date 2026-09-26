export type RoadmapStatus = "live" | "building" | "planned";

export interface RoadmapPhase {
  phase: number;
  title: string;
  items: string;
  status: RoadmapStatus;
}

/** Mirrors docs/LOM_feature_roadmap_MVP.pdf, "Development Order". */
export const ROADMAP: RoadmapPhase[] = [
  { phase: 1, title: "The Awakening", items: "Authentication · Profiles · Posts · Comments · Likes", status: "building" },
  { phase: 2, title: "The Gathering", items: "Following · Search · Notifications", status: "planned" },
  { phase: 3, title: "The Archive", items: "Wiki · Tags · Spoilers · Reading progress", status: "planned" },
  { phase: 4, title: "The Order", items: "Admin dashboard · Moderation · Reports", status: "planned" },
];
