# Profiles API contract (proposed)

Status: **proposed** by the frontend. The beta frontend currently runs against an in-browser mock of
exactly this contract (`beta_frontend/src/mocks/handlers/users.ts`). Change anything you like; tell
the frontend and the TypeScript types in `beta_frontend/src/features/profile/types.ts` get updated
to match.

Base path: `/api/v1`. All endpoints except `GET /users/{username}` and the follower lists require
`Authorization: Bearer <access_token>`. The lists and profile read accept it optionally so
`viewer` fields can be filled in.

Responses are plain JSON (like `/auth/me` and `/auth/login`, not the `SuccessResponse` envelope).
Errors use the existing `ErrorResponse` envelope:

```json
{ "success": false, "error": { "code": "USER_NOT_FOUND", "message": "…", "details": [ … ] } }
```

---

## Data model

New columns on `users` (all nullable unless noted):

| Column               | Type          | Rules                                                               |
| -------------------- | ------------- | ------------------------------------------------------------------- |
| `display_name`       | varchar(50)   | trimmed; empty → NULL                                               |
| `bio`                | varchar(300)  | already exists; now capped at 300                                   |
| `location`           | varchar(60)   | trimmed; empty → NULL                                               |
| `favorite_character` | varchar(60)   | free text (the UI suggests names, but any text is allowed)          |
| `favorite_pathway`   | varchar(32)   | one of the 22 slugs below, or NULL                                  |
| `current_chapter`    | int, NOT NULL | default 0; `0 ≤ n ≤ 1394` (0 = not started)                         |
| `progress_updated_at`| timestamptz   | set whenever `current_chapter` changes                              |
| `avatar_url`         | text          | already exists; set by the avatar upload endpoint                   |
| `created_at`         | timestamptz   | exposed as `joined_at`; add it if the table doesn't have it yet     |

New table `follows(follower_id, followee_id, created_at)`: primary key on both ids, both FKs to
`users.id` with `ON DELETE CASCADE`, and a `CHECK (follower_id <> followee_id)`.

**Pathway slugs** (stable ids, never display names):
`fool, door, error, visionary, sun, tyrant, white-tower, hanged-man, darkness, death, twilight-giant,
demoness, red-priest, hermit, paragon, wheel-of-fortune, mother, moon, abyss, chained,
black-emperor, justiciar`

**Reserved username:** `me` must not be allowed at registration (it collides with `/users/me`).

---

## `GET /users/{username}` → `200 UserProfile`

Username lookup is case-insensitive. `404 USER_NOT_FOUND` if missing.

```json
{
  "id": "0b6c…",
  "username": "Fool_Above_Fog",
  "display_name": "The Fool",
  "avatar_url": "https://…/avatars/0b6c.jpg",
  "bio": "Presiding over the long bronze table.",
  "location": "Tingen City",
  "favorite_character": "Klein Moretti",
  "favorite_pathway": "fool",
  "reading_progress": { "current_chapter": 214, "updated_at": "2026-09-25T18:02:11Z" },
  "joined_at": "2026-08-17T10:00:00Z",
  "stats": { "posts": 12, "comments": 58, "followers": 3, "following": 2, "likes_received": 431 },
  "achievements": [
    { "code": "first_seat", "title": "A Seat at the Table", "description": "Joined the community.", "earned_at": "2026-08-17T10:00:00Z" }
  ],
  "viewer": { "is_self": true, "is_following": false }
}
```

- `stats.posts`, `comments`, `likes_received` may be `0` until those modules exist.
- `achievements` may be `[]` for now. When implemented, they are computed server-side. The mock
  awards: `first_seat` (joined), `chosen_path` (pathway set), `chapter_100`, `halfway` (≥ 697),
  `finished` (≥ 1394) and `gathering` (≥ 3 followers).
- `viewer` is `{ "is_self": false, "is_following": false }` for anonymous requests.

## `PATCH /users/me` → `200 UserProfile`

Partial update. Send only changed fields; `null` clears a nullable field.

```json
{
  "display_name": "The Fool",
  "bio": "…",
  "location": null,
  "favorite_character": "Audrey Hall",
  "favorite_pathway": "hanged-man",
  "current_chapter": 800
}
```

Validation failures → `422 VALIDATION_ERROR` with `details: [{ "field": "bio", "message": "…" }]`
(same shape as the existing handler). The frontend shows `details[].message` under the matching
field, so `field` must be the bare field name.

## `POST /users/me/avatar` → `200 UserProfile`

`multipart/form-data` with one part named `file`. The frontend already downscales to ≤ 512 px JPEG
(GIFs untouched) before sending.

| Error                            | When                          |
| -------------------------------- | ----------------------------- |
| `415 UNSUPPORTED_MEDIA_TYPE`     | not png / jpeg / webp / gif   |
| `413 FILE_TOO_LARGE`             | larger than 2 MB              |
| `422 VALIDATION_ERROR`           | `file` part missing           |

Storage (S3 / Cloudinary, per the SRS) is up to you. Only the resulting `avatar_url` matters.

## `DELETE /users/me/avatar` → `200 UserProfile`

Sets `avatar_url` to NULL.

## `POST /users/{username}/follow` → `204`

Idempotent: following twice is not an error. `400 CANNOT_FOLLOW_SELF`, `404 USER_NOT_FOUND`.

## `DELETE /users/{username}/follow` → `204`

Idempotent: unfollowing someone you don't follow is not an error.

## `GET /users/{username}/followers` and `/following` → `200 Page<UserSummary>`

Query: `limit` (default 20, max 50), `cursor` (opaque string from the previous page).

```json
{
  "items": [
    {
      "id": "…",
      "username": "Justice_of_Backlund",
      "display_name": "Miss Justice",
      "avatar_url": null,
      "favorite_pathway": "visionary",
      "viewer_is_following": true
    }
  ],
  "next_cursor": "20"
}
```

`next_cursor` is `null` on the last page. The mock uses offsets; a keyset cursor (e.g. on
`follows.created_at`) is better for the real thing. The frontend treats it as opaque.

---

## New error codes

`CANNOT_FOLLOW_SELF`, `UNSUPPORTED_MEDIA_TYPE`, `FILE_TOO_LARGE`. The existing `USER_NOT_FOUND`,
`VALIDATION_ERROR` and `INVALID_ACCESS_TOKEN` are reused.

## Switching the frontend to the real endpoints

In `beta_frontend/.env` set `VITE_MOCK_API=off` (or keep `users` while only some endpoints exist:
in that mode everything under `/users/*` is mocked and auth is real).
