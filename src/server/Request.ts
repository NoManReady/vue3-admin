import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import type { RequestConfig, RequestInterceptors, CancelRequestSource } from './interface'

class Request {
	instance?: AxiosInstance
	interceptorsObj?: RequestInterceptors
	cancelRequestSourceList?: CancelRequestSource[]
	requestUrlList?: string[]
	constructor(config: RequestConfig) {
		this.instance = axios.create(config)
		this.interceptorsObj = config.interceptors

		this.requestUrlList = []
		this.cancelRequestSourceList = []

		// 实例拦截器---start
		this.instance.interceptors.request.use(
			this.interceptorsObj?.requestInterceptors,
			this.interceptorsObj?.requestInterceptorsCatch
		)

		this.instance.interceptors.request.use((req: AxiosRequestConfig) => {
			console.log('类请求拦截器')
			return req
		})
		this.instance.interceptors.response.use((res: AxiosResponse) => {
			console.log('类响应拦截器')
			return res.data
		})

		this.instance.interceptors.response.use(
			this.interceptorsObj?.responseInterceptors,
			this.interceptorsObj?.responseInterceptorsCatch
		)
		// 实例拦截器---end
	}
	// 获取source索引
	private getSourceIndex(url: string): number {
		return this.cancelRequestSourceList?.findIndex((item: CancelRequestSource) => {
			return Object.keys(item)[0] === url
		}) as number
	}
	// 移除cancel token相关信息
	private removeUrl(url: string) {
		const urlIndex = this.requestUrlList?.findIndex((u) => u === url) as number
		const sourceIndex = this.getSourceIndex(url)

		if (urlIndex !== -1) {
			this.requestUrlList?.splice(urlIndex, 1)
		}
		if (sourceIndex !== -1) {
			this.cancelRequestSourceList?.splice(sourceIndex, 1)
		}
	}
	// 取消全部请求
	cancenAllRequest() {
		this.cancelRequestSourceList?.forEach((source) => {
			const key = Object.keys(source)[0]
			source[key]()
		})
	}
	// 取消指定请求
	cancelRequest(url: string | string[]) {
		if (typeof url === 'string') {
			const sourceIndex = this.getSourceIndex(url)
			if (sourceIndex !== -1) {
				this.cancelRequestSourceList?.[sourceIndex][url]()
			}
		} else {
			url.forEach((u) => {
				const sourceIndex = this.getSourceIndex(u)
				if (sourceIndex !== -1) {
					this.cancelRequestSourceList?.[sourceIndex][u]()
				}
			})
		}
	}
	request<T>(config: RequestConfig): Promise<T> {
		return new Promise((resolve, reject) => {
			if (config.interceptors?.requestInterceptors) {
				config = config.interceptors.requestInterceptors(config)
			}
			const url = config.url
			if (url) {
				this.requestUrlList?.push(url)
				config.cancelToken = new axios.CancelToken((c) => {
					this.cancelRequestSourceList?.push({
						[url]: c,
					})
				})
			}
			this.instance
				?.request<any, T>(config)
				.then((res) => {
					if (config.interceptors?.responseInterceptors) {
						res = config.interceptors.responseInterceptors<T>(res)
					}
					resolve(res)
				})
				.catch(reject)
				.finally(() => {
					url && this.removeUrl(url)
				})
		})
	}
}

export default Request
