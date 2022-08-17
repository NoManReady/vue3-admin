import useThemeConfig from '/@/store/modules/themeConfig'
import { createI18n } from 'vue-i18n'

import zhcnLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from 'element-plus/lib/locale/lang/en'
import { storeToRefs } from 'pinia'

const messages = {
	[zhcnLocale.name]: {
		...zhcnLocale,
	},
	[enLocale.name]: {
		...enLocale,
	},
}

const storesThemeConfig = useThemeConfig()

const { themeConfig } = storeToRefs(storesThemeConfig)

const i18n = createI18n({
	silentFallbackWarn: true,
	locale: themeConfig.value.globalI18n,
	fallbackLocale: zhcnLocale.name,
	messages,
})


export default i18n
