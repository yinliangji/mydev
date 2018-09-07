<template>
    <Modal ref="addPop" v-model="modaAdd" :title="ADDorEDIT?'添加':'编辑'" @on-ok="submitAdd"  ok-text="提交" :loading="modal_add_loading" @on-cancel="cancel" visible="true">
        <Form :model="formItem" :label-width="80" :rules="ruleValidate" ref="formValidate">
            <FormItem label="所属项目" prop="prj_id">
                <Select v-model="formItem.prj_id" placeholder="请选择所属项目">
                    <Option v-for="(item,index) in prj_idList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> 
            </FormItem>
            <FormItem label="需求名称" prop="req_name">
                <Input v-model="formItem.req_name" placeholder="请输入项目名称"></Input>
            </FormItem>
            
            <FormItem label="需求类型" prop="prj_type">
                <RadioGroup v-model="formItem.prj_type">
                    <Radio label="1">立研</Radio>
                    <Radio label="2">自研</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="需求编号" prop="req_id"  >
                <Input v-model="formItem.req_id" :disabled="formItem.prj_type  == 2 ? false : true" placeholder="请输入项目名称"></Input>
            </FormItem>
            <FormItem label="提出部门" prop="req_submitter">
                <Input v-model="formItem.req_submitter" placeholder="请输入提出部门"></Input>
            </FormItem>
            

        </Form>
    </Modal>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {reqAdd,reqGet,projectListDateNew} = Common.restUrl;

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
        tabDataRow: {
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
        }
    },
    watch:{
        isShow() {
            this.ADDorEDIT = this.isAdd;
            this.editTableData = this.tabDataRow;
            this.modaAdd = this.isShow;
            !this.ADDorEDIT && this.editFn(this.editTableData)
        },
    },
    beforecreated(){
        console.log("demand--beforecreated--",this.formItem)
    },
    created(){
        console.log("demand--created--",this.formItem);
        this.checkMenuListFn(projectListDateNew);

    },
    beforeUpdate(){
        console.log("demand--beforeUpdate--",this.formItem)
    },
    updated(){
        console.log("demand--updated--",this.formItem)
    },
    data () {
        const req_idCheck = (rule, value, callback) => {
            if(this.formItem.prj_type  != 2){
                callback()
            }else{
                //
                if (!value) {
                    return callback(new Error('不能为空！'));
                }else if(value == "需求编号已有"){
                    return callback(new Error('需求编号已有，请重填！'));

                }else{
                    callback()   
                }
                //
            }
        };        
        return {
            modaAdd: false,
            modal_add_loading: true,
            ADDorEDIT:true,
            editTableData:false,
            formItem: {
                req_name:"",
                req_id:"",
                prj_type:"2",
                req_submitter:"",
                prj_id:"",
            },
            ruleValidate: {
                req_name: [
                    { required: true, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                req_id: [
                    { required: true,validator: req_idCheck,  trigger: 'blur' }//message: '编号为空或重复！',
                ],
                req_submitter: [
                    { required: true, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
            },
            prj_idList:[
                // {
                //     value: '11',
                //     label: '项目1'
                // },
            ],
        }
    },
    methods: {
        editFn(data){
            console.log(data)
            if(data && Array.isArray(data)){
                this.formItem.req_id = data[0].req_id+"";
                this.formItem.req_name = data[0].req_name+"";
                this.formItem.req_submitter = data[0].req_submitter+"";
                this.formItem.prj_type = data[0].prj_type+"";
                this.formItem.prj_id = Common.GETID(this,Common);
            }
        },
        addItem(){
            this.modaAdd = true;
        },
        formItemReset(){
            this.formItem.req_name = "";
            this.formItem.req_id = "";
            this.formItem.req_submitter = "";
            this.formItem.prj_type = "2";
            this.formItem.prj_id = "";
            this.editTableData = false;
        },
        submitAddData(){
            let tempData = {
                req_name: this.formItem.req_name,
                req_id: this.formItem.req_id,
                req_submitter:this.formItem.req_submitter,
                prj_type:this.formItem.prj_type,
                prj_id:this.formItem.prj_id,
            }
            /*
            setTimeout(() => {
                // if(this.ADDorEDIT){
                    
                // }
                this.$emit("tableDataAdd2",tempData)
                this.modaAdd = false;
                this.formItemReset();
                this.$refs.formValidate.resetFields();
                this.$emit("popClose2",true);
            },1000)
            */
            //
            defaultAXIOS(reqAdd,tempData,{timeout:5000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======demand reqAdd***response+++",response,myData,"======>");
                if(myData.status == "success"){

                    this.modaAdd = false;
                    this.formItemReset();
                    this.$refs.formValidate.resetFields();
                    this.$emit("popClose2",true);
                    
                }else{
                    this.modal_add_loading = false;
                    this.showError(myData.status);
                }
                
            }).catch( (error) => {
                console.log(error);
                this.modal_add_loading = false;
                this.showError(error);
            });
            //
           

        },
        submitAdd () {
            this.checkReqId(reqGet,this.req_id,Common.GETID(this,Common))
            .then(()=>{
                //
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
                //

            },(error)=>{
                console.log(error)
                if(error == "需求编号已有"){
                    this.formItem.req_id = "需求编号已有"
                }
                this.$refs.formValidate.validate();
                this.formItem.req_id = "";

            })
            this.modal_add_loading = false;
                this.$nextTick(() => {
                  this.modal_add_loading = true;
                });

        },
        cancel () {
            this.formItemReset();
            this.$refs.formValidate.resetFields();
            this.$emit("popClose2",true)
        },
        checkReqId(URL,prj_id,req_id){

            return defaultAXIOS(URL,{prj_id,req_id,debug:false},{timeout:60000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======【demand reqGet get】***response+++",response,myData,"====>");
                if(Array.isArray(myData.data)){
                    if(!myData.data.length){
                        return Promise.resolve(true);
                    }else{
                        return Promise.reject("需求编号已有");
                    }
                }else{
                    
                    return Promise.reject("数据类型错误");
                }
            })
            .catch( (error) => {
                console.log(error);
                if(error != "需求编号已有"){
                    this.showError(error);
                }
                return Promise.reject(error);
            });  

        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
        checkMenuListFn(URL){
            defaultAXIOS(URL,{},{timeout:5000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======demand projectListDateNew***response+++",response,myData,"======>");
                if(Array.isArray(myData) && myData.length){
                    //
                    let _tempObj = {};
                    for(let i=0;i<myData.length;i++){
                        _tempObj.value = myData[i].id+"";
                        _tempObj.label = myData[i].prj_name+"";
                        this.prj_idList.push(_tempObj);
                        _tempObj = {}
                    }
                    //
                }else{
                    this.showError(URL+"_错误");
                }
                
            })
            .catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        }
    },
    mounted(){

    },
}
</script>
<style lang="less" scoped>

</style>