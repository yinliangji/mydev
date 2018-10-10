<template>
	<aside>
		<MenuItem name="1-1">
			<router-link  to="/agile" />
			<Icon type="ios-bolt"></Icon>
			<span>敏捷项目列表</span>
		</MenuItem>
		<MenuItem name="1-10">
			<router-link  to="/dataSynchro" />
			<Icon type="shuffle"></Icon>
			<span>数据同步</span>
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
