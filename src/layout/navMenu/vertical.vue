<template>
	<el-menu
		router
		:default-active="defaultActive"
		background-color="transparent"
		:collapse="isCollapse"
		:unique-opened="isUniqueOpened"
		:collapse-transition="false"
	>
		<SubItem :items="menuList" />
	</el-menu>
</template>

<script lang="ts">
import useThemeConfig from '/@/store/modules/themeConfig'
import { storeToRefs } from 'pinia'
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { onBeforeRouteUpdate, RouteLocationNormalizedLoaded, useRoute } from 'vue-router'

import SubItem from './subItem.vue'

export default defineComponent({
	name: 'navMenuVertical',
	components: { SubItem },
	props: {
		menus: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const storesThemeConfig = useThemeConfig()
		const { themeConfig } = storeToRefs(storesThemeConfig)
		const route = useRoute()

		const state = reactive<{ defaultActive: string; isCollapse: boolean }>({
			defaultActive: (route.meta.isDynamic ? route.meta.isDynamicPath : route.path) as string,
			isCollapse: false,
		})

		const menuList = computed(() => {
			return props.menus
		})

		const isUniqueOpened = computed(() => {
			return themeConfig.value.isUniqueOpened
		})

		// 获取高亮的path
		const getParentHighlightPath = (currentRoute: RouteLocationNormalizedLoaded) => {
			const { path, meta } = currentRoute
			if (meta) {
				const routePath = (meta.isDynamic ? meta.isDynamicPath : path) as string
				const splitPaths = routePath.split('/')
				if (splitPaths.length >= 4 && meta.isHide) {
					return splitPaths.splice(0, 3).join('/')
				} else {
					return path
				}
			}
			return ''
		}

		// 设置菜单的收起/展开
		watch(themeConfig.value, () => {
			if (document.body.clientWidth <= 1000) {
				state.isCollapse = false
			} else {
				state.isCollapse = themeConfig.value.isCollapse
			}
		})

		// 页面加载时配置激活菜单
		onMounted(() => {
			state.defaultActive = getParentHighlightPath(route)
		})

		onBeforeRouteUpdate((to) => {
			state.defaultActive = getParentHighlightPath(to)
		})

		return {
			...toRefs(state),
			isUniqueOpened,
			menuList,
		}
	},
})
</script>

<style scoped></style>
