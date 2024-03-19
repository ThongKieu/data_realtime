import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
      ],
      server:{
        host: ["192.168.0.142"],
        port: 5173,
        hmr: {host: ["192.168.0.142"],},
        // host: ["192.168.0.231"],
        // port: 5173,
        // hmr: {host: ["192.168.0.231"],},
    },
    build:{
        chunkSizeWarningLimit: 32000,
    }

});
