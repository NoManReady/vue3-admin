import { APISchema } from '/@/request/types'
import createRequestClient from '/@/request/adapt'

interface DumpAPISchema extends APISchema {
	delDump: {
		request: API.DeleteRoleBody
		response: void
	}
	doPackage: {
		request: API.doPackageParams
		response: void
	}
	getDumps: {
		request: API.getDumpsParams
		response: API.RoleList
	}
}

export default createRequestClient<DumpAPISchema>({
	baseUrl: import.meta.env.VITE_API_HOST,
	apis: {
		delDump: 'POST api/dump/delete',
		doPackage: 'POST api/dump/package',
		getDumps: 'GET api/dump/list',
	},
})
