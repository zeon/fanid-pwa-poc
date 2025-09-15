import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'FanVerse',
        short_name: 'FanVerse',
        description: 'Your ultimate fan experience platform with biometric authentication, seamless ticketing, and exclusive artist content',
        theme_color: '#1c1917',
        background_color: '#0f0f0f',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        categories: ['entertainment', 'music', 'lifestyle'],
        lang: 'en-US',
        icons: [
          {
            src: '/lovable-uploads/ba436208-d24b-4c6a-bf28-464f1e48b313.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/lovable-uploads/ba436208-d24b-4c6a-bf28-464f1e48b313.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/lovable-uploads/ba436208-d24b-4c6a-bf28-464f1e48b313.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/lovable-uploads/ba436208-d24b-4c6a-bf28-464f1e48b313.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/lovable-uploads/ba436208-d24b-4c6a-bf28-464f1e48b313.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/lovable-uploads/ba436208-d24b-4c6a-bf28-464f1e48b313.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Dashboard',
            short_name: 'Dashboard',
            description: 'View your dashboard and upcoming events',
            url: '/dashboard',
            icons: [
              {
                src: '/lovable-uploads/ba436208-d24b-4c6a-bf28-464f1e48b313.png',
                sizes: '96x96'
              }
            ]
          },
          {
            name: 'Tickets',
            short_name: 'Tickets',
            description: 'Access your active tickets',
            url: '/active-tickets',
            icons: [
              {
                src: '/lovable-uploads/ba436208-d24b-4c6a-bf28-464f1e48b313.png',
                sizes: '96x96'
              }
            ]
          },
          {
            name: 'Profile',
            short_name: 'Profile',
            description: 'Manage your profile settings',
            url: '/profile',
            icons: [
              {
                src: '/lovable-uploads/ba436208-d24b-4c6a-bf28-464f1e48b313.png',
                sizes: '96x96'
              }
            ]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
