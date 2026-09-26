import type { PathwaySlug } from "@/data/lore/pathways";

/** A user as the mock server stores it: auth fields plus every profile field. */
export interface MockUser {
  id: string;
  username: string;
  email: string;
  password: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  favorite_character: string | null;
  favorite_pathway: PathwaySlug | null;
  current_chapter: number;
  progress_updated_at: string | null;
  joined_at: string;
  posts: number;
  comments: number;
  likes_received: number;
}

export interface MockPost {
  id: string;
  author_id: string;
  body: string;
  tags: string[];
  spoiler_chapter: number | null;
  created_at: string;
  edited_at: string | null;
  /** Likes from accounts that don't exist in the mock, so seed posts look lived-in. */
  base_likes: number;
  comments: number;
}

interface MockDbState {
  users: MockUser[];
  posts: MockPost[];
  /** [userId, postId] */
  likes: [string, string][];
  /** [followerId, followeeId] */
  follows: [string, string][];
  /** refresh token -> user id */
  sessions: Record<string, string>;
}

const STORAGE_KEY = "lom.mockdb.v1";

export const DEMO_ACCOUNT = { email: "fool@lom.community", password: "praisethefool" };

function daysAgo(days: number) {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

function hoursAgo(hours: number) {
  return new Date(Date.now() - hours * 3_600_000).toISOString();
}

function seed(): MockDbState {
  const base = { avatar_url: null, password: "password123" };
  const users: MockUser[] = [
    {
      ...base,
      id: "00000000-0000-4000-8000-000000000000",
      username: "Fool_Above_Fog",
      email: DEMO_ACCOUNT.email,
      password: DEMO_ACCOUNT.password,
      display_name: "The Fool",
      bio: "Presiding over the long bronze table. Reads with a cup of tea and far too many theories.",
      location: "Tingen City",
      favorite_character: "Klein Moretti",
      favorite_pathway: "fool",
      current_chapter: 214,
      progress_updated_at: daysAgo(1),
      joined_at: daysAgo(40),
      posts: 12,
      comments: 58,
      likes_received: 431,
    },
    {
      ...base,
      id: "11111111-1111-4111-8111-111111111111",
      username: "Justice_of_Backlund",
      email: "justice@lom.community",
      display_name: "Miss Justice",
      bio: "Psychology enthusiast. Currently re-reading Volume 1 and taking notes on everything.",
      location: "Backlund",
      favorite_character: "Audrey Hall",
      favorite_pathway: "visionary",
      current_chapter: 1394,
      progress_updated_at: daysAgo(3),
      joined_at: daysAgo(120),
      posts: 44,
      comments: 210,
      likes_received: 2890,
    },
    {
      ...base,
      id: "22222222-2222-4222-8222-222222222222",
      username: "HangedMan_Enjoyer",
      email: "hanged@lom.community",
      display_name: "Mr. Hanged Man",
      bio: "Theories only. Every secret has a price.",
      location: "The Sonia Sea",
      favorite_character: "Alger Wilson",
      favorite_pathway: "hanged-man",
      current_chapter: 1150,
      progress_updated_at: daysAgo(6),
      joined_at: daysAgo(95),
      posts: 31,
      comments: 97,
      likes_received: 1204,
    },
    {
      ...base,
      id: "33333333-3333-4333-8333-333333333333",
      username: "Tingen_Nighthawk",
      email: "nighthawk@lom.community",
      display_name: null,
      bio: "Sleepless. Keeping watch over the feed.",
      location: "Tingen City",
      favorite_character: "Dunn Smith",
      favorite_pathway: "darkness",
      current_chapter: 88,
      progress_updated_at: daysAgo(2),
      joined_at: daysAgo(12),
      posts: 5,
      comments: 19,
      likes_received: 73,
    },
    {
      ...base,
      id: "44444444-4444-4444-8444-444444444444",
      username: "Praise_The_Sun",
      email: "sun@lom.community",
      display_name: "Mr. Sun",
      bio: "Bard of the City of Silver. Always looking for the light.",
      location: null,
      favorite_character: "Derrick Berg",
      favorite_pathway: "sun",
      current_chapter: 640,
      progress_updated_at: daysAgo(9),
      joined_at: daysAgo(60),
      posts: 9,
      comments: 40,
      likes_received: 388,
    },
  ];

  const [fool, justice, hanged, nighthawk, sun] = users.map((u) => u.id);
  return {
    users,
    posts: seedPosts({ fool, justice, hanged, nighthawk, sun }),
    likes: [
      [fool, "post-01"],
      [justice, "post-03"],
      [hanged, "post-01"],
    ],
    follows: [
      [justice, fool],
      [hanged, fool],
      [sun, fool],
      [fool, justice],
      [fool, hanged],
      [nighthawk, justice],
      [sun, justice],
      [hanged, justice],
      [justice, hanged],
    ],
    sessions: {},
  };
}

function load(): MockDbState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // Merge over the seed so data saved by an older mock version gains new collections.
    if (raw) return { ...seed(), ...(JSON.parse(raw) as Partial<MockDbState>) };
  } catch {
    /* corrupt or unavailable: reseed */
  }
  return seed();
}

let state = load();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota exceeded (large avatars) or storage unavailable: keep in memory only */
  }
}

export const db = {
  get users() {
    return state.users;
  },
  findUser: (predicate: (u: MockUser) => boolean) => state.users.find(predicate),
  byId: (id: string) => state.users.find((u) => u.id === id),
  byUsername: (username: string) =>
    state.users.find((u) => u.username.toLowerCase() === username.toLowerCase()),

  insertUser(user: MockUser) {
    state.users.push(user);
    persist();
  },
  updateUser(id: string, patch: Partial<MockUser>) {
    const user = state.users.find((u) => u.id === id);
    if (user) Object.assign(user, patch);
    persist();
    return user;
  },

  isFollowing: (followerId: string, followeeId: string) =>
    state.follows.some(([a, b]) => a === followerId && b === followeeId),
  follow(followerId: string, followeeId: string) {
    if (!db.isFollowing(followerId, followeeId)) state.follows.push([followerId, followeeId]);
    persist();
  },
  unfollow(followerId: string, followeeId: string) {
    state.follows = state.follows.filter(([a, b]) => !(a === followerId && b === followeeId));
    persist();
  },
  followerIds: (userId: string) => state.follows.filter(([, b]) => b === userId).map(([a]) => a),
  followingIds: (userId: string) => state.follows.filter(([a]) => a === userId).map(([, b]) => b),

  get posts() {
    return state.posts;
  },
  postById: (id: string) => state.posts.find((p) => p.id === id),
  insertPost(post: MockPost) {
    state.posts.unshift(post);
    persist();
  },
  updatePost(id: string, patch: Partial<MockPost>) {
    const post = state.posts.find((p) => p.id === id);
    if (post) Object.assign(post, patch);
    persist();
    return post;
  },
  deletePost(id: string) {
    state.posts = state.posts.filter((p) => p.id !== id);
    state.likes = state.likes.filter(([, postId]) => postId !== id);
    persist();
  },

  likeCount: (postId: string) => state.likes.filter(([, p]) => p === postId).length,
  hasLiked: (userId: string, postId: string) => state.likes.some(([u, p]) => u === userId && p === postId),
  like(userId: string, postId: string) {
    if (!db.hasLiked(userId, postId)) state.likes.push([userId, postId]);
    persist();
  },
  unlike(userId: string, postId: string) {
    state.likes = state.likes.filter(([u, p]) => !(u === userId && p === postId));
    persist();
  },

  createSession(userId: string) {
    const token = `mock-refresh.${userId}.${crypto.randomUUID()}`;
    state.sessions[token] = userId;
    persist();
    return token;
  },
  consumeSession(token: string) {
    const userId = state.sessions[token];
    delete state.sessions[token];
    persist();
    return userId;
  },

  /** Wipes all mock data back to the seed. Exposed as `window.lomMockReset()` in dev. */
  reset() {
    state = seed();
    persist();
  },
};

function seedPosts(ids: Record<"fool" | "justice" | "hanged" | "nighthawk" | "sun", string>): MockPost[] {
  const post = (
    n: number,
    author_id: string,
    hours: number,
    body: string,
    tags: string[],
    spoiler_chapter: number | null,
    base_likes: number,
    comments: number,
  ): MockPost => ({
    id: `post-${String(n).padStart(2, "0")}`,
    author_id,
    body,
    tags,
    spoiler_chapter,
    created_at: hoursAgo(hours),
    edited_at: null,
    base_likes,
    comments,
  });

  // Spoiler posts are deliberately vague: the mock text is visible in devtools.
  return [
    post(1, ids.justice, 0.2, "Re-reading Volume 1 and the foreshadowing in the first ten chapters hits so differently the second time. Starting a thread of every small detail I missed.", ["Volume 1", "Re-read"], null, 128, 34),
    post(2, ids.hanged, 1, "That chapter. I will not say anything else. If you know, you know. Come find me in the comments when you get there.", ["Theory", "Tarot Club"], 1150, 342, 97),
    post(3, ids.nighthawk, 3, "Tier list of Sequence 9 potions by how miserable the first week of digestion would be. The Sleepless have it rough.", ["Pathways", "Fun"], null, 89, 21),
    post(4, ids.sun, 5, "Just finished the arc everyone warned me about. My theory about where the story is heading completely changed. Writing up a full breakdown this weekend.", ["Theory"], 640, 57, 18),
    post(5, ids.fool, 8, "Welcome to everyone who joined this week! Set your reading progress on your profile and spoilers past your chapter will stay sealed on your feed.", ["Announcements"], null, 410, 64),
    post(6, ids.justice, 11, "Appreciation post for the Tingen arc. The slow build, the atmosphere, the small moments with family. Nothing hits quite like it.", ["Tingen", "Volume 1"], null, 233, 45),
    post(7, ids.hanged, 16, "Finished the main story last night. Still processing. I have so many questions about the final volume and I need to talk to someone who has read it.", ["Ending"], 1394, 190, 76),
    post(8, ids.nighthawk, 20, "Question for Nighthawk fans: which squad member would you trust most with your life? Explain your reasoning.", ["Tingen", "Discussion"], null, 44, 39),
    post(9, ids.sun, 26, "The worldbuilding around the pathways gets so much deeper around the mid-point. Anyone else start keeping notes on every Sequence name?", ["Pathways"], 300, 71, 12),
    post(10, ids.fool, 30, "Donghua news round-up: trailer breakdown thread coming soon. Keep theories about unreleased episodes marked as spoilers please!", ["Donghua", "Announcements"], null, 156, 28),
    post(11, ids.justice, 40, "Backlund in the fog is one of the best settings I have ever read. The Victorian atmosphere is unmatched.", ["Backlund"], null, 98, 17),
    post(12, ids.hanged, 52, "Unpopular opinion incoming about a certain reveal. Marking it at the chapter it happens so nobody gets hurt.", ["Theory", "Discussion"], 820, 63, 54),
  ];
}
