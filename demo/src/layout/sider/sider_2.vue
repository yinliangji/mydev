<template>
	<aside>
		
		<!-- <MenuItem name="1-2">
			<router-link to="/demand" />
			<Icon type="ios-photos-outline"></Icon>
			<span>需求项管理</span>
		</MenuItem> -->
		<MenuItem name="1-8">
			<router-link to="/agile/detail" />
			<Icon type="ios-photos-outline"></Icon>
			<span>项目详情</span>
		</MenuItem>
		<MenuItem name="1-3">
			<router-link  to="/product" />
			<Icon type="ios-list-outline"></Icon>
			<span>用户故事</span>
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
		
		<MenuItem name="1-7">
			<router-link  to="/overView" />
			<Icon type="clipboard"></Icon>
			<span>项目概览</span>
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
