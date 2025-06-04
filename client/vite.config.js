import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'src/pages/projects.html'),
        signup: resolve(__dirname, 'src/pages/signup.html'),
        '404': resolve(__dirname, 'src/pages/404.html'),
        account: resolve(__dirname, 'src/pages/account.html'),
          setup: resolve(__dirname, 'src/pages/setup.html'),
      }
    }
  }
});
