import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Note the 'plugin-' part here

export default defineConfig({
  plugins: [react()],
  base: '/convex/', 
})