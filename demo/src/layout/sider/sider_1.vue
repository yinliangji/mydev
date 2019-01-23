<template>
	<aside>
		<MenuItem name="1-1" title="敏捷项目列表">
			<router-link  to="/agile" />
			<Icon type="ios-bolt"></Icon>
			<span>敏捷项目列表</span>
		</MenuItem>
		<MenuItem name="1-10" title="数据同步">
			<router-link  to="/dataSynchro" v-show="isShowMngAllBtn" />
			<Icon type="shuffle"></Icon>
			<span>数据同步</span>
		</MenuItem>
		<MenuItem name="1-11" title="用户反馈">
			<router-link  to="/userAdvice" v-show="isShowMngAllBtn" />
			<Icon type="ios-people"></Icon>
			<span>用户反馈</span>
		</MenuItem>
	</aside>
</template>
<script>

import Common from '@/Common';
const {getPermission} = Common.restUrl;
export default {
	name: 'sider_1',
	data(){
		return{
			isShowMngAllBtn:true,
		}
	},
	methods:{
		showError(Err){
			Common.ErrorShow(ERR,this);
		},
		getPermission(params){
			if(params && Array.isArray(params)){
				this.isShowMngAllBtn = params.findIndex(n => n == "icdp_projList_mng") > -1 ? true : false
			}

		},
	},
    created(){
    	console.log("sider_1--created-------");
    	EVENT.on("SIDER1",(result)=>{
            if(result && result.permission){
            	this.getPermission(result.permission)
            }else{
            	this.getPermission()
            }
        })

        
    },
}
</script>
<style lang="less" scoped>
</style>
