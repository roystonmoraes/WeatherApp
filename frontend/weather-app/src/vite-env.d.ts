interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    readonly VITE_DEFAULT_CITY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}