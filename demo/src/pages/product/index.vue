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
					<div class="tagBox">
						<Row :gutter="10" align="middle">
							<Col span="2" class="addBtnBox">
								<Button type="success">添加任务</Button>
							</Col>
							<Col span="1">
								<img src="@/assets/images/product-list.png" @click="showList" class="cursor">
							</Col>
							<Col span="1">
								<img src="@/assets/images/product-kanban.png" @click="showTask" class="cursor">
							</Col>
							<Col span="1" >
								<span class="high">高</span>
							</Col>
							<Col span="1">
								<span class="middle">中</span>
							</Col>
							<Col span="1">
								<span class="low">低</span>
							</Col>
						</Row>
					</div>

					<div class="listBox">
						<component :is="currentView" :myCardList="cardList" :myProduct="MyProduct" :myStatusList="statusList" :myGroupList="groupList"></component>
					</div>

			    </div>
			</div>
		</Card>
	</div>
</template>
<script>
import kanbanboard from "@/components/kanbanboard";
export default {
	data() {
		return {
			currentView: "kanbanboard",
			MyProduct:"=-=-=-=-===-=-=-=-=-",
			groupList:[
		        { text: "产品待办事项" },
		        {
		          text: "用户登录1",
		          groupId: "group_01"
		        },
		        {
		          text: "创建代码仓库",
		          groupId: "group_02"
		        },
		        {
		          text: "未知项",
		          groupId: "group_03"
		        },
			],
			statusList:[
				{
				  stateStr: "未开始",
				  state: "01",
				  taskNumber: "3"
				},
				{
				  stateStr: "设计开发",
				  state: "02",
				  taskNumber: "4"
				},
				{
				  stateStr: "测试",
				  state: "03",
				  taskNumber: "5"
				},
				{
				  stateStr: "发布",
				  state: "04",
				  taskNumber: "6"
				},
				{
				  stateStr: "上线",
				  state: "05",
				  taskNumber: "3"
				}
			],
			cardList:[
	            {
	              taskId: "#US0001",
	              description:
	                "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	              userName: "user1",
	              userId: "userId_01",
	              groupId: "group_01",
	              bgColor: { background: "#b3ecec" },
	              taskStateStr: "未开始",
	              taskState: "01",
	              headPortrait: require("@/assets/images/user_02.png")
	            },
	            {
	              taskId: "#US0002",
	              description:
	                "设计开发-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	              userName: "user1",
	              userId: "userId_02",
	              groupId: "group_02",
	              bgColor: { background: "#f8d6af" },
	              taskStateStr: "设计开发",
	              taskState: "02",
	              headPortrait: require("@/assets/images/user_02.png")
	            },
	            {
	              taskId: "#US0003",
	              description:
	                "设计开发-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	              userName: "user1",
	              userId: "userId_03",
	              groupId: "group_01",
	              bgColor: { background: "#f8d6af" },
	              taskStateStr: "测试",
	              taskState: "02",
	              headPortrait: require("@/assets/images/user_02.png")
	            },
	            {
	              taskId: "#US0004",
	              description:
	                "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	              userName: "user1",
	              userId: "userId_04",
	              groupId: "group_03",
	              bgColor: { background: "#f8d6af" },
	              taskStateStr: "测试",
	              taskState: "01",
	              headPortrait: require("@/assets/images/user_02.png")
	            },
	            {
	              taskId: "#US0005",
	              description:
	                "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	              userName: "user1",
	              userId: "userId_05",
	              groupId: "group_01",
	              bgColor: { background: "#f8d6af" },
	              taskStateStr: "测试",
	              taskState: "04",
	              headPortrait: require("@/assets/images/user_02.png")
	            },
	            {
	              taskId: "#US0006",
	              description:
	                "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	              userName: "user1",
	              userId: "userId_06",
	              groupId: "group_01",
	              bgColor: { background: "#f8d6af" },
	              taskStateStr: "测试",
	              taskState: "01",
	              headPortrait: require("@/assets/images/user_02.png")
	            },
	            {
	              taskId: "#US0007",
	              description:
	                "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	              userName: "user1",
	              userId: "userId_07",
	              groupId: "group_01",
	              bgColor: { background: "#f8d6af" },
	              taskStateStr: "测试",
	              taskState: "01",
	              headPortrait: require("@/assets/images/user_02.png")
	            },
	            {
	              taskId: "#US0008",
	              description:
	                "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	              userName: "user1",
	              userId: "userId_08",
	              groupId: "group_01",
	              bgColor: { background: "#f8d6af" },
	              taskStateStr: "测试",
	              taskState: "03",
	              headPortrait: require("@/assets/images/user_02.png")
	            }
	        ],
		}
	},
	components: {
		kanbanboard,
	},
	computed: {

	},
	methods:{
		showList() {
			this.currentView = "developList";
		},
		showTask(){
			this.currentView = "kanbanboard";
		},
	}
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
.tagBox{
	background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    margin-bottom: 20px;
    padding-left:5px;
}
.addBtnBox {
	transform: translate(0, -15%);
}
.listBox {
	overflow: hidden;
	position:relative;
}
span.high {
  background: #f8d6af;
  width: 100%;
  height: 25px;
  display: inline-block;
  line-height: 25px;
  text-align: center;
}
span.middle {
  background: #b3ecec;
  width: 100%;
  height: 25px;
  display: inline-block;
  line-height: 25px;
  text-align: center;
}
span.low {
  background: #f2e1f0;
  width: 100%;
  height: 25px;
  display: inline-block;
  line-height: 25px;
  text-align: center;
}
</style>