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
        // host: ["192.168.0.43"],
        // port: 5173,
        // hmr: {host: ["192.168.0.43"],},
<<<<<<< HEAD
        // host: ["192.168.0.231"],
=======
        host: ["192.168.1.8"],
        port: 5173,
        hmr: {host: ["192.168.1.8"],},
        // host: ["192.168.0.142"],
>>>>>>> c8e6191fc8d54cf602a6f8db7340808c25c71cc8
        // port: 5173,
        // hmr: {host: ["192.168.0.231"],},
        host: ["192.168.0.142"],
        port: 5173,
        hmr: {host: ["192.168.0.142"],},
    },
    build:{
        chunkSizeWarningLimit: 32000,
    }

});
