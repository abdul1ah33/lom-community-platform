# LOM Beta Frontend

A beta web client for the Lord of Mysteries Community Platform: an animated login/registration
page and a signed-in home page, wired to the FastAPI auth endpoints in `backend/`.

**Stack:** React 19 · TypeScript · Vite · React Router · Motion (animations) · CSS Modules

## Running it

```bash
cd beta_frontend
npm install
cp .env.example .env      # optional, the defaults work for local dev
npm run dev               # http://localhost:5173
```

The backend must be running on `http://localhost:8000` (override with `VITE_API_PROXY_TARGET`).
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
├── config/env.ts        # Typed access to VITE_* variables
├── lib/
│   ├── http/            # fetch client (auth header, single-flight token refresh) + ApiError
│   └── storage/         # tokenStorage, the only place that touches localStorage
├── features/            # Business features, each self-contained
│   ├── auth/            # api · context · hooks · routes (guards) · components · validation · types
│   └── home/            # components · data
├── components/
│   ├── ui/              # Generic building blocks: Button, TextField, Avatar, Icon, …
│   ├── effects/         # Visual effects: FogBackground, ParticleField, ArcaneSigil, TiltCard, VeilTransition, …
│   └── layout/          # AppShell, Sidebar (desktop), MobileNav (phone)
├── hooks/               # Cross-cutting hooks (reduced motion, pointer parallax)
├── pages/               # Route-level screens that compose features
└── styles/global.css    # Design tokens + resets
```

Dependencies point one way: `pages → features → components/lib`. Features expose a public API
through their `index.ts`, and pages import from there.

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
| Greeting, member arcana card | Live `/auth/me` data (the arcana is derived from the user id)      |
| The 22 Pathways deck         | Static reference data (`features/home/data/pathways.ts`)           |
| Road to launch               | Mirrors `docs/LOM_feature_roadmap_MVP.pdf`                         |
| Community feed, tags         | **Sample data** (`features/home/data/previewFeed.ts`), labelled in the UI |

Nav items without a backend yet (Search, Wiki, Notifications, …) are shown as "Soon".

### Motion and accessibility

- All animation respects `prefers-reduced-motion` (Motion's `reducedMotion="user"`, a CSS override,
  and the particle canvas freezes).
- The particle canvas pauses while the tab is hidden.
- Split-letter headings expose the full string to screen readers via `aria-label`.
- Inputs have real labels, `aria-invalid` and `aria-describedby` for errors.
