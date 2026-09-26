/**
 * PREVIEW DATA. The Posts, Comments and Likes modules don't exist in the
 * backend yet (roadmap Phase 1). These fixtures only exist so the feed design
 * can be reviewed; replace with a `postsApi` once the endpoints land.
 */
export interface PreviewPost {
  id: string;
  author: string;
  postedAgo: string;
  body: string;
  tags: string[];
  likes: number;
  comments: number;
  /** When set, the body is hidden until the reader chooses to reveal it. */
  spoilerChapter?: number;
}

export const PREVIEW_POSTS: PreviewPost[] = [
  {
    id: "p1",
    author: "Justice_of_Backlund",
    postedAgo: "12m",
    body: "Re-reading Volume 1 and the foreshadowing in the first ten chapters hits so differently the second time. Starting a thread of every small detail I missed.",
    tags: ["Volume 1", "Re-read"],
    likes: 128,
    comments: 34,
  },
  {
    id: "p2",
    author: "HangedMan_Enjoyer",
    postedAgo: "1h",
    body: "Placeholder theory text. Spoiler posts stay blurred until the reader chooses to reveal them, and will be auto-hidden past your saved reading progress.",
    tags: ["Theory", "Tarot Club"],
    likes: 342,
    comments: 97,
    spoilerChapter: 1150,
  },
  {
    id: "p3",
    author: "Tingen_Nighthawk",
    postedAgo: "3h",
    body: "Tier list of Sequence 9 potions by how miserable the first week of digestion would be. The Sleepless have it rough.",
    tags: ["Pathways", "Fun"],
    likes: 89,
    comments: 21,
  },
];

export const TRENDING_TAGS = ["Tarot Club", "Volume 1", "Pathways", "Theory", "Backlund", "Donghua", "Re-read"];
