import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import eslintConfig from './.eslintrc.json';
import type { Linter } from 'eslint';
import { resolve } from 'path';

if (
    typeof process.env.VITE_SERVER_URL === 'string' &&
    process.env.VITE_SERVER_URL.length > 0
) {
    import.meta.env.VITE_SERVER_URL = process.env.VITE_SERVER_URL;
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        eslintPlugin({
            eslintOptions: {
                cache: false,
                baseConfig: eslintConfig as unknown as Linter.Config<
                    Linter.RulesRecord,
                    Linter.RulesRecord
                >,
            },
        }),
    ],
    resolve: {
        alias: [
            { find: '@', replacement: resolve(__dirname, 'src') },
            {
                find: './runtimeConfig',
                replacement: './runtimeConfig.browser',
            },
        ],
    },
});
