# Wiki API contract (proposed)

The spoiler-safe in-app wiki (roadmap Phase 3). The frontend serves this from its in-browser mock
(`beta_frontend/src/mocks/handlers/wiki.ts`, content in `src/mocks/data/wiki.ts`) until the backend
implements it. Types: `beta_frontend/src/features/wiki/types.ts`; keep the two in sync.

Anything our wiki doesn't cover links out to the community Fandom wiki, behind a spoiler warning.
That is purely frontend; the backend doesn't need to know about Fandom.

Base path: `/api/v1`. Both endpoints are public; a bearer token is accepted but not required.

---

## Data model

**`wiki_entries`**

| Column           | Type          | Rules                                                                 |
| ---------------- | ------------- | --------------------------------------------------------------------- |
| `slug`           | text PK       | lowercase, `a-z0-9-`; pathway entries use the pathway slug (`seer`)    |
| `category`       | text          | `characters` \| `pathways` \| `sequences` \| `artifacts` \| `organizations` \| `locations` |
| `title`          | text          | ≤ 120                                                                 |
| `summary`        | text          | ≤ 500; must be safe at `reveal_chapter`                               |
| `reveal_chapter` | int           | 0–1394; first chapter where the title and summary are safe. 0 = always |
| `aliases`        | text[]        | other names it is searched by                                         |
| `updated_at`     | timestamptz   |                                                                       |

**`wiki_sections(entry_slug, position, heading, body, spoiler_chapter)`**: ordered by `position`.
`spoiler_chapter` is NULL when the section is safe once the entry itself is.

Editing (create/update/delete) is part of the admin dashboard (roadmap Phase 4) and not specified
here. Until then, seed the tables from `src/mocks/data/wiki.ts` once its chapters are verified.

---

## Objects

`WikiEntrySummary`, returned by search:

```json
{
  "slug": "audrey-hall",
  "category": "characters",
  "title": "Audrey Hall",
  "summary": "A young noblewoman of Backlund…",
  "reveal_chapter": 10
}
```

`WikiEntry` = the summary plus:

```json
{
  "aliases": ["Justice"],
  "sections": [{ "heading": "Family", "body": "…", "spoiler_chapter": null }],
  "updated_at": "2026-10-08T00:00:00Z"
}
```

### Spoilers

Same idea as posts: the frontend compares `reveal_chapter` / `spoiler_chapter` with the reader's
`current_chapter` and seals anything past it behind "Reveal anyway". The backend returns everything
as-is. (An optional server layer, like post redaction, can come later.)

---

## Endpoints

### `GET /wiki/entries` → `200 Page<WikiEntrySummary>`

| Query      | Notes                                                                           |
| ---------- | ------------------------------------------------------------------------------- |
| `q`        | optional; case-insensitive match on title, aliases and summary                   |
| `category` | optional; one of the six categories                                             |
| `cursor`   | opaque, from `next_cursor`                                                      |
| `limit`    | default 24, max 50                                                              |

Without `q`: browse order (by category, then title). With `q`, best matches first: title prefix,
then title contains, then alias, then summary. Postgres full-text or `pg_trgm` both work.

### `GET /wiki/entries/{slug}` → `200 WikiEntry`

`404 WIKI_ENTRY_NOT_FOUND` if missing (the frontend then offers a Fandom search).

## New error codes

`WIKI_ENTRY_NOT_FOUND` (404).
