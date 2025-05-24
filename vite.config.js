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
            '@Auth': path.resolve(__dirname, './src/modules/Auth'),
            '@Chat': path.resolve(__dirname, './src/modules/Chat'),
            '@Connections': path.resolve(__dirname, './src/modules/Connections'),
            '@CoreUI': path.resolve(__dirname, './src/modules/CoreUI'),
            '@Profile': path.resolve(__dirname, './src/modules/Profile'),
            '@Feed': path.resolve(__dirname, './src/modules/Feed'),
            icons: path.resolve(__dirname, './src/icons'),
            hooks: path.resolve(__dirname, './src/hooks'),
            modules: path.resolve(__dirname, './src/modules'),
            services: path.resolve(__dirname, './src/services'),
            src: path.resolve(__dirname, './src'),
        },
    },
})
