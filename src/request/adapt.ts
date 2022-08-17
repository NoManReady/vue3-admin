import { getToken } from '/@/utils/cookie'
import { createRequestClientFn } from './request'

export default createRequestClientFn(
	{
		transformResponse(data, headers) {
      // console.log(headers)
			const _transformData = JSON.parse(data)
			if (_transformData.success) {
				return _transformData.data
			}
			return Promise.reject(_transformData)
		},
	},
	async () => {
		const token = getToken()
		return { authorization: `Bearer ${token}` }
	}
)
