import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'packages': resolve(__dirname, 'packages'),
      '@components': resolve(__dirname, 'packages/components'),
      '@utils': resolve(__dirname, 'packages/utils'),
      '@hooks': resolve(__dirname, 'packages/hooks'),
    }
  }
})