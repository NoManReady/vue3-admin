import { toRefs } from 'vue'
import { defineStore } from 'pinia'

import type { TagsViewRoutesState } from '../interface'
import { Session } from '/@/utils/storage'

const useTagsViewRoutes = defineStore('tagsViewRoutes', () => {
	const state: TagsViewRoutesState = {
		tagsViewRoutes: [],
		isTagsViewCurrentFull: false,
	}

	const setTagsViewRoutes = (payload: string[]) => {
		state.tagsViewRoutes = payload
	}

	const setCurrentFullscreen = (payload: boolean) => {
		Session.set('isTagsViewCurrentFull', payload)
		state.isTagsViewCurrentFull = payload
	}

	return {
		...toRefs(state),
		setTagsViewRoutes,
		setCurrentFullscreen,
	}
})

export default useTagsViewRoutes
