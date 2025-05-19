import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nodePolyfills from 'rollup-plugin-polyfill-node'

export default defineConfig({
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util',
    }
  },
  define: {
    'process.env': process.env
  },
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer'] // only if you're actually using it
    }),
  ],
  build: {
    sourcemap: true, // required for bundle analysis
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['stream-browserify', 'zlib', 'util'],
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['stream-browserify', 'browserify-zlib'], // if not needed at runtime
  }
})
