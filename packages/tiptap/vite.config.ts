import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: path.resolve('./index.html')
      }
    },
    minify: false
  },
  plugins: [react()]
})
