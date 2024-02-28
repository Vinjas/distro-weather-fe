import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Create some aliases to make the imports easier
  resolve: {
    alias: {
      '@locales': path.resolve(new URL('./src/locales', import.meta.url).pathname),
      '@styles': path.resolve(new URL('./src/styles', import.meta.url).pathname),
      '@components': path.resolve(new URL('./src/components', import.meta.url).pathname),
      '@containers': path.resolve(new URL('./src/containers', import.meta.url).pathname),
      '@utils': path.resolve(new URL('./src/utils', import.meta.url).pathname),
      '@assets': path.resolve(new URL('./src/assets', import.meta.url).pathname),
    },
  },
})
