/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_MOCK_API?: "off" | "users" | "all";
  readonly VITE_MOCK_REDACT_SPOILERS?: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
