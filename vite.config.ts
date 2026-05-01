import { defineConfig } from 'vite'
import react from '@vitejs/react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Since your repo is named "convex", use that here
  base: '/convex/',
})