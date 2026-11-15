/**
 * Which endpoints the in-browser mock server answers (see src/mocks):
 * - "off":   everything goes to the real backend
 * - "users": /users/* is mocked, auth is real (backend must be running)
 * - "all":   every endpoint is mocked, so no backend is needed
 */
export type MockMode = "off" | "users" | "all";

function readMockMode(): MockMode {
  const value = import.meta.env.VITE_MOCK_API;
  if (value === "off" || value === "users" || value === "all") return value;
  return import.meta.env.DEV ? "users" : "off";
}

/** Usernames allowed into the summary desk. The demo account can use it in dev. */
function readSummaryEditors(): string[] {
  const value = import.meta.env.VITE_SUMMARY_EDITORS ?? (import.meta.env.DEV ? "Fool_Above_Fog" : "");
  return value
    .split(",")
    .map((name: string) => name.trim().toLowerCase())
    .filter(Boolean);
}

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "/api/v1",
  mockMode: readMockMode(),
  /** Mock the server-side spoiler redaction (see docs/api-contracts/posts.md). */
  mockRedactSpoilers: import.meta.env.VITE_MOCK_REDACT_SPOILERS === "true",
  /** Lower-cased usernames who can add, edit and delete summaries at /admin/summaries. */
  summaryEditors: readSummaryEditors(),
} as const;
