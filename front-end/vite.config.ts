import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path';
export default defineConfig({
  plugins: [solid(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  build: {
    outDir: '../dist',
  },
  server: {
    proxy: {
      // 当遇到 /api 前缀时，会转发到 target
      '/api': {
        target: 'http://localhost:8000', // 你的后端地址
        changeOrigin: true,              // 是否修改请求头中的 origin
        // rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
      },
    }
  }
})
