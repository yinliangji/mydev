<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>工作台</BreadcrumbItem>
            <BreadcrumbItem>我的任务</BreadcrumbItem>
        </Breadcrumb>
		<a @click="myClick">page1</a>
	</div>
</template>
<script>
import Store from '@/vuex/store'
import API from '@/api'
const {demoAXIOS} = API;

export default {
	name: 'page1',
	data(){
		return{
			
		}
	},
	methods:{
		myClick(){
			Store.dispatch('IS_LOADING/incrementAsync',{isShow:true,msg:"正在加载中……"})     
		},
	},
	mounted(){
		//
		demoAXIOS("",{x:1,y:2},{timeout:2000,method:'get'}).then((response) => {
			console.log("page1+++++++++++++++++++++",response)
		}).catch( (error) => {
			console.log(error)
		});
		//
	},

}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
</style>


