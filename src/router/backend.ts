import useRoutesList from '@/store/modules/routesList'
import { getAccesss } from '@/apis/access'
import useUserInfo from '@/store/modules/user'
import { toTree } from '@/utils'
import { NextLoading } from '@/utils/loading'
import { storeToRefs } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { formatNestedRoutes, formatFlattenRoutes, router } from '.'
import { dynamicRoutes, errorRoutes } from './routes'
import pinia from '@/store'

const layoutModules: Record<string, Function> = import.meta.glob('../layout/routerView/*.{vue,tsx}')
const viewsModules: Record<string, Function> = import.meta.glob('../views/**/*.{vue,tsx}')
const dynamicViewsModules: Record<string, Function> = Object.assign(
	{},
	{ ...layoutModules },
	{ ...viewsModules }
)

export async function initBackendRoutes() {
	// 开启loading
	if (window.nextLoading === undefined) {
		NextLoading.start()
	}
	// 初始化用户信息
	await useUserInfo().getUserInfo()
	// 获取用户权限下的菜单
	const routes = await getUserAccessMenus()
	dynamicRoutes[0].children = await resolveComponent(routes)
	setAddRoute()
	setRoutesToStore()
}

/**
 * 保存路由信息到store
 */
export function setRoutesToStore() {
	const storesRoutesList = useRoutesList()
	storesRoutesList.setRoutesList(dynamicRoutes[0].children as any)
}

/**
 * 解析menu至routes信息
 * @param routes 后端请求的路由信息
 * @returns 处理后的路由信息
 */
export async function resolveComponent(routes: any): Promise<RouteRecordRaw[]> {
	return routes.map((route: any) => {
		if (route.component) {
			route.component = dynamicImport(dynamicViewsModules, route.component as string)
		}
		if (route.children) {
			resolveComponent(route.children)
		}
		return route as RouteRecordRaw
	})
}

/**
 * 解析匹配组件
 * @param dynamicViewsModules 全局页面组件信息Map
 * @param component 组件路径
 * @returns 返回解析后的组件
 */
export function dynamicImport(dynamicViewsModules: Record<string, Function>, component: string) {
	const keys = Object.keys(dynamicViewsModules)
	const matchKeys = keys.filter((key) => {
		const k = key.replace(/..\/views|../, '')
		return k.startsWith(component) || k.startsWith(`/${component}`)
	})
	if (matchKeys.length === 1) {
		return dynamicViewsModules[matchKeys[0]]
	}
	return false
}

/**
 * 路由及合并错误处理路由
 * @returns 处理后的路由
 */
export function getRoutesEnd() {
	const routesEnd = formatNestedRoutes(formatFlattenRoutes(dynamicRoutes)) || []
	routesEnd[0].children = [...routesEnd[0].children, ...errorRoutes]
	return routesEnd
}

/**
 * 动态添加路由
 */
export function setAddRoute() {
	const routeMenus=getRoutesEnd()
	routeMenus.forEach((route: RouteRecordRaw) => {
		router.addRoute(route)
	})
}

export async function getUserAccessMenus() {
	const storesUserInfo = useUserInfo(pinia)
	const { userInfo } = storeToRefs(storesUserInfo)
	const access = userInfo.value.menus || {}
	const result = await getAccesss()
	const routes = result.map((access) => {
		const { path, name, component, redirect, permission, id, parentId, ...props } = access
		return { path, name, component, redirect, permission, id, parentId, meta: props }
	})
	const accessableRoutes = routes?.filter((route) => Boolean(access[route.permission as string]))
	return toTree(accessableRoutes || [], 'id', 'parentId')
}

export default () => []
