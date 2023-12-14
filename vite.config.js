import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    // plugins: [
    //     laravel({
    //         input: 'resources/js/app.jsx',
    //         refresh: true,
    //     }),
    //     react(),
    // ],
    plugins: [
        react(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
      ],
      server:{
        // hmr:'localhost'
        host: ["192.168.1.24"],
        port: 5173,
        hmr: {
            host: ["192.168.1.24"],
        },
    },
    build:{
        chunkSizeWarningLimit: 1600,
    }

});
