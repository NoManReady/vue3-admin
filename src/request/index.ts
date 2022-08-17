import request from '/@/server'
import type { RequestConfig } from '/@/server/interface'

import { getToken } from '/@/utils/cookie'

interface DMSResponse<T = any> {
	success: boolean
	errorMessage: string
	data: T
}

const dmsRequest = <T = any>(url: string, config: Omit<RequestConfig, 'url'>) => {
	return request.request<T>({
		url,
		...config,
		interceptors: {
			responseInterceptors: <R>(res: any) => {
				return (res as DMSResponse<R>).data
			},
			requestInterceptors(config) {
				const headers = config.headers || {}
				const token = getToken()
				if (token) {
					headers.authorization = `Bearer ${token}`
				}
				return {
					...config,
					headers,
				}
			},
		},
	})
}

export default dmsRequest
