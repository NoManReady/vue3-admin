import { APISchema } from '/@/request/types'
import createRequestClient from '/@/request/adapt'

interface LoginAPISchema extends APISchema {
	logout: {
		request: void
		response: void
	}
	login: {
		request: API.LoginParams
		response: API.LoginResult
	}
}

export default createRequestClient<LoginAPISchema>({
	baseUrl: import.meta.env.VITE_API_HOST,
	apis: {
		logout: 'POST api/logout',
		login: 'POST api/login',
	},
})
