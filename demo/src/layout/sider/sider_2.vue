<template>
	<aside>
		<!-- this.$router.push({path: '/product', query: {board: true}}) -->
		<MenuItem name="1-8">
			<router-link to="/agile/detail" />
			<Icon type="ios-photos-outline"></Icon>
			<span>项目详情</span>
		</MenuItem>
		<MenuItem name="1-2">
			<router-link to="/demand" />
			<Icon type="ios-filing-outline"></Icon>
			<span>项目需求</span>
		</MenuItem>
		<MenuItem name="1-3">
			<router-link  :to="{path: '/product', query: {board: true}}" />
			<Icon type="ios-list-outline"></Icon>
			<span>用户故事</span>
		</MenuItem>
		<MenuItem name="1-4">
			<router-link  to="/iteration" />
			<Icon type="ios-albums-outline"></Icon>
			<span>迭代管理</span>
		</MenuItem>
		<MenuItem name="1-5">
			<router-link :to="{path: '/development', query: {board: true}}" />
			<Icon type="ios-navigate"></Icon>
			<span>开发任务管理</span>
		</MenuItem>
		
		<MenuItem name="1-7">
			<router-link  to="/overView" />
			<Icon type="clipboard"></Icon>
			<span>项目概览</span>
		</MenuItem>
		<MenuItem name="1-9">
			<router-link  to="/documents" />
			<Icon type="document-text"></Icon>
			<span>附件管理</span>
		</MenuItem>
	</aside>
			
</template>
<script>
export default {
	name: 'sider_2',
	data(){
		return{

		}
	}
}
</script>
<style lang="less" scoped>
</style>
