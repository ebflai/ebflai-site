import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/ebflai-site/', // ⬅️ replace with your actual repo name if different
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        chat: resolve(__dirname, 'chat.html'),
        lgs: resolve(__dirname, 'lgs.html'),
        yks: resolve(__dirname, 'yks.html'),
        credits: resolve(__dirname, 'credits.html'), 
      },
    },
  },
});
