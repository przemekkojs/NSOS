/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_API_GATEWAY_URL: string
  readonly VITE_MSW?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
