/// <reference types="vite/client" />
/* eslint-disable */
interface ImportMetaEnv {
	readonly VITE_API_HOST: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
declare const __dirname

interface Window {
	nextLoading: boolean
}
