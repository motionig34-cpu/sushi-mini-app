import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: { clientPort: 3000 },
    allowedHosts: [
      '.trycloudflare.com',
      '.cfargotunnel.com',
      '.ngrok.io',
      '.ngrok-free.app',
      '.loca.lt',
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
    ],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
