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
                        <Quill />
                        <!-- <Input  v-model="formValidate.stepview" type="textarea" :autosize="{minRows:2,maxRows:5}" placeholder="写点什么..."></Input> -->
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
        
    </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {reqAdd,reqGet,projectListDataNew,selbusinessList } = Common.restUrl;
import Quill from "@/components/quill";
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
                stepview:"",
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
            //附件上传--开始
            actionUrl:"//jsonplaceholder.typicode.com/posts/",
            //附件上传--结束
            
        }
    },
    methods:{
        
        //附件上传-start
        handleSuccess(){

        },
        handleError(){

        },
        //附件上传 -end
        submitAddData(){
            let tempData = {
                bfunc_id : this.formValidate.bfunc_id,
                bfunc_name : this.formValidate.bfunc_name,
                logic_sys_no : this.formValidate.logic_sys_no,
                bfunc_status : this.formValidate.bfunc_status,
                who : this.formValidate.who,
                bfunc_type :this.formValidate.bfunc_type,
                businessDes :this.formValidate.businessDes,
                synergetic_relation : this.formValidate.synergetic_relation,
                stepview : this.formValidate.stepview,
            }
            setTimeout(()=>{
                this.modal_add_loading = false;
                this.cancel();
                //this.$router.push('/demand/business/');
                let _menu = this.$router.history.current.query.menu;
                if(_menu){
                    Common.SetSession("cacheMenu",_menu)
                }
                Common.FromBusGoBack(this);
            },1000)
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
        this.selbusinessListFn(selbusinessList,{prj_id:Common.GETprjid(this,Common)});
        let mydata = this.$router.history.current.query.data;
        if(mydata){
            mydata = JSON.parse(mydata);
            
            this.formValidate.bfunc_id = mydata.bfunc_id;
            this.formValidate.bfunc_name = mydata.bfunc_name;
            this.$refs.logicSelect.setQuery(mydata.logic_sys_name);
            
        }
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