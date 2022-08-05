import { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

// export type RequestPath = string
/** 去除可索引签名 */
type RemoveIndexSignature<Obj extends Record<string, any>> = {
	[Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key]
}

export interface RequestOptions extends AxiosRequestConfig {
	path: string
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE' | 'PATCH'
	headers?: AxiosRequestHeaders
}
export type RequestPath = `${Uppercase<RequestOptions['method']>} ${string}`

export type RequestFunction<P = Record<string, any> | void, R = any> = (
	params: P,
	...args: any[]
) => Promise<R>

export type APIConfig = RequestPath | RequestOptions | RequestFunction

export type HeaderHandler = (config?: AxiosRequestConfig) => Promise<AxiosRequestHeaders>

export type RequestErrorHandler = (error: AxiosError) => void

export type APISchema = Record<
	string,
	{
		request: Record<string, any> | void
		response: Record<string, any> | any
	}
>

export type CreateRequestConfig<T extends APISchema> = {
	baseUrl: string
	headers?: AxiosRequestHeaders
	headerHandlers?: HeaderHandler[]
	errorHandler?: RequestErrorHandler
	apis: {
		[K in keyof RemoveIndexSignature<T>]: APIConfig
	}
	baseConfig?: AxiosRequestConfig
}

export type CreateRequestClient<T extends APISchema> = {
	[K in keyof RemoveIndexSignature<T>]: RequestFunction<
		RemoveIndexSignature<T>[K]['request'],
		RemoveIndexSignature<T>[K]['response']
	>
}
