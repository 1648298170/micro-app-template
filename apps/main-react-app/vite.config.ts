import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@request': path.resolve(__dirname, '../../packages/request/src'),
      '@ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
  server: {
    port: 7000,
    cors: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
  },
})
