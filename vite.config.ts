import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import type { UserConfig } from 'vite'
import { defineConfig, ModuleNode } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import { createHtmlPlugin } from 'vite-plugin-html'
import svgr from 'vite-plugin-svgr'
import topLevelAwait from 'vite-plugin-top-level-await'
import tsconfigPaths from 'vite-tsconfig-paths'
import type { InlineConfig } from 'vitest'

type ViteConfig = UserConfig & { test: InlineConfig }

const DEV_PORT = Number(process.env.VITE_DEV_PORT) || 9000

const config: ViteConfig = {
  plugins: [
    react(),
    topLevelAwait({
      promiseExportName: '__tla',
      promiseImportName: (i) => `__tla_${i}`,
    }),
    TanStackRouterVite(),
    tsconfigPaths(),
    createHtmlPlugin({
      minify: true,
      template: '/src/index.html',
      entry: '/src/main.tsx',
      inject: {
        data: {
          title: process.env.VITE_APP_NAME,
        },
      },
    }),
    svgr({
      svgrOptions: {
        svgoConfig: {
          plugins: [
            {
              name: 'removeViewBox',
              active: false,
            },
          ],
        },
      },
    }),
    process.env.NODE_ENV !== 'test' &&
      eslintPlugin({
        cache: false,
        include: './src/**/*.+(js|jsx|ts|tsx)',
      }),
    process.env.NODE_ENV !== 'test' && {
      name: 'hmr',
      handleHotUpdate({ server, modules }) {
        const disableIndexFiles = (module: ModuleNode) => {
          module.importers.forEach((item) => {
            if (item.file?.endsWith('index.tsx') || item.file?.endsWith('index.ts')) {
              module.importers.delete(item)
            } else {
              disableIndexFiles(item)
            }
          })
        }

        modules.forEach((item) => {
          disableIndexFiles(item)
          server.reloadModule(item)
        })

        return []
      },
    },
  ],
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    emptyOutDir: true,
  },
  server: {
    port: DEV_PORT,
    open: true,
  },
  preview: {
    port: DEV_PORT,
    open: true,
  },
  logLevel: 'error',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      storybook: path.resolve(__dirname, '.storybook'),
      'src-tests': path.resolve(__dirname, '__src-tests__'),
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
  test: {
    environment: 'jsdom',
    clearMocks: true,
    restoreMocks: true,
    css: false,
    globals: true,
    setupFiles: path.resolve(__dirname, '__src-tests__', 'setup.ts'),
    exclude: ['**/node_modules/**', './**/*.pw.{test,spec}.{ts,tsx}'],
  },
}

export default defineConfig(config)
