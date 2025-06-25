/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly APP_TOKEN_NAME: string;
  readonly APP_TITLE: string;
  readonly APP_ENV: 'production' | 'test';
  readonly APP_API_PREFIX: string;
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
