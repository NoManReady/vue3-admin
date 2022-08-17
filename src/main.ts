import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import mitt from 'mitt'

import { router } from './router'
import pinia from '/@/store'
import i18n from '/@/i18n'
import App from './App.vue'
import './styles/index.scss'

const app = createApp(App)
app.use(pinia).use(router).use(ElementPlus, { i18n: i18n.global.t }).use(i18n)
// 注册所有element icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.mount('#app')

app.config.globalProperties.mittBus = mitt()
