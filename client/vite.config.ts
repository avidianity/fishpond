import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import eslintConfig from './.eslintrc.json';
import type { Linter } from 'eslint';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

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
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
            includeAssets: ['vite.svg'],
            manifest: {
                name: 'LookApond',
                short_name: 'LookApond',
                description:
                    'cross-platform buy and rental of fishpond ng binmaley',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'manifest-icon-192.maskable.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any',
                    },
                    {
                        src: 'manifest-icon-192.maskable.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: 'manifest-icon-512.maskable.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any',
                    },
                    {
                        src: 'manifest-icon-512.maskable.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
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
