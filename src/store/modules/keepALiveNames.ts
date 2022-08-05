import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

import { KeepAliveNamesState } from '../interface'

const useKeepAliveNames = defineStore('keepAliveNames', () => {
	const state: KeepAliveNamesState = reactive({
		keepAliveNames: [],
		cachedViews: [],
	})

	const setKeepAliveNames = (payload: string[]) => {
		state.keepAliveNames = payload
	}

	const addCachedView = (payload: any) => {
		if (!state.cachedViews.includes(payload.name)) {
			if (payload.meta.isKeepAlive) {
				state.cachedViews.push(payload.name)
			}
		}
	}

	const delCachedView = (payload: any) => {
		const index = state.cachedViews.indexOf(payload.name)
		if (index > -1) {
			state.cachedViews.splice(index, 1)
		}
	}

	const delOtherCachedView = (payload: any) => {
		if (payload.meta.isKeepAlice) {
			state.cachedViews = [payload.name]
		} else {
			state.cachedViews = []
		}
	}

	const delAllCachedView = () => {
		state.cachedViews = []
	}

	return {
		...toRefs(state),
		setKeepAliveNames,
		addCachedView,
		delCachedView,
		delOtherCachedView,
		delAllCachedView,
	}
})

export default useKeepAliveNames
