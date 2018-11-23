<template>
	<div class="pageContent">
        <goAgile :go="'/demand'" :text="'返回项目需求项'" :TOP="'5'" />
       <Card>
            <div class="productAddBox">
                
                <Form :model="formValidate" :label-width="120" :rules="ruleValidate" ref="formValidate"   >
                    <h3 class="Title"><span>新增业务功能</span></h3>
                    <FormItem label="业务功能名称" prop="bfunc_name">
                        
                        <Input  v-model="formValidate.bfunc_name" placeholder="请输入业务功能名称"></Input>
                    </FormItem>
                    <FormItem label="业务类型" >
                        
                        <Select  v-model="formValidate.bfunc_type" :clearable="isClearable" :disabled="isDisabled" ><!-- //10-24修改 -->
                            <Option v-for="(item,index) in typeList" :value="item.bfunc_type" :key="index">{{ item.bfunc_type_name }}</Option>
                        </Select>
                    </FormItem>
                    <Row>
                        <Col span="20">
                            <FormItem label="所属逻辑子系统" prop="logic_sys_no">
                                <input id="demo" type="hidden" /><!-- 修改10-20 -->
                                
                                <Select ref="logicSelect"  v-model="formValidate.logic_sys_no" clearable filterable id="logicSelect"><!-- 修改10-20 -->
                                    <Option v-for="(item,index) in logicList" :value="item.logic_sys_no" :key="index">{{ item.logic_sys_name }}</Option>
                                </Select>
                                
                            </FormItem>
                        </Col>
                        
                        <Col span="4">
                            &nbsp;&nbsp;<Button  type="primary" @click="linkToNew">ITM新建逻辑子系统</Button>
                        </Col>
                    </Row>
                    
                    <FormItem label="业务功能描述">
                        
                        <Input  v-model="formValidate.businessDes" type="textarea" :autosize="{minRows:2,maxRows:5}" placeholder="写点什么..."></Input>
                    </FormItem>

                   
                    <FormItem label="界面流程步骤" >
                        <Quill @quillOutput="quillOutputFn" :data="quillInput" />
                    </FormItem>
                    <FormItem label="协同相关" >
                        <Input  v-model="formValidate.synergetic_relation" type="textarea" :autosize="{minRows:2,maxRows:5}" placeholder="写点什么..."></Input>
                    </FormItem>


                    <FormItem label="上传附件" >
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
                    </FormItem>
                    <FormItem label="附件列表" >
                        <Table border :columns="columns" :data="tableData"  />
                    </FormItem>
                    
                    <FormItem >
                        <Button type="primary" :loading="modal_add_loading" @click="submitAdd">
                            <span v-if="!modal_add_loading">提交</span>
                            <span v-else>Loading...</span>
                        </Button>
                        <Button type="ghost" style="margin-left: 8px" @click="goBack">返回</Button>
                    </FormItem>
                </Form>
                
            </div>
        </Card>
        <Delpop
            @delpopClose = "delpopCloseFn"
            @delpopEnter = "delpopEnterFn" 
            :isShow = "delpopIsShow"
            :isLoading = "delpopIsLoading"
        />
    </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {reqAdd,reqGet,projectListDataNew,selbusinessList,userstoryedit_bfunc2,userstoryUploadFile,userstoryFilesList,userstoryDeleteFile } = Common.restUrl;
import Quill from "@/components/quill";
import Delpop from '@/components/delectAlert'
export default {
    data(){
        return {
            isFilterable:true,
            isClearable:true,
            isDisabled:false,
            isView:false,
            isFilterable:true,
            busLoading:true,
            isShowChild:false,
            modal_add_loading: false,
            formValidate:{
                bfunc_id:"",
                bfunc_name:"",
                logic_sys_no:"",
                businessDes:"",
                bfunc_type:"",
                bfunc_status:"",
                who:"",
                synergetic_relation:"",
                operation_step:"",//富文本框
                value:"",//
                version:"",//

            },
            ruleValidate:{
                bfunc_name:[
                    { required: true, message: '请填写内容，不能为空', trigger: 'blur' }
                ],
                bfunc_type:[
                    { required: true, message: '请选择业务类型', trigger: 'change' }
                ],
                bfunc_status:[
                    { required: true, message: '请选择状态', trigger: 'change' }
                ],
                logic_sys_no:[
                    { required: false, message: '请选择逻辑子系统', trigger: 'change' }
                ],
            },
            typeList:[],
            logicList:[],
            //附件上传--开始
            actionUrl:false,//jsonplaceholder.typicode.com/posts/,
            //附件上传--结束
            //富文本框start
            quillInput:false,
            //富文本框end
            //附件列表start
            
            tableData: [
            ],
            columns: [
                {
                    title: '版本号',
                    key: 'fileId',
                    align: 'center'
                },
                {
                    title: '附件名称',
                    key: 'fileName',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                style:{color:'#2d8cf0'},
                                domProps:{href:params.row.url,target:"_blank"},
                                on: {
                                    click: () => {
                                        
                                    }
                                }
                            },
                            params.row.fileName
                        );
                    },
                },
                {
                    title: '发布人',
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
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                           
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                
                                on: {
                                    click: () => {
                                        this.deleteFile(params.index)
                                    }
                                }
                            }, '删除'),
                            
                        ]);
                    }
                }
            ],
            tableDAtaTatol:0,
            tableDAtaPageLine:3,

            //附件列表end
            ////删除弹出--start
            delpopIsShow:false,
            delpopIsLoading:false,
            tableDataCur:false,
            //删除弹出--end
            
        }
    },
    methods:{
        //删除窗口 -start
        delpopCloseFn(B){
            this.delpopIsShow = B;
            setTimeout(()=>{
                console.log(B,this.delpopIsShow)
            },1000)
            
        },
        delpopEnterFn(B){

            let mydata = this.$router.history.current.query.data ?JSON.parse(this.$router.history.current.query.data) : {};
            let _params = {
                version:mydata.version,
                bfunc_id:mydata.bfunc_id,
                file_path:this.tableData[this.tableDataCur].file_path,
            }
            let URL = userstoryDeleteFile;
            return defaultAXIOS(URL,_params,{timeout:60000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======【 业务编辑文件删除 get】***response+++",response,myData,"====>");
                if(myData.status == "success"){
                    this.delpopIsLoading = B;
                    this.delpopIsShow = B;
                    this.getFilesList(userstoryFilesList);
                    return Promise.resolve(true);
                }else{
                    this.delpopIsLoading = B;
                    this.delpopIsShow = B;
                    this.showError(URL+"错误");
                    return Promise.reject(myData.status);
                }
            })
            .catch( (error) => {
                console.log(error);
                this.delpopIsLoading = B;
                this.delpopIsShow = B;
                this.showError(error);
                return Promise.reject(error);
            }); 
            
            // setTimeout(()=>{
            //     this.delpopIsLoading = B;
            //     this.delpopIsShow = B;
            //     this.deleteBus(this.tableDataCur)
            // },1)
            
        },
        delpopOpenFn(B){
            this.delpopIsShow = B;
        },
        //删除窗口 -end
        //附件列表start
        getFilesList(URL){
            let mydata = this.$router.history.current.query.data ?JSON.parse(this.$router.history.current.query.data) : {};
            let _params = {
                version:mydata.version,
                bfunc_id:mydata.bfunc_id,
            }
            Common.GetFilesList(this,defaultAXIOS,URL,_params) 
        },
        deleteFile(i){
            this.delpopOpenFn(true);
            this.tableDataCur = i;
        },
        //附件列表end
        userstoryEdit_bfuncGet(URL,params={}){
            let mydata = this.$router.history.current.query.data ? JSON.parse(this.$router.history.current.query.data) : {};
            let _params = {
                prj_id:Common.GETprjid(this,Common),
                value:mydata.value,
                us_id:mydata.us_id
            }
            return defaultAXIOS(URL,_params,{timeout:60000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======【 业务编辑获取 get】***response+++",response,myData,"====>");
                if(myData.status == "success" && myData.data){
                    this.formValidate.bfunc_id = myData.data.bfunc_id+"";
                    this.formValidate.bfunc_name = myData.data.bfunc_name+"";
                    this.formValidate.logic_sys_no = myData.data.logic_sys_no+"";
                    this.formValidate.businessDes = myData.data.bfunc_desc+"";
                    this.formValidate.bfunc_type = myData.data.bfunc_type+"";
                    this.formValidate.bfunc_status = myData.data.bfunc_status+"";
                    this.formValidate.who = myData.data.who+"";
                    this.formValidate.synergetic_relation = myData.data.synergetic_relation+"";
                    this.formValidate.operation_step = myData.data.operation_step+"";//富文本框
                    this.quillInput = myData.data.operation_step+"";//富文本框
                    return Promise.resolve(true);
                }else{
                    return Promise.reject(myData.status);
                }
            })
            .catch( (error) => {
                console.log(error);
                this.showError(error);
                return Promise.reject(error);
            });  
        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
        //富文本框start
        quillOutputFn(html,text){
            this.formValidate.operation_step = html+"";
        },
        //富文本框end
        
        //附件上传-start
        Message(msg = "保存完成"){
            Common.CommonMessage(this,msg)
        },
        error(MSG = "错误") {
            Common.CommonError(this,MSG)
        },
        handleSuccess(res,file,list){
            console.log("handleSuccess",res,file,list)
            this.Message("上传成功");
            this.getFilesList(userstoryFilesList)
        },
        handleError(res,file,list){
            console.log("上传失败","handleError",res,file,list);
            this.error("上传失败")
        },
        //附件上传 -end
        submitAddData(){
            let mydata = this.$router.history.current.query.data ? JSON.parse(this.$router.history.current.query.data) : {};
            let _nickname = Common.getStorageAndCookie(this,Common,"nickname")
            let _username = Common.getStorageAndCookie(this,Common,"username")
            let tempData = {
                nickname:_nickname,
                username:_username,
                value:mydata.value,
                us_id:mydata.us_id,
                bfunc_name : this.formValidate.bfunc_name,
                bfunc_type :this.formValidate.bfunc_type,
                logic_sys_no : this.formValidate.logic_sys_no,
                bfunc_desc :this.formValidate.businessDes,
                operation_step:this.formValidate.operation_step,
                synergetic_relation : this.formValidate.synergetic_relation,
            }
            //
            defaultAXIOS(userstoryedit_bfunc2,tempData,{timeout:5000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======demand reqAdd***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    this.modal_add_loading = false;
                    this.modal_add_loading = false;
                    this.cancel();
                    //this.$router.push('/demand/business/');
                    let _menu = this.$router.history.current.query.menu;
                    if(_menu){
                        Common.SetSession("cacheMenu",_menu)
                    }
                    Common.FromBusGoBack(this);
                    //
                    
                }else{
                    this.modal_add_loading = false;
                    this.showError(userstoryedit_bfunc2+"提交错误");
                }
                
            }).catch( (error) => {
                console.log(error);
                this.modal_add_loading = false;
                this.showError(error);
            });
            //
            // setTimeout(()=>{
            //     this.modal_add_loading = false;
            //     this.cancel();
            //     //this.$router.push('/demand/business/');
            //     let _menu = this.$router.history.current.query.menu;
            //     if(_menu){
            //         Common.SetSession("cacheMenu",_menu)
            //     }
            //     Common.FromBusGoBack(this);
            // },1000)
        },
        submitAdd(){
            this.$refs.formValidate.validate((val)=>{
                if(val){
                    this.submitAddData();
                    this.modal_add_loading = true;
                }
            })
        },
        cancel(){
            Common.BusResetFields(this);
        },
        goBack(){
            Common.FromBusGoBack(this);
        },
       
        linkToNew(){
            //this.creatResetFields();//修改10-20
        },
        selbusinessListFn(URL,params = {}){
            return Common.SelbusinessList(this,defaultAXIOS,URL,params);
        },
    },
    mounted(){
        this.selbusinessListFn(selbusinessList,{prj_id:Common.GETprjid(this,Common)}).then(()=>{
            this.userstoryEdit_bfuncGet(userstoryedit_bfunc2);
            this.getFilesList(userstoryFilesList)
        },(error)=>{});
        
    },
    beforecreated(){
        console.log("新增业务功能--beforecreated-------",this.formValidate)
    },
    created(){
        console.log("新增业务功能--created-------",this.formValidate);
        let mydata = this.$router.history.current.query.data ? JSON.parse(this.$router.history.current.query.data) : {};
        this.actionUrl = userstoryUploadFile+"?type=6&req_id="+mydata.req_id+"&version="+mydata.version+"&bfunc_id="+mydata.bfunc_id+"&id="+Common.GETID(this,Common)
    },
    beforeUpdate(){
        console.log("新增业务功能--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("新增业务功能--updated-------",this.formValidate)
    },
    components: {
        Quill,
        Delpop,
    },
}
</script>
<style lang="less" scoped>

</style>