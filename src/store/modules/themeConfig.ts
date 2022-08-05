import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

import { ThemeConfigStates } from '../interface'

const useThemeConfig = defineStore('themeConfig', () => {
	const state: ThemeConfigStates = reactive({
		themeConfig: {
			// 是否开启布局配置抽屉
			isDrawer: false,

			/**
			 * 全局配置
			 */
			// 主题色
			primary: '#ad38ff',
			// 神色模式
			isDark: false,

			/**
			 * 顶栏设置
			 */
			// 顶栏背景色
			topBar: '#fff',
			// 顶栏字体颜色
			topBarColor: '#606266',
			// 是否开启顶栏背景渐变
			isTopBarColorGradual: false,
			// 菜单背景色
			menuBar: '#545c64',
			// 菜单字体颜色
			menuBarColor: '#eaeaea',
			// 是否开启菜单背景渐变
			isMenuBarColorGradual: false,

			/**
			 * 分栏设置
			 */
			// 分栏菜单背景色
			columnsMenuBar: '#545c64',
			// 分栏菜单字体颜色
			columnsMenuBarColor: '#e6e6e6',
			// 是否开启分栏背景渐变
			isColumnsMenuBarColorGradual: false,

			/**
			 * 界面设置
			 */
			// 是否开启菜单水平折叠
			isCollapse: false,
			// 是否开启菜单手风琴效果
			isUniqueOpened: false,
			// 是否固定Header
			isFixedHeader: false,
			// 是否开启金典布局菜单分割
			isClassicSplitMenu: false,
			// 是否自动锁屏
			isLockScreen: false,
			// 自动锁屏时间
			lockScreenTime: 30,

			/**
			 * 界面显示
			 */
			// 是否显示logo
			isShowLogo: false,
			// 是否开启breadcrumb
			isBreadcrumb: true,
			// 是否开启tabgview
			isTagsview: true,
			// 是否显示breadcrumb图标
			isBreadcrumbIcon: false,
			// 是否显示tagview图标
			isTagsviewIcon: false,
			// 是否开启tagview缓存
			isCacheTagsview: false,
			// 是否开启tagview拖拽
			isSortableTagsview: false,
			// 是否开启tagview共享
			isShareTagsview: false,
			// 是否开启footer
			isFooter: false,
			// 是否显示灰色模式
			isGrayscale: false,
			// 是否显示色弱模式
			isInvert: false,
			// 是否开启水印
			isWatermark: false,
			// 水印文案
			watermarkText: 'NoManReady',

			/**
			 * 其他设置
			 */
			// tagview分割
			tagsStyle: 'tags-style-five',
			// 页面切换动画
			animation: 'slide-right',
			// 分栏高亮分格
			columnsAsideStyle: 'columns-round',
			// 分栏布局分格
			columnsAsideLayout: 'columns-vertical',

			/**
			 * 布局切换
			 */
			// 布局切换
			layout: 'defaults',
			// 是否开启后端路由控制
			isRequestRoutes: true,
			// 网站主标题
			golbalTitle: 'DMS',
			// 网站副标题
			globalSubTitle: 'NoManReady DMS',
			// 初始化语言
			globalI18n: 'zh-cn',
			// 默认组件大小
			globalComponentSize: 'large',
		},
	})

	const setThemeConfig = (payload: ThemeConfigStates['themeConfig']) => {
		state.themeConfig = payload
	}

	return {
		...toRefs(state),
		setThemeConfig,
	}
})

export default useThemeConfig
