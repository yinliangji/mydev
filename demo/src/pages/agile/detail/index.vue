<template>
	<div class="pageContent">
		<goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :TOP="'7'" />
		<selectMenu @changeSelect="selectMenuFn"></selectMenu>
       
        <Card class="detailContBox">
            <div class="editBtn">
                <Button 
                    type="warning"
                    @click="editItemFn"
                    :disabled="authIs(['icdp_projList_mng','icdp_projList_edit','icdp_projList_view'])" 
                    shape="circle"
                    long
                    size="small"
                    >
                    编辑
                </Button>
            </div>
        	<Tabs value="name1" type="card" >

		        <TabPane label="项目基本信息" name="name1">
		        	<div class="baseInfoBox">
		            	<!-- <h3 class="Title"><span>项目基本信息</span></h3> -->
		            	<div class="tableBox">
		            		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
							  <tbody>
								<tr>
								  <th width="11%">项目编号</th>
								  <td width="22%">{{ formValidate.prj_id | FALSEINFO}}</td>
								  <th width="11%">项目名称</th>
								  <td width="22%">{{formValidate.prj_name | FALSEINFO}}</td>
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
                                  <td>{{formValidate.modules | FALSEINFO}}</td>
                                  <th>逻辑子系统</th>
                                  <td>{{formValidate.logic_sys_name | FALSEINFO}}</td>
                                  <th>物理子系统</th>
                                  <td>{{formValidate.physics_sys_name | FALSEINFO}}</td>
                                </tr>

								
								
								<tr>
								  <th>项目描述</th>
								  <td colspan="5" v-html="formValidate.prj_desc?'<pre>'+formValidate.prj_desc+'</pre>':''"></td>
								</tr>
								<tr>
								  <th>项目目标</th>
								  <td colspan="5" v-html="formValidate.prj_goal?'<pre>'+formValidate.prj_goal+'</pre>':''"></td>
								</tr>
							  </tbody>
							</table>
		            	</div>
		            </div>
		        </TabPane>
		        <TabPane label="成员信息" name="name2">
		        	<div class="baseInfoBox">
		            	<!-- <h3 class="Title"><span>成员信息</span></h3> -->
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
                <TabPane label="项目附件" name="name3">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>项目附件</span></h3> -->
                        <div class="tableBox">
                           <!-- -->
                            <div class="tableContBox">

                                <Upload
                                    multiple
                                    :action="actionUrl"
                                    name="file"
                                    :on-success="handleSuccess"
                                    :on-error="handleError"
                                    :show-upload-list="false"
                                    class="UploadBtn"
                                    >
                                    <Button type="ghost" icon="ios-cloud-upload-outline">文件上传</Button>
                                </Upload>
                                <Table border :columns="columns" :data="tableData"  />
                                <div class="pageBox" v-if="false">
                                    <Page 
                                        :current="tableDAtaPageCurrent" 
                                        :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" 
                                        show-elevator 
                                        @on-change="changeCurrentPage" 
                                        @on-page-size-change="changePageSize">
                                    </Page>
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

        <Modal v-model="modaDelete" width="300">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>删除确认</span>
                </p>
                <div style="text-align:center">
                <p>删除无法恢复，是否继续？</p>
                </div>
                    <div slot="footer">
                    <Button color="#1c2438"  :loading="modal_loading"  @click="del">删除</Button>
                    <Button type="primary" @click="cancel">取消</Button>
                </div>
            </Modal> 


	</div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectDetail,listModule,getPermission,fileDownList,downFile,fileUpload,fileDelete} = Common.restUrl;
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
                logic_sys_id:"",
                logic_sys_name:"",
                physics_sys_id:"",
                physics_sys_name:"",
                // allgroup:"",
                // managerGroup:"",
                // developerGroup:"",
                // testerGroup:"",
            },
            table:[],
            HTML:"",

            prj_permission:[],
            identity:"",

            tableDAtaTatol:0,
            tableDAtaPageLine:5,
            tableDAtaPageCurrent:1,
            actionArr:[],
            columns: [
                {
                    title: '文件名',
                    key: 'fileName',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                style:{color:'#2d8cf0'},
                                attrs:{
                                    id:"id"+params.row.fileId,
                                },
                                key:"key"+params.row.fileId,
                                ref:"ref"+params.row.fileId,
                                //domProps:{href:downFile+params.row.url},
                                on: {
                                    click: () => {
                                        this.listFileDown(params)
                                    }
                                }
                            },
                            params.row.fileName
                        );
                    },
                },
                {
                    title: '文件大小',
                    key: 'filesize',
                    align: 'center',
                    
                },
                {
                    title: '创建者',
                    key: 'creater',
                    align: 'center',
                },
                {
                    title: '创建时间',
                    key: 'created_time',
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
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {},
                                on: {
                                    click: () => {
                                        this.tableDel(params.index,params.row.file_path)
                                    }
                                }
                            }, '删除'),
                            
                            
                            
                        ]);
                    }
                },
            ],
            tableData: [],
            actionUrl:"//jsonplaceholder.typicode.com/posts/",
            modaDelete: false,
            modal_loading: false,
            delIndex:false,
            delPath_file:"",
        }
    },
    mounted(){
    	if(Common.GETID(this,Common)){
            let myID = Common.GETID(this,Common);
    		Common.setStorageAndCookie(Common,"id",myID)

    		this.tableDataAjaxFn(projectDetail,myID).then((prj_id)=>{
                this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,myID,prj_id)
                this.tableDAtaPageCurrent = 1;
            },(error)=>{
                console.log(error);
                this.showError(error);
            })

            


    	}else{
    		//if(localStorage.getItem('id')){
            if(Common.GETID(this,Common)){
    			this.tableDataAjaxFn(projectDetail,Common.GETID(this,Common)).then((prj_id)=>{
                    this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,Common.GETID(this,Common),prj_id)
                    this.tableDAtaPageCurrent = 1;
                
                },(error)=>{
                    console.log(error);
                    this.showError(error);
                })

                

                
    		}else{
    			this.$router.push({path: '/agile'})
    		}
    		
    	}

        this.getPermissionFn(getPermission)

        
    	
    },
    
    methods: {
        //下载文件 start
        listFileDown(params){
            let URL = downFile + params.row.url;
            let fileName = params.row.fileName;
            let param = {
                key:params.row.fileId,
                filename:fileName,
            }
            return Common.DownFile(defaultAXIOS,this,URL,param,fileName)
        },
        //下载文件 end
        del () {
            this.modal_loading = true;
            
            defaultAXIOS(fileDelete,{file_path:this.delPath_file,fileId:this.tableData[this.delIndex].fileId,id:Common.GETID(this,Common),taskId:this.formValidate.prj_id},{timeout:2000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======agile***fileDelete+++",response,myData,"======>");

                let STAUUS = myData.status ? myData.status : myData.message
                
                if(STAUUS.indexOf("success") != -1){
                   
                    this.modal_loading = false;
                    this.modaDelete = false;
                    this.$Message.config({
                        top: 250,
                        duration: 3
                    });
                    this.$Message.success('删除完成');
                    this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,Common.GETID(this,Common),this.formValidate.prj_id)
                    this.tableDAtaPageCurrent = 1;
                }else{
                    
                    this.modal_loading = false;
                    this.modaDelete = false;
                    this.showError('删除失败');
                }
                
                

            }).catch( (error) => {
                this.showError(error);
            });
            

           
        },
        cancel(){
            this.modaDelete = false;
            this.delIndex = "";
            this.delPath_file = "";
        },
        handleError(res,file,list){
            console.log("添加失败");
            this.showError("添加失败");
            return Promise.reject("添加失败");
        },
        handleSuccess(res,file,list){

            this.listUpFile(fileUpload,Common.GETID(this,Common),this.formValidate.prj_id).then(()=>{
                this.$Notice.config({
                      top:100,
                      duration: 2
                  });

                this.$Notice.success({title:"添加成功"})
                this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,Common.GETID(this,Common),this.formValidate.prj_id)
                this.tableDAtaPageCurrent = 1;


            },(error)=>{
                console.log(error);
                this.showError(error);
            })
            
            
        },
        listUpFile(URL,id="",prj_id = ""){
            return Promise.resolve("添加成功");

            return defaultAXIOS(URL,{id,taskId:prj_id},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======detail***fileUpload+++",response,myData,"======>");

                let STAUUS = myData.status ? myData.status : myData.message

                if(STAUUS.indexOf("success") != -1){
                    return Promise.resolve(true)
                }else{
                    return Promise.reject(false);
                }
            }).catch( (error) => {
                console.log(error);
                return Promise.reject(false);
                
            });
        },
        changePageSize(i) {

        },
        changeCurrentPage(i) {
            this.fileDownFn(fileDownList,i,this.tableDAtaPageLine,Common.GETID(this,Common),this.formValidate.prj_id)
            this.tableDAtaPageCurrent = i;
        },
        fileDownFn(URL = "",page = 1,pageline = 3,id = "",prj_id = ""){
            defaultAXIOS(URL,{page,pageline,id,taskId:prj_id},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======detail***fileDown+++",response,myData,"======>");
                
                if(myData && myData.files && Array.isArray(myData.files)){
                    this.tableData = myData.files
                    this.tableDAtaTatol = myData.total;
                }else{
                    this.showError(URL+"_错误或者没有数据");
                }

              
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
                
            });
        },
        tableDel(i,path){
            this.modaDelete = true;
            this.delIndex = i;
            this.delPath_file = path;
        },
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
            this.tableDataAjaxFn(projectDetail,N).then((prj_id)=>{
                this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,N,prj_id)
                this.tableDAtaPageCurrent = 1;
            },(error)=>{
                console.log(error);
                this.showError(error);
            })
            
        },
    	showError(ERR){
    		Common.ErrorShow(ERR,this);
    	},
     	tableDataAjaxFn(URL = "",ID = ""){

            return defaultAXIOS(URL+ID,{},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======detail***response+++",response,myData,"+++detail***response======>");
                let _temp = false;
                this.table=[];
                this.HTML = "";

                if(myData.data && myData.data.id){
                	for(var I in this.formValidate){
                        if(I == "logic_sys_id" || I == "logic_sys_name" || I == "physics_sys_id" || I == "physics_sys_name"){
                            if(myData.data[I] && myData.data[I].indexOf("|") != -1){
                                this.formValidate[I] = myData.data[I].replace(/\|/g,"、");
                            }else if(myData.data[I] && myData.data[I].indexOf(",") != -1){
                                this.formValidate[I] = myData.data[I].replace(/\,/g,"、");
                            }else{
                                this.formValidate[I] = myData.data[I]
                            }
                        }else{
                            this.formValidate[I] = myData.data[I]
                        }
                	}
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
                        //this.listModuleFn(listModule,{},_arr); //不要删
                    }else{
                        
                    }
                }

                if(myData.data && myData.data.id){
                    Common.setStorageAndCookie(Common,"prj_id",myData.data.prj_id);
                    this.$router.push({path: '/agile/detail', query: {id: ID,prj_id:myData.data.prj_id}});
                    this.actionUrl = fileUpload+"?taskId="+this.formValidate.prj_id+"&type=1&id="+Common.GETID(this,Common);
                    return Promise.resolve(this.formValidate.prj_id)

                }else{
                    return Promise.reject(false);
                }

            }).catch( (error) => {
                console.log(error);
                this.showError(error);
                return Promise.reject(false);
                
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
                    this.showError(URL + "_没有数据");
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
    width: 62px;
}
.pageBox {
    padding-bottom:20px;
    padding-top:20px;
    overflow: hidden;
}
.UploadBtn{
    margin-bottom:10px;
}
</style>

  
