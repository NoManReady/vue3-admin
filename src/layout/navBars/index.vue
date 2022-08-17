<template>
	<div class="layout-navbars-container">
		<TagsView v-if="themeConfig.isTagsview" />
	</div>
</template>

<script lang="ts">
import useThemeConfig from '/@/store/modules/themeConfig'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import TagsView from './tagsView/index.vue'
export default defineComponent({
	name: 'layoutNavBars',
	components: {
		TagsView,
	},
	setup() {
		const storesThemeConfig = useThemeConfig()
		const { themeConfig } = storeToRefs(storesThemeConfig)

		return {
			themeConfig,
		}
	},
})
</script>

<style scoped></style>
