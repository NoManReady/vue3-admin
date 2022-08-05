import Request from './Request'
import { TIMEOUT } from './constant'
const request = new Request({
	baseURL: import.meta.env.VITE_API_HOST,
	timeout: TIMEOUT,
	interceptors: {
		requestInterceptors: (config) => {
			console.log('实例请求拦截器')
			return config
		},
		responseInterceptors: (res) => {
			console.log('实例响应拦截器')
			return res
		},
	},
})

export default request
