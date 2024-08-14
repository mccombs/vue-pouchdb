import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()]
        }
    },
    plugins: [
        vue(),
        vueDevTools(),
        NodeGlobalsPolyfillPlugin({
            buffer: true
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            events: 'events/'
        }
    }
})
