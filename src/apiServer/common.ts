import { APISchema } from '/@/request/types'
import createRequestClient from '/@/request/adapt'

interface CommonAPISchema extends APISchema {
	getAliOssParams: {
		request: void
		response: API.AliOssParams
	}
}

export default createRequestClient<CommonAPISchema>({
	baseUrl: import.meta.env.VITE_API_HOST,
	apis: {
		getAliOssParams: 'POST api/version/sts',
	},
})
