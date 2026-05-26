import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- החיבור החדש של גרסה 4!

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- מפעיל את טיילוינד בתוך השרת
  ],
})