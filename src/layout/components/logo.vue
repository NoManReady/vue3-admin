<template>
	<div
		class="layout-logo"
		:class="{ 'is-collapse': themeConfig.isCollapse }"
		@click="onCollapseChange"
	>
		<img :src="logoMini" alt="logoMini" class="layout-logo-img" />
		<span v-if="themeConfig.isCollapse" class="layout-logo-text">{{
			themeConfig.golbalTitle
		}}</span>
	</div>
</template>

<script lang="ts">
import useThemeConfig from '/@/store/modules/themeConfig'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import logoMini from '/@/assets/logo-mini.svg'

export default defineComponent({
	name: 'layoutLogo',
	setup() {
		const storesThemeConfig = useThemeConfig()
		const { themeConfig } = storeToRefs(storesThemeConfig)

		const onCollapseChange = () => {
			themeConfig.value.isCollapse = !themeConfig.value.isCollapse
		}
		return {
			themeConfig,
			logoMini,
			onCollapseChange,
		}
	},
})
</script>

<style scoped- lang="scss">
.layout-logo {
  width: 220px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0,21,41,0.02) 0 1px 4px;
  color: var(--el-color-primary);
  font-size: 16px;
  cursor: pointer;
  animation: logoAnimation 0.3s ease-in-out;
  $parent:&;
  &-text{
    white-space: nowrap;
    display: inline-block;
  }
  &-img{
    width: 20px;
    margin-right: 5px;
  }
  &:hover{
    #{$parent}-span{
      color: var(--color-primary-light-2);
    }
  }
  &.is-collapse{
    width: 100%;
    #{$parent}-img{
      margin:auto;
    }
    &:hover{
      #{$parent}-img{
        animation: logoAnimation 0.3s ease-in-out;
      }
    }
  }
}
</style>
