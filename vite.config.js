import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/dnd-character-creator/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    },
    // Use default esbuild minifier (no need to specify minify option)
    // Remove terser configuration as it's not installed
  },
})
