import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      return html.replace(/="\//g, '="./')
    }
  }
}

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 2048,
    outDir: './docs',
    assetsDir: './',
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].[ext]`,
        assetFileNames: `[name].[ext]`,
      },

    }
  },
  plugins: [
    react(),
    htmlPlugin()
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
