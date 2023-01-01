import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import eslintConfig from './.eslintrc.json';
import { Linter } from 'eslint';
import { resolve } from 'path';

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
