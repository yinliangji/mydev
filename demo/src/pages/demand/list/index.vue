<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
             <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目管理</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目列表</BreadcrumbItem>
            <BreadcrumbItem>需求列表</BreadcrumbItem>
        </Breadcrumb>
		<Card>
			<div class="demandListBox">
				<h3 class="Title">需求列表</h3>
			</div>
		</Card>

	</div>
</template>
<script>
import kanbanboard from "@/components/kanbanboard";
export default {
	components: {
		kanbanboard,
	}

}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.demandListBox{

}
</style>