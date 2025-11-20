import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // Expanding the deduplication list to resolve persistent reconciler conflicts.
    // This ensures that critical dependencies for @react-three/fiber, including its own internal
    // dependencies like scheduler and zustand, are loaded as singletons.
    dedupe: ['react', 'react-dom', 'three', '@react-three/fiber', 'scheduler', 'zustand'],
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    // Forcing Vite to pre-bundle these can resolve complex dependency issues
    // that cause reconciler errors in @react-three/fiber.
    include: ['@react-three/fiber', 'three'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'three', '@react-three/fiber'],
        },
      },
    },
  },
});
