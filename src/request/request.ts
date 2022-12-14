import axios, { AxiosRequestConfig } from 'axios'
import type { AxiosInstance, AxiosRequestHeaders, AxiosError } from 'axios'
import type {
	APISchema,
	RequestPath,
	RequestFunction,
	RequestOptions,
	CreateRequestConfig,
	CreateRequestClient,
	HeaderHandler,
} from './types'

const MATCH_METHOD = /^(GET|POST|PUT|DELETE|HEAD|OPTIONS|CONNECT|TRACE|PATCH)\s+/
const MATCH_PATH_PARAMS = /:(\w+)/g
const USE_DATA_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE']

function attachAPI<T extends APISchema>(
	client: AxiosInstance,
	apis: CreateRequestConfig<T>['apis']
): CreateRequestClient<T> {
	const hostApi: CreateRequestClient<T> = Object.create(null)
	for (const apiName in apis) {
		const apiConfig = apis[apiName]
		if (typeof apiConfig === 'function') {
			hostApi[apiName] = apiConfig as RequestFunction
			continue
		}
		let apiOptions = {}
		let apiPath = apiConfig as RequestPath
		let apiMethod: RequestOptions['method'] = 'GET'
		if (typeof apiConfig === 'object') {
			const { path, method, ...rest } = apiConfig as RequestOptions
			apiPath = path as RequestPath
			apiOptions = rest
			apiMethod = method
		}
		hostApi[apiName] = (params, options: AxiosRequestConfig) => {
			const _params = { ...(params || {}) }
			const [prefix, method] = apiPath.match(MATCH_METHOD) || ['GET', apiMethod]
			let url = apiPath.replace(prefix, '')
			const matchParams = apiPath.match(MATCH_PATH_PARAMS)
			if (matchParams) {
				matchParams.forEach((match) => {
					const key = match.replace(':', '')
					if (Reflect.has(_params, key)) {
						url = url.replace(match, _params[key])
						Reflect.deleteProperty(_params, key)
					}
				})
			}
			const requestParams = USE_DATA_METHODS.includes(method)
				? { data: _params }
				: { params: _params }
			return client.request({
				url,
				method: method.toLowerCase(),
				...requestParams,
				...apiOptions,
				...options,
			})
		}
	}
	return hostApi
}

export function createRequestClient<T extends APISchema>(
	requestConfig: CreateRequestConfig<T>
): CreateRequestClient<T> {
	const client = axios.create({
		baseURL: requestConfig.baseUrl,
		headers: requestConfig.headers,
		...requestConfig.baseConfig,
	})

	client.interceptors.request.use((config) => {
		const headerHandlers = (requestConfig.headerHandlers || []).map((handler) => {
			return handler(config)
				.then((mixHeaders: AxiosRequestHeaders) => {
					if (!config.headers) {
						config.headers = {}
					}
					Object.assign(config.headers, mixHeaders)
				})
				.catch()
		})
		return Promise.all(headerHandlers).then(() => config)
	})
	client.interceptors.response.use(
		(res) => {
			return Promise.resolve(res.data)
		},
		(error: AxiosError) => {
			const requestError = requestConfig.errorHandler ? requestConfig.errorHandler(error) : error
			return Promise.reject(requestError)
		}
	)
	return attachAPI<T>(client, requestConfig.apis)
}

export function createRequestClientFn(config?: AxiosRequestConfig, headerHandler?: HeaderHandler) {
	return <T extends APISchema>(requestConfig: CreateRequestConfig<T>) => {
		return createRequestClient<T>({
			baseConfig: config,
			headerHandlers: headerHandler ? [headerHandler] : [],
			...requestConfig,
		})
	}
}
