/// <reference types="vite/client" />

// Declaring VITE_ prefixed environment variables for TypeScript
interface ImportMetaEnv {
    readonly VITE_GQL_API_KEY: string;
    readonly VITE_GQL_API_URL: string;
    readonly VITE_SUPABASE_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  