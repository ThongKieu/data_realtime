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
        // hmr:'localhost'
<<<<<<< HEAD
        // host: ["192.168.0.143"],
        // port: 5173,
        // hmr: {host: ["192.168.0.143"],},
=======
        host: ["192.168.0.44"],
        port: 5173,
        hmr: {host: ["192.168.0.44"],},
>>>>>>> 1fa5d65d3a8454812d56ef2246f0695c521c0459
        // host: ["192.168.0.44"],
        // port: 5173,
        // hmr: {host: ["192.168.0.44"],},
        host: ["192.168.0.231"],
        port: 5173,
        hmr: {host: ["192.168.0.231"],},
    },
    build:{
        chunkSizeWarningLimit: 32000,
    }

});
