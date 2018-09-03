<template>
	<div class="pageContent">
		<goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :TOP="'7'" />
		<selectMenu @changeSelect="selectMenuFn"></selectMenu>
       
        <Card class="detailContBox">
            <Button 
                type="warning" 
                 @click="editItemFn"
                :disabled="authIs(['icdp_projList_mng','icdp_projList_edit','icdp_projList_view'])" 
                class="editBtn"
                >
                编辑
            </Button>
        	<Tabs value="name1">

		        <TabPane label="项目基本信息" name="name1">
		        	<div class="baseInfoBox">
		            	<h3 class="Title">项目基本信息</h3>
		            	<div class="tableBox">
		            		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
							  <tbody>
								<tr>
								  <th width="11%">项目编号</th>
								  <td>{{ formValidate.prj_id | FALSEINFO}}</td>
								  <th width="11%">项目名称</th>
								  <td>{{formValidate.prj_name | FALSEINFO}}</td>
								  <th width="11%">所属产品</th>
								  <td>{{formValidate.prod_name | FALSEINFO}}</td>
								</tr>
								<tr>
								  <th>项目创建时间</th>
								  <td>{{formValidate.settle_time | FALSEINFO}}</td>
								  <th>开始时间</th>
								  <td>{{formValidate.start_time | FALSEINFO}}</td>
								  <th>结束时间</th>
								  <td>{{formValidate.end_time | FALSEINFO}}</td>
								</tr>

								<tr>
								  <th>所属模块</th>
								  <td colspan="5">{{formValidate.modules | FALSEINFO}}</td>
								</tr>
								
								<tr>
								  <th>项目描述</th>
								  <td colspan="5" v-html="formValidate.prj_desc?'<pre>'+formValidate.prj_desc+'</pre>':'没有数据'"></td>
								</tr>
								<tr>
								  <th>项目目标</th>
								  <td colspan="5" v-html="formValidate.prj_goal?'<pre>'+formValidate.prj_goal+'</pre>':'没有数据'"></td>
								</tr>
							  </tbody>
							</table>
		            	</div>
		            </div>
		        </TabPane>
		        <TabPane label="成员信息" name="name2">
		        	<div class="baseInfoBox">
		            	<h3 class="Title">成员信息</h3>
		            	<div class="tableBox">
		            		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
								<tbody v-html="HTML">
									<!-- <tr v-for="(item,index) in formValidate.person" :key="index">
										<th width="11%">{{item.title}}</th>
										<td>
											<span v-for="(item2,index2) in item.member" :key="index2">
												{{item2.nick_name}}
											</span>
										</td>
									</tr> --> 
									
									<!-- <tr>
										<th width="11%">项目经理</th>
										<td>{{formValidate.managerGroup | FALSEINFO}}</td>
										<th width="11%">开发人员</th>
										<td>{{formValidate.developerGroup | FALSEINFO}}</td>
										<th width="11%">测试人员</th>
										<td>{{formValidate.testerGroup | FALSEINFO}}</td>

									</tr>
									<tr>
										<th>总体组</th>
										<td>{{formValidate.allgroup | FALSEINFO}}</td>
										<th>&nbsp;</th>
										<td>&nbsp;</td>
										<th>&nbsp;</th>
										<td>&nbsp;</td>
									</tr> -->
								</tbody>

							</table>
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

		
		<Modal ref="addPop" v-model="modaAdd" title="添加模块" @on-ok="submitAdd"  ok-text="提交" :loading="modal_add_loading" visible="true">
            <Form :model="formItem" :label-width="80" >
                <FormItem label="模块名称" v-if="technologyORbusiness">
                    <Input v-model="formItem.technologyName" placeholder="请输入项目名称"></Input>
                </FormItem>
                <FormItem label="模块名称" v-else>
                    <Input v-model="formItem.businessName" placeholder="请输入项目名称"></Input>
                </FormItem>
               
            </Form>
        </Modal> 


	</div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectDetail,listModule,getPermission} = Common.restUrl;
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
        		prj_id:"",
                prj_name:"",
                settle_time:"",
                start_time: "",
                end_time: "",
                prj_desc: "",
                prj_goal:"",
                modules:"",
                prod_name:"",
                person:[],
                // allgroup:"",
                // managerGroup:"",
                // developerGroup:"",
                // testerGroup:"",
            },
            table:[],
            HTML:"",

            prj_permission:[],
            identity:"",
        }
    },
    mounted(){

    	if(this.$router.history.current.query.id){
    		localStorage.setItem('id', this.$router.history.current.query.id);
    		this.tableDataAjaxFn(projectDetail,this.$router.history.current.query.id);
    	}else{
    		if(localStorage.getItem('id')){
    			this.tableDataAjaxFn(projectDetail,Common.GETID(this,Common))
    		}else{
    			this.$router.push({path: '/agile'})
    		}
    		
    	}

        this.getPermissionFn(getPermission)

        
    	
    },
    
    methods: {
        authIs(KEY){
            return Common.auth(this,KEY)
        },
        getPermissionFn(URL){
            Common.GetPermission(defaultAXIOS,this,URL);
        },
        editItemFn(){
            this.$router.push({path: '/agile/edit', query: {id: Common.GETID(this,Common),prj_id:Common.GETprjid(this,Common)}})
        },
        selectMenuFn(N){
            Common.setStorageAndCookie(Common,"id",N)
            this.tableDataAjaxFn(projectDetail,N)
        },
    	showError(ERR){
    		//alert(ERR)
    		Common.ErrorShow(ERR,this);
    	},
     	tableDataAjaxFn(URL = "",ID = ""){
            defaultAXIOS(URL+ID,{},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======detail***response+++",response,myData,"+++detail***response======>");
                let _temp = false;
                this.table=[];
                this.HTML = "";
                if(myData.data && myData.data.id){
                	for(var I in this.formValidate){
                		this.formValidate[I] = myData.data[I];
                        /*
                        _temp = myData.data[I]+"";
                        if(_temp.indexOf("|") != -1){
                        	this.formValidate[I] = myData.data[I].replace("|","、").replace("|","").replace(/、?$/g,"");
                        }else{
                           this.formValidate[I] = myData.data[I];
                        }
                        */
                	}
                    Common.setStorageAndCookie(Common,"prj_id",myData.data.prj_id);

                    this.$router.push({path: '/agile/detail', query: {id: ID,prj_id:myData.data.prj_id}})
                }

                if(myData.person && myData.person.length){
                	
                	this.formValidate.person = myData.person;
                	for(var J=0;J<this.formValidate.person.length;J++){
                		for(var K=0;K<this.formValidate.person[J].member.length-1;K++){
                			this.formValidate.person[J].member[K].nick_name = this.formValidate.person[J].member[K].nick_name+"、";
                			
                		}
                	}
                    this.HTML = Common.toTable(this.formValidate.person,this.table,3,11,true);
                    let _arr = this.formValidate.modules.split("|");
                    Common.ArrDelVal(_arr);
                    if(_arr.length){
                        this.listModuleFn(listModule,{},_arr);
                    }else{
                        
                    }
                }

            }).catch( (error) => {
                console.log(error);
                this.showError(error);
                
            });
        },
        listModuleFn(URL,params = {},_arr){
            defaultAXIOS(URL,params,{timeout:20000,method:'get'}).then((_response) => {
                let _myData = _response.data;
                console.log("<======_detail** listModule *_response+++",_response,_myData,"======>");
                let _myArrFn = (arr,obj)=>{
                    if(arr.length){
                        for(let a=0;a<arr.length;a++){
                            if(arr[a] == obj.module_id){
                                return obj.module_name
                            }
                        }
                    }else{
                        return false;
                    }
                }
                if (_myData && _myData.res && _myData.res.length) {
                    let _myArr = [];
                    let _resTemp = {};
                    for(let k=0;k<_myData.res.length;k++){
                        if(_myArrFn(_arr,_myData.res[k])){
                            _myArr.push("【"+_myArrFn(_arr,_myData.res[k])+"】")
                        }
                    }
                    this.formValidate.modules = _myArr.join("、")
                  
                } else {
                    that.showError(listModule + "_没有数据");
                }
            }).catch( (_error) => {
                console.log(_error);
                this.showError(_error);
            });
        },
     	addItem(){
            this.modaAdd = true;
            this.technologyORbusiness = true;
        },
        addItem2(){
            this.modaAdd = true;
            this.technologyORbusiness = false;
        },
        formItemReset(){
            this.$nextTick(() => {
                this.formItem.name = "";
                this.formItem.technologyName = "";
                
            });
        },
        submitAdd () {
            setTimeout(() => {
            	this.technologyORbusiness ? this.count.push(this.formItem.technologyName) : this.count2.push(this.formItem.businessName)
                this.modaAdd = false;
                this.$Message.info('成功');
                this.formItemReset();
            },1000)
            
        },
        handleAdd () {
            if (this.count.length) {
                this.count.push(this.count[this.count.length - 1] + 1);
            } else {
                this.count.push(0);
            }
        },
        handleClose (event, name) {
            const index = this.count.indexOf(name);
            this.count.splice(index, 1);
        },
        handleClose2 (event, name) {
            const index = this.count2.indexOf(name);
            this.count2.splice(index, 1);
        }
    }
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
.detailContBox{
    position:relative;
}
.editBtn{
    position:absolute;
    right:20px;
    top:10px;
    z-index: 10;
}
</style>
<style lang="less" >
.baseInfoTable{
    td,th{
    box-sizing: border-box;
    border: 1px solid #e9eaec;
    height: 48px;
    vertical-align:middle;
    }
    td{
        padding-left:0.5em;
        padding-top:0.5em;
        padding-bottom:0.5em;
        color:#495060;
        font-size:12px;
        pre{
            line-height:1.5em;
            color:#495060;
            font-size:12px;

            font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
        }
        em{
            font-style: normal;
            display: inline-block;
            padding-top:0.25em;
            padding-bottom:0.25em;
        }
    }
    th{
        
        font-size:14px;
        font-weight: normal;
        background-color: #2db7f5;
        color: #fff;
    }

}
  
</style>