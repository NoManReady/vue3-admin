<template>
	<el-config-provider :size="themeConfig.globalComponentSize" :locale="i18nLocale">
		<router-view v-show="themeConfig.lockScreenTime > 1" />
	</el-config-provider>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import useTitle from './hook/useTitle'
import useThemeConfig from './store/modules/themeConfig'

export default defineComponent({
	name: 'app',
	setup() {
		const storesThemeConfig = useThemeConfig()
		const { themeConfig } = storeToRefs(storesThemeConfig)
		const route = useRoute()

		const state = reactive({
			i18nLocale: null,
		})
		watch(
			() => route.path,
			() => {
				useTitle()
			}
		)
		return {
			...toRefs(state),
			themeConfig,
		}
	},
})
</script>

<style scoped></style>
