import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Honor the PORT env var when a launcher assigns one; default to 5173
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
