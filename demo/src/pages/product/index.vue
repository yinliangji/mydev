<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目管理</BreadcrumbItem>
            <BreadcrumbItem>产品代办列表</BreadcrumbItem>
        </Breadcrumb>
		<Card>
			<div class="productBox">
				<h3 class="Title">产品代办列表</h3>
				<Form ref="formValidate" class="formValidate">
			        <FormItem >
						<Row>
							<Col span="15">
								<Row class="SerchBox">
						        	<Col span="3" style="text-align: center">需求名称</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入需求名称"></Input>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">需求编号</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入需求编号"></Input>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">需求类型</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入需求类型"></Input>
						                </FormItem>
						            </Col>
						        </Row>
						        <Row class="SerchBox">
						        	<Col span="3" style="text-align: center">需求状态</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入需求状态"></Input>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">所属需求项</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入所属需求项"></Input>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">优先级</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入优先级"></Input>
						                </FormItem>
						            </Col>
						        </Row>
							</Col>
							<Col span="9" style="text-align: left" class="serchBtnBox">
								<Button type="primary" icon="ios-search" class="serchBtn">查询</Button>
							</Col>
						</Row>
			        </FormItem>
			    </Form>
			    <div class="tableBox">
			    	<kanbanSearch :searchParams="searchParams"></kanbanSearch>
			    </div>
			</div>
		</Card>
	</div>
</template>
<script>
import kanbanboard from "@/components/kanbanboard";
export default {
	components: {
		kanbanboard,
	},
	computed: {
		searchParams: function() {
			return [
				{
					type: "input",
					label: "迭代名称",
					params: "iterationName"
				},
				{
					type: "input",
					label: "迭代编号",
					params: "iterationNumber"
				},
				{
					type: "input",
					label: "需求名称",
					params: "needName"
				},
				{
					type: "input",
					label: "任务状态",
					params: "taskStatus"
				},
				{
					type: "input",
					label: "所属迭代",
					params: "belongIteration"
				},
				{
					type: "input",
					label: "责任人",
					params: "personLiable"
				}
			];
		}
	},
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.SerchBox{
	padding-bottom:10px;
}
.serchBtn{
	transform: translate(50%, 60%);
}
.tableBox{
	padding-top: 20px;
}
</style>