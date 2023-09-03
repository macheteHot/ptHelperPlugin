/// <reference types="vite/client" />

interface ImportMetaEnv {
  // VITE_APP_OSS_PATH: string
  // VITE_APP_BASE_OSS_URL: string
  // VITE_APP_API_BASE_URL: string
  // VITE_APP_OSS_CALLBACK_URL: string
}

interface ImportMeta {
  readonly env: readonly ImportMetaEnv
}
