<template>
    <Modal ref="addPop" v-model="modaAdd" :title="ADDorEDIT?'添加':'编辑'" @on-ok="submitAdd" @on-cancel="cancel" ok-text="提交" :loading="modal_add_loading" width="600px">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" style="width:95%">

            <FormItem label="用户故事名称" prop="userstory_name">
                <Input v-model="formValidate.userstory_name" placeholder="用户故事名称"></Input>
            </FormItem>

            <FormItem label="故事类型" prop="userstory_type">
                <Select clearable v-model="formValidate.userstory_type" placeholder="请选择故事类型">
                    <Option v-for="(item,index) in userstory_typeList" :key="index" :value="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>

            <Row>
                <Col span="10">
                   <FormItem label="优先级" prop="proi">
                        <RadioGroup v-model="formValidate.proi">
                            <Radio v-for="(item,index) in proiList" :key="index" :label="item.value" >{{item.label}}</Radio>
                        </RadioGroup>
                    </FormItem>
                </Col>
                <Col span="14">
                     <FormItem label="责任人"  prop="charger">
                        <Select filterable clearable v-model="formValidate.charger" placeholder="请选择责任人">
                            <Option v-for="(item,index) in chargerList" :key="index" :value="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row> 
            <FormItem label="状态" prop="userstory_status" v-show="false">
                <RadioGroup v-model="formValidate.userstory_status">
                    <Radio :disabled="item.value == formValidate.userstory_status ? false : true" v-for="(item,index) in userstory_statusList" :key="index" :label="item.value">{{item.label}}</Radio>
                </RadioGroup>
            </FormItem> 
            <FormItem label="所属迭代" prop="sprint">
                <Select clearable filterable v-model="formValidate.sprint" placeholder="请选所属迭代">
                    <Option v-for="(item , index) in sprintList" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
                <ToolTip content="计划在哪个迭代周期内完成此用户故事" />
            </FormItem>

            <FormItem label="所属需求项" prop="req_id">
                <Select ref="req_idSelect" disabled filterable  v-model="formValidate.req_id" placeholder="请选择所属需求项">
                    <Option v-for="(item , index) in req_idList" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
                <ToolTip :W="135" content="此用户故事来源的需求项" />
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {storyAdd} = Common.restUrl;
export default {
    props: {
        isShow: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        isAdd: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        
        addLoading: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        CurrentReqId: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },

        UserstorytypeList: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        UserstorystatusList: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        ProiList: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        ChargerList: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        ChargerList: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        SprintList: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        ReqidList: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },

    },
    watch:{
        isShow(D) {
            this.modaAdd = D;
            if(D){
                setTimeout(()=>{
                    if(Array.isArray(this.req_idList) && this.req_idList.length && this.currentReq_id){
                        let obj = this.req_idList.find(item=>item.value == this.currentReq_id);
                        this.formValidate.req_id = obj ? obj.value : "";
                    }
                    if(Array.isArray(this.chargerList) && this.chargerList.length){
                        let userName = Common.getCookie("username")
                        let obj = userName ? this.chargerList.find(item=>item.value == userName) : "";
                        this.formValidate.charger = obj ? obj.value : "";
                    }
                    let ID = Common.GETID(this,Common);
                    let prj_ID = Common.GETprjid(this,Common);
                    let prod_ID = Common.GETprodid(this,Common);

                    this.formValidate.prj_id = prj_ID;
                    this.formValidate.prod_id = prod_ID;
                    this.formValidate.id = ID;

                },350)
            }
        },
        isAdd(D){
            this.ADDorEDIT = D;
        },
        UserstorytypeList(D){
            this.userstory_typeList = D;
        },
        UserstorystatusList(D){
            this.userstory_statusList = D;
            if(D && Array.isArray(D) && D.length){
                this.formValidate.userstory_status = D[0] && D[0].value ? D[0].value+"" : ""
            }
        },
        ProiList(D){
            this.proiList = D;
        },
        ChargerList(D){
            this.chargerList = D;
        },
        ReqidList(D){
            this.req_idList = D;
        },
        SprintList(D){
            this.sprintList = D;
        },
        CurrentReqId(D){
            this.currentReq_id = D;
        },
        addLoading(D){
            this.modal_add_loading = D;
        },
    },
    beforeUpdate(){
        console.log("添加用户故事 beforeUpdate-------","this.isShow----",this.isShow)
    },
    updated(){
        console.log("添加用户故事 updated-------","this.isShow----",this.isShow)
    },
    mounted(){


        
    },
    data() {
        return {
            modaAdd: false,
            ADDorEDIT:true,
            modal_add_loading:"",
            currentReq_id:"",
            formValidate: {
                userstory_name:"",
                userstory_type:"1",
                userstory_status:"1",
                proi:"3",
               
                
                prj_name:"",
                product_name:"",
                id:"",
                prj_id:"",
                prod_id:"",
                req_id:"",
                req_name:"",
                
                charger:"",//一对
                nick_name:"",//一对
            },
            userstory_typeList:[],
            userstory_statusList:[],
            proiList:[],
            chargerList:[],
            req_idList:[],
            sprintList:[],
            ruleValidate: {
                userstory_name: [
                    { required: true, message: '请填写，不能为空', trigger: 'blur' }
                ],
                userstory_type: [
                    { required: true, message: '请选择 ', trigger: 'change' }
                ],
                req_id: [
                    { required: true, message: '请选择 ', trigger: 'change' }
                ],
                introducer: [
                    { required: false, message: '请选择 ', trigger: 'change' }
                ],
                charger: [
                    { required: false, message: '请选择 ', trigger: 'change' }
                ],
                sprint: [
                    { required: false, message: '请选择', trigger: 'change' }
                ],
                proi: [
                    { required: false, message: '请选择', trigger: 'change' }
                ],
                
            },
            //
        }
    },
    methods:{
        formItemReset(){
            this.formValidate.userstory_name = '';
            this.formValidate.userstory_type = "1";
            
            this.formValidate.userstory_status = ((L)=>{if(L && Array.isArray(L) && L.length){return L[0] && L[0].value ? [0].value+"" : ""}else{return ""}})(this.userstory_statusList)
            ;

            this.formValidate.proi = "3";
            this.formValidate.prj_name = "";
            this.formValidate.product_name = "";
            this.formValidate.id = "";
            this.formValidate.prj_id = "";
            this.formValidate.prod_id = "";
            this.formValidate.req_id = "";
            this.formValidate.req_name = "";
            this.formValidate.charger = "";
            this.formValidate.nick_name = "";

            this.modal_add_loading = true;
            this.$refs.req_idSelect.clearSingleSelect();
            /*
            this.formValidate.userstory_typeList = [];
            this.formValidate.userstory_statusList = [];
            this.formValidate.proiList = [];
            this.formValidate.chargerList = [];
            this.formValidate.req_idList = [];
            */
        },
        submitAddData(){
            let _sprint = Common.replaceNullFn(this.formValidate.sprint);
            let tempData = {
                userstory_name: this.formValidate.userstory_name,
                userstory_type: this.formValidate.userstory_type,
                userstory_status:this.formValidate.userstory_status,
                proi: this.formValidate.proi,
                userstory_desc:"",
                sprint:_sprint,
                manHours:"",
                mission:"0" + " | 0",
                icon: "/assets/images/user_02.png",
                id:this.formValidate.id,
                prj_id:this.formValidate.prj_id,
                prod_id:this.formValidate.prod_id,
                product_name:this.formValidate.product_name,
                prj_name:this.formValidate.prj_name,
                req_id:this.formValidate.req_id,
                req_name:this.formValidate.req_name,
                charger:this.formValidate.charger,
                nick_name:this.formValidate.nick_name,
                bfunc:"",
                depd_main_type:2,
                depd_list:[],
                depd_sn:"",
            }
            defaultAXIOS(storyAdd,tempData,{timeout:20000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======用户故事 添加***response+++",response,myData,"======>");
                if(myData.status = "success"){
                    this.modal_add_loading = false;
                    this.formItemReset();
                    this.$refs.formValidate.resetFields();
                    Common.DelectUserstorySession(Common);
                    this.$emit("popClose",true,myData);
                    //this.$router.push('/product');
                }else{
                    this.modal_add_loading = false;
                    this.showError(myData.status);
                }
            }).catch( (error) => {
                console.log(error);
                this.modal_add_loading = false;
                this.showError(error);
            });
        },
        submitAdd(){
            this.$refs.formValidate.validate((valid)=>{//验证
                this.modal_add_loading = false;
                this.$nextTick(() => {
                  this.modal_add_loading = true;
                });
                if(valid){
                    this.modal_add_loading = true;
                    this.$nextTick(() => {
                      this.modal_add_loading = true;
                    });
                    this.submitAddData();
                }
            })
        },
        cancel(){
            this.formItemReset();
            this.$refs.formValidate.resetFields();
            this.$emit("popClose",true)
        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
    },
}
</script>
<style lang="less" scoped>

</style>