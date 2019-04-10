<template>
	<aside id="asideMenu_2">
		<!-- this.$router.push({path: '/product', query: {board: true}}) -->
		<MenuItem name="1-8" title="项目详情">
			<router-link  to="/agile/detail" />
			<Icon type="ios-photos-outline"></Icon>
			<span>项目详情</span>
		</MenuItem>
		<MenuItem name="1-2" title="项目需求项">
			<router-link to="/demand" />
			<Icon type="ios-filing-outline"></Icon>
			<span>项目需求项</span>
		</MenuItem>
		<MenuItem name="1-3" title="用户故事">
			<router-link  :to="{path: '/product', query: {board: true}}" />
			<Icon type="ios-list-outline"></Icon>
			<span>用户故事</span>
		</MenuItem>
		<MenuItem name="1-4" title="迭代管理">
			<router-link  to="/iteration" />
			<Icon type="ios-albums-outline"></Icon>
			<span>迭代管理</span>
		</MenuItem>
		<MenuItem name="1-5" title="工作项管理">
			<router-link :to="{path: '/development', query: {board: true}}" />
			<Icon type="ios-navigate"></Icon>
			<span>工作项管理</span>
		</MenuItem>
		
		<MenuItem name="1-7" title="项目概览">
			<router-link  to="/overView" />
			<Icon type="clipboard"></Icon>
			<span>项目概览</span>
		</MenuItem>
		<MenuItem name="1-9" title="附件管理">
			<router-link  to="/documents" />
			<Icon type="document-text"></Icon>
			<span>附件管理</span>
		</MenuItem>
		<MenuItem name="1-12" title="依赖管理">
			<router-link  to="/dependManage" />
			<Icon type="social-codepen-outline"></Icon>
			<span>依赖管理</span>
		</MenuItem>
		<MenuItem name="1-15" title="测试案例与缺陷管理">
			<router-link  to="/testCaseUrl" />
			<Icon type="medkit"></Icon>
			<span>测试案例管理</span>
		</MenuItem>
		<MenuItem name="1-16" title="缺陷管理">
			<router-link to="/bugUrl"  />
			<Icon type="alert-circled"></Icon>
			<span>缺陷管理</span>
		</MenuItem>
		<MenuItem name="1-25" title="里程碑">
			<router-link  to="/milestone" />
			<Icon type="android-hand"></Icon>
			<span>里程碑</span>
		</MenuItem>
		<MenuItem name="1-17" title="项目设置">
			<router-link to="/setting" />
			<!-- <router-link :to="toURL()" /> -->
			<Icon type="settings"></Icon>
			<span>项目设置</span>
		</MenuItem>

	</aside>
			
</template>
<script>
export default {
	name: 'sider_2',
	data(){
		return{

		}
	},
	methods:{
		toURL(){
			let obj = {}
			let ID = window.prjId || window.id;
			let PrjSn = window.prjSn || window.prj_id;
			console.error(ID,PrjSn)
            if(ID){
            	obj.id = ID;
            	obj.prjId = ID;
            }
            if(PrjSn){
            	obj.prjSn = PrjSn;
            	obj.prj_id = PrjSn;
            }
            obj.test = 1111111;         
			return {path: '/setting', query: obj}
		}
		
	},
}
</script>
<style lang="less" scoped>
</style>
<style>
#asideMenu_2 .ivu-menu-item-active a {
	/*pointer-events: none;*/
}
</style>
