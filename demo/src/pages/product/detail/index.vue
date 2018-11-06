<template>
	<div class="pageContent">
		<goAgile :go="'/product'" :text="'返回用户故事列表'" :TOP="'7'" />
		<Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>用户故事</BreadcrumbItem>
            <BreadcrumbItem>用户故事基本信息</BreadcrumbItem>
        </Breadcrumb>
        <Card>
        	<div class="editBtn">
	        	<Button 
	                type="warning" 
	                @click="editItemFn"
	                :disabled="authIs(['icdp_userStory_mng','icdp_userStory_edit','icdp_userStory_view'])" 
	                class="editBtn"
	                long
	                size="small"
                    v-show="(TabsCur == 'name1' || TabsCur == 'name2' || TabsCur == 'name3' || TabsCur == 'name4') ? true : false"
	                >
	                编辑
	            </Button>
	            <Button 
	                type="success" 
	                @click="goDevelopmentFn"
	                :disabled="false" 
	                class="editBtn2"
	                long
	                size="small"
	                >
	                任务看板
	            </Button>
            </div>
        	<Tabs :value="TabsCur" type="card" :capture-focus="false" @on-click="tabsHandle" >
		        <TabPane label="基本信息" name="name1">
					<div class="baseInfoBox">
		            	<!-- <h3 class="Title"><span>用户故事基本信息</span></h3> -->
		            	<div class="tableBox">
		            		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
							  <tbody>
							  	<tr>
								  <th width="11%">所属产品</th>
								  <td width="20%">{{ formValidate.product_name | FALSEINFO}}</td>
								  <th width="11%">所属项目</th>
								  <td width="20%" >{{ formValidate.prj_name | FALSEINFO}}</td>
								  <th width="11%">用户故事名称</th>
								  <td>{{ formValidate.userstory_name | FALSEINFO}}</td>
								</tr>
								<tr>
								  <th >故事类型</th>
								  <td >{{ formValidate.userstory_type | FALSEINFO}}</td>
								  <th >故事状态</th>
								  <td >{{ formValidate.userstory_status | FALSEINFO}}</td>
								  <th >优先级</th>
								  <td>{{ formValidate.proi | FALSEINFO}}</td>
								</tr>
                                <tr>
                                  <th width="11%">所属迭代</th>
                                  <td width="20%">{{ formValidate.sprint_name | FALSEINFO}}</td>
                                  <th width="11%">工时(预计)</th>
                                  <td width="20%" >{{ formValidate.manHours | FALSEINFO}}</td>
                                  <th width="11%">工时(实际)</th>
                                  <td>0</td>
                                </tr>

                                <tr>
                                  <th>关联任务(已完成)</th>
                                  <td>{{ formValidate.complete_mission | FALSEINFO}}</td>
                                  <th>关联任务(全部)</th>
                                  <td>{{ formValidate.mission | FALSEINFO}}</td>
                                  <th>故事编号</th>
                                  <td>{{ formValidate.userstory_id | FALSEINFO}}</td>
                                </tr>
								<tr>
								  
								  <th>故事描述</th>
								  <td colspan="5" v-html="formValidate.userstory_desc?'<pre>'+formValidate.userstory_desc+'</pre>':'没有数据'"></td>
								  
								</tr>
								
							  </tbody>
							</table>
		            	</div>
		            </div>
		        </TabPane>
                <TabPane label="需求项分析" name="name2">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>需求项信息</span></h3> -->
                        <div class="tableBox">
                            <!-- -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
                              <tbody>
                                <tr>
                                  <th width="11%">所属需求项</th>
                                  <td width="20%">{{ formValidate.req_name | FALSEINFO}}</td>
                                  <th width="11%">需求项提出人</th>
                                  <td width="20%" >{{ formValidate.proposer | FALSEINFO}}</td>
                                  <th width="11%">提出人部门</th>
                                  <td>{{ formValidate.proposer_department | FALSEINFO}}</td>
                                </tr>
                              </tbody>
                            </table>
                            <!-- -->
                        </div>
                        <br />
                        <h3 class="Title"><span>关联业务功能</span></h3>
                        <!-- <div class="tableContBox">
                            <Table border :columns="columns2" :data="tableData2"  />
                            <div class="pageBox" v-if="tableData2.length">
                                <Page :total="tableDAtaTatol2/tableDAtaPageLine2 > 1 ? (tableDAtaTatol2%tableDAtaPageLine2 ? parseInt(tableDAtaTatol2/tableDAtaPageLine2)+1 : tableDAtaTatol2/tableDAtaPageLine2)*10 : 1" show-elevator @on-change="changeCurrentPage2" @on-page-size-change="changePageSize2"></Page>
                                <p>总共{{tableDAtaTatol2}}条记录</p>
                            </div>
                        </div> -->
                        <div class="tableContBox">
                            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140" style="min-height:300px;" >
                                <Row>
                                    <Col span="3">
                                        <Button type="success" @click="addBus()">新增业务功能</Button>
                                    </Col>
                                    <Col span="21">

                                        <!-- 搜索选择开始 -->
                                        
                                            <div v-for="(myItem,index) in formValidate.AddGroupList" :key="index" >
                                                
                                                <FormItem 
                                                    :label-width="100"
                                                    :label="myItem.myLabel" 
                                                    :prop="'AddGroupList.'+index+'.group'"
                                                    :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                                                     
                                                    :ref="myItem.myRef+index" 
                                                    :class="myItem.myRef+index"
                                                    >
                                                    <Select
                                                        :ref="myItem.myRef+index+'_sel'"
                                                        :class="myItem.myRef+index+'_sel'"
                                                        @on-change="selectChange" 
                                                        @on-query-change="selectQueryChange"
                                                        v-model="myItem.group" 
                                                        :id="'sel'+index" 
                                                        filterable 
                                                        :loading="inputLoad"  
                                                        multiple 
                                                        label-in-value
                                                        :placeholder="'请输入内容并选择【'+myItem.myLabel+'】'"
                                                        >
                                                        <Option v-for="(item,index2) in myItem.groupList" :value="item.value" :label="item.label" :key="index2">
                                                            {{ item.label }}
                                                        </Option>
                                                    </Select>
                                                </FormItem>
                                            </div>
                                        
                                        <!-- 搜索选择结束 -->
                                    </Col>

                                    
                                    
                                </Row>
                                <Table border :columns="columns3" :data="tableData3"  />
                                
                                <div style="text-align:center;padding-top:10px;">
                                    <Button type="primary" :loading="modal_add_loading" @click="submitAdd">
                                        <span v-if="!modal_add_loading">　　　　保存　　　　</span>
                                        <span v-else>Loading...</span>
                                    </Button>
                                    
                                </div>
                            </Form>
                        </div>
                    </div>
                </TabPane>
		        <TabPane label="应用设计" name="name3">
		        	<div class="baseInfoBox">
		            	<!-- <h3 class="Title"><span>计划故事相关</span></h3> -->
		            	<div class="tableBox">
		            		应用设计制作中.......
		            	</div>
		            </div>
		        </TabPane>
                <TabPane label="测试管理" name="name4">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>计划故事相关</span></h3> -->
                        <div class="tableBox">
                            测试管理制作中.......
                        </div>
                    </div>
                </TabPane>
		        <TabPane label="用户故事变更记录" name="name5">
		        	<div class="baseInfoBox">
		            	<!-- <h3 class="Title"><span>用户故事变更记录</span></h3> -->
		            	<div class="tableBox">
		            		<!-- -->
		            		<div class="tableContBox">
								<Table border :columns="columns" :data="tableData"  />
								<div class="pageBox" v-if="tableData.length">
						    		<Page :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
						    		<p>总共{{tableDAtaTatol}}条记录</p>
						    	</div>
							</div>
		            		<!-- -->
		            	</div>
		            </div>
		        </TabPane>
                <TabPane label="用户故事附件" name="name6">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>计划故事相关</span></h3> -->
                        <div class="tableBox">
                            用户故事附件制作中.......
                        </div>
                    </div>
                </TabPane>
		    </Tabs>
		  
            <!-- <div class="addModule">
            	<Row class="tagBox">
	                <Col span="2">
	                    <h4>技术模块</h4>
	                </Col>
	                <Col span="22" >
	                    <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose">{{ item}}</Tag>
	                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="addItem">添加技术模块</Button>
	                </Col>
	            </Row>
	            <Row class="tagBox">
	                <Col span="2">
	                    <h4>业务模块</h4>
	                </Col>
	                <Col span="22" >
	                    <Tag v-for="item in count2" :key="item" :name="item" closable @on-close="handleClose2">{{ item}}</Tag>
	                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="addItem2">添加业务模块</Button>
	                </Col>
	            </Row>
        	</div> -->
        	
		</Card>

		<Enclosure 
			:isShow="isShowEnclosure"  
			:addLoading="true" 
			@enclosureClose="enclosureCloseFn" 
			:data="EnclosureData"
		/>
        <Delpop
            @delpopClose = "delpopCloseFn"
            @delpopEnter = "delpopEnterFn" 
            :isShow = "delpopIsShow"
            :isLoading = "delpopIsLoading"
        />
        <Buspop 
            @buspopClose = "buspopCloseFn"
            
            :isShow = "buspopIsShow"
            :isLoading = "buspopIsLoading"
        />
		


	</div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {storyGetDetail,storyGetCondition,getPermission,getMissionChange,userstoryGetBus,userstoryAddBus,userstoryRelative,userstoryListBusfunc} = Common.restUrl;
import Enclosure from "./enclosure";
import Trans from './transSingle'
import Delpop from '@/components/delectAlert'
import Buspop from './buspop'
export default {
	data () {
        return {
        	modaAdd: false,
            modal_add_loading: true,

            technologyORbusiness:true,
            formItem: {
                technologyName:"",
                businessName:"",
            },
        	count: ["技术模块1", "技术模块2", "技术模块3"],
        	count2: ["业务模块1", "业务模块2", "业务模块3"],
        	formValidate: {
				id: "",
				userstory_id: "",
				userstory_name: "",
				userstory_type: "",
				charger: "",
				userstory_status: "",
				proi: "",
				manHours: "",
				mission: "",
				complete_mission: "",
				phycics_sys_id:"",
				actual_online_time:"",
				charger:"",
				created_time:"",
				last_chg_time:"",
				last_chgr:"",
				learn_concern:"",
				plan_online_time:"",
				proposer:"",
				proposer_department:"",
				req_id:"",
				req_name:"",
				sprint: "",
				sprint_name:"",
				userstory_desc:"",
				prj_id:"",
				prj_name:"",
				prod_id:"",
				product_name:"",  
                AddGroupList:[],//搜索查询
                bfunc:[],//弹出业务窗口      		
            },
            userstory_typeList:[],
            userstory_statusList:[],
            req_idList:[],
            proiList:[],
            GetDetail:"",

            prj_permission:[],
            identity:"",
            //-- 用户故事变更记录 
            tableDAtaTatol:0,
            tableDAtaPageLine:5,
            columns: [
	        	{
                    title: '状态',
                    key: 'userstory_status',
                    align: 'center'
                },
                {
                    title: '变更时间',
                    key: 'change_time',
                    align: 'center',
                    
                },
                {
                    title: '操作者',
                    key: 'operator_name',
                    align: 'center',
                },
                {
                    title: '用户故事',
                    key: 'userstory_id',
                    align: 'center',
                },
            ],
            tableData: [],
            //-- 用户故事变更记录 
            //--业务功能列表开始
            tableData2: [],
            columns2: [
	        	{
                    title: '业务编号',
                    key: 'bfunc_id',
                    align: 'center'
                },
                {
                    title: '业务名称',
                    key: 'bfunc_name',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                style:{color:'#2d8cf0'},
                                //domProps:{href:"###"},
                                on: {
                                    click: () => {
                                        this.openEnclosure(params.index);
                                    }
                                }
                            },
                            params.row.bfunc_name
                        );
                    },
                    
                },
                {
                    title: '创建时间',
                    key: 'create_date',
                    align: 'center',
                },
                {
                    title: '创建人',
                    key: 'create_person',
                    align: 'center',
                },
                {
                    title: '所属逻辑子系统',
                    key: 'logic_sys_name',
                    align: 'center',
                },
            ],
            tableDAtaTatol2:0,
            tableDAtaPageLine2:3,
            isShowEnclosure:false,
            EnclosureData:"",
            //--业务功能列表结束
            //-- tabs start
            TabsCur:"name1",
            //-- tabs end
            //查询搜索开始
            inputLoad:false,
            isPopsAdd:false,
            popsItem:false,
            //查询搜索结束
            //关联业务开始
            columns3: [
                {
                    title: '编号',
                    key: 'bfunc_id',
                    align: 'center'
                },
                {
                    title: '名称',
                    key: 'label',
                    align: 'center',
                    
                },
                {
                    title: '逻辑子系统名称',
                    key: 'logic_sys_name',
                    align: 'center',
                },
                {
                    title: '修改时间',
                    key: 'create_date',
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.editBus(params.index);
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '2px',
                                    marginLeft: '2px',
                                },
                                on: {
                                    click: () => {
                                        this.busView(params.index);
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '2px',
                                    marginLeft: '2px',
                                },
                                on: {
                                    click: () => {
                                        this.deleteBusFn(params.index);
                                    }
                                }
                            }, '删除'),
                            
                        ]);
                    }
                },
            ],
            tableData3: [],
            tableDataCur:false,
            //关联业务结束
            ruleValidate: {
            },
            //删除弹出--start
            delpopIsShow:false,
            delpopIsLoading:false,
            //删除弹出--end
            modal_add_loading: false,
            //业务弹出--start
            buspopIsShow:false,
            buspopIsLoading:false,
            //业务弹出--end
            
        }
    },
    mounted(){
    	Common.UserstorySession(Common,this);

    	this.getPermissionFn(getPermission)
    	let detailID = Common.GETdetail_id(this,Common)
    	let ID = Common.GETID(this,Common)
    	if(detailID && ID){

    		//let _type = this.storyGetConditionFn(storyGetCondition,"userstory_type",ID);
	    	//let _status = this.storyGetConditionFn(storyGetCondition,"userstory_status",ID);
	    	let _proi = this.storyGetConditionFn(storyGetCondition,"proi",ID);

	    	Promise.all([_proi]).then((REP)=>{
	    		this.storyGetDetailFn(storyGetDetail,detailID).then((TASKID)=>{
	    			this.getMissionChangeFn(getMissionChange,TASKID,1,this.tableDAtaPageLine);
	    			this.getMissionChangeFn2(userstoryGetBus,TASKID,1,this.tableDAtaPageLine2);


                    this.viewBusData(userstoryListBusfunc).then(()=>{
                        this.setCacheMenuData();
                    },(error)=>{
                        this.showError(error);
                    })



	    		},(error)=>{
	    			console.log(error)
	    			this.showError(error)
	    		})
	    	},(ERR)=>{
	    		console.log(ERR)
	    		this.showError("没有 userstory_type,userstory_status,proi 其中之一")
	    	})
    	}else{
    		this.$router.push('/product')
    	}

    },
    beforecreated(){
        console.log("用户故事detail--beforecreated-------",this.formValidate)
    },
    created(){
        console.log("用户故事detail--created-------",this.formValidate)
        this.addCheckSerch();//搜索查询
        let _TabsCur = this.$router.history.current.query.TabsCur
        if(_TabsCur){
            this.TabsCur = _TabsCur;
        }
        
    },
    beforeUpdate(){
        console.log("用户故事detail--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("用户故事detail--updated-------",this.formValidate)
    },
    methods: {
        //业务窗口 -start
        buspopCloseFn(B){
            this.buspopIsShow = B;
        },
        
        buspopOpenFn(B,i){
            this.buspopIsShow = B;
        },
        //业务窗口 -end
        //删除窗口 -start
        delpopCloseFn(B){
            this.delpopIsShow = B;
        },
        delpopEnterFn(B){
            setTimeout(()=>{
                this.delpopIsLoading = B;
                this.delpopIsShow = B;
                this.deleteBus(this.tableDataCur)
            },1)
            
        },
        delpopOpenFn(B){
            this.delpopIsShow = B;
        },
        //删除窗口 -end
        //查询搜索开始
        modifyTagData(D){
            Common.ModifyTagData(D,this)
        },
        modifyData(v,i,is){
            //view edit add
        },
        leftData(D){
            this.formValidate.bfunc = D;
        },
        rightData(D){
        },
        selectQueryChange(ITEM){
            console.log(ITEM,"selectQueryChange")
        },
        selectChange(ITEM){
            console.log(ITEM,"selectChange");
            Common.SelectChange(this);
            //console.log(this.isPopsAdd ,this.popsItem ,"---------selectChange");
            if(this.isPopsAdd == "+"){
                this.selfChangeItemAdd(this.popsItem,this.formValidate.AddGroupList[0].groupList,this.tableData3);
            }else if(this.isPopsAdd == "-"){
                this.selfChangeItemRemove(this.popsItem,this.tableData3)
            }
        },
        addCheckSerch(){
            Common.AddCheckSerch(this,"已有业务功能","xxxxx",false,false,"");
        },
        projectGroupFn(URL,params = {},ARR,thatEle){
            Common.ProjectGroupFN(defaultAXIOS,this,URL,params,ARR,thatEle);
        },
        //查询搜索结束
        //相关业务功能列表--start
        Message(msg = "保存完成"){
            this.$Message.config({
                top: 250,
                duration: 3
            });
            this.$Message.success(msg);
        },
        error(MSG = "错误") {
            this.$Message.config({
                top: 250,
                duration: 3
            });
            this.$Message.error(MSG);
        },
        viewBusData(URL){
            let _params = {prj_id:Common.GETprjid(this,Common),us_id:this.formValidate.userstory_id,reqid:this.formValidate.req_id,}
            return defaultAXIOS(URL,_params,{timeout:20000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======product 获取业务功能列表 ***response+++",response,myData,"======>");
                if(myData.status == "success" || myData.status == 200){
                    if(myData.data && myData.data.list && Array.isArray(myData.data.list)){
                        this.tableData3 = myData.data.list;
                        return Promise.resolve(myData.data.list)    
                    }else{
                        return Promise.reject(URL+"错误");
                    }
                }else{
                    return Promise.reject(myData.status);
                }
            }).catch( (error) => {
                console.log(error);
                return Promise.reject(error);
                
            });
            
        },
        submitAdd(){
            this.modal_add_loading = true;
            this.saveBusData(userstoryRelative,this.tableData3).then((res)=>{
                this.modal_add_loading = false;
                this.Message();
                this.removeMenuData(0);

                
                this.viewBusData(userstoryListBusfunc).then(()=>{},(error)=>{
                    this.showError(error)
                })
                

            },(error)=>{
                this.showError(error)
            })
        },
        removeMenuData(N = 0){
            this.formValidate.AddGroupList[N].group = [];
            this.formValidate.AddGroupList[N].groupList = []
            this.formValidate.AddGroupList[N].groupListtemp = [];
            this.formValidate.AddGroupList[N].grouptemp = [];
            document.getElementById("sel"+N).getElementsByClassName("ivu-select-input")[0].temp = false;
            delete document.getElementById("sel"+N).getElementsByClassName("ivu-select-input")[0].temp;
        },
        cacheMenuData(N = 0){
            let cache = {
                group: this.formValidate.AddGroupList[N].group,
                groupList:this.formValidate.AddGroupList[N].groupList,
                groupListtemp:this.formValidate.AddGroupList[N].groupListtemp,
                grouptemp:this.formValidate.AddGroupList[N].grouptemp,
                temp:document.getElementById("sel"+N).getElementsByClassName("ivu-select-input")[0].temp,
            }
            return this.formValidate.AddGroupList[N].group.length ? JSON.stringify(cache) : false
        },
        setCacheMenuData(N = 0){
            if(Common.GetSession("cacheMenu")){
                let cache = JSON.parse(Common.GetSession("cacheMenu"));
                this.formValidate.AddGroupList[N].group = cache.group;
                this.formValidate.AddGroupList[N].groupList = cache.groupList
                this.formValidate.AddGroupList[N].groupListtemp = cache.groupListtemp;
                this.formValidate.AddGroupList[N].grouptemp = cache.grouptemp;
                document.getElementById("sel"+N).getElementsByClassName("ivu-select-input")[0].temp = cache.temp; 
                Common.RemoveSession("cacheMenu");
            }
        },

        saveBusData(URL,list){
            return defaultAXIOS(URL,{list},{timeout:20000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======product 业务列表提交***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    return Promise.resolve(myData.status)                    
                }else{
                    return Promise.reject(myData.status);
                }
            }).catch( (error) => {
                console.log(error);
                return Promise.reject(error);
                
            });
        },

        addBus(){
            let detail_id = this.$router.history.current.query.detail_id
            this.$router.push({path:'/product/business/add/',query:{detail_id}});
        },
        busView(i){
            this.buspopOpenFn(true,i)
            //this.buspopIsShow = true;
        },
        editBus(i){


            let detail_id = this.$router.history.current.query.detail_id;
            let _query = {detail_id,tabNum:i}
            if(this.cacheMenuData(0)){
                _query.menu = this.cacheMenuData(0)
            }
            _query.data = JSON.stringify(this.tableData3[i]);
            this.$router.push({path:'/product/business/edit/',query:_query});
        },
        deleteBus(i){
            let list = this.formValidate.AddGroupList[0].group;
            let Index = list.findIndex(item => item == this.tableData3[i].value )
            list.splice(Index,1);
            this.formValidate.AddGroupList[0].grouptemp = list;
            this.tableData3.splice(i,1);
            this.tableDataCur = false;
        },
        deleteBusFn(i){
            this.delpopOpenFn(true);
            this.tableDataCur = i;
            

        },
        selfChangeItemAdd(value = "",List = [],data = []){
            let Fn1 = (val,arr)=>{
                let _temp = arr.find((item)=>{
                    return val == item.value
                });
                data.push(_temp);
            }
            Fn1(value,List)
        },
        selfChangeItemRemove(val = "",data = []){
            let Index = data.findIndex(item =>  item.value == val  )
            
            if(Index != -1){
                data.splice(Index,1)
            }
            
            
        },
        //相关业务功能列表--end
        //tabs - start
        tabsHandle(name){
            this.TabsCur = name;
        },
        //tabs -end
    	//业务功能列表-start -- 废弃
        
    	enclosureCloseFn(val){
    		this.isShowEnclosure = val;
    	},
    	openEnclosure(i){
    		this.isShowEnclosure = true;
    		this.EnclosureData = JSON.stringify(this.tableData2[i])
    	},
    	getMissionChangeFn2(URL = "",userstory_id = "",page = "",limit = "",data = ""){
            defaultAXIOS(URL,{prj_id:this.formValidate.prj_id,req_id:this.formValidate.req_id,page,per_page:limit,data},{timeout:5000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======product userstoryGetBus***",response,myData,"======>");
                if(myData.status == "success"){
                	this.tableData2 = myData.data;
                	this.tableDAtaTatol2 = myData.total;
                }else{
                	this.showError(URL+"|"+error);
                }
            })
            .catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
    	changeCurrentPage2(i) {
    		let TASKID = this.formValidate.id
            this.getMissionChangeFn2(userstoryGetBus,TASKID,i,this.tableDAtaPageLine2)
        },
        changePageSize2(i) {
        },
        //业务功能列表-end
    	goDevelopmentFn () {
            this.$router.push({path: '/development', query: {board: true,us_name:this.formValidate.id}});
        },
    	changeCurrentPage(i) {
    		let TASKID = this.formValidate.id
            this.getMissionChangeFn(getMissionChange,TASKID,i,this.tableDAtaPageLine)
        },
        changePageSize(i) {
        },
    	getMissionChangeFn(URL = "",userstory_id = "",page = "",limit = "",data = ""){
            defaultAXIOS(URL,{userstory_id,page,limit,data},{timeout:5000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======product getMissionChange***response+++",response,myData,"======>");
                this.tableData = myData.rows;
                this.tableDAtaTatol = myData.total;
            })
            .catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
    	authIs(KEY){
            return Common.auth(this,KEY)
        },
        getPermissionFn(URL){
            Common.GetPermission(defaultAXIOS,this,URL);
        },
    	editItemFn(){
    		//console.log("this.GetDetail",this.GetDetail)
            let _query = {
                fromEdit:true,
                DATA: JSON.stringify(this.GetDetail)
            }
            if(this.TabsCur == 'name2' && this.cacheMenuData(0)){
                _query.menu = this.cacheMenuData(0);
            }
    		this.$router.push({path: '/product/edit', query:_query})
    	},
		showError(ERR){
    		Common.ErrorShow(ERR,this);
    	},
     	storyGetDetailFn(URL = "",detail_id){
            return defaultAXIOS(URL,{detail_id},{timeout:5000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======product detail***response+++",response,myData,"======>");

                if(Object.getOwnPropertyNames(myData).length >2){
                	this.GetDetail = myData;
                	for(let i in myData){
                		if(i == "proi"){
                			//this.formValidate[i] = proiFn(myData[i],i)
                			this.formValidate[i] = Common.ProiFn(myData[i],i)
                		}else if(i == "userstory_type"){
                			//this.formValidate[i] = typeFn(myData[i],i)
                			this.formValidate[i] = Common.TypeFn(myData[i],i)
                		}else if(i == "userstory_status"){
                			//this.formValidate[i] = statusFn(myData[i],i)
                			this.formValidate[i] = Common.StatusFn(myData[i],i)
                		}
                		else{
                			this.formValidate[i] = myData[i]
                		}
                	}
                	return Promise.resolve(myData.id)
                }else{
                	return Promise.reject("没有数据");
                	//this.showError("没有数据");
                }

            })
            .catch( (error) => {
                console.log(error);
                return Promise.reject(error);
                //this.showError(error);
            });
        },
        storyGetConditionFn(URL,condition,prj_id){

        	return Common.GetConditionAll(defaultAXIOS,this,URL,"xxxxx",prj_id,["userstory_type","userstory_status","proi"]);

			// return Common.GetCondition(defaultAXIOS,this,URL,condition,prj_id).then((D)=>{
			// 	return Promise.resolve("resolve")
			// },(E)=>{
			// 	return Promise.reject("reject");
			// });
        },        
    },
    components: {
		Enclosure,
        Trans,
        Delpop,
        Buspop,
	},
    watch:{
        //查询搜索开始
        "formValidate.AddGroupList"(curVal,oldVal){
            let _this = this;
            if(curVal){
                Common.changeArr(this,curVal,Common,userstoryAddBus,{prj_id:Common.GETprjid(this,Common)})//下拉样子
            }
        },
        formValidate: {
            handler(val, oldVal) {
                if(val){
                    Common.inputArr(this,val)//下拉样子
                }
            },
            deep: true
        },
        
        //查询搜索结束
    },
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.tableBox{
    padding-top: 0;
}
.addModule{
	padding-top:30px;
	padding-bottom:30px;
}
.tagBox {
	padding-bottom:30px;

}
h4{
	font-size:14px;
	color:#495060;
	font-weight: normal;
	height:26px;
	line-height: 26px;
}
.editBtn{
    position:absolute;
    right:10px;
    top:6px;
    z-index: 10;
    width: 62px;
}
.editBtn2{
    position:absolute;
    right:80px;
    top:6px;
    z-index: 10;
    width: 62px;
}
.pageBox {
	padding-bottom:20px;
	padding-top:20px;
	overflow: hidden;
}
.ivu-tabs {
    //overflow:inherit;
    //overflow-x: hidden;
}
</style>
