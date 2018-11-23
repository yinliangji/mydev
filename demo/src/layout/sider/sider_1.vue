<template>
	<aside>
		<MenuItem name="1-1">
			<router-link  to="/agile" />
			<Icon type="ios-bolt"></Icon>
			<span>敏捷项目列表</span>
		</MenuItem>
		<MenuItem name="1-10">
			<router-link  to="/dataSynchro" v-show="isShowMngAllBtn" />
			<Icon type="shuffle"></Icon>
			<span>数据同步</span>
		</MenuItem>
		<MenuItem name="1-11">
			<router-link  to="/userAdvice" v-show="isShowMngAllBtn" />
			<Icon type="ios-people"></Icon>
			<span>用户反馈</span>
		</MenuItem>
	</aside>
</template>
<script>
export default {
	name: 'sider_1',
	data(){
		return{
			isShowMngAllBtn:true,
		}
	}
}
</script>
<style lang="less" scoped>
</style>
