import { APISchema } from '/@/request/types'
import createRequestClient from '/@/request/adapt'

interface UserAPISchema extends APISchema {
	addUser: {
		request: API.UserInfo
		response: void
	}
	delUser: {
		request: API.DeleteUserBody
		response: void
	}
	updateUser: {
		request: API.UserInfo
		response: void
	}
	getUserInfo: {
		request: void
		response: API.UserInfo
	}
	getUsers: {
		request: API.getUsersParams
		response: API.UserList
	}
}

export default createRequestClient<UserAPISchema>({
	baseUrl: import.meta.env.VITE_API_HOST,
	apis: {
		addUser: 'POST api/user/add',
		delUser: 'POST api/user/delete',
		updateUser: 'POST api/user/update',
		getUserInfo: 'GET api/user/userInfo',
		getUsers: 'GET api/user/list',
	},
})
