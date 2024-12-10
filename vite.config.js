import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'


// Export Vite Configuration
export default defineConfig({
  base: "/FlashList",
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Offline App',
        short_name: 'OfflineApp',
        description: 'A fully offline Progressive Web App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/vite.svg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/vite.svg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globDirectory: 'dev-dist', // Adjust to the correct build output directory
        globPatterns: ['**/*'], // Match everything for full offline
        globIgnores: [
          '**/node_modules/**/*',
          'sw.js',
          'workbox-*.js',
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
