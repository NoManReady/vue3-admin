<template>
	<template v-for="menu of menus" :key="menu.path">
		<el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length > 0">
			<template #title>
				<SvgIcon :name="menu.meta.icon" />
				<span>{{ menu.meta.title }}</span>
			</template>
			<sub-item :items="menu.children" />
		</el-sub-menu>
		<template v-else>
			<el-menu-item :index="menu.path" :key="menu.path">
				<template v-if="!menu.meta.isLink || (menu.meta.isLink && menu.meta.isIframe)">
					<SvgIcon :name="menu.meta.icon" />
					<span>{{ menu.meta.title }}</span>
				</template>
				<template v-else>
					<a :href="menu.meta.isLink" target="_blank" rel="opener" class="w100">
						<SvgIcon :name="menu.meta.icon" />
						<span>{{ menu.meta.title }}</span>
					</a>
				</template>
			</el-menu-item>
		</template>
	</template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SvgIcon from '/@/components/svgIcon/index.vue'

export default defineComponent({
	name: 'navMenuSubItem',
	props: {
		items: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const menus = computed(() => {
			return <any>props.items
		})
		return { menus }
	},
	components: { SvgIcon },
})
</script>

<style scoped></style>
