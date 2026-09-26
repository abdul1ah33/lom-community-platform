# Posts API contract (proposed)

Status: **proposed** by the frontend. The beta frontend runs against an in-browser mock of exactly
this contract (`beta_frontend/src/mocks/handlers/posts.ts`). Change anything you like; the matching
TypeScript types live in `beta_frontend/src/features/posts/types.ts`.

Conventions are the same as [profiles.md](profiles.md): base path `/api/v1`, plain JSON responses,
errors in the existing `ErrorResponse` envelope, and `422 VALIDATION_ERROR` with
`details: [{ field, message }]`.

Auth: reads accept an optional bearer token (it fills in `viewer` and drives spoiler redaction).
Every write requires one.

---

## Data model

**`posts`**

| Column            | Type          | Rules                                                          |
| ----------------- | ------------- | -------------------------------------------------------------- |
| `id`              | uuid PK       |                                                                |
| `author_id`       | uuid FK users | `ON DELETE CASCADE`                                            |
| `body`            | text NOT NULL | trimmed, 1–2000 chars                                          |
| `spoiler_chapter` | int NULL      | `1 ≤ n ≤ 1394`; NULL = spoiler-free                            |
| `created_at`      | timestamptz   | default now()                                                  |
| `edited_at`       | timestamptz   | set on every successful PATCH                                  |

Index `(created_at DESC)` for the feed and `(author_id, created_at DESC)` for profile lists.

**`post_tags(post_id, tag)`**: PK on both, max 5 per post, each 1–30 chars after trimming a
leading `#`. Duplicates within a post are removed case-insensitively. Matching (`?tag=`) is
case-insensitive. Add an index on `lower(tag)`.

**`post_likes(user_id, post_id, created_at)`**: PK on both, cascade on either side.

`stats.comments` can be `0` until the Comments module exists.

---

## The `Post` object

```json
{
  "id": "5b1e…",
  "author": {
    "id": "0b6c…",
    "username": "HangedMan_Enjoyer",
    "display_name": "Mr. Hanged Man",
    "avatar_url": null,
    "favorite_pathway": "hanged-man"
  },
  "body": "That chapter. I will not say anything else…",
  "redacted": false,
  "tags": ["Theory", "Tarot Club"],
  "spoiler_chapter": 1150,
  "created_at": "2026-09-27T09:12:00Z",
  "edited_at": null,
  "stats": { "likes": 342, "comments": 97 },
  "viewer": { "liked": false, "is_author": false }
}
```

### Spoilers: two layers

The frontend already hides spoilers **in the browser**: if `spoiler_chapter` is greater than the
reader's `current_chapter` (from their profile), the text is blurred behind a "Reveal anyway"
button. That works with a backend that always returns the full `body`.

The **server layer** is optional and can be added any time without frontend changes. When the
requester is signed in, isn't the author, and their `current_chapter < spoiler_chapter`:

- return `"body": null` and `"redacted": true` in lists and in `GET /posts/{id}`;
- `GET /posts/{id}?reveal=true` returns the full `body` with `"redacted": false`. This is the
  reader explicitly choosing to see it, so it needs no other check.

With both layers on, spoiler text never reaches a reader's browser until they ask for it. Anonymous
requests should be treated as chapter 0.

---

## Endpoints

### `GET /posts` → `200 Page<Post>`

| Query    | Values                                  | Notes                                            |
| -------- | --------------------------------------- | ------------------------------------------------ |
| `feed`   | `latest` (default) \| `following`       | `following` = people the viewer follows **plus** their own posts; requires auth (`401` otherwise) |
| `tag`    | any tag                                 | optional, case-insensitive exact match           |
| `cursor` | opaque string from `next_cursor`        |                                                  |
| `limit`  | default 10, max 50                      |                                                  |

Newest first. The response uses the `Page` shape from profiles.md: `{ "items": [...], "next_cursor": "…" | null }`.

### `POST /posts` → `201 Post`

```json
{ "body": "…", "tags": ["Theory"], "spoiler_chapter": 900 }
```

`tags` and `spoiler_chapter` are optional (default `[]` / `null`).

### `GET /posts/{id}` → `200 Post`

Optional `?reveal=true` (see Spoilers). `404 POST_NOT_FOUND` if missing.

### `PATCH /posts/{id}` → `200 Post`

Partial: any of `body`, `tags`, `spoiler_chapter` (`null` clears the spoiler). Author only
(`403 FORBIDDEN`). Sets `edited_at`.

### `DELETE /posts/{id}` → `204`

Author only (`403 FORBIDDEN`). Also removes its tags and likes. Later, moderators should be able to
delete too (roadmap Phase 4).

### `POST /posts/{id}/like` → `204` and `DELETE /posts/{id}/like` → `204`

Idempotent, like follow/unfollow. `404 POST_NOT_FOUND`.

### `GET /users/{username}/posts` → `200 Page<Post>`

Same query params as the feed except `feed` and `tag`. `404 USER_NOT_FOUND`.

### `GET /tags/trending` → `200 TrendingTag[]`

```json
[{ "tag": "Theory", "count": 4 }, { "tag": "Backlund", "count": 2 }]
```

Up to 10 tags, most used first. The mock counts all posts; the real one should probably only
count recent posts (e.g. the last 7 days).

---

## Knock-on change to profiles

`UserProfile.stats.posts` should be the real count of the user's posts, and `likes_received` the
sum of likes on them.

## New error codes

`POST_NOT_FOUND`. The existing `FORBIDDEN`, `VALIDATION_ERROR`, `USER_NOT_FOUND` and
`INVALID_ACCESS_TOKEN` are reused.

## Not in this round (planned)

Image attachments (`POST /uploads/images` and then `image_ids` on create), bookmarks (the icon is
already on every card, disabled), and comments.
