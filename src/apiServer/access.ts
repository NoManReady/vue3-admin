import { APISchema } from '/@/request/types'
import createRequestClient from '/@/request/adapt'

interface AccessAPISchema extends APISchema {
	addAccess: {
		request: API.MenuItem
		response: void
	}
	delAccess: {
		request: API.DeleteAccessBody
		response: void
	}
	updateAccess: {
		request: API.MenuItem
		response: void
	}
	getAccess: {
		request: void
		response: API.MenuList
	}
}

export default createRequestClient<AccessAPISchema>({
	baseUrl: import.meta.env.VITE_API_HOST,
	apis: {
		addAccess: 'POST api/menu/add',
		delAccess: 'POST api/menu/delete',
		updateAccess: 'POST api/menu/update',
		getAccess: 'GET api/menu/list',
	},
})
