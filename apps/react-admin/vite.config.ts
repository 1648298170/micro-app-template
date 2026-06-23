import react from '@vitejs/plugin-react'
import path from 'node:path'
import qiankun from 'vite-plugin-qiankun'
import { defineConfig, type Plugin } from 'vite'

function stripReactRefreshPreamble(): Plugin {
  return {
    name: 'strip-react-refresh-preamble-for-qiankun',
    enforce: 'post',
    transformIndexHtml(html) {
      // qiankun 的 import-html-entry 会把子应用 HTML 中的脚本收集后执行。
      // React Refresh 注入的 inline type="module" preamble 内含 import 语句，
      // 被当作普通脚本执行时会报错，所以子应用模板默认移除它。
      return html.replace(
        /<script type="module">[\s\S]*?\/@react-refresh[\s\S]*?<\/script>\s*/g,
        '',
      )
    },
  }
}

export default defineConfig({
  // 部署到 CDN 子目录时通过 VITE_PUBLIC_PATH 注入 base，避免 chunk 和静态资源 404。
  base: process.env.VITE_PUBLIC_PATH ?? '/',
  plugins: [react(), stripReactRefreshPreamble(), qiankun('react-admin', { useDevMode: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
  server: {
    port: 7101,
    cors: true,
    // qiankun 主应用跨端口加载子应用入口，开发态必须允许跨源访问。
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
