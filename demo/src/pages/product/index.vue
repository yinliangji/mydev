<template>
	<div class="pageContent">
		<goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :TOP="'10'" />
		<selectMenu @changeSelect="selectMenuFn" @sendData="getSendData" :Disabled="SearchCan"></selectMenu>
		<Card id="BoxPT">
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
						                    <Select ref="Sprint" clearable filterable v-model="formValidate.sprint"  placeholder="请选择迭代">
                                                <Option v-for="(item,index) in sprintList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
						                </FormItem>
						            </Col>


						            
						        </Row>
						        <Row class="SerchBox"  v-show="isShowMoreShow">
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
						                    <Select ref="ReqId" clearable filterable v-model="formValidate.req_id" placeholder="请选择所属需求项">
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
						        <Row class="SerchBox"  v-show="isShowMoreShow">
						        	
						            <Col span="2" style="text-align: center">故事类型</Col>
						            <Col span="6">
						                <FormItem >
                                            <Select clearable v-model="formValidate.userstory_type" placeholder="请选择故事类型">
                                                
                                                <Option v-for="(item,index) in userstory_typeList" :value="item.value" :key="index">{{ item.label }}</Option>
                                                
                                            </Select>
                                        </FormItem>
						            </Col>

									<Col span="2" style="text-align: center">责任人</Col>
						            <Col span="6">
						                <FormItem >
						                    <Select ref="Charger" clearable filterable v-model="formValidate.charger" placeholder="请选择责任人">
                                                <Option v-for="(item,index) in chargerList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
						                </FormItem>
						            </Col>
						            <Col span="2" style="text-align: center">小组名称</Col>
						            <Col span="6">
						                <!-- <FormItem >
						                    <Select clearable v-model="formValidate.learn_concern" placeholder="请选择是否领导关心">
					                            <Option v-for="(item,index) in learn_concernList" :value="item.value" :key="index">{{ item.label }}</Option>
					                        </Select>
						                </FormItem> -->
						                <FormItem >
						                    <Select clearable filterable v-model="formValidate.group_name" placeholder="请选择分组">
					                            <Option v-for="(item,index) in group_nameList" :value="item.value" :key="index">{{ item.label }}</Option>
					                        </Select>
						                </FormItem>
						            </Col>

						        </Row>
						        <Row class="SerchBox"  v-show="isShowMoreShow">
						        	
						            <Col span="2" style="text-align: center">状态类型</Col>
						            <Col span="6">
						                <FormItem >
                                            <Select clearable v-model="formValidate.uscSn" placeholder="请选择状态类型">
                                                
                                                <Option v-for="(item,index) in userstory_categoryList" :value="item.value" :key="index">{{ item.label }}</Option>
                                                
                                            </Select>
                                        </FormItem>
						            </Col>

									<Col span="2" style="text-align: center"><!-- 责任人 --></Col>
						            <Col span="6">
						                <!--  -->
						            </Col>
						            <Col span="2" style="text-align: center"><!-- 小组名称 --></Col>
						            <Col span="6">
						                <!--  -->
						            </Col>

						        </Row>
							</Col>
							<Col span="4" style="text-align: left" class="serchBtnBox">
								<Button type="primary" icon="ios-search" :disabled="!searchCan" class="serchBtn" @click="serchAll">
									<!-- <Spin fix v-if="!searchCan" style="background:none;">
						                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
						            </Spin> -->
									查询
    				        		
								</Button>
								<Button class="cancelSerchBtn" :disabled="!searchCan" @click="cancelSerchAll">
									<!-- <Spin fix v-if="!searchCan" style="background:none;">
						                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
						            </Spin> -->
									重置
								</Button>
							</Col>
						</Row>
						<div class="formValidateMoreBtnBox" :class="isShowMoreShow ?'arrUp':'arrDown'" @click="isShowMoreShow = !isShowMoreShow">
                            <Icon type="chevron-down" color="#fff"  ></Icon>
                            <Icon type="chevron-down" color="#fff"></Icon>
                        </div>
			        </FormItem>
			    </Form>
			    <div class="tableBox">

			    	<!--
					<Col span="1" v-if="currentView == 'kanbanboard'">
						<span class="high">高</span>
					</Col>
					<Col span="1" v-if="currentView == 'kanbanboard'">
						<span class="middle">中</span>
					</Col>
					<Col span="1" v-if="currentView == 'kanbanboard'">
						<span class="low">低</span>
					</Col>
					-->
			    	
					<div class="tagBox" >
						<div style="" class="tagBar">
							<div  class="tagBarRight" >
								
								<Button 
									class="addBtnBox"
									icon="ios-download-outline"
									type="info"  
									@click="optputExecl"
									size="small"
									shape="circle"
								>
									<!-- :disabled="authIs(['icdp_userStory_mng','icdp_userStory_view'])"  -->
									查询结果导出
								</Button>
								<Button 
									class="addBtnBox"
									icon="ios-download-outline"
									type="info"  
									@click="optputWord"
									:disabled="authIs(['icdp_userStory_mng','icdp_userStory_view'])" 
									size="small"
									shape="circle"
									v-show="false"
								>
									导出 word
								</Button>
								
								&nbsp;
							</div>
							<div class="tagBarLeft">
								<Button 
									class="addBtnBox"
									type="success"  
									@click="addItem"
									:disabled="authIs2(['icdp_userStory_mng','icdp_userStory_view'])" 
									>
									添加用户故事
								</Button>
							</div>
							<div class="tagBarLeft">
								<span style="position:relative;">
									<!-- <Spin fix v-if="!searchCan" style="background:none;">
						                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
						            </Spin> -->
									<img :src="currentView == 'developList' ? developListImgCur : developListImg" @click="showList" class="cursor" title="用户故事列表" :style="!searchCan ?'pointer-events: none;opacity:0.5;':''" >
								</span>
							</div>
							<div class="tagBarLeft">
								<span style="position:relative;">
									<!-- <Spin fix v-if="!searchCan" style="background:none;">
						                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
						            </Spin>  -->
									<img :src="currentView == 'kanbanboard' ? kanbanboardImgCur : kanbanboardImg" @click="showTask" class="cursor" title="用户故事看板" id="kanbanShowBtn" :style="!searchCan ?'pointer-events: none;opacity:0.5;':''" >
								</span>
							</div>
							<div style="position:relative;" class="tagBarLeft">
								<ToolTip 
						    		placement="right"
						    		:L="-2" 
						    		:T="7" 
						    		:Z="10" 
						    		:W="270"  
						    		content="用户故事状态分类说明：<br>1.已识别（新建用户故事未开始处理）<br>2.已计划（写测试案例、提交设计文档等附件）<br>3.实施中（提交代码，开始单元测试）<br>4.用户验收中（所有工作项都已完成）<br>5.待投产（发布版本审核通过，关联了用户故事）<br>6.已投产（用户故事投产成功）<br>7.停滞（实施过程中由于某些原因暂停实施）<br>8.废弃（废弃不再实施的用户故事）"
					    		/>
				    		</div>
				    		<div class="hack">&nbsp;</div>
							
						</div>

					
						
					</div>

					
					<div class="tableContBox" v-show="currentView == 'developList'">
						<div style="height:29px;">&nbsp;</div>
						<Table stripe border :columns="columns" :data="tableData"  />
						<div class="pageBox" v-if="tableData.length">
				    		<Page :current="tableDAtaPageCurrent" :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
				    		<p>总共{{tableDAtaTatol}}条记录</p>
				    	</div>
					</div>
					<div class="listBox" v-show="currentView == 'kanbanboard'" id="kanbanboard">
						<!-- :groupList="[]" :groupList="groupList" :sortdisabled="true"  -->
						<kanbanboard
							:isDisabled="authIs2(['icdp_userStory_mng','icdp_userStory_view'])"
							:sortdisabled="false" 
							:cardList="cardLists" 
							:statusList="statusLists" 
							:groupList="groupList" 
							:Group="true"
							:aside="'product'"
							:role="borderRole"
							:boardName="'productBoard'"
							id="productBoardBox" 
							v-if="kanbanboardIsShow"
							@addUS="speedAddItem"
							@sendCheckbox="acceptCheckbox"
							:MenuStatusList="menuStatusList"
							:isScroll="true"
							:firstColumn="200"
						/>
						
						<!-- <component :is="currentView" :myCardList="cardList" :myProduct="MyProduct" :myStatusList="statusList" :myGroupList="groupList"></component>-->
					</div>


			    </div>
			</div>
		</Card>
		
		<!-- <AddPop 
			:isShow="isShowAddPop" 
			:isAdd="isAdd" 
			:addLoading="true" 
			@popClose="popCloseFn"  
			@tableDataAdd="tableDataAddFn"
			:UserstorytypeList="userstory_typeList"
			:UserstorystatusList="userstory_statusList"
			:ProiList="proiList"
			:ChargerList="chargerList"
			:ReqidList="req_idList"
			:SprintList="sprintList"
			:CurrentReqId="currentReqId" 

			ref="AddPopDom"
		/> -->
		<AddPop 
			:isShow="isShowAddPop" 
			:isAdd="isAdd" 
			:addLoading="true" 
			@popClose="popCloseFn"  
			@tableDataAdd="tableDataAddFn"
			:UserstorytypeList="_userstory_typeList"
			:UserstorystatusList="_userstory_statusList"
			:ProiList="_proiList"
			:ChargerList="_chargerList"
			:ReqidList="_req_idList"
			:SprintList="_sprintList"
			:CurrentReqId="_currentReqId" 
			ref="AddPopDom"
			id="AddPopDom"
		/>
		
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
        <Delpop
            @delpopClose = "delpopCloseFn"
            @delpopEnter = "delpopEnterFn" 
            :isShow = "delpopIsShow"
            :isLoading = "delpopIsLoading"
        />

	</div>
</template>
<script>
import { EventBus } from "@/tools";
import kanbanboard from "@/components/kanbanboard";
import AddPop from "./addpop";

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
import Delpop from '@/components/delectAlert'
const {storyAll,storyGetKanBan,storyGetCondition,getPermission,storySetChange,projectDetail,getDefSpring,userstoryDeleteList,userstoryOutExcel,userstoryOutWord} = Common.restUrl;

import Store from '@/vuex/store'

export default {
	watch: {
		searchCan(data){
			this.mainDataLoad(!data)
		},
		'$route' (to, from) {
			if(Common.GetSession("CurView")){
				this.currentView = Common.GetSession("CurView");
			}else{
				if(to.query.board && to.query.board == "true"){
		        	this.currentView = "kanbanboard";
		        }else{
		        	this.currentView = "developList";
		        }
			}
		},
		formValidate: {
            handler(val, oldVal) {
            },
            deep: true
        },
        tableDAtaPageCurrent(val, oldVal){
        	//Common.SetSession("tableDAtaPageCurrent",val);
        },
        statusListBase: {
            handler(val, oldVal) {
            },
            deep: true
        },
	},
	beforecreated(){
        //console.log("product--beforecreated-------",this.formValidate);
    },
    created(){
        this.isKanbanboard();
        if(!this.searchCan){
            this.mainDataLoad()
        }
        this.searchInit();

        

        //console.log("用户故事列表--created-------",this.formValidate,this.statusListBase)

    },
    beforeUpdate(){
        //console.log("用户故事列表--beforeUpdate-------",this.formValidate,this.statusListBase)
    },
    updated(){
        //console.log("用户故事列表--updated-------",this.formValidate,this.statusListBase)
        
        
    },
	data() {
		let that = this;
		return {
			ToolTipL:400,
			isShowMoreShow:false,
			//--------
			isShowAddPop:false,
            isAdd:true,
            currentReqId:"",
            tableDataRow:false,
			currentView: "developList",//developList//kanbanboard

			//看板开始
			searchCan:false,
			menuStatusList:[],
			groupList:[
		        { text: "所属需求项" },
			],
			statusList:[],
			cardList:[],
	        
            borderRole:false,
            cardListBase:[],
            statusListBase:[],
            kanbanboardIsShow:true,
            developListImg:require("../../assets/images/product-list.png"),
			developListImgCur:require("../../assets/images/product-listCur.png"),
			kanbanboardImg:require("../../assets/images/product-kanban.png"),
			kanbanboardImgCur:require("../../assets/images/product-kanbanCur.png"),
			database:[],
            //看板结束
            columns: [
	        	{
                    title: '编号',
                    key: 'userstory_id',
                    width: 90,
                    align: 'center'
                },

                {
                    title: '用户故事名称',
                    key: 'userstory_name',
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                "class":{txtBlock:true,txtBlockNone:false},
                                attrs:{title:params.row.userstory_name},
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
                    title: '责任人',
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
                                	//color:"white",
                                	//background:Common.StatusColorFn(params.row.userstory_status),
                                	padding:'0.5em',
                                	display:"inline-block",
                                	borderRadius:"3px",

                                },
                                //domProps:{href:"###"},
                            },
                            Common.StatusFn(params.row.userstory_status,"userstory_status",that)
                            //params.row.userstory_status//1 提出 2 开发中 3测试 4上线
                            
                        )
                    }
                },
                {
                    title: '所属迭代',
                    key: 'sprint_name',
                    width: 90,
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'span',
                            {
                                "class":{txtBlock:true,txtBlockNone:false},
                                attrs:{title:params.row.sprint_name},
                            },
                            params.row.sprint_name
                        );
                    }
                },
                {
                    title: '优先级',
                    key: 'proi',
                    width: 75,
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
                    key: 'task',
                    type: 'html',
                    align: 'center',
                    width: 105,
                    renderHeader: (h, params) => {
				        return h('div', {}, [
				            h('span', {}, '工作项个数'),
				            h('br'),
				            h('span', {}, '(完成 | 全部)')
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
                    width: 320,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                        	h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                //domProps:{disabled:this.authIs(['icdp_userStory_mng','icdp_userStory_edit','icdp_userStory_view'])},
                                domProps:{disabled:this.iSauth(params.row.editStatus)},
                                on: {
                                    click: () => {
                                        this.deleteTableLine(params.index)
                                    }
                                }
                            }, '废弃'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                //domProps:{disabled:this.authIs(['icdp_userStory_mng','icdp_userStory_edit','icdp_userStory_view'])},
                                domProps:{disabled:this.iSauth(params.row.editStatus)},
                                on: {
                                    click: () => {
                                        //this.show(params.index)
                                        this.editItem(params.index)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                //domProps:{disabled:this.authIs(['icdp_userStory_mng','icdp_userStory_edit','icdp_userStory_view'])},
                                domProps:{disabled:this.iSauth(params.row.editStatus)},
                                on: {
                                    click: () => {
                                        //this.show(params.index)
                                        this.editItem(params.index,"Copy")
                                    }
                                }
                            }, '复制'),
                            h('Button', {
                                props: {
                                    type: 'success',
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
                            }, '加工作项'),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },

                                on: {
                                    click: () => {
                                        //this.show(params.index)
                                        this.goDevelopmentFn(params.index);
                                    }
                                }
                            }, '工作项看板')
                        ]);
                    }
                },

            ],
	        tableData: [],
            tableDataCur:"",
            tableDAtaTatol:0,
            tableDAtaPageLine:10,
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
                group_name:"",//查询分组
                uscSn:"",//状态类型查询

            },
            userstory_typeList:[],
            userstory_statusList:[],
            NewStatusList:[
            ],
            userstory_categoryList:[],
            req_idList:[],
            proiList:[],
            chargerList:[],
            learn_concernList:[],
            sprintList:[],
            group_nameList:[],
            _sprint:false,
            prj_permission:[],
            identity:"",
            
            

            cardpop:false,
            cardpopList:[],
            //删除弹出--start
            delpopIsShow:false,
            delpopIsLoading:false,
            //删除弹出--end
            
            clickTime:true,
            itemName:"",
            
		}
	},
	components: {
		kanbanboard,
		AddPop,
		Delpop,

	},
	computed: {
		//快速添加用户故事开始
		_userstory_typeList(){
			return this.userstory_typeList
		},
		_userstory_statusList(){
			return this.userstory_statusList
		},
		_proiList(){
			return this.proiList
		},
		_chargerList(){
			return this.chargerList
		},
		_req_idList(){
			return this.req_idList
		},
		_sprintList(){
			return this.sprintList
		},
		_currentReqId(){
			return this.currentReqId
		},
		//快速添加用户故事结束
		//看板开始
		cardLists(){
			this.cardListBase.forEach((item)=>{item.source = "userstory"})
			return this.cardListBase;
		},
		statusLists(){
			this.menuStatusList = [];
			this.menuStatusList = _.cloneDeep(this.userstory_statusList);
			return this.statusListBase;
		},
		userstory_statusLists(){
			return this.userstory_statusList;
		},
		
		//看板结束
		SearchCan(){
			return !this.searchCan
		},
        addtest() {
            return this.$store.state["ADD_DATA_TEST"].data
        },
    },
    beforeDestroy(){
		EventBus.$off("moveEnd", this.moveEnd);
		EventBus.$off("clickItem", this.clicked);
		EventBus.$off("search", this.searchHandle);
		EventBus.$off("addTask", this.addNewTask);
		EventBus.$off("bindSort", this.bindSortId);
		EventBus.$off("storyBindSort", this.bindSortId);
    },

	mounted(){
		
		
		this.helpToLeft();
		EventBus.$on("HelpIcon",this.helpToLeft);


		let ID = this.getID() ? this.getID() : this.$router.push('/agile');

		

		if(!Common.GetSession("CurView") && this.$route.query.board){
			let CurView = "kanbanboard"
			this.currentView = CurView;
			Common.SetSession("CurView",CurView);
		}
		this.getInfoFn(ID);
		/* 看板开始 */
    	this.EventBusRegister();
        /* 看板结束 */
        EventBus.$on("ReLoad",this.reLoad);
		//Common.RemoveSession("allSession");
		//Common.GetConditionAll(defaultAXIOS,this,storyGetCondition,"xxxxx",ID,["userstory_type","userstory_status","req_id","proi","charger","learn_concern","sprint"]);
	},
	methods:{
		getSendData(data){
            console.log(data,"<==========getSendData",data.prj_name);
            this.itemName = data.prj_name;
            let params = {
                prjSn:(data && data.prjSn) || (data && data.prj_id) || Common.GETID(this,Common) || "",
                prj_id:(data && data.prjSn) || (data && data.prj_id) || Common.GETID(this,Common) || "",
                prjId:(data && data.prjId) || (data && data.id) || Common.GETprjid(this,Common) || "",
                id:(data && data.prjId) || (data && data.id) || Common.GETprjid(this,Common) || "",
            }
			this.getPermissionFn(getPermission,params);
        },
		searchInit(){

			if(Common.GetSession("isClickedDelBtn")){
	        	if(Common.GetSession("userstorySerch")){
	        		let _allSession = JSON.parse(Common.GetSession("userstorySerch"));
		        	for(let I in this.formValidate){
		        		this.formValidate[I] = _allSession[I]
		        	}
		        	this.tableDAtaPageCurrent = _allSession.tableDAtaPageCurrent - 0;
	        	}
	        	Common.RemoveSession("isClickedDelBtn");
	        }else if(Common.GetSession("allSession")){

	        	let _allSession = JSON.parse(Common.GetSession("allSession"));

	        	for(let I in this.formValidate){
	        		if(_allSession.hasOwnProperty(I)){
	        			this.formValidate[I] = _allSession[I];	
	        		}
	        	}
	        	if(_allSession.hasOwnProperty("tableDAtaPageCurrent")){
	        		this.tableDAtaPageCurrent =_allSession.tableDAtaPageCurrent - 0;	
	        	}
	        	
	        }else if(Common.GetSession("SPRINT_ID")){

	    		this.formValidate.req_id = "";
	    		this.formValidate.sprint = Common.GetSession("SPRINT_ID") + "";

	    		this.formValidate.userstory_name = "";
	    		this.formValidate.userstory_id = "";
	    		this.formValidate.userstory_type = "";
	    		this.formValidate.userstory_status = "";
	    		this.formValidate.proi = "";
	    		this.formValidate.charger = "";
	    		this.formValidate.learn_concern = "";
	    		this.formValidate.group_name = "";
	    		this.isShowMoreShow = true;

	    		this.formValidate.uscSn = "";

	    	}
	        else if(Common.GetSession("REQ_ID")){

	    		this.formValidate.req_id = Common.GetSession("REQ_ID") + "";
	    		this.formValidate.sprint = "";

	    		this.formValidate.userstory_name = "";
	    		this.formValidate.userstory_id = "";
	    		this.formValidate.userstory_type = "";
	    		this.formValidate.userstory_status = "";
	    		this.formValidate.proi = "";
	    		this.formValidate.charger = "";
	    		this.formValidate.learn_concern = "";
	    		this.formValidate.group_name = "";
	    		this.isShowMoreShow = true;

	    		this.formValidate.uscSn = "";

	    	} 

	        Common.RemoveSession("userstorySerch");
	        

	        if(this.formValidate.userstory_status || this.formValidate.req_id || this.formValidate.proi || this.formValidate.userstory_type || this.formValidate.charger || this.formValidate.uscSn){
	        	this.isShowMoreShow = true;	
	        }else{
	        	this.isShowMoreShow = false;
	        }
		},
		helpToLeft(){
			this.ToolTipL = Common.HelpLeft("kanbanShowBtn");
		},
		//所属需求项 多选开始
		acceptCheckbox(obj,arr,val){
			let temp = [];
			arr.forEach((item)=>{
				let str = item.substr(0, 1) == "0" || item.substr(0, 1) === "0" ? item.slice(1) : item;
				temp.push(str);
			})
			Common.SetSession("acceptCheck",JSON.stringify(this.addZero(temp)));
			return
			this.statusListBase = this.acceptData(this.addZero(temp),this.statusList);
			setTimeout(()=>{
				EventBus.$emit('KBScroll',"collapsedSider");
			},500)
			//this.serchAll({},JSON.stringify(temp));
		},
		acceptData(arrC,arrl){
			let _arr = [];
			let temp = [];
			let _myarr = [];
			if(arrC && Array.isArray(arrC) && arrC.length && arrl && Array.isArray(arrl) && arrl.length){
				arrl.forEach((item)=>{
					temp.push(item.state)
				})
				for(let j=0;j<temp.length;j++){
					arrC.forEach((item)=>{
						if(item == temp[j]){
							_myarr.push(item)	
						}
							
					})

				}

				for(let i = 0;i < _myarr.length;i++){
					let obj = arrl.find(item => item.state == _myarr[i]);
					if(obj){_arr.push(obj)}
				}

			}
			return _arr
		},
		addZero(arr){
			let _arr = [];
			arr.forEach((item)=>{
				if((item.substr(0, 1) != "0" && ((item - 0) < 10)) || item == "0"){
					_arr.push("0"+item)
				}else{
					_arr.push(item)
				}
			})
			return _arr
		},
		//所属需求项 多选结束
		
		optputExecl(){
			let params = {
				id:this.getID(),
				prj_id:this.getID(),
				prjId:this.getID(),
				userstory_name:this.formValidate.userstory_name,
				userstory_id:this.formValidate.userstory_id,
				userstory_type:this.formValidate.userstory_type,
				userstory_status:this.formValidate.userstory_status,
				req_id:this.formValidate.req_id,
				proi:this.formValidate.proi,
				charger:this.formValidate.charger,
				learn_concern:this.formValidate.learn_concern,
				sprint:this.formValidate.sprint,
				group_name:this.formValidate.group_name,
				uscSn:this.formValidate.uscSn,
			}
			let fileName = "用户故事导出_"+(new Date().Format('yyyy_MM_dd_hh_mm_ss'))+".xlsx"
			return Common.DownFile(defaultAXIOS,this,userstoryOutExcel,params,fileName);
		},
		optputWord(){
			let params = {
				id:this.getID(),
				prj_id:this.getID(),
				userstory_name:this.formValidate.userstory_name,
				userstory_id:this.formValidate.userstory_id,
				userstory_type:this.formValidate.userstory_type,
				userstory_status:this.formValidate.userstory_status,
				req_id:this.formValidate.req_id,
				proi:this.formValidate.proi,
				charger:this.formValidate.charger,
				learn_concern:this.formValidate.learn_concern,
				sprint:this.formValidate.sprint,
				group_name:this.formValidate.group_name,
				uscSn:this.formValidate.uscSn,
			}
			let fileName = "用户故事Word导出.doc"
			return Common.DownFile(defaultAXIOS,this,userstoryOutWord,params,fileName);
		},
		deleteTableLine(i){
            this.delpopOpenFn(true);
            this.tableDataCur = i;
        },
		//删除窗口 -start
        delpopCloseFn(B){
            this.delpopIsShow = B;
        },
        delpopEnterFn(B){
            let URL = userstoryDeleteList;
            let params = {
                id:this.tableData[this.tableDataCur].id,
            }
            return defaultAXIOS(URL,params,{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                //console.log("<======product 用户故事列表删除***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    this.delpopIsLoading = B;
                    this.delpopIsShow = B;
                    Common.CommonMessage(this,"删除完成")
                    this.getInfoFn(this.getID());
                    
                    Common.SetSession("isClickedDelBtn",true);

                    return Promise.resolve(myData.status)                    
                }else{
                    this.delpopIsLoading = B;
                    this.delpopIsShow = B;
                    Common.CommonError(this,myData.message);
                    return Promise.reject(myData.status);
                }
            }).catch( (error) => {
                console.log(error);
                this.delpopIsLoading = B;
                this.delpopIsShow = B;
                return Promise.reject(error);
                
            });
            
        },
        delpopOpenFn(B){
            this.delpopIsShow = B;
        },
        //删除窗口 -end
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
		getInfoFn(ID,isShowList){
			let _myAllSession = Common.GetSession("allSession");
		    this.getDefSpringFn(getDefSpring,ID).then((sprint)=>{

		    	if(!isShowList){

			    	if(_myAllSession){
			    		if(!JSON.parse(_myAllSession).hasOwnProperty("sprint")){
			    			this.formValidate.sprint = sprint+"";
			    		}
			    		Common.RemoveSession("allSession");
			    	}else if(Common.GetSession("REQ_ID") || Common.GetSession("SPRINT_ID")){
			    		this.optionSession();
			    	}else{
			    		if(Common.GetSession("isClickedDelBtn")){
			    			//
		    			}else{
		    				this.formValidate.sprint = sprint+"";
		    			}
			    	}

			    	
			    	if(Common.GetSession("tableDAtaPageCurrent")){
			    		this.tableDAtaPageCurrent = Common.GetSession("tableDAtaPageCurrent") - 0;	
			    	}
			    	
		    	}
		    	
		    	//currentView: "developList",//developList//kanbanboard
		    	
		    	let searchParams = [
		    		this.formValidate.userstory_name,
		    		this.formValidate.userstory_id,
		    		this.formValidate.userstory_type,
		    		this.formValidate.userstory_status,
		    		this.formValidate.req_id,
		    		this.formValidate.proi,
		    		this.formValidate.charger,
		    		this.formValidate.learn_concern,
		    		this.formValidate.sprint,
		    		this.formValidate.group_name,
		    		"[]",
		    		this.formValidate.uscSn,
		    	]

		    	if(this.currentView == "kanbanboard"){
		    		Promise.all([this._sprint]).then((REP)=>{
		    			this.storyGetKanBanFn(storyGetKanBan,ID,...searchParams);
		    		},()=>{
		    			this.showError("没有获取到故事状态");
		    		})
		    	}else{
		    		this.tableDataAjaxFn(storyAll,this.tableDAtaPageCurrent,this.tableDAtaPageLine,"",ID,...searchParams);
		    	}
	        },(error)=>{
	        	console.log(error);
	            this.showError(error);

	            this.tableDAtaPageCurrent = Common.GetSession("tableDAtaPageCurrent") ? Common.GetSession("tableDAtaPageCurrent") - 0 : 1;
	            
	            this.tableDataAjaxFn(storyAll,this.tableDAtaPageCurrent,this.tableDAtaPageLine,"",ID);
	  			this.storyGetKanBanFn(storyGetKanBan,ID);
	  			
	        })

		},
		getDefSpringFn(URL,ID){
			/*
			let _userstory_type = this.storyGetConditionFn(storyGetCondition,"userstory_type",ID);
		   	let _userstory_status =this.storyGetConditionFn(storyGetCondition,"userstory_status",ID);
		   	let _req_id =this.storyGetConditionFn(storyGetCondition,"req_id",ID);
		   	let _proi =this.storyGetConditionFn(storyGetCondition,"proi",ID);
		   	let _charger =this.storyGetConditionFn(storyGetCondition,"charger",ID);
		   	let _learn_concern = this.storyGetConditionFn(storyGetCondition,"learn_concern",ID);
			*/
			   	
	    	this._sprint = this.storyGetConditionFn(storyGetCondition,"sprint",ID);

	    	return Promise.all([this._sprint]).then((REP)=>{
	    		//this.sprintList.unshift({label:"未规划迭代",value:"0"})
			    return defaultAXIOS(URL,{prj_id:ID},{timeout:20000,method:'get'}).then((response) => {
	                let myData = response.data;
	                //console.log("<======agile getDefSpring***response+++",response,myData,"======>");
	                if(myData && myData.data && !isNaN(myData.data-0) ){
	                	return Promise.resolve(myData.data)
	                }else{
	                	return myData.data === "" ? Promise.resolve(myData.data) : Promise.reject(false)
	                	//return Promise.reject("无法获取当前迭代,data不存在");
	                }
	                
	            }).catch( (error) => {
	                console.log(error);
	                return Promise.reject(error);
	            });
	    		//
	    	},(ERR)=>{
	    		console.log(ERR)
	    		this.showError(ERR+"没有 userstory_type,userstory_status,req_id,proi,charger,storyGetConditionFn,sprint 其中之一");
	    		return Promise.reject(error);
	    	})


			
		},

		/* 看板开始 */
      	EventBusCancel(){
      		EventBus.$off("bindSort",this.bindSortId);
      		EventBus.$off("storyBindSort",this.bindStorySortId);
      	},
		EventBusRegister(){
			if(!EventBus.productRegister){
				EventBus.$on("moveEnd", this.moveEnd);
		        EventBus.$on("clickItem", this.clicked);
		        EventBus.$on("storyMoveEnd", ()=>{});
		        //EventBus.$on("storyMoveEnd", this.moveEnd);
		        EventBus.$on("search", this.searchHandle);
		        EventBus.$on("addTask", this.addNewTask);
		        EventBus.productRegister = false;
	        }
		},
		EventBusDispatch(){
			if(!EventBus.productDispatch){
				//EventBus.$emit('storyBindSort');
				EventBus.$emit('bindSort');
		        //EventBus.productDispatch = true;
	        }
		},
		changeStateNumber(info){
			Common.ChangeStateNumber(this,"statusListBase",info);
			
		},
		changeMovedStatus(info){
			let _params = {};
			_params.taskId = info.evt.item.getAttribute('taskid');
			//_params.ID = info.item.detail_id;
			_params.ID = info.evt.item.getAttribute('detailid');
			_params.taskStatus = info.evt.to.getAttribute('state');
			_params.taskStatusFrom = info.evt.from.getAttribute('state');
			if(_params.taskStatus == _params.taskStatusFrom){
				return
			}
			let myParams = {
				id:_params.ID,
				username:Common.getCookie("username"),
				userstory_status:((N)=>{return (N-0) < 10 ? N.substring(1) : N})(_params.taskStatus),
				prjSn:Common.GETprjid(this,Common),
                prj_id:Common.GETprjid(this,Common),
			}
			defaultAXIOS(storySetChange,myParams,{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                //console.log("<======用户故事 状态改变***response+++",response,myData,"======>");
                if(myData.status.indexOf("success") == -1){
                	this.showError(storySetChange+"|返回结果错误");
                }else{
                	this.cardpopList = [];
                	return;
                	if(myData.no_complete_task_list && Array.isArray(myData.no_complete_task_list) && myData.no_complete_task_list.length){
                		this.cardpop = true;
                		this.cardpopList = myData.no_complete_task_list;
                		this.cardpopList.forEach((item)=>{
                			item.task_statusCN = Common.StatusFn(item.task_status,"userstory_status",this);
                		})
                	}
                }
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
		},
		moveEnd(info,val) {
			if(window.location.hash.indexOf("/product") == -1){
				return
			}
            // 移动卡片结束后
            //console.log("用户故事-移动卡片结束后 :::", info);
            if(val){
            	Common.CommonWarning(this,val)
            }
            this.changeStateNumber(info);
            if(!EventBus.productMoveEnd){
            	this.changeMovedStatus(info);
            	//console.log("用户故事-移动卡片结束后 ::: changeMovedStatus", info);
            	EventBus.productMoveEnd = true;
            	setTimeout(()=>{
            		EventBus.productMoveEnd = false;
            	},500)	
            }
            
        },
        clicked(info,type) {
        	if(window.location.hash.indexOf("/product") == -1){
				return
			}
            // 点击卡片方法
            //console.log("用户故事-点击卡片方法 ::: ", info,type);
            if(!EventBus.productClicked){
            	//console.log("用户故事-点击卡片方法 ::: this.$router.push", info,type);

            	let Path = '/product/detail';
            	let Query = {}
            	if(type == "附件"){
            		Query.TabsCur = "name6";
            		Query.detail_id = info.detail_id;
            	}else if(type == "工作项"){
            		Path = "/development";
            		Query.board = "true";
            		Query.us_name = info.detail_id;
            	}else if(type == "测试案例"){
            		Query.TabsCur = "name4";
            		Query.detail_id = info.detail_id;
            		/*
            		window.location.href = window.location.hostname == "128.196.0.127" ? '//128.196.0.127:8000/' : '//128.196.96.210:8000/';
            		return
            		*/
            	}else if(type == "依赖项"){
            		Path = "/dependManage";
            		Query.depd_main_type = 2;
            	}else if(type == "所属迭代"){
            		Path = "/iteration";
            		if(info.sprintName){
            			Query.sprintName = info.sprintName
            		}
            	}else{
            		Query.detail_id = info.detail_id;
            	}

            	this.$router.push({path:Path , query:Query })
            	EventBus.productClicked = true;
            	setTimeout(()=>{
            		EventBus.productClicked = false;
            	},500)	
            }
            
        },
        searchHandle(info) {
            // 查询方法
            //console.log("查询  ::: ", info);
        },
        addNewTask() {
            //点击跳转页面
            // this.$router.push({
            //   path: "/development/add"
            // });
        },
        showList() {
        	this.searchCan = false;
			let CurView = "developList";
			this.currentView = CurView;
			Common.SetSession("CurView",CurView);
			setTimeout(()=>{
				this.getInfoFn(this.getID(),"showList")
			},350)
		},
		showTask(){
			this.searchCan = false;
			let CurView = "kanbanboard"
			this.currentView = CurView;
			Common.SetSession("CurView",CurView);
			this.kanbanboardIsShow = false;
			setTimeout(()=>{
				this.getInfoFn(this.getID(),"showTask")
			},1)
		},
		resetKanbanboard(){
			this.cardListBase = [];
			this.statusListBase = [];
			this.groupList = [{ text: "所属需求项" }];
		},
		storyGetKanBanFn(URL = "",id,userstory_name = "",userstory_id = "",userstory_type = "",userstory_status = "",req_id = "",proi = "",charger = "",learn_concern = "",sprint = "",group_name = "",USS = "",uscSn = ""){
			this.searchCan = false;

			this.kanbanboardIsShow = true;
			this.cardList = [];
			this.statusList = [];
			this.cardListBase = [];
            this.statusListBase = [];

            let defaultAXIOSParams = {
            	id:id,
            	prj_id:id,
            	userstory_name,
            	userstory_id,
            	userstory_type,
            	userstory_status,
            	req_id,
            	proi,
            	charger,
            	learn_concern,
            	sprint,
            	group_name,
            	username:Common.getCookie("username"),
            	prjSn:Common.GETprjid(this,Common),//Common.getCookie("prjSn"),
            	uss:"[]",//this.ussArr(USS,this.statusLists),
            	uscSn,
            }

            let myCondition = {
        		userstory_name,
        		userstory_id,
        		sprint,
        		userstory_status,
        		req_id,
        		proi,
        		userstory_type,
        		charger,
        		group_name,
        		learn_concern,
        		uss:'[]',
        		uscSn,
        	}
            this.serachCondition(myCondition);



			defaultAXIOS(URL,defaultAXIOSParams,{timeout:10000,method:'get'}).then((response) => {
				
                let myData = response.data;
                if(myData.status == "success" ){
                	this.borderRole = myData.role;
                }
                myData = myData.data ? myData.data : myData;
                //console.log("<======用户故事 看板 ***response+++",response,myData,"======>");
                let fn =(arr,val)=>{
        			let obj = arr.find((item)=>{
        				return item.label == val;
        			})
        			if(!obj || !obj.value){
        				this.showError("obj是"+obj);
        			}
        			return obj && obj.value ? ((obj.value-0) <10 ? "0"+obj.value : obj.value+"") : 0;
        		}
        		let sprintFn = (val,arr)=>{
        			let obj = ""
        			if(arr && Array.isArray(arr) && arr.length){
        				obj = arr.find(item=>item.value == val);
        			}
        			if(obj && obj.label){
        				return obj.label;
        			}else{
        				return obj;
        			}

        		}
                if(myData && myData.length){
                	let _temp = {};
                	let reqArr = [];
                	for(let i=0;i<myData.length;i++){
                		if(myData[i].list && myData[i].list.length){
                			for(let j=0;j<myData[i].list.length;j++){
                				reqArr.push(myData[i].list[j].req_id)
                			}
                		}
                		_temp.stateStr = myData[i].userstory_status;
                		_temp.taskNumber = myData[i].count - 0;
                		_temp.myClass = myData[i].class || "";
                		_temp.wip = (myData[i].wip || 0) - 0;
                		_temp.state = fn(this.userstory_statusList,_temp.stateStr);
                		//_temp.state = "0"+(i+1);
                		this.statusList.push(_temp);
                		this.statusListBase.push(_temp);
                		_temp = {};
                	}
                	

                	let reqArr2 = Array.from(new Set(reqArr));
                	let checkreqName = (val)=>{
                		let _temp
                		if(this.req_idList){
                			_temp = this.req_idList.find((item)=>{
	                			return val == item.value
	                		})
	                		if(_temp && _temp.label){
	                			return {
	                				text:_temp.label,
	                				groupId:val+"",
	                				reqID:_temp.reqID || "",
	                				req_status:_temp.req_status || "",
	                				req_status_name:_temp.req_status_name || "",
	                			}
	                		}else{
	                			return false;
	                		}
                		}else{
                			return false;
                		}
                	}
                	let checkreqNameAll = (n)=>{
                		let _temp = {}
                		if(this.req_idList && Array.isArray(this.req_idList) && this.req_idList.length){
                			for(let i=0;i<this.req_idList.length;i++){
                				_temp.text = this.req_idList[i].label || "";
	                			_temp.groupId = (this.req_idList[i].value || "") + "";
		                		_temp.reqID = this.req_idList[i].reqID || "";
		                		this.groupList.push(_temp);	
		                		_temp = {};
                			}
                			

	                		
	                		
                		}else{
                			return false;
                		}
                	}

                	this.groupList = [];
                	this.groupList.push({text:"所属需求项"});
                	//checkreqNameAll();
                	
                	for(let k=0;k<reqArr2.length;k++){
                		let _CN = checkreqName(reqArr2[k]);
                		if(_CN){this.groupList.push(_CN)}
                	}
                	

	            	let _arr = [];
					let _Obj = {};
					
					for(let i=0;i<myData.length;i++){
						for(let j=0;j<myData[i].list.length;j++){
							_Obj.taskStatus = fn(this.userstory_statusList,myData[i].userstory_status);
							//_Obj.taskStatus = "0"+(i+1);
							_Obj.taskId = ""+myData[i].list[j].userstory_id;
							_Obj.description = "description_"+ i +"_"+j;
							_Obj.userName = myData[i].list[j].charger;
							_Obj.myUserName = myData[i].list[j].username;
							_Obj.userId = "userId_"+ i +"_"+j;
							_Obj.groupId = myData[i].list[j].req_id+"";
							//_Obj.bgColor = { background: ((C)=>{if(C==1){return '#f8d6af'}else if(C==2){return '#b3ecec'}else{return '#f2e1f0 '}})(myData[i].list[j].proi) };
							_Obj.bgcolor = ((C)=>{if(C==1){return '#FE4515'}else if(C==2){return '#12C37A'}else if(C==3){return '#FEB159'}else{return '#ffffff'}})(myData[i].list[j].proi);
							_Obj.taskStateStr = myData[i].userstory_status;
							_Obj.headPortrait =   require("@/assets/images/user_02.png"); //"/assets/images/user_02.png";
							_Obj.taskName = myData[i].list[j].userstory_name;
							_Obj.nickName = myData[i].list[j].charger;
							_Obj.detail_id = myData[i].list[j].id;

							_Obj.source = "userstory";
							_Obj.isDepd = myData[i].list[j].isDepd;
							_Obj.isFile = myData[i].list[j].isFile;
							_Obj.isFinish = myData[i].list[j].isFinish;
							_Obj.task_count = myData[i].list[j].task_count;

							_Obj.isDiscard = myData[i].list[j].isDiscard || "";

							_Obj.testCase = myData[i].list[j].testCase;

							_Obj.taskDesc = myData[i].list[j].taskDesc  || "";
							_Obj.depdDesc = myData[i].list[j].depdDesc  || "";
							_Obj.userstory_desc = myData[i].list[j].userstory_desc  || "";

							_Obj.sprint = (myData[i].list[j].sprint || this.formValidate.sprint || "")+"";
							_Obj.sprintName = (myData[i].list[j].sprintName ||  sprintFn((this.formValidate.sprint || ""),this.sprintList) || "")+"";

							_arr.push(_Obj);
							_Obj = {}
						}
						this.cardList.push(..._arr);
						this.cardListBase.push(..._arr);
						_arr = []
					}
					this.EventBusDispatch();
                }else{
                	this.showError(URL+"_没有数据");
                }

                this.searchCan = true;

            }).catch( (error) => {
            	this.searchCan = true;
                console.log(error);
                this.showError(error);
            });
		},
        /* 看板结束 */
        iSauth(KEY){
        	let key;
        	if(KEY){
        		if(KEY != "false" || KEY != "null" || KEY != "undefined"){
        			key = true;
        		}else{
        			key = false;
        		}
        	}else{
        		key = false;
        	}
        	return !key;
        },

		authIs(KEY){
			return Common.auth(this,KEY)            
        },
        authIs2(KEY){
			return Common.auth2(this,KEY)            
        },
        

        getPermissionFn(URL,params){
        	return Common.GetPermission(defaultAXIOS,this,URL,params);
        },

		getID(){
			return Common.GETID(this,Common);
		},


		selectMenuFn(N){
			this.searchCan = false;
			this.kanbanboardIsShow = false;
			let ID = N;
			
			//Common.setStorageAndCookie(Common,"id",N)
			let fn = (response) => {
			    this.$refs.ReqId.clearSingleSelect();
			    this.$refs.Charger.clearSingleSelect();
			    this.$refs.Sprint.clearSingleSelect();

			    let DATA = response && response.data ? response.data : response
			    let prodId = DATA.prod_id?DATA.prod_id : DATA.prod 
			    
			    if(prodId){
		            Common.setStorageAndCookie(Common,'prod_id',prodId);
			    }else{
			    	Common.setStorageAndCookie(Common,'prod_id',"");
			    }

			    this.tableDAtaPageCurrent = 1;
			    for(let I in this.formValidate){
			    	if(I != "sprint"){
			    		this.formValidate[I] = "";
			    	}
			    }
			    //this.kanbanboardIsShow = true;
			    this.getInfoFn(ID);
			}
			

			fn({data:{prod_id:"--"}});
			return
			defaultAXIOS(projectDetail+ID,{},{timeout:2000,method:'get'}).then((response) => {
			    let myData = response.data;
			    //console.log("<======detail***response+++",response,myData,"======>");
			    fn(myData);
			    //this.$refs.req_id.setQuery();
			}).catch( (error) => {
				this.searchCan = true;
			    console.log(error);
			    this.showError(error);
			});
		    //this.tableDataAjaxFn(storyAll,1,this.tableDAtaPageLine,"",ID);
		    //this.storyGetKanBanFn(storyGetKanBan,ID);
        },

		storyGetConditionFn(URL,condition,prj_id){
			return Common.GetConditionAll(defaultAXIOS,this,URL,"xxxxx",prj_id,["userstory_type","userstory_status","req_id","proi","charger","sprint","group_name","userstory_category"],"sprintList");
			//,"learn_concern"
			//return Common.GetCondition(defaultAXIOS,this,URL,condition,prj_id);
        },
        cancelSerchAll(){
            for(let i in this.formValidate){
                this.formValidate[i] = "";
            }
            this.$refs.formValidate.resetFields();
            this.serchAll();
        },
        //记住搜索条件 start
        serachCondition(val){
            if(Common.IsObject(val)){
                val.tableDAtaPageCurrent = this.tableDAtaPageCurrent;
            }
            Common.RemoveSession("userstorySerch");
            Common.RemoveSession("allSession");
            Common.SetSession("userstorySerch",JSON.stringify(val));
            Common.RemoveSession("isClickedDelBtn");
        },
        optionSession(){
        	Common.RemoveSession("REQ_ID");
        	Common.RemoveSession("SPRINT_ID");
        },
        //记住搜索条件 start
		serchAll(evt,uss = ""){
			if(!this.clickTime){
				return
			}else{
				this.clickTime = false;
				setTimeout(()=>{
					this.clickTime = true;
				},1500)
			}

			let _uss = uss ? uss : this.ussArr(uss,this.statusLists);
			let ID = this.getID();

			this.optionSession();

            if(this.currentView == "kanbanboard"){
            	this.kanbanboardIsShow = false;
            	setTimeout(()=>{
					//this.kanbanboardIsShow = true;
					this.boardList(ID,_uss);
				},10)
            }else{
            	this.boardList(ID,_uss);
            }




            //this.$router.push({path: '/product', query: {URL:storyAll,page:1,limit:this.tableDAtaPageLine,data:"",ID:ID,userstory_name:this.formValidate.userstory_name,userstory_id:this.formValidate.userstory_id,userstory_type:this.formValidate.userstory_type,userstory_status:this.formValidate.userstory_status,req_id:this.formValidate.req_id,proi:this.formValidate.proi,charger:this.formValidate.charger,learn_concern:this.formValidate.learn_concern,sprint:this.formValidate.sprint}})
            

        },
        boardList(ID,uss = ""){
        	let searchParams = [
        		this.formValidate.userstory_name,
        		this.formValidate.userstory_id,
        		this.formValidate.userstory_type,
        		this.formValidate.userstory_status,
        		this.formValidate.req_id,
        		this.formValidate.proi,
        		this.formValidate.charger,
        		this.formValidate.learn_concern,
        		this.formValidate.sprint,
        		this.formValidate.group_name,
        		uss,
        		this.formValidate.uscSn,
        	];
        	if(this.currentView == "kanbanboard"){
        		this.storyGetKanBanFn(storyGetKanBan,ID,...searchParams);
        	}else{
        		this.tableDataAjaxFn(storyAll,1,this.tableDAtaPageLine,"",ID,...searchParams);	
        	}
        	
            
            this.tableDAtaPageCurrent = 1;
        },
        ussArr(Uss,arr){
			let temp = [];
			if(Uss){
				return Uss;
			}else{
				if(arr && Array.isArray(arr) && arr.length){
					arr.forEach((item)=>{
						let str = item.state.substr(0, 1) == "0" || item.state.substr(0, 1) === "0" ? item.state.slice(1) : item.state;
						temp.push(str);
					})	
				}
				return JSON.stringify(temp);
			}
		},
		
		tableDataAjaxFn(URL = "",page = 1,limit = 3,data = "",id = "",userstory_name = "",userstory_id = "",userstory_type = "",userstory_status = "",req_id = "",proi = "",charger = "",learn_concern = "",sprint = "",group_name = "",USS = "",uscSn = ""){
			this.searchCan = false;
			let defaultAXIOSParams = {
				page,
				limit,
				data,
				id:id,
				prj_id:id,
				prjSn:Common.GETprjid(this,Common),
				userstory_name,
				userstory_id,
				userstory_type,
				userstory_status,
				req_id,
				proi,
				charger,
				learn_concern,
				sprint,
				group_name,
				username:Common.getCookie("username"),
				uss:"[]",//this.ussArr(USS,this.statusLists)
				uscSn,
			};

			let myCondition = {
        		userstory_name,
        		userstory_id,
        		sprint,
        		userstory_status,
        		req_id,
        		proi,
        		userstory_type,
        		charger,
        		group_name,
        		learn_concern,
        		uss:'[]',
        		uscSn,
        	}
            this.serachCondition(myCondition);

            defaultAXIOS(URL,defaultAXIOSParams,{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                //console.log("<======***用户故事列表+++",response,myData,"======>");
                this.tableData = myData.rows;
                this.tableData.forEach(item=>item.manHours = "0 | "+item.manHours)
                this.tableData.forEach(item=>item.task = item.complete_task+" | "+((item.complete_task-0)+(item.not_complete_task-0)))
                this.tableDAtaTatol = myData.page_rows;


                this.searchCan = true;
            }).catch( (error) => {
            	this.searchCan = true;
                console.log(error);
                this.showError(error);
            });
        },
		changeCurrentPage(i) {
			this.tableDAtaPageCurrent = i;
			let ID = this.getID()
            //this.tableDataAjaxFn(storyAll,i,this.tableDAtaPageLine,"",ID)
            let searchParams = [
            	this.formValidate.userstory_name,
            	this.formValidate.userstory_id,
            	this.formValidate.userstory_type,
            	this.formValidate.userstory_status,
            	this.formValidate.req_id,
            	this.formValidate.proi,
            	this.formValidate.charger,
            	this.formValidate.learn_concern,
            	this.formValidate.sprint,
            	this.formValidate.group_name,
            	this.formValidate.uscSn,
            ];
            this.tableDataAjaxFn(storyAll,i,this.tableDAtaPageLine,"",ID,...searchParams);
            
        },
        changePageSize(i) {
        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },

		mainDataLoad(IsShow = true,Msg = "正在加载中……"){

			Store.dispatch('IS_PAGELOADING/incrementAsync', {
		        isShow: IsShow,
		        msg: Msg,
		    })
         
            // Store.dispatch('ADD_DATA_TEST/incrementAsync', {
            //     msg: true
            // })
            //console.log('this.$store.state["ADD_DATA_TEST"].data',this.$store.getters["ADD_DATA_TEST/getFn"])
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
		addItem(obj,req_id){
			this.$router.push('/product/add')
            return;
            this.currentReqId = req_id ? req_id : "";
			this.isShowAddPop = true;
   			this.isAdd = true;
		},
		speedAddItem(obj,req_id){
            this.currentReqId = req_id ? req_id : "";
			this.isShowAddPop = true;
   			this.isAdd = true;
		},
		editItem(I,val){
			Common.GoUserstorySession(Common,this);
			let Query = {
				DATA: JSON.stringify(this.tableData[I])
			}
			if(val == "Copy"){
				Query.Copy = "复制-"
			}
			this.$router.push({path: '/product/edit', query:Query })
            return;
			//
			// this.isShowAddPop = true;
            // this.isAdd = false;
            // this.tableDataRow = this.tableData[I]
		},
		popCloseFn(is,obj){
			this.isShowAddPop = false;
            this.isAdd = true;
            this.tableDataRow = false;
            if(obj){
            	this.reLoad();
            }
		},
		reLoad(){
			this.reload();
		},
		goAddDevelopmentFn (index) {
			Common.RemoveSession("isClickedDelBtn");
			Common.GoUserstorySession(Common,this);
            this.$router.push({path: '/development/add', query: {board: true,sptId:this.tableData[index].sprint,usId:this.tableData[index].id}})
        },
		goDevelopmentFn (index) {
			Common.RemoveSession("isClickedDelBtn");
			Common.GoUserstorySession(Common,this);
            this.$router.push({path: '/development', query: {board: true,us_name:this.tableData[index].id}})
        },
		goProductDetailFn (index) {
			Common.RemoveSession("isClickedDelBtn");
			Common.GoUserstorySession(Common,this);
            this.$router.push({path: '/product/detail', query: {detail_id: this.tableData[index].id}})
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
		
		resetList(){
			this.tableData = [];
		},
	},
	inject:["reload"],
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
	    margin-bottom: 5px;
	    padding-left:5px;
	}
	.addBtnBox {
		transform: translate(0, -15%);
	}
	.listBox {
		overflow: hidden;
		// overflow: auto;
		position:relative;
	}
	span.high {
	  background: #FE4515;
	  width: 100%;
	  height: 25px;
	  display: inline-block;
	  line-height: 25px;
	  text-align: center;
	  color:white;
	}
	span.middle {
	  background: #12C37A;
	  width: 100%;
	  height: 25px;
	  display: inline-block;
	  line-height: 25px;
	  text-align: center;
	  color:white;
	}
	span.low {
	  background: #FEB159;
	  width: 100%;
	  height: 25px;
	  display: inline-block;
	  line-height: 25px;
	  text-align: center;
	  color:white;
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
		text-align:left;
	}
	.cardpoplist p {
		border-bottom: #ccc solid 1px;
		padding-top:0.5em;
		padding-bottom:0.5em;
	}

.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
</style>
<style>
#kanbanboard .content-header , #kanbanboard .ivu-col>div{
	width: auto !important;
}
#kanbanboard .ColumnFirst , #kanbanboard .Column , #kanbanboard .topColumnFirst , #kanbanboard .topColumn{
	min-width: 200px; 
}
#kanbanboard .ivu-row-flex .ivu-col{
	padding-right: 4px !important;
	padding-left: 4px !important;
}
#kanbanboard .ivu-row-flex .ivu-col:first-of-type{
	padding-right: 10px !important;
	padding-left: 8px !important;
}
#kanbanboard .ivu-row-flex .ivu-col:nth-of-type(2){
	padding-right: 4px !important;
	padding-left: 2px !important;
}
#kanbanboard .ivu-row-flex .ivu-col:last-of-type{
	padding-right: 8px !important;
	padding-left: 4px !important;
}
.tagBar {
	height:35px; 
	
}
.tagBarRight {
	float:right;
}
.tagBarLeft{
	float: left;
	padding-right:10px; 
}
.hack {
	clear: both; 
	width:100%;
	height:1px; 
	overflow:hidden;
}
</style>

