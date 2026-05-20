import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  environment: {
    // Força o Vite a ignorar o cache rígido de nomes de arquivos do Rolldown no Linux
    ROLLDOWN_FORCE_REBUILD: 'true'
  },
  build: {
    // Garante que o build limpe a pasta antes de começar
    emptyOutDir: true,
    // Desativa travar o build por diferenças estritas de letras maiúsculas/minúsculas no bundler
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'CIRCULAR_DEPENDENCY' || warning.code === 'UNRESOLVED_IMPORT') return;
        warn(warning);
      }
    }
  }
})