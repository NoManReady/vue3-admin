<template>
	<i v-if="isElementIcon" class="el-icon" :style="iconStyle">
		<component :is="iconName" />
	</i>
	<div v-else-if="isOnlineIcon" :style="imgContainerStyle">
		<img :src="iconName" :alt="iconName" :style="imgInnerStyle" />
	</div>
	<i v-else :class="iconName" :style="iconStyle"></i>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'svgIcon',
	props: {
		name: {
			type: String,
		},
		size: {
			type: Number,
			default: 14,
		},
		color: {
			type: String,
			default: '#fff',
		},
	},
	setup(props) {
		// 判断在线图标前缀
		const onlineStrings = ['https', 'http', '/src', '/assets', import.meta.env.VITE_PUBLIC_PATH]

		const iconName = computed(() => {
			return props?.name
		})

		// 是否为element icon
		const isElementIcon = computed(() => {
			return props?.name?.startsWith('ele-')
		})

		// 是否为在线图标
		const isOnlineIcon = computed(() => {
			return !!onlineStrings.find((string) => props?.name?.startsWith(string))
		})

		// icon样式
		const iconStyle = computed(() => {
			return {
				fontSize: `${props.size}px`,
				color: props.color,
			}
		})

		// 图片容器样式
		const imgContainerStyle = computed(() => {
			return {
				width: `${props.size}px`,
				height: `${props.size}px`,
				display: 'inline-block',
				overflow: 'hidden',
			}
		})

		// 设置图片样式
		const imgInnerStyle = computed(() => {
			const filterStyle: string[] = []
			const compatibles: string[] = ['-webkit', '-ms', '-o', '-moz']
			compatibles.forEach((j) =>
				filterStyle.push(`${j}-filter: drop-shadow(${props.color} 30px 0);`)
			)
			return `width: ${props.size}px;height: ${props.size}px;position: relative;left: -${
				props.size
			}px;${filterStyle.join('')}`
		})

		return {
			iconName,
			isElementIcon,
			isOnlineIcon,
			iconStyle,
			imgContainerStyle,
			imgInnerStyle,
		}
	},
})
</script>

<style scoped></style>
