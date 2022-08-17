<template>
	<el-form size="large" class="login-content-form">
		<el-form-item class="login-animation1">
			<el-input type="text" placeholder="账号" v-model="baseModel.account" autocomplete="off">
				<template #prefix>
					<el-icon><User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-input
				:type="isShowPassword ? 'text' : 'password'"
				placeholder="密码"
				v-model="baseModel.password"
				autocomplete="off"
			>
				<template #prefix>
					<el-icon><Lock /></el-icon>
				</template>
				<!-- <template #suffix>
					<el-icon @click="isShowPassword = !isShowPassword"><View /></el-icon>
				</template> -->
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation4">
			<el-button
				type="primary"
				class="login-content-submit"
				round
				@click="onSignIn"
				:loading="loading"
			>
				登录
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts">
import { NextLoading } from '/@/utils/loading'
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { login } from '/@/apis/login'
import loginApis from '/@/apiServer/login'
import { setToken } from '/@/utils/cookie'

interface ViewState {
	isShowPassword: boolean
	baseModel: {
		account: string
		password: string
	}
	loading: boolean
}

export default defineComponent({
	name: 'loginAccount',
	setup() {
		const route = useRoute()
		const router = useRouter()
		const state = reactive<ViewState>({
			isShowPassword: false,
			baseModel: {
				account: '',
				password: '',
			},
			loading: false,
		})

		const onSignSuccess = () => {
			if (route.query?.redirect) {
				router.push({
					path: <string>route.query.redirect,
					query: route.query.params ? JSON.parse(<string>route.query.params) : '',
				})
			} else {
				router.push('/')
			}
			state.loading = false
			ElMessage.success('登录成功')
			NextLoading.start()
		}

		const onSignIn = async () => {
			state.loading = true
			try {
				const result = await loginApis.login({
					...state.baseModel,
					password: window.btoa(state.baseModel.password),
				})
				console.log(result)
				setToken(result.token as string)
				onSignSuccess()
			} catch (error) {
				console.log(error)
				ElMessage.error('登陆失败')
			}
			state.loading = false
		}
		return {
			...toRefs(state),
			onSignIn,
		}
	},
})
</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;
	@for $i from 1 through 4 {
		.login-animation#{$i} {
			opacity: 0;
			animation-name: error-num;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: calc($i/10) + s;
		}
	}
	.login-content-password {
		display: inline-block;
		width: 20px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-code {
		width: 100%;
		padding: 0;
		font-weight: bold;
		letter-spacing: 5px;
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
}
</style>
