import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), checker({ typescript: true })],

  server: {
    host: true,
    port: 3000
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/assets/variables.scss";
          @import "src/assets/mixins.scss";
        `
      }
    }
  }
})
