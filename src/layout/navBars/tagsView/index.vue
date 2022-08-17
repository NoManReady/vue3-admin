<template>
	<div class="layout-navbars-tagsview">
		<el-scrollbar ref="scrollbarRef" @wheel.prevent="onHandleScroll">
			<ul class="layout-navbars-tagsview-body" ref="tagsBodyRef">
				<li
					class="layout-navbars-tagsview-item"
					v-for="(tag, key) in tagsViewList"
					:key="key"
					:data-url="tag.url"
					:class="{ 'is-active': isActive(tag) }"
					@contextmenu.prevent="onContextmenu(tag, $event)"
					@click="onTagsClick(tag, key)"
				>
					<i
						class="iconfont icon-webicon318 layout-navbars-tagsview-body-item-iconfont"
						v-if="isActive(tag)"
					>
					</i>
					<SvgIcon
						:name="tag.meta.icon"
						v-if="!isActive(tag) && themeConfig.isTagsviewIcon"
						class="pr5"
					/>
					<span>{{ tag.title }}</span>
					<template v-if="isActive(tag)">
						<SvgIcon
							name="ele-RefreshRight"
							class="ml5 layout-navbars-tagsview-body-item-refresh"
							@click.stop="refreshCurrentTagsView()"
						/>
            <SvgIcon
							name="ele-Close"
							class="layout-navbars-tagsview-body-item-icon layout-icon-active"
							@click.stop="closeCurrentTagsView(tag)"
						/>
					</template>
          <!-- <SvgIcon
							name="ele-Close"
							class="layout-navbars-tagsview-body-item-icon layout-icon-active"
							@click.stop="closeCurrentTagsView(tag)"
						/> -->
				</li>
			</ul>
		</el-scrollbar>
		<Contextmenu :dropdown="dropdown" ref="contextmenuRef" @contextmenu="onContextmenu">
	</div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { computed, defineComponent, getCurrentInstance, nextTick, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Contextmenu from './contextmenu.vue'
import useKeepAliveNames from '/@/store/modules/keepALiveNames'
import useTagsViewRoutes from '/@/store/modules/tagsViewRoutes'
import useThemeConfig from '/@/store/modules/themeConfig'
import { Session } from '/@/utils/storage'

interface TagsViewState{
  routeActive:string
  routePath:string|unknown
  dropdown:{
    x:string|number
    y:string|number
  }
  sortable:any
  tagsRefsIndex:number
  tagsViewList:any[]
  tagsViewRoutesList:any[]
}

interface RouteParams{
  path:string
  url:string
  query:object
  params:object
}

interface CurrentContextmenu{
  meta:{
    isDynamic:boolean,
    isDynamicPath:string
  }
  params:any
  query:any
  path:string
  id:string|number
}

export default defineComponent({
	name: 'layoutTagsView',
	components: {
		Contextmenu,
	},
	setup() {
    const {proxy}=<any>getCurrentInstance()
    const tagsRefs=ref<Element[]>([])
    const scrollbarRef=ref()
    const contextmenuRef=ref()
    const tagsBodyRef=ref()

    const storesTagsViewRoutes=useTagsViewRoutes()
    const {tagsViewRoutes} =storeToRefs(storesTagsViewRoutes)
    const storesThemeConfig=useThemeConfig()
    const {themeConfig} =storeToRefs(storesThemeConfig)

    const storesKeepAliveNames=useKeepAliveNames()
    const route=useRoute()
    const router=useRouter()
    const state=reactive<TagsViewState>({
      routeActive:'',
      routePath:route.path,
      dropdown:{x:0,y:0},
      sortable:'',
      tagsRefsIndex:0,
      tagsViewList:[],
      tagsViewRoutesList:[]
    })
    // tag风格
    const tagsStyle=computed(()=>{
      return themeConfig.value.tagsStyle
    })

    // 是否高亮
    const isActive=(tag:RouteParams)=>{
      if(themeConfig.value.isShareTagsview){
        return tag.path===state.routePath
      }else{
        if((tag.query&&Object.keys(tag.query).length)||(tag.params&&Object.keys(tag.params).length)){
          return tag.url?tag.url===state.routeActive:tag.path===state.routePath
        }else{
          tag.path===state.routePath
        }
      }
    }
    // 存储tagsViewList到浏览器缓存中
    const addTagsViewListToSession=(tagsViewList:any[])=>{
      Session.set('tagsViewList',tagsViewList)
    }

    // 获取高亮时路径
    const getTagsViewHighlight=(tag:any)=>{
      const params=tag.query&&Object.keys(tag.query).length>0?tag.query:tag.params
      if(!params||Object.keys(params).length===0){
        return tag.path
      }
      let path=''
      for(const key in params){
        path+=params[key]
      }
      return `${tag.meta.isDynamic?tag.meta.isDynamicPath:tag.path}-${path}`
    }
    //
    // 添加tagsView
    const addTagsView=(path:string,to?:any)=>{
      const _path=to.meta.isDynamic?to.meta.isDynamic:path
      nextTick(async()=>{
        if(themeConfig.value.isShareTagsview){
          await solveAddTagsView(path,to)
        }else{
          await singleAddTagsView(path,to)
        }
        const isExits=state.tagsViewList.some(tag=>tag.path===_path)
        if(isExits){
          return false
        }
        const item=state.tagsViewRoutesList.find(tag=>tag.path===_path)
        if(!item){
          return false
        }
        if(item.meta.isLink&&!item.meta.isIframe){
          return false
        }
        if(to&&to.meta.isDynamic){
          item.params=to.params?to.params:route.params
        }else{
          item.query=to.query?to.query:route.query
        }
        item.url=getTagsViewHighlight(item)
        storesKeepAliveNames.addCachedView(item)
        state.tagsViewList.push({...item})
        addTagsViewListToSession(state.tagsViewList)
      })
    }

    // 初始化tagsview
    const initTagsView=async()=>{
      if(Session.get('tagsViewList')&&themeConfig.value.isCacheTagsview){
        state.tagsViewList=Session.get('tagsViewList')
      }else{
        state.tagsViewRoutesList.forEach((tagRoute:any)=>{
          if(tagRoute.meta.isAffix&&!tagRoute.meta.isHide){
            tagRoute.url=getTagsViewHighlight(tagRoute)
            state.tagsViewList.push({...tagRoute})
            storesKeepAliveNames.addCachedView(tagRoute)
          }
        })

      }
    }

    // 获取tagsViewRoutes列表
    const getTagsViewRoutes=async()=>{
      state.routeActive=getTagsViewHighlight(route)
      state.routePath=route.meta.isDynamic?route.meta.isDynamicPath:route.path
      state.tagsViewList=[]
      state.tagsViewRoutesList=tagsViewRoutes.value
      initTagsView()
    }


		return {}
	},
})
</script>

<style scoped></style>
