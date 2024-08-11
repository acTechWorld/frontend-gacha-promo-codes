import { fileURLToPath, URL } from 'node:url'
import SitemapPlugin from 'vite-plugin-sitemap'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/Ò
export default defineConfig({
  plugins: [
    vue(),
    SitemapPlugin({
      base: 'https://genshin-impact.gachacodes.com',
      // base: 'https://summoners-war.gachacodes.com',

      // Optionally add more configurations
      options: {
        lastMod: true // Optional: Add last modified date
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'es2022' // Change to 'es2022' or newer
  }
})
