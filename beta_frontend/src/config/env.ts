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

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "/api/v1",
  mockMode: readMockMode(),
} as const;
