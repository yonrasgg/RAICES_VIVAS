import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path strategy:
// - Local dev: '/'
// - GitHub Actions build: '/RAICES_VIVAS/' (project Pages subpath)
// - Override with BASE_PATH env var when needed
const base =
  process.env.BASE_PATH ??
  (process.env.GITHUB_ACTIONS ? '/RAICES_VIVAS/' : '/')

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
})
