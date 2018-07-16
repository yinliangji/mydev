<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目管理</BreadcrumbItem>
            <BreadcrumbItem>项目基本信息</BreadcrumbItem>
        </Breadcrumb>
        <Card>
        	<div class="baseInfoBox">
            	<h3 class="title">项目基本信息</h3>
            </div>
		</Card>
	</div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';

h4{
	font-size: 20px;
	color:#495060;
	font-weight: 400;
}
.baseInfoBox{
	
}</style>