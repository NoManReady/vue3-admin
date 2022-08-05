<template>
	<div
		class="layout-view-bg-white flex mt1"
		:style="{ height: `calc(100vh - ${iframeHeight}`, border: 'none' }"
		v-loading="iframeLoading"
	>
		<iframe
			:src="iframeUrl"
			frameborder="0"
			height="100%"
			width="100%"
			ref="iframeDom"
			v-show="!iframeLoading"
		></iframe>
	</div>
</template>

<script lang="ts">
import useThemeConfig from '@/store/modules/themeConfig'
import { storeToRefs } from 'pinia'
import { computed, defineComponent, nextTick, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'

interface ViewState {
	iframeDom: HTMLIFrameElement | null
	iframeLoading: boolean
	iframeUrl: string
}

export default defineComponent({
	name: 'layoutIframeView',
	setup() {
		const storesThemeConfig = useThemeConfig()
		const { themeConfig } = storeToRefs(storesThemeConfig)

		const route = useRoute()

		const state = reactive<ViewState>({
			iframeDom: null,
			iframeLoading: false,
			iframeUrl: '',
		})

		const initIframeLoad = () => {
			state.iframeUrl = route.meta.isLink as string
			nextTick(() => {
				state.iframeLoading = true
				const iframe = state.iframeDom
				if (iframe) {
					iframe.onload = () => {
						state.iframeLoading = false
					}
				}
			})
		}

		const iframeHeight = computed(() => {
			const { isTagsview } = themeConfig.value
			if (isTagsview) {
				return '86px'
			} else {
				return '51px'
			}
		})

		watch(
			() => route.fullPath,
			() => {
				initIframeLoad()
			}
		)
		return {
			...toRefs(state),
			iframeHeight,
		}
	},
})
</script>

<style scoped></style>
