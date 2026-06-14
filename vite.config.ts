import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-mui': [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled',
          ],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux', 'redux'],
          'vendor-tiptap': [
            '@tiptap/react',
            '@tiptap/starter-kit',
            '@tiptap/extension-bullet-list',
            '@tiptap/extension-color',
            '@tiptap/extension-image',
            '@tiptap/extension-link',
            '@tiptap/extension-ordered-list',
            '@tiptap/extension-text-align',
            '@tiptap/extension-underline',
          ],
        },
      },
    },
  },
})
