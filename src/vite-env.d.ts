/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_EMAIL: string;
  readonly VITE_GITHUB_HANDLE: string;
  readonly VITE_GITHUB_URL: string;
  readonly VITE_LINKEDIN_HANDLE: string;
  readonly VITE_LINKEDIN_URL: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_WHATSAPP_URL: string;
  readonly VITE_RESUME_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}