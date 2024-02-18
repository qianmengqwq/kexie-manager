import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      /** @ 符号指向 src 目录 */
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/getPic': {
        changeOrigin: true,
        target: 'https://kexie.cos.wuster.world',
        headers: {
          Referer: 'https://kexie.cos.wuster.world',
        },
        rewrite: (path) => path.replace(/^\/getPic/, ''),
      },
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:8080',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
