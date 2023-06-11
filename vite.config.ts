import { defineConfig } from 'vite.config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({ plugins: [tsconfigPaths()] });
