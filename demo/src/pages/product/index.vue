<template>
	<div class="pageContent">
		<goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :TOP="'10'" />
		<selectMenu @changeSelect="selectMenuFn"></selectMenu>
		<Card>
			<div class="productBox">
				<h3 class="Title"><span>用户故事</span></h3>
				<Form ref="formValidate" class="formValidate">
			        <FormItem >
						<Row class="serchInputBox">
							<Col span="20">
								<Row class="SerchBox">
						        	<Col span="2" style="text-align: center">故事名称</Col>
						            <Col span="6">
						                <FormItem >
						                    <Input clearable v-model="formValidate.userstory_name" placeholder="输入用户故事名称"></Input>
						                </FormItem>
						            </Col>
						            <Col span="2" style="text-align: center">故事编号</Col>
						            <Col span="6">
						                <FormItem >
						                    <Input clearable v-model="formValidate.userstory_id" placeholder="输入故事编号"></Input>
						                </FormItem>
						            </Col>

									<Col span="2" style="text-align: center">所属迭代</Col>
						            <Col span="6">
						                <FormItem >
						                    <Select clearable filterable v-model="formValidate.sprint"  placeholder="请选择迭代">
                                                <Option v-for="(item,index) in sprintList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
						                </FormItem>
						            </Col>


						            
						        </Row>
						        <Row class="SerchBox"  v-if="isShowMoreShow">
						        	<Col span="2" style="text-align: center">故事状态</Col>
						            <Col span="6">
						                <FormItem >
						                    <Select clearable v-model="formValidate.userstory_status" placeholder="请选择故事状态">
						                    	
                                                <Option v-for="(item,index) in userstory_statusList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
						                </FormItem>
						            </Col>
						            <Col span="2" style="text-align: center">所属需求项</Col>
						            <Col span="6">
						                <FormItem >
						                    <Select clearable filterable v-model="formValidate.req_id" placeholder="请选择所属需求项">
					                            <Option v-for="(item,index) in req_idList" :value="item.value" :key="index">{{ item.label }}</Option>
					                        </Select>
						                </FormItem>
						            </Col>
						            <Col span="2" style="text-align: center">优先级</Col>
						            <Col span="6">
						                <FormItem >
						                    <Select clearable v-model="formValidate.proi"  placeholder="请选择优先级">
						                    	
                                                <Option v-for="(item,index) in proiList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
						                </FormItem>
						            </Col>
						        </Row>
						        <Row class="SerchBox"  v-if="isShowMoreShow">
						        	
						            <Col span="2" style="text-align: center">故事类型</Col>
						            <Col span="6">
						                <FormItem >
                                            <Select clearable v-model="formValidate.userstory_type" placeholder="请选择故事类型">
                                                
                                                <Option v-for="(item,index) in userstory_typeList" :value="item.value" :key="index">{{ item.label }}</Option>
                                                
                                            </Select>
                                        </FormItem>
						            </Col>

									<Col span="2" style="text-align: center">负责人</Col>
						            <Col span="6">
						                <FormItem >
						                    <Select clearable filterable v-model="formValidate.charger" placeholder="请选择负责人">
                                                <Option v-for="(item,index) in chargerList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
						                </FormItem>
						            </Col>
						            <Col span="2" style="text-align: center"><!-- 是否领导关心 --></Col>
						            <Col span="6">
						                <!-- <FormItem >
						                    <Select clearable v-model="formValidate.learn_concern" placeholder="请选择是否领导关心">
						                    	
					                            <Option v-for="(item,index) in learn_concernList" :value="item.value" :key="index">{{ item.label }}</Option>
					                        </Select>
						                </FormItem> -->
						            </Col>

						        </Row>
							</Col>
							<Col span="4" style="text-align: left" class="serchBtnBox">
								<Button type="primary" icon="ios-search" class="serchBtn" @click="serchAll">查询</Button>
								<Button class="cancelSerchBtn" @click="cancelSerchAll">重填</Button>
							</Col>
						</Row>
						<div class="formValidateMoreBtnBox" :class="isShowMoreShow ?'arrUp':'arrDown'" @click="isShowMoreShow = !isShowMoreShow">
                            <Icon type="chevron-down" color="#fff"  ></Icon>
                            <Icon type="chevron-down" color="#fff"></Icon>
                        </div>
			        </FormItem>
			    </Form>
			    <div class="tableBox">
					<div class="tagBox">
						<Row :gutter="10" align="middle">
							<Col span="3" class="addBtnBox">
								<Button 
									type="success"  
									@click="addItem"
									:disabled="authIs(['icdp_userStory_mng','icdp_userStory_view'])" 
								>
									添加用户故事
								</Button>
							</Col>
							<Col span="1" >
								<img :src="currentView == 'developList' ? developListImgCur : developListImg" 
								@click="showList" class="cursor">
							</Col>
							<Col span="1" >
								<img :src="currentView == 'kanbanboard' ? kanbanboardImgCur : kanbanboardImg" 
								@click="showTask" class="cursor">
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


					<div class="tableContBox" v-show="currentView == 'developList'">
						<Table border :columns="columns" :data="tableData"  />
						<div class="pageBox" v-if="tableData.length">
				    		<Page :current="tableDAtaPageCurrent" :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
				    		<p>总共{{tableDAtaTatol}}条记录</p>
				    	</div>
					</div>
					<div class="listBox" v-show="currentView == 'kanbanboard'">
						<!-- :groupList="[]"  -->
						<kanbanboard
							:idDisabled="authIs(['icdp_userStory_mng','icdp_userStory_view'])" 
							:sortdisabled="true" 
							:cardList="cardLists" 
							:statusList="statusLists" 
							:groupList="groupList" 
							:Group="false" 
							/>
						<!-- <component :is="currentView" :myCardList="cardList" :myProduct="MyProduct" :myStatusList="statusList" :myGroupList="groupList"></component>-->
					</div>


			    </div>
			</div>
		</Card>
		<!-- <ADDorEDITpop :isShow="isShowAddPop" :isAdd="isAdd" :addLoading="true" @popClose="popCloseFn"  @tableDataAdd="tableDataAddFn" :tabDataRow="tableDataRow"  /> -->
		<Modal v-model="cardpop" width="500" @on-cancel="cardpopClose">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>还有任务未完成</span>
            </p>
            <div class="cardpoplist">
                <p v-for="(item,index) in cardpopList" :key="index">还有【{{item.task_name}}】任务未完成，还在【{{item.task_statusCN}}】阶段</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="cardpopEnter">确认</Button>
            </div>
        </Modal>
	</div>
</template>
<script>
import { EventBus } from "@/tools";
import kanbanboard from "@/components/kanbanboard";
import ADDorEDITpop from "./add_or_edit_pop";

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {storyAll,storyGetKanBan,storyGetCondition,getPermission,storySetChange,projectDetail,getDefSpring} = Common.restUrl;
export default {
	watch: {
		'$route' (to, from) {
			
			if(to.query.board && to.query.board == "true"){
	        	this.currentView = "kanbanboard";
	        }else{
	        	this.currentView = "developList";
	        }
		},
		formValidate: {
            handler(val, oldVal) {
            	Common.SetSession("userstorySerchTemp",JSON.stringify(val))


                // for(let I in val){
                // 	Common.SetSession(I,val[I]);
                // }

            },
            deep: true
        },
        tableDAtaPageCurrent(val, oldVal){
        	Common.SetSession("tableDAtaPageCurrent",val);
        },
	},
	beforecreated(){
        console.log("product--beforecreated-------",this.formValidate)
    },
    created(){
        this.isKanbanboard();
        if(this.addtest){
            this.tabRowAddFn()
        }


        Common.RemoveSession("userstorySerchTemp");
        if(Common.GetSession("allSession")){
        	let _allSession = JSON.parse(Common.GetSession("allSession"));

        	for(let I in this.formValidate){
        		this.formValidate[I] = _allSession[I]
        		if(I != "sprint"){
        			//this.formValidate[I] = _allSession[I]
        		}
        	}
        	this.tableDAtaPageCurrent =_allSession.tableDAtaPageCurrent - 0;
        	//Common.SetSession("oldAllSession",Common.GetSession("allSession"));
        }

        if(this.formValidate.userstory_status || this.formValidate.req_id || this.formValidate.proi || this.formValidate.userstory_type || this.formValidate.charger){
        	this.isShowMoreShow = true;	
        }else{
        	this.isShowMoreShow = false;
        }

        console.log("product--created-------",this.formValidate)

    },
    beforeUpdate(){
        console.log("product--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("product--updated-------",this.formValidate)

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

			developListImg:require("../../assets/images/product-list.png"),
			developListImgCur:require("../../assets/images/product-listCur.png"),
			kanbanboardImg:require("../../assets/images/product-kanban.png"),
			kanbanboardImgCur:require("../../assets/images/product-kanbanCur.png"),

			groupList:[
		        { text: "所属需求项" },
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
                    width: 110,
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
                            Common.TypeFn(params.row.userstory_type)
                            //params.row.userstory_type//1 用户需求项 2 生产问题 3自主创新 
                            //
                        )
                    }
                },
                {
                    title: '负责人',
                    key: 'nick_name',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'span',
                            Common.FileterStr2(params.row.nick_name)
                        );
                    }
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
                                	background:Common.StatusColorFn(params.row.userstory_status),
                                	padding:'0.5em',
                                	display:"inline-block",
                                	borderRadius:"3px",

                                },
                                //domProps:{href:"###"},
                            },
                            Common.StatusFn(params.row.userstory_status)
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
                                	background:Common.ProiColorFn(params.row.proi),
                                	display:"inline-block",
                                	borderRadius:"50%",
                                	height:"2em",
                                	width:"2em",
                                	lineHeight:"2em",
                                },

                                //domProps:{href:"###"},
                            },
                            //
                            Common.ProiFn(params.row.proi)
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
                /*
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
                */
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
                                domProps:{disabled:this.authIs(['icdp_userStory_mng','icdp_userStory_edit','icdp_userStory_view'])},
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
                                domProps:{disabled:this.authIs(['icdp_userStory_mng','icdp_userStory_view'])},
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
					// userstory_type: '产品需求项',
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
					// describe: '产品需求项',
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
					// describe: '产品需求项',
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
            tableDAtaPageLine:5,
            tableDAtaPageCurrent:1,
            formValidate: {
                userstory_name:"",//用户故事名称
                userstory_id:"",//故事编号
                userstory_type:"",//故事类型
                userstory_status:"",//故事状态
                req_id:"",//所属需求项
                proi:"",//优先级
                charger:"",//负责人
                learn_concern:"",//是否领导关心
                sprint:"",//所属迭代

            },
            userstory_typeList:[
            	// {
             //        value: 1,
             //        label: '用户需求项'
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
            prj_permission:[],
            identity:"",
            cardListBase:[],
            statusListBase:[],
            

            cardpop:false,
            cardpopList:[],
		}
	},
	components: {
		kanbanboard,
		ADDorEDITpop

	},
	computed: {
		cardLists(){
			return this.cardListBase;
		},
		statusLists(){
			return this.statusListBase;
		},
        addtest() {
            return this.$store.state["ADD_DATA_TEST"].data
        },
    },

	mounted(){
		
		let ID = this.getID() ? this.getID() : this.$router.push('/agile');
		this.getPermissionFn(getPermission);
		this.getInfoFn(ID);

		//Common.RemoveSession("allSession");
		//Common.GetConditionAll(defaultAXIOS,this,storyGetCondition,"xxxxx",ID,["userstory_type","userstory_status","req_id","proi","charger","learn_concern","sprint"]);

    	EventBus.$on("moveEnd", this.moveEnd);
        EventBus.$on("clickItem", this.clicked);
        EventBus.$on("search", this.searchHandle);
        EventBus.$on("addTask", this.addNewTask);
        EventBus.$on("storyMoveEnd", this.moveEnd);
		
	},
	methods:{
		isKanbanboard(){
			if(Common.GetSession("CurView")){
				this.currentView = Common.GetSession("CurView");
			}else if(this.$route.query.board && (this.$route.query.board == "true" || this.$route.query.board === true)){
	        	this.currentView = "kanbanboard";
	        }else{
	        	this.currentView = "developList";
	        }
		},
		cardpopClose(){
			this.cardpopList = [];
		},
		cardpopEnter(){
			this.cardpop = false;
		},
		getInfoFn(ID){
			let _myAllSession = Common.GetSession("allSession");
		    this.getDefSpringFn(getDefSpring,ID).then((sprint)=>{
		    	if(!_myAllSession){
		    		this.formValidate.sprint = sprint+"";
		    	}

		    	this.tableDAtaPageCurrent = Common.GetSession("tableDAtaPageCurrent") ? Common.GetSession("tableDAtaPageCurrent") - 0 : 1;

	        	this.storyGetKanBanFn(storyGetKanBan,ID,this.formValidate.userstory_name,this.formValidate.userstory_id,this.formValidate.userstory_type,this.formValidate.userstory_status,this.formValidate.req_id,this.formValidate.proi,this.formValidate.charger,this.formValidate.learn_concern,this.formValidate.sprint);
	        	this.tableDataAjaxFn(storyAll,this.tableDAtaPageCurrent,this.tableDAtaPageLine,"",ID,this.formValidate.userstory_name,this.formValidate.userstory_id,this.formValidate.userstory_type,this.formValidate.userstory_status,this.formValidate.req_id,this.formValidate.proi,this.formValidate.charger,this.formValidate.learn_concern,this.formValidate.sprint);

	        		console.log(Common.GetSession("tableDAtaPageCurrent"),"=========")
	        	

	        },(error)=>{
	        	console.log(error);
	            this.showError(error);

	            this.tableDAtaPageCurrent = Common.GetSession("tableDAtaPageCurrent") ? Common.GetSession("tableDAtaPageCurrent") - 0 : 1;
	            
	            this.tableDataAjaxFn(storyAll,this.tableDAtaPageCurrent,this.tableDAtaPageLine,"",ID);
	  			this.storyGetKanBanFn(storyGetKanBan,ID);
	  			
	        })

		},
		getDefSpringFn(URL,ID){


			// let _userstory_type = this.storyGetConditionFn(storyGetCondition,"userstory_type",ID);
			//   	let _userstory_status =this.storyGetConditionFn(storyGetCondition,"userstory_status",ID);
			//   	let _req_id =this.storyGetConditionFn(storyGetCondition,"req_id",ID);
			//   	let _proi =this.storyGetConditionFn(storyGetCondition,"proi",ID);
			//   	let _charger =this.storyGetConditionFn(storyGetCondition,"charger",ID);
			//   	let _learn_concern = this.storyGetConditionFn(storyGetCondition,"learn_concern",ID);
	    	let _sprint = this.storyGetConditionFn(storyGetCondition,"sprint",ID);

	    	return Promise.all([_sprint]).then((REP)=>{
	    		//
			    return defaultAXIOS(URL+ID,{},{timeout:20000,method:'get'}).then((response) => {
	                let myData = response.data;
	                console.log("<======agile getDefSpring***response+++",response,myData,"======>");
	                if(myData && myData.data && !isNaN(myData.data-0) ){
	                	return Promise.resolve(myData.data)
	                }else{
	                	return Promise.resolve("")
	                	//return Promise.reject("无法获取当前迭代,data不存在");
	                }
	                
	            }).catch( (error) => {
	                console.log(error);
	                return Promise.reject(error);
	            });
	    		//
	    	},(ERR)=>{
	    		console.log(ERR)
	    		this.showError(ERR+"没有 userstory_type,userstory_status,req_id,proi,charger,learn_concern,sprint 其中之一");
	    		return Promise.reject(error);
	    	})


			
		},
		changeStateNumber(info){
			let _statusBase = this.statusListBase;
			let toState = info.evt.to.getAttribute('state');
			let fromState = info.evt.from.getAttribute('state');

			if(toState == fromState){
				return;
			}else{
				_statusBase.forEach((item,index)=>{
					//if(info.item.askStatus == item.state){
					//if(info.evt.item.getAttribute('state') == item.state){
					if(fromState == item.state){
						item.taskNumber = parseFloat(item.taskNumber) - 1
					}
					if(item.state == toState){
						item.taskNumber = parseFloat(item.taskNumber) + 1
					}
				});
				this.statusListBase = [];
				this.statusListBase.push(..._statusBase)
			}

			
		},
		changeMovedStatus(info){
			let _params = {};
			_params.taskId = info.evt.item.getAttribute('taskid');
			//_params.ID = info.item.detail_id;
			_params.ID = info.evt.item.getAttribute('detailid');
			_params.taskStatus = info.evt.to.getAttribute('state');

			defaultAXIOS(storySetChange,{id:_params.ID,userstory_status:_params.taskStatus.substring(1)},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======agile storySetChange***response+++",response,myData,"======>");
                if(myData.status.indexOf("success") == -1){
                	this.showError(storySetChange+"|返回结果错误");
                }else{
                	this.cardpopList = [];
                	
                	if(myData.no_complete_task_list && Array.isArray(myData.no_complete_task_list) && myData.no_complete_task_list.length){
                		this.cardpop = true;
                		this.cardpopList = myData.no_complete_task_list;
                		let statusFn = (Num)=>{
                			let Status = "未知";
                			if(Num == 1){
                				Status = "未开始";
                			}else if(Num == 2){
                				Status = "设计开发";
                			}else if(Num == 3){
                				Status = "测试";
                			}else if(Num == 4){
                				Status = "发布";
                			}else if(Num == 5){
                				Status = "上线";
                			}
                			return Status
                		}
                		this.cardpopList.forEach((item)=>{
                			item.task_statusCN = statusFn(item.task_status);
                		})
                	}
                }
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
		},
		moveEnd(info) {
            // 移动卡片结束后
            console.log(" 移动卡片结束后 :::", info);
            this.changeStateNumber(info);
            this.changeMovedStatus(info);
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


		authIs(KEY){
			return Common.auth(this,KEY)            
        },

        getPermissionFn(URL){
        	Common.GetPermission(defaultAXIOS,this,URL);
        },

		getID(){
			return Common.GETID(this,Common);
		},


		selectMenuFn(N){
			let ID = N;
			Common.setStorageAndCookie(Common,"id",N)
			defaultAXIOS(projectDetail+ID,{},{timeout:2000,method:'get'}).then((response) => {
			    let myData = response.data;
			    console.log("<======detail***response+++",response,myData,"+++detail***response======>");
			    let DATA = myData.data ? myData.data : myData
			    let prodId = DATA.prod_id?DATA.prod_id : DATA.prod 
			    if(prodId){

					//Common.setCookie("prj_id",DATA.prj_id);
		            //localStorage.setItem('prj_id', DATA.prj_id);
		            //Common.setCookie("prod_id",prodId);
		            //localStorage.setItem('prod_id',prodId);
		            Common.setStorageAndCookie(Common,'prod_id',prodId);
		            Common.setStorageAndCookie(Common,'prj_id',DATA.prj_id);

			    }
			    this.tableDAtaPageCurrent = 1;
			    for(let I in this.formValidate){
			    	if(I != "sprint"){
			    		this.formValidate[I] = "";
			    	}
			    }
			    this.getInfoFn(ID);



			}).catch( (error) => {
			    console.log(error);
			    this.showError(error);
			});

			
		    //this.tableDataAjaxFn(storyAll,1,this.tableDAtaPageLine,"",ID);
		    //this.storyGetKanBanFn(storyGetKanBan,ID);
        },

		storyGetConditionFn(URL,condition,prj_id){
			return Common.GetConditionAll(defaultAXIOS,this,URL,"xxxxx",prj_id,["userstory_type","userstory_status","req_id","proi","charger","learn_concern","sprint"]);
			//return Common.GetCondition(defaultAXIOS,this,URL,condition,prj_id);
        },
        cancelSerchAll(){
            for(let i in this.formValidate){
                this.formValidate[i] = "";
            }
            this.$refs.formValidate.resetFields();
        },
		serchAll(){
			let ID = this.getID();

			Common.RemoveSession("allSession");
			Common.SetSession("userstorySerch",Common.GetSession("userstorySerchTemp"));
			Common.RemoveSession("userstorySerchTemp");

			this.storyGetKanBanFn(storyGetKanBan,ID,this.formValidate.userstory_name,this.formValidate.userstory_id,this.formValidate.userstory_type,this.formValidate.userstory_status,this.formValidate.req_id,this.formValidate.proi,this.formValidate.charger,this.formValidate.learn_concern,this.formValidate.sprint);
            this.tableDataAjaxFn(storyAll,1,this.tableDAtaPageLine,"",ID,this.formValidate.userstory_name,this.formValidate.userstory_id,this.formValidate.userstory_type,this.formValidate.userstory_status,this.formValidate.req_id,this.formValidate.proi,this.formValidate.charger,this.formValidate.learn_concern,this.formValidate.sprint);
            this.tableDAtaPageCurrent = 1;
            
            if(this.currentView == "kanbanboard"){}else{}

            //this.$router.push({path: '/product', query: {URL:storyAll,page:1,limit:this.tableDAtaPageLine,data:"",ID:ID,userstory_name:this.formValidate.userstory_name,userstory_id:this.formValidate.userstory_id,userstory_type:this.formValidate.userstory_type,userstory_status:this.formValidate.userstory_status,req_id:this.formValidate.req_id,proi:this.formValidate.proi,charger:this.formValidate.charger,learn_concern:this.formValidate.learn_concern,sprint:this.formValidate.sprint}})
            

        },
		storyGetKanBanFn(URL = "",id,userstory_name = "",userstory_id = "",userstory_type = "",userstory_status = "",req_id = "",proi = "",charger = "",learn_concern = "",sprint = ""){
			this.cardList = [];
			this.statusList = [];
			this.cardListBase=[],
            this.statusListBase=[],
			defaultAXIOS(URL,{id:id,prj_id:id,userstory_name,userstory_id,userstory_type,userstory_status,req_id,proi,charger,learn_concern,sprint},{timeout:20000,method:'get'}).then((response) => {
                //alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======product KanBanFn ***response+++",response,myData,"======>");
                if(myData && myData.length){
                	
                	let _temp = {};
                	let reqArr = [];
                	for(let i=0;i<myData.length;i++){
                		if(myData[i].list && myData[i].list.length){
                			for(let j=0;j<myData[i].list.length;j++){
                				reqArr.push(myData[i].list[j].req_id)
                			}
                		}
                		//
                		_temp.stateStr = myData[i].userstory_status;
                		_temp.taskNumber = Number(myData[i].count);
                		_temp.state = "0"+(i+1);
                		this.statusList.push(_temp);
                		this.statusListBase.push(_temp);
                		_temp = {};
                	}

                	let reqArr2 = Array.from(new Set(reqArr));
                	let checkreqName = (val)=>{

                		let _temp = this.req_idList.find((item)=>{
                			return val == item.value
                		})
                		return {text:_temp.label,groupId:val+""}
                	}
                	this.groupList = [];
                	this.groupList.push({text:"所属需求项"});
                	for(let k=0;k<reqArr2.length;k++){
                		this.groupList.push(checkreqName(reqArr2[k]))
                	}
	            

	            	let _arr = [];
					let _Obj = {};
					
					
					for(let i=0;i<myData.length;i++){

					
						for(let j=0;j<myData[i].list.length;j++){
							_Obj.taskStatus = "0"+(i+1);
							_Obj.taskId = ""+myData[i].list[j].userstory_id;
							_Obj.description = "description_"+ i +"_"+j;
							_Obj.userName = myData[i].list[j].charger;
							_Obj.userId = "userId_"+ i +"_"+j;
							_Obj.groupId = myData[i].list[j].req_id+"";
							//_Obj.bgColor = { background: ((C)=>{if(C==1){return '#f8d6af'}else if(C==2){return '#b3ecec'}else{return '#f2e1f0 '}})(myData[i].list[j].proi) };
							_Obj.bgcolor = ((C)=>{if(C==1){return '#f8d6af'}else if(C==2){return '#b3ecec'}else if(C==3){return '#f2e1f0'}else{return '#ffffff'}})(myData[i].list[j].proi);
							_Obj.taskStateStr = myData[i].userstory_status;
							_Obj.headPortrait =   require("@/assets/images/user_02.png"); //"/assets/images/user_02.png";
							_Obj.taskName = myData[i].list[j].userstory_name;
							_Obj.nickName = myData[i].list[j].charger
							_Obj.detail_id = myData[i].list[j].id
							_arr.push(_Obj);
							_Obj = {}
						}
						this.cardList.push(..._arr);
						this.cardListBase.push(..._arr);
						_arr = []
					}
					//EventBus.$emit('storyBindSort');
					


                	
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
		tableDataAjaxFn(URL = "",page = 1,limit = 3,data = "",id = "",userstory_name = "",userstory_id = "",userstory_type = "",userstory_status = "",req_id = "",proi = "",charger = "",learn_concern = "",sprint = ""){




            defaultAXIOS(URL,{page,limit,data,id:id,prj_id:id,userstory_name,userstory_id,userstory_type,userstory_status,req_id,proi,charger,learn_concern,sprint},{timeout:20000,method:'get'}).then((response) => {
                //alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======product***response+++",response,myData,"======>");
                this.tableData = myData.rows;
                this.tableDAtaTatol = myData.page_rows;

    			


            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
		changeCurrentPage(i) {
			let ID = this.getID()
            //this.tableDataAjaxFn(storyAll,i,this.tableDAtaPageLine,"",ID)
            this.tableDataAjaxFn(storyAll,i,this.tableDAtaPageLine,"",ID,this.formValidate.userstory_name,this.formValidate.userstory_id,this.formValidate.userstory_type,this.formValidate.userstory_status,this.formValidate.req_id,this.formValidate.proi,this.formValidate.charger,this.formValidate.learn_concern,this.formValidate.sprint);
            this.tableDAtaPageCurrent = i;
        },
        changePageSize(i) {
        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
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
			// console.log("this.isShowAddPop",this.isShowAddPop)
			// this.isShowAddPop = true;
   			// this.isAdd = true;
		},
		editItem(I){
			Common.GoUserstorySession(Common,this);
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
			Common.GoUserstorySession(Common,this);
            this.$router.push({path: '/development/add', query: {board: true,myid:this.tableData[index].id}})
        },
		goDevelopmentFn (index) {
			Common.GoUserstorySession(Common,this);
            this.$router.push({path: '/development', query: {board: true,us_name:this.tableData[index].id}})
        },
		goProductDetailFn (index) {
			Common.GoUserstorySession(Common,this);
            this.$router.push({path: '/product/detail', query: {detail_id: this.tableData[index].id}})
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
		showList() {
			let CurView = "developList";
			this.currentView = CurView;
			Common.SetSession("CurView",CurView)
		},
		showTask(){
			let CurView = "kanbanboard"
			this.currentView = CurView;
			Common.SetSession("CurView",CurView)
		},
	}
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';

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


.cursor {
	cursor: pointer;
}

.cardpoplist{
	text-align:left
}
.cardpoplist p {
	border-bottom: #ccc solid 1px;
	padding-top:0.5em;
	padding-bottom:0.5em;
}
</style>

