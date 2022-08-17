// routesList
export interface RoutesListStates {
	routesList: string[]
	isColumnsMenuHover: boolean
	isColumnsNavHover: boolean
}

// user
export interface UserInfo {
	account?: string
	name?: string
	avatar?: string
	email?: string
	country?: string
	phone?: string
	id?: string
	updateTime?: string
	roleId?: string
	menus?: Record<string, boolean>
	roleName?: string
}
export interface UserStates {
	userInfo: UserInfo
}

// themeConfig
export interface ThemeConfigState {
	isDrawer: boolean
	// 全局
	primary: string
	isDark: boolean
	// 顶栏设置
	topBar: string
	topBarColor: string
	isTopBarColorGradual: boolean
	// 菜单设置
	menuBar: string
	menuBarColor: string
	isMenuBarColorGradual: boolean
	// 分栏设置
	columnsMenuBar: string
	columnsMenuBarColor: string
	isColumnsMenuBarColorGradual: boolean
	// 界面设置
	isCollapse: boolean
	isUniqueOpened: boolean
	isFixedHeader: boolean
	isClassicSplitMenu: boolean
	isLockScreen: boolean
	lockScreenTime: number
	// 界面显示
	isShowLogo: boolean
	isBreadcrumb: boolean
	isBreadcrumbIcon: boolean
	isTagsview: boolean
	isTagsviewIcon: boolean
	isCacheTagsview: boolean
	isSortableTagsview: boolean
	isShareTagsview: boolean
	isFooter: boolean
	isGrayscale: boolean
	isInvert: boolean
	isWatermark: boolean
	watermarkText: string
	// 其他设置
	tagsStyle: string
	animation: string
	columnsAsideStyle: string
	columnsAsideLayout: string
	layout: string
	// 主要配置
	isRequestRoutes: boolean
	golbalTitle: string
	globalSubTitle: string
	globalI18n: string
	globalComponentSize: string
}

export interface ThemeConfigStates {
	themeConfig: ThemeConfigState
}

// keepAliveNames
export interface KeepAliveNamesState {
	keepAliveNames: String[]
	cachedViews: String[]
}

// TagsView
export interface TagsViewRoutesState {
	tagsViewRoutes: string[]
	isTagsViewCurrentFull: boolean
}
