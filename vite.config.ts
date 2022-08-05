import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import proxy from './config/proxy'

const pathResolve = (dir: string) => {
	// ts-ignore-line
	return resolve(__dirname, dir)
}

const alias: Record<string, string> = {
	'@': pathResolve('./src/'),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
}
// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv) => {
	const env = loadEnv(config.mode, process.cwd())
	console.log(config)
	return {
		resolve: {
			alias,
		},
		plugins: [vue()],
		base: config.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
		optimizeDeps: {
			include: [
				'element-plus/lib/locale/lang/zh-cn',
				'element-plus/lib/locale/lang/en',
				'element-plus/lib/locale/lang/zh-tw',
			],
		},
		server: {
			proxy: proxy[config.mode],
		},
		build: {
			outDir: 'dist',
			sourcemap: false,
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					entryFileNames: `assets/[name].${new Date().getTime()}.js`,
					chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
					assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
					compact: true,
					manualChunks: {
						vue: ['vue', 'vue-router', 'pinia'],
					},
				},
			},
		},
		css: {
			preprocessorOptions: {
				css: {
					charset: false,
				},
			},
		},
		define: {},
	}
})
