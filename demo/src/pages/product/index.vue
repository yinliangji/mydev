<template>
	<div class="pageContent">
		<goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :Top="'10'" />
		<selectMenu></selectMenu>
		<Card>
			<div class="productBox">
				<h3 class="Title">用户故事</h3>
				<Form ref="formValidate" class="formValidate">
			        <FormItem >
						<Row class="serchInputBox">
							<Col span="15">
								<Row class="SerchBox">
						        	<Col span="3" style="text-align: center">用户故事名称</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入用户故事名称"></Input>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">故事编号</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入故事编号"></Input>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">故事类型</Col>
						            <Col span="5">
						                <FormItem >
                                            <Select  placeholder="请选择故事类型">
                                                <Option value="用户需求">用户需求</Option>
					                            <Option value="生产问题">生产问题</Option>
					                            <Option value="自主创新">自主创新</Option>
                                            </Select>
                                        </FormItem>
						            </Col>
						        </Row>
						        <Row class="SerchBox"  v-if="isShowMoreShow">
						        	<Col span="3" style="text-align: center">故事状态</Col>
						            <Col span="5">
						                <FormItem >
						                    <Select  placeholder="请选择故事状态">
                                                <Option value="提出">提出</Option>
					                            <Option value="开发中">开发中</Option>
					                            <Option value="测试">测试</Option>
					                            <Option value="上线">上线</Option>
                                            </Select>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">所属需求</Col>
						            <Col span="5">
						                <FormItem >
						                    <Select placeholder="请选择所属需求">
					                            <Option value="需求1">需求1</Option>
					                            <Option value="需求2">需求2</Option>
					                            <Option value="需求3">需求3</Option>
					                        </Select>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">优先级</Col>
						            <Col span="5">
						                <FormItem >
						                    <Select  placeholder="请选择优先级">
                                                <Option value="高">高</Option>
					                            <Option value="中">中</Option>
					                            <Option value="低">低</Option>
                                            </Select>
						                </FormItem>
						            </Col>
						        </Row>
						        <Row class="SerchBox"  v-if="isShowMoreShow">
						        	<Col span="3" style="text-align: center">负责人</Col>
						            <Col span="5">
						                <FormItem >
						                    <Select  placeholder="请选择负责人">
                                                <Option value="负责人1">负责人1</Option>
					                            <Option value="负责人2">负责人2</Option>
					                            <Option value="负责人3">负责人3</Option>
					                            <Option value="负责人4">负责人4</Option>
                                            </Select>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">是否领导关心</Col>
						            <Col span="5">
						                <FormItem >
						                    <Select placeholder="请选择是否领导关心">
					                            <Option value="是">是</Option>
					                            <Option value="否">否</Option>
					                        </Select>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">所属迭代</Col>
						            <Col span="5">
						                <FormItem >
						                    <Select  placeholder="请选择迭代">
                                                <Option value="迭代1">迭代1</Option>
					                            <Option value="迭代2">迭代2</Option>
					                            <Option value="迭代3">迭代3</Option>
                                            </Select>
						                </FormItem>
						            </Col>
						        </Row>
							</Col>
							<Col span="9" style="text-align: left" class="serchBtnBox">
								<Button type="primary" icon="ios-search" class="serchBtn">查询</Button>
							</Col>
						</Row>
						<div class="formValidateMoreBtnBox" @click="isShowMoreShow = !isShowMoreShow">
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
		<!-- <ADDorEDITpop :isShow="isShowAddPop" :isAdd="isAdd" :addLoading="true" @popClose="popCloseFn"  @tableDataAdd="tableDataAddFn" :tabDataRow="tableDataRow"  /> -->
	</div>
</template>
<script>
import kanbanboard from "@/components/kanbanboard";
import ADDorEDITpop from "./add_or_edit_pop";
export default {
	beforecreated(){
        console.log("product--beforecreated-------",this.addtest)
    },
	watch: {
		'$route' (to, from) {
			if(to.query.board){
	        	this.currentView = "kanbanboard";
	        }else{
	        	this.currentView = "developList";
	        }
		}
	},
    created(){
        console.log("product--created-------",this.addtest)
        if(this.addtest){
            this.tabRowAddFn()
        }
        if(this.$route.query.board){
        	this.currentView = "kanbanboard";
        }else{
        	this.currentView = "developList";
        }
    },
    beforeUpdate(){
        console.log("product--beforeUpdate-------",this.addtest)
    },
    updated(){
        console.log("product--updated-------",this.addtest)
        if(this.addtest){
            this.tabRowAddFn()
        }


    },
	data() {
		return {
			isShowMoreShow:false,
			//--------
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
				  stateStr: "提出",
				  state: "01",
				  taskNumber: "3"
				},
				{
				  stateStr: "开发中",
				  state: "02",
				  taskNumber: "4"
				},
				{
				  stateStr: "测试",
				  state: "03",
				  taskNumber: "5"
				},
				{
				  stateStr: "上线",
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
                    title: '用户故事名称',
                    key: 'name',
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                style:{color:'#2d8cf0'},
                                //domProps:{href:"###"},
                                on: {
                                    click: () => {
                                        this.goProductDetailFn(params.index)
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
                                        this.goAddDevelopmentFn(params.index)
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
        addtest() {
            return this.$store.state["ADD_DATA_TEST"].data
        },
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
		tabRowAddFn(){
            this.tableData.push(this.addtest);
            Store.dispatch('ADD_DATA_TEST/incrementAsync', {
                msg: false
            })
            console.log('this.$store.state["ADD_DATA_TEST"].data',this.$store.getters["ADD_DATA_TEST/getFn"])
        },
        //---------
		tableDataAddFn(Data){
			if(this.isAdd){
                this.tableData.push(Data);
                this.$Message.info('成功');
            }else{
                alert(JSON.stringify(Data))
            }

		},
		addItem(){
			this.$router.push('/product/add')
            return;
			console.log("this.isShowAddPop",this.isShowAddPop)
			this.isShowAddPop = true;
            this.isAdd = true;
		},
		editItem(I){

			console.log(I,this.tableData[I])
			this.$router.push('/product/edit')
            return;
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
		goAddDevelopmentFn (index) {
            //this.$router.push('/development')
            this.$router.push({path: '/development/add'})
        },
		goDevelopmentFn (index) {
            //this.$router.push('/development')
            this.$router.push({path: '/development', query: {board: true}})
        },
		goProductDetailFn (index) {
            //alert(index)
            this.$router.push('/product/detail')
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
.serchInputBox{
    display: flex;
}
.serchBtnBox{
    position: relative;
}
.SerchBox{
	padding-bottom:10px;
}
.serchBtn{
	position: absolute;
    left:0;
    top:50%;
    transform: translate(50%, -65%);
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

