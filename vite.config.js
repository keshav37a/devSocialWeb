import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
    build: {
        minify: 'terser',
    },
    plugins: [eslint(), react(), tailwindcss()],
    resolve: {
        alias: {
            '@auth': path.resolve(__dirname, './src/modules/auth'),
            '@chat': path.resolve(__dirname, './src/modules/chat'),
            '@components': path.resolve(__dirname, './src/modules/components'),
            '@connections': path.resolve(__dirname, './src/modules/connections'),
            '@connection-requests': path.resolve(__dirname, './src/modules/connection-requests'),
            '@layout': path.resolve(__dirname, './src/modules/layout'),
            '@user-profile': path.resolve(__dirname, './src/modules/user-profile'),
            '@feed': path.resolve(__dirname, './src/modules/feed'),
            icons: path.resolve(__dirname, './src/icons'),
            hooks: path.resolve(__dirname, './src/hooks'),
            services: path.resolve(__dirname, './src/services'),
            src: path.resolve(__dirname, './src'),
        },
    },
})
