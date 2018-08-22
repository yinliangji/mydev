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
                                            <Select v-model="formValidate.userstory_type" placeholder="请选择故事类型">
                                                <Option :value="0">请选择故事类型</Option>
                                                <Option v-for="(item,index) in userstory_typeList" :value="item.value" :key="index">{{ item.label }}</Option>
                                                
                                            </Select>
                                        </FormItem>
						            </Col>
						        </Row>
						        <Row class="SerchBox"  v-if="isShowMoreShow">
						        	<Col span="3" style="text-align: center">故事状态</Col>
						            <Col span="5">
						                <FormItem >
						                    <Select v-model="formValidate.userstory_status" placeholder="请选择故事状态">
						                    	<Option :value="0">请选择故事状态</Option>
                                                <Option v-for="(item,index) in userstory_statusList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">所属需求</Col>
						            <Col span="5">
						                <FormItem >
						                    <Select v-model="formValidate.req_id" placeholder="请选择所属需求">
						                    	<Option :value="0">请选择所属需求</Option>
					                            <Option v-for="(item,index) in req_idList" :value="item.value" :key="index">{{ item.label }}</Option>
					                        </Select>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">优先级</Col>
						            <Col span="5">
						                <FormItem >
						                    <Select v-model="formValidate.proi"  placeholder="请选择优先级">
						                    	<Option :value="0">请选择优先级</Option>
                                                <Option v-for="(item,index) in proiList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
						                </FormItem>
						            </Col>
						        </Row>
						        <Row class="SerchBox"  v-if="isShowMoreShow">
						        	<Col span="3" style="text-align: center">负责人</Col>
						            <Col span="5">
						                <FormItem >
						                    <Select v-model="formValidate.charger" placeholder="请选择负责人">
						                    	<Option :value="0">请选择负责人</Option>
                                                <Option v-for="(item,index) in chargerList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">是否领导关心</Col>
						            <Col span="5">
						                <FormItem >
						                    <Select v-model="formValidate.learn_concern" placeholder="请选择是否领导关心">
						                    	<Option :value="0">请选择是否领导关心</Option>
					                            <Option v-for="(item,index) in learn_concernList" :value="item.value" :key="index">{{ item.label }}</Option>
					                        </Select>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">所属迭代</Col>
						            <Col span="5">
						                <FormItem >
						                    <Select v-model="formValidate.sprint" placeholder="请选择迭代">
						                    	<Option :value="0">请选择迭代</Option>
                                                <Option v-for="(item,index) in sprintList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
						                </FormItem>
						            </Col>
						        </Row>
							</Col>
							<Col span="9" style="text-align: left" class="serchBtnBox">
								<Button type="primary" icon="ios-search" class="serchBtn" @click="serchAll">查询</Button>
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
								<Button type="success" @click="addItem">添加用户故事</Button>
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
						<div class="pageBox" v-if="tableData.length">
				    		<Page :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
				    		<p>总共{{tableDAtaTatol}}条记录</p>
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
import { EventBus } from "@/tools";
import kanbanboard from "@/components/kanbanboard";
import ADDorEDITpop from "./add_or_edit_pop";

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {storyAll,storyGetKanBan,storyGetCondition} = Common.restUrl;

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
				// {
				//   stateStr: "提出",
				//   state: "01",
				//   taskNumber: "3"
				// },
				// {
				//   stateStr: "开发中",
				//   state: "02",
				//   taskNumber: "4"
				// },
				// {
				//   stateStr: "测试",
				//   state: "03",
				//   taskNumber: "5"
				// },
				// {
				//   stateStr: "上线",
				//   state: "04",
				//   taskNumber: "6"
				// },


				// {
				//   stateStr: "上线",
				//   state: "05",
				//   taskNumber: "3"
				// }
			],
			cardList:[
				
	            // {

	            // 	taskState: "01",	
	            //  	taskId: "#US0001",
	            //  	description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //  	userName: "user1",
	            //  	userId: "userId_01",
	            //  	groupId: "group_01",
	            //  	bgColor: { background: "#b3ecec" },
	            //  	taskStateStr: "未开始",
	              
	            //  	headPortrait: require("@/assets/images/user_02.png"),
	            //  	taskName:"",
	            // },
	            // {
	            //   taskId: "#US0002",
	            //   description:"设计开发-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_02",
	            //   groupId: "group_02",
	            //   bgColor: { background: "#f8d6af" },
	            //   taskStateStr: "设计开发",
	            //   taskState: "02",
	            //   headPortrait: require("@/assets/images/user_02.png"),
	            //   taskName:"",
	            // },
	            // {
	            //   taskId: "#US0003",
	            //   description:"设计开发-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_03",
	            //   groupId: "group_01",
	            //   bgColor: { background: "#f8d6af" },
	            //   taskStateStr: "测试",
	            //   taskState: "02",
	            //   headPortrait: require("@/assets/images/user_02.png"),
	            //   taskName:"",
	            // },
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
                    title: '编号',
                    key: 'userstory_id',
                    width: 85,
                    align: 'center'
                },

                {
                    title: '用户故事名称',
                    key: 'userstory_name',
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
                            params.row.userstory_name
                        );
                    }
                },

                {
                    title: '类型',
                    key: 'userstory_type',
                    width: 85,
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'span',
                            {},
                            ((S)=>{
                            	if(S== 1){return "用户需求"}else if(S==2){return "生产问题"}else if(S==3){return "自主创新"}else{return "未知"}
                            })(params.row.userstory_type)
                            //params.row.userstory_type//1 用户需求 2 生产问题 3自主创新 
                        )
                    }
                },
                {
                    title: '负责人',
                    key: 'charger',
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
                    key: 'userstory_status',
                    width: 85,
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'span',
                            {
                                style:{
                                	color:"white",
                                	background:(function(S){if(S == 1){return "#5cadff"}else if(S == 2){return "#ff9900"}else if(S == 3){return "#19be6b"}else{return "#1c2438"} })(params.row.userstory_status),
                                	padding:'0.5em',
                                	display:"inline-block",
                                	borderRadius:"3px",

                                },
                                //domProps:{href:"###"},
                            },
                            ((S)=>{
                            	if(S== 1){return "提　出"}else if(S==2){return "开发中"}else if(S==3){return "测　试"}else if(S== 4){return "上　线"}else{return "未　知"}
                            })(params.row.userstory_status)
                            //params.row.userstory_status//1 提出 2 开发中 3测试 4上线
                        )
                    }
                },
                {
                    title: '所属迭代',
                    key: 'sprint_name',
                    width: 90,
                    align: 'center',
                },
                {
                    title: '优先级',
                    key: 'proi',
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
                            ((N) => {if (N == 1) {return "高"}else if (N == 2) {return "中"}else if (N == 3) {return "低"}else {return "无"}})(params.row.proi)
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
                                        this.goDevelopmentFn(params.index);
                                    }
                                }
                            }, '任务看板')
                        ]);
                    }
                }
            ],
	        tableData: [
     			//{
					// userstory_name: '用户故事1',
					// userstory_id: 18,
					// userstory_type: '产品需求',
					// charger:"谢呗",
					// userstory_status:"已完成",
					// sprint_id:"迭代1",
					// proi:"1",
					// manHours:"20 | 10",
					// mission:"5 | 10",
					// icon: require("@/assets/images/user_02.png")
     			//},
     			//{
					// name: '用户故事2',
					// num: 24,
					// describe: '产品需求',
					// person:"谢呗2",
					// status:"处理中",
					// Iteration:"迭代2",
					// priority:"2",
					// manHours:"20 | 10",
					// mission:"5 | 10",
					// icon: require("@/assets/images/user_02.png")
     			//},
     			//{
					// name: '用户故事3',
					// num: 24,
					// describe: '产品需求',
					// person:"谢呗3",
					// status:"未开始",
					// Iteration:"迭代3",
					// priority:"3",
					// manHours:"20 | 10",
					// mission:"5 | 10",
					// icon: require("@/assets/images/user_02.png")
     			//},
            ],
            tableDAtaTatol:0,
            tableDAtaPageLine:3,

            formValidate: {
                userstory_name:"",//用户故事名称
                userstory_id:"",//故事编号
                userstory_type:0,//故事类型
                userstory_status:0,//故事状态
                req_id:0,//所属需求
                proi:0,//优先级
                charger:0,//负责人
                learn_concern:0,//是否领导关心
                sprint:0,//所属迭代

            },




            userstory_typeList:[
            	// {
             //        value: 1,
             //        label: '用户需求'
             //    },
             //    {
             //        value: 2,
             //        label: '生产问题'
             //    },
             //    {
             //        value: 3,
             //        label: '自主创新'
             //    },
               
            ],
            userstory_statusList:[
            	// {
             //        value: 1,
             //        label: '提出'
             //    },
             //    {
             //        value: 2,
             //        label: '开发'
             //    },
             //    {
             //        value: 3,
             //        label: '测试'
             //    },
             //    {
             //        value: 4,
             //        label: '上线'
             //    },
            ],
            req_idList:[],
            proiList:[
            	// {
             //        value: 1,
             //        label: '高'
             //    },
             //    {
             //        value: 2,
             //        label: '中'
             //    },
             //    {
             //        value: 3,
             //        label: '低'
             //    },
            ],
            chargerList:[],
            learn_concernList:[
            	// {
             //        value: 1,
             //        label: '是'
             //    },
             //    {
             //        value: 2,
             //        label: '否'
             //    },
            ],
            sprintList:[],
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
		let ID = false;


		if(this.$router.history.current.query.id){
           ID = this.$router.history.current.query.id;
           localStorage.setItem('id', this.$router.history.current.query.id); 
        }else if(localStorage.getItem('id')){
           ID = localStorage.getItem('id')
        }else if(Common.getCookie("id")){
           ID = Common.getCookie("id")
        }else{
            this.$router.push('/agile');
        }



		// if(localStorage.getItem('id') ){
		// 	ID = this.$router.history.current.query.id
		  //   	}else if(this.$router.history.current.query.id ){
		  //   		ID = this.$router.history.current.query.id
		  //   		localStorage.setItem('id', this.$router.history.current.query.id);
		  //   	}else{
		  //   		ID = 0;
		  //   	}
  		this.tableDataAjaxFn(storyAll,1,3,"",ID);
    	this.storyGetKanBanFn(storyGetKanBan,ID);



    	this.storyGetConditionFn(storyGetCondition,"userstory_type");
    	this.storyGetConditionFn(storyGetCondition,"userstory_status");
    	this.storyGetConditionFn(storyGetCondition,"req_id");
    	this.storyGetConditionFn(storyGetCondition,"proi");
    	this.storyGetConditionFn(storyGetCondition,"charger");
    	this.storyGetConditionFn(storyGetCondition,"learn_concern");
    	this.storyGetConditionFn(storyGetCondition,"sprint");
    	

		EventBus.$on("moveEnd", this.moveEnd);
        EventBus.$on("clickItem", this.clicked);
        EventBus.$on("search", this.searchHandle);
        EventBus.$on("addTask", this.addNewTask);

        

		// for(let i=0;i<this.tableData.length;i++){
		// 	let statusNum = false;
		// 	let statusData = this.tableData[i].status;
		// 	if(statusData == "未开始"){
		// 		statusNum = "01";
		// 	}else if(statusData == "处理中"){
		// 		statusNum = "02";
		// 	}else if(statusData == "已完成"){
		// 		statusNum = "03";
		// 	}else{
		// 		statusNum = "04";
		// 	}
		// 	this.cardList[i].taskName = this.tableData[i].name
		// 	this.cardList[i].userName = this.tableData[i].person;
		// 	this.cardList[i].taskState = statusNum;
		// 	this.cardList[i].headPortrait = this.tableData[i].icon;

		// }
	},
	methods:{
		storyGetConditionFn(URL,condition){
            defaultAXIOS(URL,{condition},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======agile byRole***response+++",response,myData,"======>");
                if(myData && myData.length){
                    let _OBJ = {};
                    for(let i=0;i<myData.length;i++){
                        _OBJ.label = myData[i].value
                        _OBJ.value = myData[i].key
                        this[condition+"List"].push(_OBJ)
                        _OBJ = {};
                    }
                }else{
                    this.showError(URL+"****"+condition+"_没有数据");
                }
                
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
		serchAll(){
            this.tableDataAjaxFn(projectAll,1,this.tableDAtaPageLine,"",formValidate.userstory_name,formValidate.userstory_id,formValidate.userstory_type,formValidate.userstory_status,formValidate.req_id,formValidate.proi,formValidate.charger,formValidate.learn_concern,formValidate.sprint,);
        },
		storyGetKanBanFn(URL = "",id){
			defaultAXIOS(URL,{id},{timeout:20000,method:'get'}).then((response) => {
                //alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======product KanBanFn ***response+++",response,myData,"======>");
                if(myData && myData.length){
                	let _temp = {}
                	for(let i=0;i<myData.length;i++){
                		_temp.stateStr = myData[i].userstory_status;
                		_temp.taskNumber = Number(myData[i].count);
                		_temp.state = "0"+(i+1);
                		this.statusList.push(_temp);
                		_temp = {};
                	}

                	//
             	//    {
	            //   taskId: "#US0001",
	            //   description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_01",
	            //   groupId: "group_01",
	            //   bgColor: { background: "#b3ecec" },
	            //   taskStateStr: "未开始",
	            //   taskState: "01",
	            //   headPortrait: require("@/assets/images/user_02.png"),
	            //   taskName:"",
	            // },
	            // 
	            // 
	            
	            

	            	let _arr = [];
					let _Obj = {};
					console.log("-=-=-=-myData",myData)
					
					for(let i=0;i<myData.length;i++){
					
						for(let j=0;j<myData[i].list.length;j++){
							_Obj.taskState = "0"+(i+1);
							_Obj.taskId = "#US"+myData[i].list[j].userstory_id;
							_Obj.description = "description_"+ i +"_"+j;
							_Obj.userName = myData[i].list[j].charger;
							_Obj.userId = "userId_"+ i +"_"+j;
							_Obj.groupId = "group_01"
							_Obj.bgColor = { background: ((C)=>{if(C==1){return '#f8d6af'}else if(C==2){return '#b3ecec'}else{return '#f2e1f0 '}})(myData[i].list[j].proi) };
							_Obj.taskStateStr = myData[i].userstory_status;
							_Obj.headPortrait =   require("@/assets/images/user_02.png"); //"/assets/images/user_02.png";
							_Obj.taskName = "";
							_Obj.detail_id = myData[i].list[j].id
							_arr.push(_Obj);
							_Obj = {}
						}
						this.cardList.push(..._arr);
						_arr = []
					}
					console.log("-=-=-=-this.cardList",this.cardList)


                	
                }else{
                	this.showError("没有数据");
                }


                //cardList
                //
             //    {
	            //   taskId: "#US0001",
	            //   description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_01",
	            //   groupId: "group_01",
	            //   bgColor: { background: "#b3ecec" },
	            //   taskStateStr: "未开始",
	            //   taskState: "01",
	            //   headPortrait: require("@/assets/images/user_02.png"),
	            //   taskName:"",
	            // },

                


            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });

		},
		changeCurrentPage(i) {
            this.tableDataAjaxFn(storyAll,i,this.tableDAtaPageLine,"")
        },
        changePageSize(i) {
        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },


        tableDataAjaxFn(URL = "",page = 1,limit = 3,data = "",id = "",userstory_name = "",userstory_id = "",userstory_type = "",userstory_status = "",req_id = "",proi = "",charger = "",learn_concern = "",sprint = ""){
            defaultAXIOS(URL,{page,limit,data,id,userstory_name,userstory_id,userstory_type,userstory_status,req_id,proi,charger,learn_concern,sprint},{timeout:20000,method:'get'}).then((response) => {
                //alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======product***response+++",response,myData.list,"======>");
                this.tableData = myData.rows;
                this.tableDAtaTatol = myData.page_rows;

    //             let _temp = {};
				// for(let i=0;i<this.tableData.length;i++){
				// 	_temp.taskName = this.tableData[i].userstory_name
				// 	_temp.userName = this.tableData[i].charger;
				// 	_temp.taskState = this.tableData[i].userstory_status;
				// 	_temp.headPortrait = this.tableData[i].icon ? this.tableData[i].icon : "/assets/images/user_02.png";
				// 	_temp.taskId = this.tableData[i].userstory_id;
				// 	_temp.description = "description";
				// 	_temp.userId = "userId_03";
				// 	_temp.groupId = "group_01";
				// 	_temp.bgColor = { background: "#f8d6af" };
				// 	_temp.taskStateStr = "测试";
				// 	this.cardList.push(_temp);
				// 	_temp = {};
				// }
				


				//{
					// userstory_name: '用户故事1',
					// userstory_id: 18,
					// userstory_type: '产品需求',
					// charger:"谢呗",
					// userstory_status:"已完成",
					// sprint_id:"迭代1",
					// proi:"1",
					// manHours:"20 | 10",
					// mission:"5 | 10",
					// icon: require("@/assets/images/user_02.png")
     			//},
     			//{
					// name: '用户故事2',
					// num: 24,
					// describe: '产品需求',
					// person:"谢呗2",
					// status:"处理中",
					// Iteration:"迭代2",
					// priority:"2",
					// manHours:"20 | 10",
					// mission:"5 | 10",
					// icon: require("@/assets/images/user_02.png")
     			//},


            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
		moveEnd(info) {
            // 移动卡片结束后
            console.log(" 移动卡片结束后 :::", info);
        },
        clicked(info) {
            // 点击卡片方法
            console.log(" 点击卡片方法 ::: ", info);
            this.$router.push({path: '/product/detail', query: {detail_id: info.detail_id }})
            // this.$router.push({
            //   path: "/product/detail"
            // });
        },
        searchHandle(info) {
            // 查询方法
            console.log("查询  ::: ", info);
        },
        addNewTask() {
            //点击跳转页面
            // this.$router.push({
            //   path: "/development/add"
            // });
        },


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

			//this.$router.push('/product/edit')
			this.$router.push({path: '/product/edit', query: {DATA: JSON.stringify(this.tableData[I])}})
            return;
			//
			// this.isShowAddPop = true;
            // this.isAdd = false;
            // this.tableDataRow = this.tableData[I]
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
            //this.$router.push('/development')userstory_name
            this.$router.push({path: '/development', query: {board: true,us_name:this.tableData[index].userstory_name}})
        },
		goProductDetailFn (index) {
            //alert(index)
            //this.$router.push('/product/detail')
            
            this.$router.push({path: '/product/detail', query: {detail_id: this.tableData[index].id}})
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

