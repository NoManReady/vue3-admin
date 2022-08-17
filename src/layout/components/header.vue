<template>
	<el-header
		class="layout-header"
		:height="headerHeight"
		v-show="!isTagsViewCurrentFull"
	></el-header>
</template>

<script lang="ts">
import useTagsViewRoutes from '/@/store/modules/tagsViewRoutes'
import useThemeConfig from '/@/store/modules/themeConfig'
import { storeToRefs } from 'pinia'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'layoutHeader',
	setup() {
		const storesThemeConfig = useThemeConfig()
		const storesTagsViewRoutes = useTagsViewRoutes()
		const { themeConfig } = storeToRefs(storesThemeConfig)
		const { isTagsViewCurrentFull } = storeToRefs(storesTagsViewRoutes)

		// header高度
		const headerHeight = computed(() => {
			const { isTagsview } = themeConfig.value
			if (isTagsview) {
				return '84px'
			} else {
				return '50px'
			}
		})

		return {
			headerHeight,
			isTagsViewCurrentFull,
		}
	},
})
</script>

<style scoped></style>
