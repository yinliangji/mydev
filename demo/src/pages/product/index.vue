<template>
	<div class="pageContent">
		<goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :Top="'10'" />
		<selectMenu></selectMenu>
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
						<div class="formValidateMoreBtnBox">
                            <Icon type="chevron-down" color="#ed3f14"></Icon>
                            <Icon type="chevron-down" color="#ed3f14"></Icon>
                        </div>
			        </FormItem>
			    </Form>
			    <div class="tableBox">
					<div class="tagBox">
						<Row :gutter="10" align="middle">
							<Col span="3" class="addBtnBox">
								<Button type="success" @click="addItem">添加待办事项</Button>
							</Col>
							<Col span="1" >
								<img src="@/assets/images/product-list.png" @click="showList" class="cursor">
							</Col>
							<Col span="1" >
								<img src="@/assets/images/product-kanban.png" @click="showTask" class="cursor">
							</Col>
							<Col span="1" v-if="currentView == 'kanbanboard'">
								<span class="high">高</span>
							</Col>
							<Col span="1" v-if="currentView == 'kanbanboard'">
								<span class="middle">中</span>
							</Col>
							<Col span="1" v-if="currentView == 'kanbanboard'">
								<span class="low">低</span>
							</Col>
						</Row>
					</div>


					<div class="tableContBox" v-if="currentView == 'developList'">
						<Table border :columns="columns" :data="tableData"  />
						<div class="pageBox">
				    		<Page :total="100" show-elevator></Page>
				    		<p>显示第1到第5条记录，总共90条记录</p>
				    	</div>
					</div>
					<div class="listBox" v-else>
						<kanbanboard :cardList="cardList" :statusList="statusList" :groupList="groupList" />
						<!-- <component :is="currentView" :myCardList="cardList" :myProduct="MyProduct" :myStatusList="statusList" :myGroupList="groupList"></component>-->
					</div>


			    </div>
			</div>
		</Card>
		<ADDorEDITpop :isShow="isShowAddPop" :isAdd="isAdd" :addLoading="true" @popClose="popCloseFn"  @tableDataAdd="tableDataAddFn" :tabDataRow="tableDataRow"  />
	</div>
</template>
<script>
import kanbanboard from "@/components/kanbanboard";
import ADDorEDITpop from "./add_or_edit_pop";
export default {
	data() {
		return {
			isShowAddPop:false,
            isAdd:true,
            tableDataRow:false,
			currentView: "developList",//developList//kanbanboard
			groupList:[
		        // { text: "产品待办事项" },
		        // {
		        //   text: "用户登录1",
		        //   groupId: "group_01"
		        // },
		        // {
		        //   text: "创建代码仓库",
		        //   groupId: "group_02"
		        // },
		        // {
		        //   text: "未知项",
		        //   groupId: "group_03"
		        // },
			],
			statusList:[
				{
				  stateStr: "未开始",
				  state: "01",
				  taskNumber: "3"
				},
				{
				  stateStr: "处理中",
				  state: "02",
				  taskNumber: "4"
				},
				{
				  stateStr: "已完成",
				  state: "03",
				  taskNumber: "5"
				},
				{
				  stateStr: "废弃",
				  state: "04",
				  taskNumber: "6"
				},
				// {
				//   stateStr: "上线",
				//   state: "05",
				//   taskNumber: "3"
				// }
			],
			cardList:[
	            {
	              taskId: "#US0001",
	              description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
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
	              description:"设计开发-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
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
	              description:"设计开发-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	              userName: "user1",
	              userId: "userId_03",
	              groupId: "group_01",
	              bgColor: { background: "#f8d6af" },
	              taskStateStr: "测试",
	              taskState: "02",
	              headPortrait: require("@/assets/images/user_02.png")
	            },
	            // {
	            //   taskId: "#US0004",
	            //   description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_04",
	            //   groupId: "group_03",
	            //   bgColor: { background: "#f8d6af" },
	            //   taskStateStr: "测试",
	            //   taskState: "01",
	            //   headPortrait: require("@/assets/images/user_02.png")
	            // },
	            // {
	            //   taskId: "#US0005",
	            //   description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_05",
	            //   groupId: "group_01",
	            //   bgColor: { background: "#f8d6af" },
	            //   taskStateStr: "测试",
	            //   taskState: "04",
	            //   headPortrait: require("@/assets/images/user_02.png")
	            // },
	            // {
	            //   taskId: "#US0006",
	            //   description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_06",
	            //   groupId: "group_01",
	            //   bgColor: { background: "#f8d6af" },
	            //   taskStateStr: "测试",
	            //   taskState: "01",
	            //   headPortrait: require("@/assets/images/user_02.png")
	            // },
	            // {
	            //   taskId: "#US0007",
	            //   description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_07",
	            //   groupId: "group_01",
	            //   bgColor: { background: "#f8d6af" },
	            //   taskStateStr: "测试",
	            //   taskState: "01",
	            //   headPortrait: require("@/assets/images/user_02.png")
	            // },
	            // {
	            //   taskId: "#US0008",
	            //   description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_08",
	            //   groupId: "group_01",
	            //   bgColor: { background: "#f8d6af" },
	            //   taskStateStr: "测试",
	            //   taskState: "03",
	            //   headPortrait: require("@/assets/images/user_02.png")
	            // }
	        ],
	        columns: [
	        	{
                    title: '事项编号',
                    key: 'num',
                    width: 85,
                    align: 'center'
                },

                {
                    title: '产品待办事项名称',
                    key: 'name',
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                style:{color:'#2d8cf0'},
                                //domProps:{href:"###"},
                                on: {
                                    click: () => {
                                        this.linkFn(params.index)
                                    }
                                }
                            },
                            params.row.name
                        );
                    }
                },

                {
                    title: '事项类型',
                    key: 'describe',
                    width: 85,
                    align: 'center',
                },
                {
                    title: '负责人',
                    key: 'person',
                    width: 80,
                    align: 'center',
                    // render: (h, params) => {
                    //     return h(
                    //         'a',
                    //         {
                    //             style:{color:'#2d8cf0'},
                    //             //domProps:{href:"###"},
                    //             on: {
                    //                 click: () => {
                    //                     this.linkFn(params.index)
                    //                 }
                    //             }
                    //         },
                    //         params.row.person
                    //     );
                    // }
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 85,
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'span',
                            {
                                style:{
                                	color:"white",
                                	background:(function(S){if(S == "未开始"){return "#5cadff"}else if(S == "处理中"){return "#ff9900"}else if(S == "已完成"){return "#19be6b"}else{return "#1c2438"} })(params.row.status),
                                	padding:'0.5em',
                                	display:"inline-block",
                                	borderRadius:"3px",

                                },

                                //domProps:{href:"###"},
                            },
                            params.row.status
                        )
                    }
                },
                {
                    title: '所属迭代',
                    key: 'Iteration',
                    width: 90,
                    align: 'center',
                },
                {
                    title: '优先级',
                    key: 'priority',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'span',
                            {
                                style:{
                                	color:"white",
                                	background:(function(S){if(S == "1"){return "#ed3f14"}else if(S == "2"){return "#19be6b"}else{return "#2d8cf0"} })(params.row.priority),
                                	display:"inline-block",
                                	borderRadius:"50%",
                                	height:"1.5em",
                                	width:"1.5em",
                                	lineHeight:"1.5em",
                                },

                                //domProps:{href:"###"},
                            },
                            //
                            ((N) => {if (N == 1) {return "高"}else if (N == 2) {return "中"}else if (N == 3) {return "低"}else {return "无"}})(params.row.priority)
                        )
                    }

                },
                {
                    title: '工时|实际|预计',
                    key: 'manHours',
                    type: 'html',
                    align: 'center',
                    width: 90,
                    renderHeader: (h, params) => {
				        return h('div', {}, [
				            h('span', {}, '工时'),
				            h('br'),
				            h('span', {}, '实际|预计')
				        ]);
				    }
                },
                {
                    title: '关联任务|已完成|全部',
                    key: 'mission',
                    width: 105,
                    align: 'center',
                    renderHeader: (h, params) => {
				        return h('div', {}, [
				            h('span', {}, '关联任务'),
				            h('br'),
				            h('span', {}, '已完成|全部')
				        ]);
				    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 220,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        //this.show(params.index)
                                        this.editItem(params.index)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '添加任务'),
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        //this.show(params.index)
                                        this.goDevelopmentFn();
                                    }
                                }
                            }, '任务看板')
                        ]);
                    }
                }
            ],
	        tableData: [
                {
					name: '项目名称1',
					num: 18,
					describe: '产品需求',
					person:"谢呗",
					status:"已完成",
					Iteration:"迭代1",
					priority:"1",
					manHours:"20 | 10",
					mission:"5 | 10",
					icon: require("@/assets/images/user_02.png")
                },
                {
					name: '项目名称2',
					num: 24,
					describe: '产品需求',
					person:"谢呗2",
					status:"处理中",
					Iteration:"迭代2",
					priority:"2",
					manHours:"20 | 10",
					mission:"5 | 10",
					icon: require("@/assets/images/user_02.png")
                },
                {
					name: '项目名称3',
					num: 24,
					describe: '产品需求',
					person:"谢呗3",
					status:"未开始",
					Iteration:"迭代3",
					priority:"3",
					manHours:"20 | 10",
					mission:"5 | 10",
					icon: require("@/assets/images/user_02.png")
                },
            ],
		}
	},
	components: {
		kanbanboard,
		ADDorEDITpop

	},
	computed: {

	},

	mounted(){
		for(let i=0;i<this.tableData.length;i++){
			let statusNum = false;
			let statusData = this.tableData[i].status;
			if(statusData == "未开始"){
				statusNum = "01";
			}else if(statusData == "处理中"){
				statusNum = "02";
			}else if(statusData == "已完成"){
				statusNum = "03";
			}else{
				statusNum = "04";
			}
			this.cardList[i].description = this.tableData[i].name
			this.cardList[i].userName = this.tableData[i].person;
			this.cardList[i].taskState = statusNum;
			this.cardList[i].headPortrait = this.tableData[i].icon;


		}
	},
	methods:{
		tableDataAddFn(Data){
			if(this.isAdd){
                this.tableData.push(Data);
                this.$Message.info('成功');
            }else{
                alert(JSON.stringify(Data))
            }
			
		},
		addItem(){
			console.log("this.isShowAddPop",this.isShowAddPop)
			this.isShowAddPop = true;
            this.isAdd = true;
		},
		editItem(I){
			console.log(I,this.tableData[I])
			//
			this.isShowAddPop = true;
            this.isAdd = false;
            this.tableDataRow = this.tableData[I]
		},
		popCloseFn(){
			this.isShowAddPop = false;
            this.isAdd = true;
            this.tableDataRow = false;
		},
		goDevelopmentFn (index) {
            this.$router.push('/development')
        },
		linkFn (index) {
            //alert(index)
            this.$router.push('/product/baseinfo')
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
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
.pageBox {
	padding-bottom:20px;
	padding-top:20px;
	overflow: hidden;
}
.pageBox ul{
	float: right;
}
.pageBox p{
	float:left;
	line-height: 32px;
	font-size:12px;
}
.cursor {
	cursor: pointer;
}
</style>

