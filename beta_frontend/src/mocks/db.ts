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

interface MockDbState {
  users: MockUser[];
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
    if (raw) return JSON.parse(raw) as MockDbState;
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
