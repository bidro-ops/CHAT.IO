import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import React from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [
    tailwindcss(),
    React(),
    tailwindcss()
  ],
  server: {
  host: "localhost",
  port: 5173,
  strictPort: true, 
      hmr: {
      clientPort: 5173, 
    },
},
})