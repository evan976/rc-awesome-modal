import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'packages', replacement: resolve(__dirname, 'packages') },
      { find: 'core', replacement: resolve(__dirname, 'core') },
    ]
  }
})