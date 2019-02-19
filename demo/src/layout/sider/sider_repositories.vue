<template>
	<aside id="sider_repositories">
		<MenuItem name="1-22" title="Maven公共仓库浏览">
			<router-link to="/maven" />
			<Icon type="soup-can-outline"></Icon>
			<span class="mavenBrowse">Maven公共仓库</span>
		</MenuItem>
		<MenuItem name="1-23" title="制品搜索">
			<router-link to="/maven/produceSearch" />
			<Icon type="pinpoint"></Icon>
			<span>制品搜索</span>
		</MenuItem>
	</aside>
</template>
<script>
export default {
	name: 'sider_repositories',
	data(){
		return{
		}
	}
}
</script>
<style lang="less" scoped>
</style>
<style lang="less">
.siderMenu span.mavenBrowse {
	width: 108px;
	font-size: 12px;
}
.siderMenu span.mavenBrowse em{
	font-size:8px;
}
.siderMenu.collapsed-menu span.mavenBrowse {
	width: 0;
}
</style>


