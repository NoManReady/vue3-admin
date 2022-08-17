import { APISchema } from '/@/request/types'
import createRequestClient from '/@/request/adapt'

interface VersionAPISchema extends APISchema {
	addVersion: {
		request: API.VersionItem
		response: void
	}
	delVersion: {
		request: API.VersionDeleteParams
		response: void
	}
	getVersions: {
		request: API.getVersionsParams
		response: API.VersionList
	}
}

export default createRequestClient<VersionAPISchema>({
	baseUrl: import.meta.env.VITE_API_HOST,
	apis: {
		addVersion: 'POST api/version/add',
		delVersion: 'POST api/version/delete',
		getVersions: 'GET api/version/list',
	},
})
