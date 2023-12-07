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
        host: ["127.0.0.1"],
        port: 5173,
        hmr: {
            host: ["127.0.0.1"],
        },
    },
    build:{
        chunkSizeWarningLimit: 1600,
    }

});
