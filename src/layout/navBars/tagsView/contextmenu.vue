<template>
	<transition name="el-zoom-in-center">
		<div
			aria-hidden="true"
			class="el-dropdown__popper el-dropdown is-light is-pure custom-contextmenu"
			role="tooltip"
			data-popper-placement="bottom"
			:style="`top:${dropdowns.y + 5}px;left:${dropdowns.x}px`"
			:key="Math.random()"
			v-show="visible"
		>
			<ul class="el-dropdown-menu">
				<template v-for="(menu, key) in dropdownList" :key="key">
					<li
						class="el-dropdown-menu__item"
						@click="onContextMenuClick(menu.id)"
						aria-disabled="false"
						tabindex="-1"
					>
						<SvgIcon :name="menu.icon" />
						<span>{{ menu.label }}</span>
					</li>
				</template>
			</ul>
			<div class="el-popper__arrow" :style="{ left: `${arrowLeft}px` }"></div>
		</div>
	</transition>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive, toRefs, watch } from 'vue'

export default defineComponent({
	name: 'layoutTagsViewContextmenu',
	props: {
		dropdown: {
			type: Object,
			default: () => ({ y: 0, x: 0 }),
		},
	},
	setup(props, { emit }) {
		const state = reactive({
			visible: false,
			dropdownList: [
				{ id: 'refresh', icon: 'ele-RefreshRight', label: '刷新' },
				{ id: 'close', icon: 'ele-Close', label: '关闭' },
				{ id: 'closeOther', icon: 'ele-CircleClose', label: '关闭其他' },
				{ id: 'closeAll', icon: 'ele-FolderDelete', label: '关闭全部' },
				{ id: 'fullscreen', icon: 'iconfont icon-fullscreen', label: '全屏' },
			],
			arrowLeft: 10,
		})

		// position边界适配
		const dropdowns = computed(() => {
			if (props.dropdown.x + 117 > document.documentElement.clientWidth) {
				return {
					x: document.documentElement.clientWidth - 117 - 5,
					y: props.dropdown.y,
				}
			}
			return props.dropdown
		})

		const onContextMenuClick = (menuId: string) => {
			emit('contextmenu', menuId)
		}

		// 关闭菜单
		const closeContextmenu = () => {
			state.visible = false
		}

		onMounted(() => {
			document.body.addEventListener('click', closeContextmenu)
		})

		onUnmounted(() => {
			document.body.removeEventListener('click', closeContextmenu)
		})

		watch(
			() => props.dropdown,
			({ x }) => {
				if (x + 117 > document.documentElement.clientWidth) {
					state.arrowLeft = 117 - (document.documentElement.clientWidth - x)
				} else {
					state.arrowLeft = 10
				}
			}
		)

		return {
			...toRefs(state),
			dropdowns,
			onContextMenuClick,
		}
	},
})
</script>

<style scoped lang="scss">
.custom-contextmenu {
	position: fixed;
	z-index: 2200;
	transform-origin: center top;
	.el-dropdown-menu__item {
		font-size: 12px !important;
		white-space: nowrap;
		i {
			font-size: 12px !important;
		}
	}
}
</style>
