<template>
	<el-container class="layout-container">
		<LayoutAside />
		<el-container class="flex-center" :class="{ 'layout-backtop': !isFixedHeader }"></el-container>
    <el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script lang="ts">
import useThemeConfig from '/@/store/modules/themeConfig'
import { storeToRefs } from 'pinia'
import { computed, defineComponent, getCurrentInstance, watch } from 'vue'
import { useRoute } from 'vue-router'
import LayoutAside from '../components/aside.vue'
export default defineComponent({
	name: 'layoutDefaults',
	components: {
		LayoutAside,
	},
	setup() {
		const { proxy } = <any>getCurrentInstance()
		const storesThemeConfig = useThemeConfig()
		const { themeConfig } = storeToRefs(storesThemeConfig)

		const route = useRoute()

		const isFixedHeader = computed(() => {
			return themeConfig.value.isFixedHeader
		})

		watch(
			() => route.path,
			() => {
				proxy.$refs.layoutDefaultsScrollbarRef.wrap$.scrollTop = 0
			}
		)
		return {
			isFixedHeader,
		}
	},
})
</script>

<style scoped></style>
