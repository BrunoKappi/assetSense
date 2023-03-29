import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import eslintPlugin from 'vite-plugin-eslint'; // importe o plugin

export default defineConfig({
  plugins: [
    react(),
    //eslintPlugin(), // adicione o plugin
  ],
});  