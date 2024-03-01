import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Create some aliases to make the imports easier
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
      "@locales": `${__dirname}/src/locales`,
      "@styles": `${__dirname}/src/styles`,
      "@components": `${__dirname}/src/components`,
      "@containers": `${__dirname}/src/containers`,
      "@utils": `${__dirname}/src/utils`,
      "@assets": `${__dirname}/src/assets`,
      "@contexts": `${__dirname}/src/contexts`,
      "@constants": `${__dirname}/src/constants`,
      "@services": `${__dirname}/src/services`,
    },
  },
  define: { global: 'window' },
  test: {
    include: ['**/*.spec.js'],
    globals: true,
    environment: 'jsdom',
  },
})
