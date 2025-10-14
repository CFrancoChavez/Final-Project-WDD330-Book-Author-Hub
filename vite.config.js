import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Final-Project-WDD330-Book-Author-Hub/', 
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
     rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        favorites: resolve(__dirname, 'src/favorites.html'),
        about: resolve(__dirname, 'src/about.html'),
       
      },
    },
  },
  server: {
    port: 5173,
    open: true
  }
});
