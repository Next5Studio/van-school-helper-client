import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { viteRequire } from 'vite-require'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteRequire()],
    resolve: {
        alias: {
            '@assets': resolve(__dirname, 'src/assets'),
            '@config': resolve(__dirname, 'src/config'),
            '@pages': resolve(__dirname, 'src/pages'),
            '@shared': resolve(__dirname, 'src/shared'),
            '@widgets': resolve(__dirname, 'src/widgets'),
            '@services': resolve(__dirname, 'src/services')
        }
    },
    server: {
        proxy: {
            '/api': 'http://localhost:5200'
        }
    }
})