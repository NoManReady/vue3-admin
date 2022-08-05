import { APISchema } from './types'
import { createRequestClient } from './request'

interface TestAPISchema extends APISchema {
	getUser: {
		request: {
			id: number
		}
		response: {
			avatar: string
			id: number
			name: string
		}
	}
	login: {
		request: {
			account: string
			password: string
		}
		response: {
			token: string
		}
	}
	createUser: {
		request: {
			avatar: string
			name: string
		}
		response: {
			avatar: string
			id: number
			name: string
		}
	}
}

const api = createRequestClient<TestAPISchema>({
	baseUrl: '',
	apis: {
		getUser: 'GET api/user/:id',
		createUser: 'POST api/user',
		login: 'POST api/login',
	},
	baseConfig: {
		transformResponse(data, headers) {
			const _transformData = JSON.parse(data)
			if (_transformData.success) {
				return _transformData.data
			}
			return Promise.reject(_transformData)
		},
	},
})

export default api
