import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import qiankun from 'vite-plugin-qiankun'
import { defineConfig } from 'vite'

export default defineConfig({
  // 子应用独立部署时按实际 CDN 目录设置 VITE_PUBLIC_PATH。
  base: process.env.VITE_PUBLIC_PATH ?? '/',
  plugins: [vue(), qiankun('vue-admin', { useDevMode: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
  server: {
    port: 7102,
    cors: true,
    // 主应用通过 qiankun 拉取子应用 HTML 和资源，开发态需要显式允许 CORS。
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
  },
})
