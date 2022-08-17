import { APISchema } from '/@/request/types'
import createRequestClient from '/@/request/adapt'

interface RoleAPISchema extends APISchema {
	addRole: {
		request: API.RoleItem
		response: void
	}
	delRole: {
		request: API.DeleteRoleBody
		response: void
	}
	updateRole: {
		request: API.UserInfo
		response: void
	}
	getRoles: {
		request: API.getRolesParams
		response: API.RoleList
	}
}

export default createRequestClient<RoleAPISchema>({
	baseUrl: import.meta.env.VITE_API_HOST,
	apis: {
		addRole: 'POST api/role/add',
		delRole: 'POST api/role/delete',
		updateRole: 'POST api/role/update',
		getRoles: 'GET api/role/list',
	},
})
