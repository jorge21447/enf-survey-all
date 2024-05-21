import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js','resources/app/main.jsx'],
            refresh: true,
            postcss:[
                tailwindcss(),
                autoprefixer(),
            ]
        }),
        react(),
    ],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/app'),
        },
    },
    build: {
        chunkSizeWarningLimit:4000
    }
});
