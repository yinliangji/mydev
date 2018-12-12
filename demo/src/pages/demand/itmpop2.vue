<template>
   <Modal v-model="modaDelete3" width="360" @on-ok="importFn"  :ok-text="okText" :loading="modal_loading3" @on-cancel="cancel">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>{{title}}</span>
        </p>
        <div class="popBox">
            <Form :model="formValidate" :label-width="86"  ref="formValidate">
                
                <FormItem label="项目编号" v-show="false">
                    <Input  v-model="formValidate.prj_id" placeholder="请输入项目编号"></Input>
                </FormItem>
                <p  v-show="false">{{searchTxt}}</p>
                <div v-if="itemNumber == 0">
                    <p>在ITM上没有找到项目<span style="color:red;">{{prj_name}}</span>的需求项，请在ITM上确认需求项是否存在后，重新执行该操作</p>
                </div>
                <div v-else>
                    <p>
                        1.  此操作会清除<span style="color:red;">{{prj_name}}</span>项目已有需求项，并重新从ITM导入该项目<span style="color:red;">{{itemNumber}}</span>个需求项
                    </p>
                    <p>
                        2.  此操作不会删除旧的需求项关联的用户故事，但会取消与用户故事的关联关系
                    </p>
                    <p>
                        3.  导入完成后，您需要关联需求项与用户故事（编辑用户故事，选择关联的需求项）
                    </p>
                </div>
            </Form>
        </div>
        
    </Modal>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {importITM2,projectListDataNew,getCountITM} = Common.restUrl;

export default {
    props: {
        isShow: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        
    },
    watch:{
        isShow() {
            this.modaDelete3 = this.isShow;
            if(this.isShow){
                this.getCountITMFn(getCountITM);
                this.checkMenuListFn(projectListDataNew);
            }
        },
        "formValidate.prj_id"(curVal,oldVal){
            Common.throttle((value,that)=>{
                this.getCountITMFn(getCountITM,value)
            },this,1500,curVal,2000)();
        },
    },
    beforecreated(){
        //console.log("demand--beforecreated--",)
    },
    created(){
        //console.log("demand--created--",);
        
    },
    beforeUpdate(){
        //console.log("demand--beforeUpdate--",)
    },
    updated(){
        //console.log("demand--updated--",)
    },
    data () {
        return {
            formValidate:{
                prj_id:"",
            },
            modaDelete3:false,
            modal_loading3:true,
            itemNumber:"",
            prj_name:"",
            okText:"导入",
            searchTxt:">>>>>",
            title:"从ITM同步同步需求项确认",
        }
    },
    methods: {
        getCountITMFn(URL,val){
            this.searchTxt = "正在查询";
            let prjSn = val ? val : Common.GETprjid(this,Common);
            defaultAXIOS(URL,{prjSn},{timeout:2000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======getCountITM***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    this.itemNumber = myData.data.count;
                    this.searchTxt = ">>>>>";
                    if(myData.data.count == 0){
                        this.okText = "关闭！"
                        this.title = "从ITM同步同步需求项确认";
                    }else{
                        this.okText = "导入";
                        this.title = "需求项同步须知";
                    }
                }else{
                    this.showError(URL+"错误");
                }

            }).catch( (error) => {
                this.showError(error);
                this.importBtnStatus();
            });
        },
        cancel(){
            this.itemNumber = "";
            this.formValidate.prj_id = "";
            this.itemNumber = ""
            this.prj_name = "";
            this.okText = "导入";
            this.searchTxt = ">>>>>";


            this.$emit("popClose3",false,"cancel");
        },
        importFn(){
            if(this.okText == "导入"){
                let prjSn = this.formValidate.prj_id ? this.formValidate.prj_id : Common.GETprjid(this,Common);
                this.importITM2Fn(importITM2,{prjSn})
            }else{
                this.cancel();
            }
        },
        importBtnStatus(){
            this.modal_loading3 = false;
            this.$nextTick(() => {
              this.modal_loading3 = true;
            });

            this.modal_add_loading = true;
            this.$nextTick(() => {
              this.modal_add_loading = true;
            });
        },
        checkMenuListFn(URL){
            if(Common.getStorageAndCookie(this,Common,"prj_name") ){
                this.prj_name = Common.getStorageAndCookie(this,Common,"prj_name");
                return
            }

            defaultAXIOS(URL,{username:Common.getStorageAndCookie(this,Common,"username")},{timeout:5000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======demand projectListDateNew***response+++",response,myData,"======>");
                let _newData = myData.data ? myData.data : myData;
                if(Array.isArray(_newData) && _newData.length){
                    for(let i=0;i<_newData.length;i++){
                        if(Common.GETID(this,Common) == _newData[i].id){
                            this.prj_name = _newData[i].prj_name+"";
                        }
                    }
                }else{
                    this.showError(URL+"_错误");
                }
                
            })
            .catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        importITM2Fn(URL,params = {}){
            defaultAXIOS(URL,params,{timeout:60000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======importITM2***response+++",response,myData,"======>");

                this.importBtnStatus();
                if(myData.status == "success"){
                    this.cancel();
                    this.$emit("popClose3",false);
                    
                }else{
                    this.showError(URL+"错误");
                }

            }).catch( (error) => {
                this.showError(error);
                this.importBtnStatus();
            });
        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
    },
    mounted(){
        
    },
}
</script>
<style lang="less" scoped>
.popBox {
    text-align:left;
}
.popBox p {
    text-indent: 2em;
}
.ivu-form-item { margin-bottom: 0;}
</style>