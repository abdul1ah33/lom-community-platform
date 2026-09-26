/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_MOCK_API?: "off" | "users" | "all";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
