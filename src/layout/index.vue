<template>
	<component :is="themeConfig.layout" />
</template>

<script lang="ts">
import useThemeConfig from '/@/store/modules/themeConfig'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent, defineComponent } from 'vue'

export default defineComponent({
	name: 'layout',
	components: {
		defaults: defineAsyncComponent(() => import('/@/layout/main/defaults.vue')),
	},
	setup() {
		const storesThemeConfig = useThemeConfig()
		const { themeConfig } = storeToRefs(storesThemeConfig)

		return { themeConfig }
	},
})
</script>

<style scoped></style>
