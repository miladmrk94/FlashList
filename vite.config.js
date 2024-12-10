import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'


// Export Vite Configuration
export default defineConfig({
  base: "/FlashList",
  plugins: [
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates service workers
      manifest: {
        name: 'Flash List',
        short_name: 'FlashList',
        description: 'A fully offline Progressive Web App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [],
        globPatterns: [
          '**/*', // Cache all files for full offline support
        ],
        globDirectory: 'dist', // Adjust based on build output directory
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
