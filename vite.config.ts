import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000 // 포트를 Nextjs 데브서버와 통일시켰음.(헷갈려서)
  },
  build:{
    rollupOptions:{
      external: ['pyodide'],
      output: {
        globals: {
          pyodide: 'pyodide',
        },
      },
    }
  },
  assetsInclude:[
    "**/*.py"
  ]
})
