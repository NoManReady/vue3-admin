import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import useThemeConfig from '@/store/modules/themeConfig'
import { storeToRefs } from 'pinia'
import { staticRoutes } from './routes'
import { getToken } from '@/utils/cookie'
import useRoutesList from '@/store/modules/routesList'
import { initBackendRoutes } from './backend'
import pinia from '@/store'

const storesThemeConfig = useThemeConfig(pinia)

const { themeConfig } = storeToRefs(storesThemeConfig)

const { isRequestRoutes } = themeConfig.value

export const router = createRouter({
	history: createWebHistory(),
	routes: staticRoutes,
})

/**
 * 嵌套数组处理成一维数组
 * @param arr Routes数组
 * @returns 处理后的一维数组
 */
export function formatFlattenRoutes(arr: any) {
	return arr
}

/**
 * 一维数组处理成嵌套的二维数组
 * @param arr 一维数组路由
 * @returns 处理后的二维数组
 */
export function formatNestedRoutes(arr: any) {
	return arr
}

router.beforeEach(async (to, from, next) => {
	NProgress.configure({ showSpinner: false })
	NProgress.start()
	const token = getToken()
	if (!token) {
		if (to.path !== '/login') {
			const redirect = `/login?redirect=${to.path}&params=${JSON.stringify(
				to.query ? to.query : to.params
			)}`
			next(redirect)
		} else {
			next()
		}
	} else {
		if (to.path === '/login') {
			next('/home')
		} else {
			const storesRoutesList = useRoutesList()
			const { routesList } = storeToRefs(storesRoutesList)
			if (routesList.value.length === 0) {
				if (isRequestRoutes) {
					await initBackendRoutes()
					next({ ...to, replace: true })
				}
			} else {
				next()
			}
		}
	}
})

router.afterEach(() => {
	NProgress.done()
})
