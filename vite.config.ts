import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Stellt sicher, dass der Ordner so heißt
    emptyOutDir: true, // Löscht alten Müll vor dem Bauen
  },
})