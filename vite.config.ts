import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set base to the repo name so assets are served from /ATP-Planning-Compliance/
export default defineConfig({
  base: '/ATP-Planning-Compliance/',
  plugins: [react()],
});