# Mock API

An in-browser stand-in for backend endpoints that don't exist yet, so frontend work isn't blocked.
Requests are intercepted inside `lib/http/client.ts`, so no service worker and no extra
dependency are involved. Unmatched requests fall through to the real backend.

## Modes (`VITE_MOCK_API` in `.env`)

| Mode    | Mocked                  | Real backend needed? | Default           |
| ------- | ----------------------- | -------------------- | ----------------- |
| `users` | `/users/*`              | yes, for auth        | dev               |
| `all`   | `/auth/*` and `/users/*`| no                   |                   |
| `off`   | nothing                 | yes                  | production builds |

In `users` mode the viewer is identified from the real JWT (`sub`). The first time an account is
seen, it is copied into the mock DB using the real `/auth/me`.

In `all` mode, sign in with the demo account **fool@lom.community / praisethefool**. Every other
seeded account uses the password `password123`.

## Data

Stored in `localStorage` under `lom.mockdb.v1`, so edits survive reloads. To start over, run
`lomMockReset()` in the browser console, then reload.

## Layout

```
mocks/
├── index.ts          # handleMockRequest(): routing, latency, error translation
├── router.ts         # tiny :param path matcher
├── http.ts           # json(), apiError(), validationError(): backend-shaped responses
├── identity.ts       # who is calling (mock token or real JWT)
├── db.ts             # seed data + persistence
└── handlers/
    ├── auth.ts       # mirrors backend/app/modules/auth/router.py
    └── users.ts      # the proposed contract in docs/api-contracts/profiles.md
```

When the backend implements an endpoint, delete its handler (or switch the mode) and nothing else
changes: components only talk to `features/*/api`.
