<template>
    <Modal ref="addPop" v-model="modaAdd" :title="ADDorEDIT?'添加':'编辑'" @on-ok="submitAdd"  ok-text="提交" :loading="modal_add_loading" @on-cancel="cancel" visible="true">
        <Form :model="formItem" :label-width="100" :rules="ruleValidate" ref="formValidate">
            <!-- <FormItem label="所属项目" prop="prj_id">
                <Select v-model="formItem.prj_id" placeholder="请选择所属项目">
                    <Option v-for="(item,index) in prj_idList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> 
            </FormItem> -->
            <FormItem label="所属项目" >
                <p>{{formItem.prj_name}}</p>
            </FormItem>
            <FormItem label="需求项名称" prop="req_name">
                <Input v-model="formItem.req_name" placeholder="请输入需求项名称"></Input>
            </FormItem>
            
            <FormItem label="需求项类型" prop="prj_type">
                <RadioGroup v-model="formItem.prj_type">
                    <Radio label="1">立项</Radio>
                    <Radio label="2">自研</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="需求项编号" prop="req_id" v-show="formItem.prj_type  == 2 ? false : true" >
                <Input v-model="formItem.req_id"  :disabled="formItem.prj_type  == 1 ? false : true" placeholder="请输入需求项编号"></Input>
                <p v-show="formItem.prj_type  != 2 ? false : true">【需求项编号】自动生成</p>
            </FormItem>
            <FormItem label="需求项编号" v-show="formItem.prj_type  != 2 ? false : true">
                <p >【需求项编号】自动生成</p>
                <!-- v-if="formItem.prj_type  == 2 ? false : true" -->
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
const {reqAdd,reqGet,reqEdit,projectListDataNew} = Common.restUrl;

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
            this.ADDorEDIT && this.checkMenuListFn(projectListDataNew);
        },
    },
    beforecreated(){
        console.log("demand--beforecreated--",this.formItem)
    },
    created(){
        console.log("demand--created--",this.formItem);
        this.checkMenuListFn(projectListDataNew);

    },
    beforeUpdate(){
        console.log("demand--beforeUpdate--",this.formItem)
    },
    updated(){
        console.log("demand--updated--",this.formItem)
    },
    data () {
        const req_idCheck = (rule, value, callback) => {
            if(this.formItem.prj_type  != 1){
                callback()
            }else{
                //
                if (!value) {
                    return callback(new Error('不能为空！'));
                }else if(value == "需求项编号已有"){
                    return callback(new Error('需求项编号已有，请重填！'));

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
                prj_name:"",
                myId:"",
            },

            ruleValidate: {
                req_name: [
                    { required: true, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                req_id: [
                    { required: true,validator: req_idCheck,  trigger: 'blur' }//message: '编号为空或重复！',
                ],
                req_submitter: [
                    { required: false, message: '请填写内容，不能为空！', trigger: 'blur' }
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
            
            if(data && Array.isArray(data)){
                this.formItem.req_id = data[0].req_id+"";
                this.formItem.req_name = data[0].req_name+"";
                this.formItem.req_submitter = data[0].req_submitter+"";
                this.formItem.prj_type = data[0].prj_type+"";
                this.formItem.prj_id = Common.GETID(this,Common);
                this.formItem.myId = data[0].id+"" || "";
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
            this.myId = "";
        },
        submitAddData(){
            let tempData = {
                req_name: this.formItem.req_name,
                req_id: this.formItem.req_id,
                //req_id:this.formItem.prj_type == 2 ? "" : this.formItem.req_id,
                req_submitter:this.formItem.req_submitter,
                prj_type:this.formItem.prj_type,
                prj_id:this.formItem.prj_id,
                myId:this.formItem.myId,
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
            let URL = this.ADDorEDIT ? reqAdd : reqEdit;
            defaultAXIOS(URL,tempData,{timeout:5000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======demand reqAdd***response+++",response,myData,"======>");
                if(myData.status == "success"){

                    this.modaAdd = false;
                    this.formItemReset();
                    this.$refs.formValidate.resetFields();
                    this.$emit("popClose2",true);
                    
                }else{
                    this.modaAdd = true;
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
                if(error == "需求项编号已有"){
                    this.formItem.req_id = "需求项编号已有"
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
                        return Promise.reject("需求项编号已有");
                    }
                }else{
                    
                    return Promise.reject("数据类型错误");
                }
            })
            .catch( (error) => {
                console.log(error);
                if(error != "需求项编号已有"){
                    this.showError(error);
                }
                return Promise.reject(error);
            });  

        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
        checkMenuListFn(URL){
            if(Common.getCookie("prj_name") && Common.getCookie("prjId")){
                this.formItem.prj_id = Common.getCookie("prjId");
                this.formItem.prj_name = Common.getCookie("prj_name");
                return
            }

            defaultAXIOS(URL,{username:Common.getCookie("username")},{timeout:5000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======demand projectListDateNew***response+++",response,myData,"======>");
                let _newData = myData.data ? myData.data : myData;
                if(Array.isArray(_newData) && _newData.length){
                    //
                    let _tempObj = {};
                    for(let i=0;i<_newData.length;i++){
                        if(Common.GETID(this,Common) == _newData[i].id){
                            this.formItem.prj_id = _newData[i].id+"";
                            this.formItem.prj_name = _newData[i].prj_name+"";
                        }
                        _tempObj.value = _newData[i].id+"";
                        _tempObj.label = _newData[i].prj_name+"";
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