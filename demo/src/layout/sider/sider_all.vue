<template>
	<aside>
		<MenuItem name="1-1">
				<router-link  to="/agile" />
				<Icon type="ios-bolt"></Icon>
				<span>敏捷项目列表</span>
			</MenuItem>
			<MenuItem name="1-2">
				<router-link to="/demand" />
				<Icon type="ios-photos-outline"></Icon>
				<span>需求项管理</span>
			</MenuItem>
			<MenuItem name="1-3">
				<router-link  to="/product" />
				<Icon type="ios-list-outline"></Icon>
				<span>产品待办列表</span>
			</MenuItem>
			<MenuItem name="1-4">
				<router-link  to="/iteration" />
				<Icon type="ios-albums-outline"></Icon>
				<span>迭代管理</span>
			</MenuItem>
			<MenuItem name="1-5">
				<router-link  to="/development" />
				<Icon type="ios-navigate"></Icon>
				<span>开发任务管理</span>
			</MenuItem>
			<MenuItem name="1-6">
				<router-link  to="/defect" />
				<Icon type="alert-circled"></Icon>
				<span>缺陷管理</span>
			</MenuItem>
			<MenuItem name="1-7">
				<router-link  to="/overView" />
				<Icon type="clipboard"></Icon>
				<span>项目概览</span>
			</MenuItem>
	</aside>
</template>
<script>
export default {
	name: 'sider_1',
	data(){
		return{

		}
	}
}
</script>
<style lang="less" scoped>
</style>
