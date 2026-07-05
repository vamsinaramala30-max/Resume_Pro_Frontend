import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    proxy: {
      // Proxy API requests to backend (runs on port 5001 by default)
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path, // keep /api prefix
      },
    },
  },
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 800,
  },
})
















