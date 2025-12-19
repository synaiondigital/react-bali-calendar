import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        utils: 'src/utils/index.ts',
        hooks: 'src/hooks/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: true,
    external: ['react', 'react-dom'],
    injectStyle: false, // Export CSS separately for Turbopack compatibility
});
