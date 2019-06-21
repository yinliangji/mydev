<template>
	<div class="pageContent" v-show="detailBoxIsHidden">
		<goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :TOP="'7'"  />
		<selectMenu @changeSelect="selectMenuFn" @sendData="getSendData" :Init="isSelectMenuInit"></selectMenu>
       
        <Card class="detailContBox">
            <div class="editBtn3">
                <Button 
                    type="info"
                    @click="outputWord"
                    :disabled="authIs(['icdp_projList_mng','icdp_projList_edit','icdp_projList_view'])" 
                    shape="circle"
                    long
                    size="small"
                    icon="ios-download-outline"
                    v-show="false"
                    >
                    word 导出设计文档
                </Button>
            </div>
            <div class="editBtn2">
                <Button 
                    type="info"
                    @click="outputExecl"
                    :disabled="authIs(['icdp_projList_mng','icdp_projList_edit','icdp_projList_view'])" 
                    shape="circle"
                    long
                    size="small"
                    icon="ios-download-outline"
                    v-show="false"
                    >
                    excel 导出服务接口和错误码
                </Button>
            </div>
            <div class="editBtn">
                <Button 
                    type="warning"
                    @click="editItemFn"
                    :disabled="authIs(['icdp_projList_mng','icdp_projList_edit','icdp_projList_view'])" 
                    shape="circle"
                    long
                    size="small"
                    v-show="(TabsCur == 'name1') ? true : false"
                    :style="isShowEdit?'visibility: visible;':'visibility: hidden;'"
                    >
                    编辑
                </Button>
            </div>
        	<Tabs :value="TabsCur" type="card" :capture-focus="false" @on-click="tabsHandle" >

		        <TabPane label="项目基本信息" name="name1">
		        	<div class="baseInfoBox">
		            	<!-- <h3 class="Title"><span>项目基本信息</span></h3> -->
		            	<div class="tableBox">
		            		<InfoTable :Data="formValidate" />
		            	</div>
		            </div>
		        </TabPane>
		        <TabPane label="成员信息" name="name2">
		        	<div class="baseInfoBox">
		            	<!-- <h3 class="Title"><span>成员信息</span></h3> -->
		            	<div class="tableBox">
		            		<Member :Data="formValidate" :Identity="identity" :PrjPermission="prj_permission"  :Html="HTML" v-if="TabsCur == 'name2' && formValidate.prj_id && prj_permission.length" />
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
                <TabPane label="项目方案" name="name4">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>成员信息</span></h3> -->
                        <div class="tableBox">
                            <PrjScheme :Data="formValidate" />
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

        <GoAgileMode :Data="GO" :Text="GOText" /> 

	</div>
</template>
<script>
import Store from '@/vuex/store'
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectDetail,listModule,getPermission,fileDownList,downFile,fileUpload,fileDelete,projectOutputWord,projectOutputExecl,proByUser} = Common.restUrl;
import InfoTable from './info'
import Member from './member'
import PrjScheme from './prjScheme'




import GoAgileMode from "@/components/goAgileMode";

export default {
	data () {
        return {
            isSelectMenuInit:this.$router.history.current.query.from && this.$router.history.current.query.from == "nav" ? true : false,
        	modaAdd: false,
            modal_add_loading: true,
            detailBoxIsHidden:true,
            technologyORbusiness:true,
            formItem: {
                technologyName:"",
                businessName:"",
            },
        	count: ["技术模块1", "技术模块2", "技术模块3"],
        	count2: ["业务模块1", "业务模块2", "业务模块3"],
        	formValidate: {
                prj_type:"",
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
                create_person:"",

                propose_depart:"",
                aply_id:"",
                itm_status:"",
                subject:"",
                subject_name:"",
                itm_status_name:"",


                itm_prj_eng_nm:"",
                itm_prj_eng_short_num:"",
                itm_type:"",
                itm_assignment_date:"",
                itm_tech_target:"",
                itm_prj_tsk_id:"",
                itm_lob:"",
                itm_wthr_snd_ntc:"",
                itm_id_sn:"",
                // allgroup:"",
                // managerGroup:"",
                // developerGroup:"",
                // testerGroup:"",
            },
            table:[],
            HTML:"",

            prj_permission:[],
            identity:"",
            myPermission:"",

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

            //跳转组件
            GO:false,
            GOText:"",
            //-- tabs start
            TabsCur:"name1",
            //-- tabs end
            isShowEdit:false,
        }
    },
    inject:["reload"],
    components: {
        GoAgileMode,
        InfoTable,
        Member,
        PrjScheme,
    },
    beforecreated(){
        //console.log("项目详情页--beforecreated-------");
    },
    created(){
        //console.log("项目详情页--created-------");
        let _TabsCur = this.$router.history.current.query.TabsCur
        if(_TabsCur){
            this.TabsCur = _TabsCur;
        }
        if(this.$router.history.current.query.from && this.$router.history.current.query.from == "nav"){
            Common.DelectLocalStorage(Common);
            let userName = Common.getStorageAndCookie(this,Common,"username");
            let myID = Common.GETID(this,Common); //Common.GETID(this,Common,"inCookie");
            let exeFn = ()=>{
                let params = {
                    prjSn:Common.GETprjid(this,Common),
                    prj_id:Common.GETprjid(this,Common),
                }
                this.getPermissionFn(getPermission,params).then((RESULT)=>{

                    setTimeout(()=>{
                        EVENT.emit("SIDER1",RESULT);
                    },500);
                    this.getMainListFn(proByUser).then((response)=>{
                        let result = response.find(item=>item == myID)
                        if(!result){
                            result = response[0];
                        }
                        this.tableDataAjaxFn(projectDetail,result).then((res)=>{
                            let queryObj = {id:result,prj_id:res};
                            let _menuType = this.$router.history.current.query.menuType;
                            let _curOpenName = this.$router.history.current.query.curOpenName;
                            let _TabsCur = this.$router.history.current.query.TabsCur;
                            if(_menuType){
                                queryObj.menuType = _menuType;
                            }
                            if(_curOpenName){
                                queryObj.curOpenName = _curOpenName;
                            }
                            if(_TabsCur){
                                queryObj.TabsCur = _TabsCur;
                            }

                            this.$router.push({path: '/agile/detail', query: queryObj});
                            this.reload();
                            //this.isSelectMenuInit = false;
                        },()=>{

                        })
                    },(error)=>{
                        this.GOText = "获取项目失败！";
                        this.GO = true;
                        //this.$router.push({path: '/agile'});
                    })
                   
                },()=>{
                    this.showError("权限不足，不能有任何动作,跳转的列表页！");
                    this.GOText = "权限不足或者获取权限失败！";
                    this.GO = true;
                    //this.$router.push({path: '/agile'});
                })
            }
            EVENT.on("USER",(result)=>{
                if(Common.getStorageAndCookie(this,Common,"username")){
                    console.log('EVENT.on("USER",(result) -- exeFn()',result);
                    exeFn();
                }
            })
            if(userName){
                console.log('直接执行 exeFn()');
                exeFn();
            }else{
                if(window.myNumber){return}
                console.log('直接执行 Store.dispatch');
                Store.dispatch('EVENT_EMIT/incrementAsync', {isEmit: false,})
                setTimeout(()=>{
                    Store.dispatch('EVENT_EMIT/incrementAsync', {isEmit: "true",})
                    window.myNumber = false;
                },1)
                window.myNumber = true;
                
            }
        }

    },
    beforeUpdate(){
        //console.log("项目详情页--beforeUpdate-------")
    },
    updated(){
        //console.log("项目详情页--updated-------")
    },
    mounted(){
        if(this.$router.history.current.query.from && this.$router.history.current.query.from == "nav"){
        }else if(Common.GETID(this,Common)){
            let myID = Common.GETID(this,Common);
    		Common.setStorageAndCookie(Common,"id",myID);
            Common.setStorageAndCookie(Common,"prjId",myID);

    		this.tableDataAjaxFn(projectDetail,myID).then((prj_id)=>{
                this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,myID,prj_id)
                this.tableDAtaPageCurrent = 1;
            },(error)=>{
                console.log(error);
                this.showError(error);
            })
            /*
            let params = {
                prjSn:Common.GETprjid(this,Common),
                prj_id:Common.GETprjid(this,Common),
            }
            this.getPermissionFn(getPermission,params)
            */
    	}else{
            this.GOText = "获取项目失败！";
            this.GO = true;
            //this.$router.push({path: '/agile'})
            
            /*
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
            */
    	}
        
    },
    
    methods: {
    	//tabs - start
        tabsHandle(name){
            this.TabsCur = name;
            let Query = JSON.stringify(this.$route.query);
            Query = JSON.parse(Query);
            Query.TabsCur = name;
            this.$router.push({path: '/agile/detail', query:Query})
        },
        //tabs -end
        getMainListFn(URL = "",page = 1,pageline = 10){
            let username = Common.getCookie("username");
            if(!username){return Promise.reject("没有username")}
            let defaultAXIOSParams = {
                page,
                pageline,
                username,
            }
            return defaultAXIOS(URL,defaultAXIOSParams,{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                //console.log("<======主键列表***response+++",response,myData.data.list,"+++agile***response======>");
                if(myData.status == "success"){
                    if(myData.data && Array.isArray(myData.data) && myData.data.length){
                        let list = [];
                        myData.data.forEach((item)=>{
                            list.push(item+"");
                        })
                        return Promise.resolve(list);    
                    }else{
                        return Promise.reject(myData);
                    }
                }else{
                    this.showError(URL+"_错误");
                    return Promise.reject(myData.status);
                }
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
                return Promise.reject(error);
            });
        },
        getSendData(data){
            console.log(data,"<==========getSendData");
            let params = {
                prjSn:(data && data.prjSn) || (data && data.prj_id) || Common.GETID(this,Common) || "",
                prj_id:(data && data.prjSn) || (data && data.prj_id) || Common.GETID(this,Common) || "",
                prjId:(data && data.prjId) || (data && data.id) || Common.GETprjid(this,Common) || "",
                id:(data && data.prjId) || (data && data.id) || Common.GETprjid(this,Common) || "",
            }
            this.getPermissionFn(getPermission,params).then((res)=>{
            },()=>{
                this.showError(getPermission+"获得权限失败");
            });
        },
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
                //console.log("<======agile***fileDelete+++",response,myData,"======>");

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
                //console.log("<======detail***fileUpload+++",response,myData,"======>");

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
                //console.log("<======detail***fileDown+++",response,myData,"======>");
                
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
        getPermissionFn(URL,params){
            return Common.GetPermission(defaultAXIOS,this,URL,params);
        },
        outputExecl(){
            let params = {
                prj_id:this.formValidate.prj_id,
            }
            let fileName = "项目导出"
            return Common.DownFile(defaultAXIOS,this,projectOutputExecl,params,fileName);
        },
        outputWord(){
            let params = {
                prj_id:this.formValidate.prj_id,
            }
            let fileName = "项目导出.doc"
            return Common.DownFile(defaultAXIOS,this,projectOutputWord,params,fileName);
        },
        editItemFn(){
            let Query = {
                id: Common.GETID(this,Common),
                prj_id:Common.GETprjid(this,Common),
                from:"detail",
                DATA:JSON.stringify(this.formValidate)
            }
            this.$router.push({path: '/agile/edit', query:Query })
        },
        selectMenuFn(N){
            Common.setStorageAndCookie(Common,"id",N);
            for(let I in this.formValidate){
                this.formValidate[I] = "";
            }
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
                //console.log("<======detail***response+++",response,myData,"+++detail***response======>");
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
                if(myData.data && myData.data.prj_type){
                    if(myData.data.prj_type == "2"){
                        this.isShowEdit = true;
                    }else{
                        this.isShowEdit = true;
                    }

                }
                if(myData.data && myData.data.id){
                    
                    Common.setStorageAndCookie(Common,"prj_id",myData.data.prj_id);
                    Common.setStorageAndCookie(Common,"prjSn",myData.data.prj_id);

                    let queryObj = {id: ID,prjId:ID,prj_id:myData.data.prj_id,prjSn:myData.data.prj_id};

                    let _menuType = this.$router.history.current.query.menuType;
                    let _curOpenName = this.$router.history.current.query.curOpenName;
                    let _TabsCur = this.$router.history.current.query.TabsCur;
                    if(_menuType){
                        queryObj.menuType = _menuType;
                    }
                    if(_curOpenName){
                        queryObj.curOpenName = _curOpenName;
                    }
                    if(_TabsCur){
                        queryObj.TabsCur = _TabsCur;
                    }
                    
                    this.$router.push({path: '/agile/detail', query:queryObj });

                    this.actionUrl = fileUpload+"?taskId="+this.formValidate.prj_id+"&type=1&id="+Common.GETID(this,Common)+"&username="+Common.getStorageAndCookie(this,Common,"username")+"&nickname="+Common.getStorageAndCookie(this,Common,"nickname");

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
                //console.log("<======_detail** listModule *_response+++",_response,_myData,"======>");
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
.editBtn2{
    position:absolute;
    right:90px;
    top:10px;
    z-index: 10;
    width: 190px;
}
.editBtn3{
    position:absolute;
    right:290px;
    top:10px;
    z-index: 10;
    width: 140px;
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

  
