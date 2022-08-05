import { router } from '@/router'
import useThemeConfig from '@/store/modules/themeConfig'
import { storeToRefs } from 'pinia'
import { nextTick } from 'vue'

export default () => {
	const storesThemeConfig = useThemeConfig()
	const { themeConfig } = storeToRefs(storesThemeConfig)
	nextTick(() => {
		const globalTitle: string = themeConfig.value.golbalTitle
		const { meta } = router.currentRoute.value
		const webTitle = meta.title as string
		document.title = `${webTitle} - ${globalTitle}` || globalTitle
	})
}
