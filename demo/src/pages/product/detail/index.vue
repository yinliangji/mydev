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
        	<Tabs value="name1" type="card" :capture-focus="false">
		        <TabPane label="用户故事基本信息" name="name1">
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
								  <th>故事编号</th>
								  <td >{{ formValidate.userstory_id | FALSEINFO}}</td>
								  <th>故事描述</th>
								  <td colspan="3" v-html="formValidate.userstory_desc?'<pre>'+formValidate.userstory_desc+'</pre>':'没有数据'"></td>
								  
								</tr>
								
							  </tbody>
							</table>
		            	</div>
		            </div>
		        </TabPane>
		        <TabPane label="计划效率相关" name="name2">
		        	<div class="baseInfoBox">
		            	<!-- <h3 class="Title"><span>计划故事相关</span></h3> -->
		            	<div class="tableBox">
		            		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
							  <tbody>
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
								  <th>&nbsp;</th>
								  <td>&nbsp;</td>
								</tr>
								
							  </tbody>
							</table>
		            	</div>
		            </div>
		        </TabPane>
		        <TabPane label="需求项相关" name="name3">
		        	<div class="baseInfoBox">
		            	<h3 class="Title"><span>需求项信息</span></h3>
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
		            	<h3 class="Title"><span>业务功能列表</span></h3>
		            	<div class="tableContBox">
		            		<Table border :columns="columns2" :data="tableData2"  />
							<div class="pageBox" v-if="tableData2.length">
					    		<Page :total="tableDAtaTatol2/tableDAtaPageLine2 > 1 ? (tableDAtaTatol2%tableDAtaPageLine2 ? parseInt(tableDAtaTatol2/tableDAtaPageLine2)+1 : tableDAtaTatol2/tableDAtaPageLine2)*10 : 1" show-elevator @on-change="changeCurrentPage2" @on-page-size-change="changePageSize2"></Page>
					    		<p>总共{{tableDAtaTatol2}}条记录</p>
					    	</div>
		            	</div>
		            </div>
		        </TabPane>
		        <TabPane label="用户故事变更记录" name="name4">
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
		


	</div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {storyGetDetail,storyGetCondition,getPermission,getMissionChange,userstoryGetBus} = Common.restUrl;
import Enclosure from "./enclosure";
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
        }
    },
    mounted(){
    	Common.UserstorySession(Common);

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
    methods: {
    	//业务功能列表-start
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
    		this.$router.push({path: '/product/edit', query: {fromEdit:true,DATA: JSON.stringify(this.GetDetail)}})
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
</style>
