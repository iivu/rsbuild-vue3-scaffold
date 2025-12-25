/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly PUBLIC_APP_TOKEN_NAME: string;
  readonly PUBLIC_APP_TITLE: string;
  readonly PUBLIC_APP_ENV: 'production' | 'test';
  readonly PUBLIC_APP_API_PREFIX: string;
  readonly PUBLIC_APP_BASE_PATH: string;
  readonly PUBLIC_APP_CDN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  // biome-ignore lint/complexity/noBannedTypes: reason
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare namespace NodeJS {
  interface ProcessEnv extends ImportMetaEnv {}
}
