import path from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

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
  plugins: [svelte({ extensions: ['.svelte'], emitCss: false })]
})
