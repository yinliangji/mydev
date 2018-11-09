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

                    <FormItem v-if="!step2">
                        <Button type="primary" :loading="modal_next_loading" @click="next" :disabled="nextBtn">
                            <span v-if="!modal_next_loading">保存并且下一步</span>
                            <span v-else>Loading...</span>
                        </Button>
                        
                    </FormItem>
                    <FormItem label="界面流程步骤" v-if="step2">
                        <Quill @quillOutput="quillOutputFn" :data="false" />
                       
                    </FormItem>
                    <FormItem label="协同相关" v-if="step2">
                        <Input  v-model="formValidate.synergetic_relation" type="textarea" :autosize="{minRows:2,maxRows:5}" placeholder="写点什么..."></Input>
                    </FormItem>


                    <FormItem label="上传附件" v-if="step2">
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
                    <FormItem v-if="step2">
                        <Button type="primary" :loading="modal_add_loading" @click="submitAdd">
                            <span v-if="!modal_add_loading">提交</span>
                            <span v-else>Loading...</span>
                        </Button>
                        <Button type="ghost" style="margin-left: 8px" @click="goBack">返回</Button>
                    </FormItem>
                </Form>
                
            </div>
        </Card>
        
    </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {reqAdd,reqGet,projectListDataNew,selbusinessList,userstoryadd_bfunc1,userstoryadd_bfunc2,userstoryUploadFile } = Common.restUrl;
import Quill from "@/components/quill";
export default {
    data(){
        return {
            modal_next_loading:false,
            step2:false,

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
                    { required: true, message: '请选择逻辑子系统', trigger: 'change' }
                ],
            },
            typeList:[],
            logicList:[],
            nextBtn:true,
            //附件上传--开始
            actionUrl:false,//jsonplaceholder.typicode.com/posts/,
            //附件上传--结束
            //富文本框start
            quillHTML:"",
            //富文本框end
            
        }
    },
    methods:{
        //富文本框start
        quillOutputFn(html,text){
            this.formValidate.operation_step = html+"";
        },
        //富文本框end
        next(){
            this.$refs.formValidate.validate((val)=>{
                if(val){
                   this.nextStep();
                }
            })
            // setTimeout(()=>{
            //     this.modal_next_loading = false;
            //     this.step2 = true;
            // },1000)
        },
        nextStep(){
            this.modal_next_loading = true;
            let _us_id = this.$router.history.current.query.us_id ? this.$router.history.current.query.us_id : "";
            let _prj_id = Common.GETprjid(this,Common);
            let _req_id = this.$router.history.current.query.req_id ? this.$router.history.current.query.req_id : "";
            let _nickname = Common.getStorageAndCookie(this,Common,"nickname")
            let _username = Common.getStorageAndCookie(this,Common,"username")
            let tempData = {
                nickname:_nickname,
                username:_username,
                req_id:_req_id,
                prj_id:_prj_id,
                us_id:_us_id,
                bfunc_name:this.formValidate.bfunc_name,
                bfunc_type:this.formValidate.bfunc_type,
                logic_sys_no:this.formValidate.logic_sys_no,
                bfunc_desc:this.formValidate.businessDes,
            };
            defaultAXIOS(userstoryadd_bfunc1,tempData,{timeout:5000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======业务新建第一步***response+++",response,myData,"======>");
                if(myData.status == "success" && myData.data){
                    this.modal_next_loading = false;
                    this.step2 = true;
                    this.formValidate.bfunc_id = myData.data.bfunc_id;
                    this.formValidate.value = myData.data.value;
                    this.formValidate.version = myData.data.version;

                    this.actionUrl = userstoryUploadFile+"?type=6&req_id="+_req_id+"&version="+myData.data.version+"&bfunc_id="+myData.data.bfunc_id+"&id="+Common.GETID(this,Common)

                }else{
                   this.modal_next_loading = false;
                   this.showError(userstoryadd_bfunc1+"错误");
                }
                
            }).catch( (error) => {
                console.log(error);
                this.modal_next_loading = false;
                this.showError(error);
            });
            
        },
        //附件上传-start
        Message(msg = "保存完成"){
            Common.CommonMessage(this,msg)
        },
        error(MSG = "错误") {
            Common.CommonError(this,MSG)
        },
        handleSuccess(res,file,list){
            console.log("handleSuccess",res,file,list)
            this.Message("上传成功")
        },
        handleError(res,file,list){
            console.log("上传失败","handleError",res,file,list);
            this.error("上传失败")
        },
        //附件上传 -end
        submitAddData(){
            let _us_id = this.$router.history.current.query.us_id ? this.$router.history.current.query.us_id : "";
            let _req_id = this.$router.history.current.query.req_id ? this.$router.history.current.query.req_id : "";
            let _prj_id = Common.GETprjid(this,Common);
            let _nickname = Common.getStorageAndCookie(this,Common,"nickname")
            let _username = Common.getStorageAndCookie(this,Common,"username")
            let tempData = {
                nickname:_nickname,
                username:_username,
                req_id:_req_id,
                prj_id:_prj_id,
                value:this.formValidate.value,
                bfunc_id:this.formValidate.bfunc_id,
                version:this.formValidate.version,
                us_id:_us_id,
                bfunc_name : this.formValidate.bfunc_name,
                bfunc_type :this.formValidate.bfunc_type,
                logic_sys_no : this.formValidate.logic_sys_no,
                bfunc_desc :this.formValidate.businessDes,
                operation_step:this.formValidate.operation_step,
                synergetic_relation : this.formValidate.synergetic_relation,
            }
            defaultAXIOS(userstoryadd_bfunc2,tempData,{timeout:5000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======业务新建第一步***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    this.modal_add_loading = false;
                    Common.FromBusGoBack(this);
                    
                }else{
                   this.modal_add_loading = false;
                   this.showError(userstoryadd_bfunc2+"错误");
                }
                
            }).catch( (error) => {
                console.log(error);
                this.modal_add_loading = false;
                this.showError(error);
            });


            // setTimeout(()=>{
            //     this.modal_add_loading = false;
            //     this.cancel();
            //     this.$router.push('/demand/business/');
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
        showError(ERR){
            Common.ErrorShow(ERR,this);
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
            this.nextBtn = false;
        },(error)=>{
            this.showError("typeList和logicList 出错");
        })
    },
    beforecreated(){
        console.log("新增业务功能--beforecreated-------",this.formValidate)
    },
    created(){
        console.log("新增业务功能--created-------",this.formValidate)
    },
    beforeUpdate(){
        console.log("新增业务功能--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("新增业务功能--updated-------",this.formValidate)
    },
    components: {
        Quill,
    },
}
</script>
<style lang="less" scoped>

</style>