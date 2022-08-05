<template>
	<div class="hl100">
		<router-view v-slot="{ Component }">
			<transition mode="out-in" :name="trnasitionName">
				<keep-alive :include="keepAliveList">
					<component :is="Component" :key="refreshRouterViewKey" class="wl100" />
				</keep-alive>
			</transition>
		</router-view>
	</div>
</template>

<script lang="ts">
import useKeepALiveNames from '@/store/modules/keepALiveNames'
import useThemeConfig from '@/store/modules/themeConfig.js'
import { Session } from '@/utils/storage'
import { storeToRefs } from 'pinia'
import {
	computed,
	reactive,
	defineComponent,
	toRefs,
	onBeforeMount,
	getCurrentInstance,
	nextTick,
	onMounted,
	onUnmounted,
	watch,
} from 'vue'
import { useRoute } from 'vue-router'
interface ViewState {
	refreshRouterViewKey: null | string
	keepAliveNameList: string[]
}
export default defineComponent({
    name:'layoutBaseView',
	setup() {
		const { proxy } = <any>getCurrentInstance()
		const route = useRoute()
		const storesKeepAliveNames = useKeepALiveNames()

		const storesThemeConfig = useThemeConfig()

		const { cachedViews, keepAliveNames } = storeToRefs(storesKeepAliveNames)
		const { themeConfig } = storeToRefs(storesThemeConfig)

		const state = reactive<ViewState>({
			refreshRouterViewKey: null,
			keepAliveNameList: [],
		})

		const trnasitionName = computed(() => themeConfig.value.animation)

		const keepAliveList = computed(() =>
			themeConfig.value.isTagsview ? (cachedViews.value as string[]) : state.keepAliveNameList
		)

		onBeforeMount(() => {
			state.keepAliveNameList = keepAliveNames.value as string[]
			proxy.mittBus.on('onTagsViewRefreshRouterView', (fullpath: string) => {
				state.keepAliveNameList = keepAliveList.value.filter((name: string) => route.name !== name)
				state.refreshRouterViewKey = null
				nextTick(() => {
					state.keepAliveNameList = keepAliveList.value
					state.refreshRouterViewKey = fullpath
				})
			})
		})

		onMounted(() => {
			nextTick(() => {
				setTimeout(() => {
					if (themeConfig.value.isCacheTagsview) {
						cachedViews.value = Session.get<{ name: string }[]>('tagsViewList')?.map(
							(item: any) => item.name
						)
					}
				}, 0)
			})
		})

		onUnmounted(() => {
			proxy.mittBus.off('onTagsViewRefreshRouterView')
		})

		watch(
			() => route.fullPath,
			() => {
				state.refreshRouterViewKey = decodeURI(route.fullPath)
			}
		)

		return {
			...toRefs(state),
			keepAliveList,
			trnasitionName,
		}
	},
})
</script>

<style scoped></style>
