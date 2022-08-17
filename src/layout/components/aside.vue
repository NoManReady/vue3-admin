<template>
	<el-aside class="layout-aside" :style="menuStyl" v-show="!isTagsViewCurrentFull">
		<Logo v-if="showLogo" />
		<el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef">
			<Vertical :menuList="menuList" />
		</el-scrollbar>
	</el-aside>
</template>

<script lang="ts">
import pinia from '/@/store'
import useRoutesList from '/@/store/modules/routesList'
import useTagsViewRoutes from '/@/store/modules/tagsViewRoutes'
import useThemeConfig from '/@/store/modules/themeConfig'
import { storeToRefs } from 'pinia'
import { computed, defineComponent, onBeforeMount, reactive, toRefs, watch } from 'vue'

import Logo from './logo.vue'

export default defineComponent({
	name: 'layoutAside',
	components: { Logo },
	setup() {
		const storesRoutesList = useRoutesList()
		const storesThemeConfig = useThemeConfig()
		const storesTagsViewRoutes = useTagsViewRoutes()
		const { routesList } = storeToRefs(storesRoutesList)
		const { themeConfig } = storeToRefs(storesThemeConfig)
		const { isTagsViewCurrentFull } = storeToRefs(storesTagsViewRoutes)

		const state = reactive({
			menuList: [],
			clientWidth: 0,
		})

		// 菜单样式
		const menuStyl = computed(() => {
			const { isCollapse } = themeConfig.value
			const asideBorderColor = 'layout-el-aside-br-color'
			if (isCollapse) {
				return [asideBorderColor, 'layout-aside-pc-64']
			} else {
				return [asideBorderColor, 'layout-aside-pc-220']
			}
		})

		// 是否显示logo
		const showLogo = computed(() => {
			const { layout, isShowLogo } = themeConfig.value
			return isShowLogo && layout === 'defaults'
		})

		// 过滤路由
		const setFilterRoutes = () => {
			const filterRoutesFun = (arr: string[]) => {
				return arr
					.filter((item: any) => !item.meta.isHide)
					.map((item: any) => {
						const _item = { ...item }
						if (_item.children) {
							_item.children = filterRoutesFun(_item.children)
						}
						return _item
					})
			}
			;(state.menuList as any) = filterRoutesFun(routesList.value)
		}

		// 监听themeConfig变化，更新scroller
		// watch(themeConfig.value,(config) => {
		// })
		// 监听pinia值
		watch(
			pinia.state,
			() => {
				setFilterRoutes()
			},
			{ deep: true }
		)

		onBeforeMount(() => {
			setFilterRoutes()
		})
		return {
			isTagsViewCurrentFull,
			menuStyl,
			showLogo,
			themeConfig,
			...toRefs(state),
		}
	},
})
</script>

<style scoped></style>
