import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@Auth': path.resolve(__dirname, './src/modules/Auth'),
            '@CoreUI': path.resolve(__dirname, './src/modules/CoreUI'),
            '@Profile': path.resolve(__dirname, './src/modules/Profile'),
            '@Feed': path.resolve(__dirname, './src/modules/Feed'),
            modules: path.resolve(__dirname, './src/modules'),
            services: path.resolve(__dirname, './src/services'),
            src: path.resolve(__dirname, './src'),
        },
    },
})
