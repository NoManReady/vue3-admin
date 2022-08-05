<template>
	<div>{{ JSON.stringify(themeConfig) }}</div>
</template>

<script lang="ts">
import useThemeConfig from '@/store/modules/themeConfig'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'layout',
	setup() {
		const storesThemeConfig = useThemeConfig()
		const { themeConfig } = storeToRefs(storesThemeConfig)

		return { themeConfig }
	},
})
</script>

<style scoped></style>
