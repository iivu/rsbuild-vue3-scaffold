import { defineConfig, loadEnv, type ProxyOptions } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import VueComponentAutoImport from 'unplugin-vue-components/rspack';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/rspack';

const isBuild = process.env.NODE_ENV === 'production';
const { publicVars } = loadEnv({ prefixes: ['APP_'] });
const proxyConfigs: Record<string, string | ProxyOptions> = {
  '/api': {
    target: process.env.APP_API_PREFIX,
    pathRewrite: (path) => path.replace(/^\/api/, ''),
  },
};

console.log(`isBuild: ${isBuild}`);
console.log(`APP_BASE_PATH: ${process.env.APP_BASE_PATH}`);
console.log(`APP_CDN: ${process.env.APP_CDN_URL}`);
console.log(`APP_API_PREFIX: ${process.env.APP_API_PREFIX}`);

export default defineConfig({
  plugins: [pluginVue()],
  tools: {
    rspack: {
      plugins: [
        VueComponentAutoImport({
          resolvers: [VantResolver(), IconsResolver({ prefix: 'icon', enabledCollections: ['ant-design'] })],
          dts: 'src/types/vue-components-auto-import.d.ts',
        }),
        Icons({ compiler: 'vue3' }),
      ],
    },
  },
  html: {
    template: './index.html',
    title: process.env.APP_TITLE || '',
  },
  source: {
    define: {
      ...publicVars,
    },
  },
  output: {
    assetPrefix: isBuild ? process.env.APP_CDN_URL : '/',
    cssModules: {
      localIdentName: '[hash:base64:12]',
    },
  },
  server: {
    port: 6021,
    base: isBuild ? process.env.APP_BASE_PATH : '/',
    proxy: isBuild ? undefined : proxyConfigs,
  }
});
