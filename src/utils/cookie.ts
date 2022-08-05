import cookie from 'js-cookie'
import { APP_TOKEN_KEY } from './constant'
const domain = `${document.domain}`
export const isProd = process.env.NODE_ENV === 'production'

export const getCookie = (name: string) => cookie.get(name)
export const setCookie = (name: string, value: string) => cookie.set(name, value, { domain })
export const removeCookie = (name: string) => cookie.remove(name, { domain })

// token
export const setToken = (token: string) => setCookie(APP_TOKEN_KEY, token)
export const getToken = () => getCookie(APP_TOKEN_KEY)
export const removeToken = () => removeCookie(APP_TOKEN_KEY)

/**
 * 清除所有cookie
 */
export function clearAllCookie() {
	localStorage.clear()
	sessionStorage.clear()
	const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
	if (keys) {
		for (let i = keys.length; i--; ) {
			cookie.remove(keys[i])
			cookie.remove(keys[i], { domain })
		}
	}
}
