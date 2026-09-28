# LOM Beta Frontend

A beta web client for the Lord of Mysteries Community Platform: an animated login/registration
page, a signed-in home page and member profiles, wired to the FastAPI backend in `backend/`.

**Stack:** React 19 · TypeScript · Vite · React Router · TanStack Query · Motion (animations) · CSS Modules

| Route           | Screen                                          |
| --------------- | ----------------------------------------------- |
| `/login`        | Sign in / register                              |
| `/`             | Home                                            |
| `/u/:username`  | Member profile                                  |
| `/p/:id`        | A single post                                   |
| `/profile`      | Redirects to your own profile                   |
| `/profile/edit` | Edit your profile (with live preview)           |

## Running it

```bash
cd beta_frontend
npm install
cp .env.example .env      # optional, the defaults work for local dev
npm run dev               # http://localhost:5173
```

The backend must be running on `http://localhost:8000` (override with `VITE_API_PROXY_TARGET`).
Endpoints the backend doesn't have yet (Profiles, Posts, Comments) are served by an in-browser
mock server. The full list of what the backend still needs is in
[`docs/BACKEND_ENDPOINTS.md`](../docs/BACKEND_ENDPOINTS.md). See [`src/mocks/README.md`](src/mocks/README.md). To try everything with **no
backend at all**, set `VITE_MOCK_API=all` and sign in as `fool@lom.community` / `praisethefool`.
The backend has no CORS middleware yet, so the Vite dev server proxies `/api/*` to it and the
browser only ever talks to one origin. A production deployment needs either the same reverse-proxy
setup or CORS enabled on the backend.

| Script              | What it does                        |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Dev server with HMR and API proxy   |
| `npm run typecheck` | Type-checks app and Vite config     |
| `npm run build`     | Type-check and production build     |
| `npm run preview`   | Serves the production build locally |

## Architecture

```
src/
├── app/                 # Composition root: App, router, navigation config
├── config/env.ts        # Typed access to VITE_* variables (API base, mock mode)
├── data/lore/           # Static LOTM reference data: pathways, chapter count, character names
├── lib/
│   ├── http/            # fetch client (auth header, single-flight token refresh, mock hook) + ApiError
│   ├── image/           # client-side image resizing
│   └── storage/         # tokenStorage, the only place that touches localStorage
├── mocks/               # In-browser mock API for endpoints the backend doesn't have yet
├── features/            # Business features, each self-contained
│   ├── auth/            # api · context · hooks · routes (guards) · components · validation · types
│   ├── comments/        # api · hooks · components (threads, @mentions) · types (= API contract)
│   ├── home/            # components · data
│   ├── posts/           # api · hooks · context (composer) · components · types (= API contract)
│   └── profile/         # api · hooks (React Query) · components · types (= API contract)
├── components/
│   ├── ui/              # Generic building blocks: Button, TextField, TextAreaField, Dialog, Avatar, CountUp, …
│   ├── feedback/        # Toast notifications
│   ├── effects/         # Visual effects: FogBackground, ParticleField, ArcaneSigil, TiltCard, VeilTransition, …
│   └── layout/          # AppShell, Sidebar (desktop), MobileNav (phone)
├── hooks/               # Cross-cutting hooks (reduced motion, pointer parallax)
├── pages/               # Route-level screens that compose features
└── styles/global.css    # Design tokens + resets
```

Dependencies point one way: `pages → features → components/lib`. Features expose a public API
through their `index.ts`, and pages import from there.

### Server state

Server data is read through TanStack Query hooks inside each feature (`features/profile/hooks`).
Mutations update the cache in place (`setQueryData`), follow and unfollow are optimistic with
rollback, and the cache is cleared on logout so one account never sees another's data.

### Spoilers

Everything is judged against the reader's saved chapter (`useReaderChapter`, 0 until known, so
unknown means "hide"). The chapter can be entered at sign-up or on the edit-profile page.

- **Posts** carry `spoiler_chapter`. `features/posts/hooks/useSpoilerGate.ts` seals a post past the
  reader's chapter (browser layer), or when the API already withheld its text (`redacted: true`,
  server layer). Set `VITE_MOCK_REDACT_SPOILERS=true` to have the mock behave like a redacting
  server.
- **Pathways** each have a `revealChapter` in `src/data/lore/pathways.ts`. Before it, the pathway
  is sealed everywhere it appears: the homepage deck, member arcana cards, author labels on posts,
  follower lists, the edit-page picker and tag suggestions (`usePathwaySpoilers`). Sealed UI never
  renders the pathway's name, Sequence or colour. **The reveal chapters in that file are
  placeholders and must be replaced with the real ones.**
- The spinning sigil ring shows before anyone logs in, so its text (`RUNE_TEXT` in
  `components/effects/ArcaneSigil.tsx`) must stay spoiler-free.

"Reveal anyway" choices are shared across the app and remembered for the browser session
(`lib/spoilers/revealStore.ts`).

### Auth flow (matches `docs/User Authentication Flow.txt` and `docs/log out flow.txt`)

- **Login**: `POST /auth/login` → store `{access_token, refresh_token}` → `GET /auth/me`.
- **Register**: `POST /auth/register`, then logs in automatically with the same credentials.
- **Session restore**: on load, if a refresh token exists, `GET /auth/me` is called.
- **Expired access token**: any `auth: true` request that returns 401 triggers one
  `POST /auth/refresh` and a retry. Refresh tokens rotate, so concurrent 401s share one refresh call.
  If refresh fails, tokens are cleared and the user is sent to `/login`.
- **Logout**: `POST /auth/logout` revokes the refresh token server-side, then local tokens are
  cleared even if that request fails.
- Backend errors (`{ success: false, error: { code, message, details } }`) become `ApiError`.
  `EMAIL_ALREADY_EXISTS`, `USERNAME_ALREADY_EXISTS` and 422 `details` map onto form fields.

Tokens are kept in `localStorage` because the backend returns them in the response body. Moving the
refresh token to an httpOnly cookie later would only require changes in `lib/storage` and `lib/http`.

### What's real and what's a preview

| Section                      | Source                                                             |
| ---------------------------- | ------------------------------------------------------------------ |
| Login / register / logout    | Live backend                                                       |
| Greeting, member arcana card | Live `/auth/me`; the arcana is your favourite pathway (else derived from your id) |
| Profiles, follow, edit       | **Mock API** until the backend implements `docs/api-contracts/profiles.md` |
| The 22 Pathways deck         | Static reference data (`src/data/lore/pathways.ts`)                |
| Road to launch               | Mirrors `docs/LOM_feature_roadmap_MVP.pdf`                         |
| Feed, posts, likes, tags     | **Mock API** until the backend implements `docs/api-contracts/posts.md` |
| Comments, replies, @mentions | **Mock API** until the backend implements `docs/api-contracts/comments.md` |

Nav items without a backend yet (Search, Wiki, Notifications, …) are shown as "Soon".

### Motion and accessibility

- All animation respects `prefers-reduced-motion` (Motion's `reducedMotion="user"`, a CSS override,
  and the particle canvas freezes).
- The particle canvas pauses while the tab is hidden.
- Split-letter headings expose the full string to screen readers via `aria-label`.
- Inputs have real labels, `aria-invalid` and `aria-describedby` for errors.
