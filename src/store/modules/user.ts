import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'

import { UserStates } from '../interface'

import { getUserInfo as getUserInfoApi } from '@/apis/user'

const useUserInfo = defineStore('user', () => {
	const state: UserStates = reactive({
		userInfo: {
			account: '',
			name: '',
			avatar: '',
			email: '',
			country: '',
			phone: '',
			id: '',
			updateTime: '',
			menus: {},
		},
	})

	const setUserInfo = (payload: UserStates['userInfo']) => {
		state.userInfo = payload
	}

	const getUserInfo = async () => {
		const userInfo = await getUserInfoApi()
		setUserInfo(userInfo)
	}

	return {
		...toRefs(state),
		setUserInfo,
		getUserInfo,
	}
})

export default useUserInfo
