<template>
    <Modal ref="busPop" v-model="modaAdd" title="业务浏览" @on-ok="ok" @on-cancel="cancel" ok-text="关闭" :loading="modal_add_loading" width="800px">
        <!-- -->
        <div class="productAddBox">
                
            <Form  :label-width="120">
                
                <FormItem label="业务功能名称" prop="bfunc_name">
                    <p >{{formValidate.bfunc_name}}</p>
                </FormItem>
                <FormItem label="业务类型" >
                    <p >{{formValidate.bfunc_type}}</p>
                </FormItem>
                <FormItem label="所属逻辑子系统" prop="logic_sys_no">
                    <p >{{formValidate.logic_sys_no}}</p>
                </FormItem>
                
                <FormItem label="业务功能描述">
                    <p >{{formValidate.businessDes}}</p>
                </FormItem>

                
                <FormItem label="界面流程步骤" >
                    <p v-html="formValidate.operation_step" class="stepBox"></p>
                </FormItem>
                <FormItem label="协同相关" >
                    <p >{{formValidate.synergetic_relation}}</p>
                    
                </FormItem>
                <FormItem label="历史版本" >
                    <p>
                        <router-link :to="{path: '/demand/historyVersion', query: {historyId: data.bfunc_id}}">
                            查看历史版本
                        </router-link>
                    </p>
                    
                </FormItem>
                <FormItem label="附件列表" >
                    <Table border :columns="columns" :data="tableData"  />
                    <!-- <div class="pageBox" v-if="tableData.length">
                        <Page  :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
                        <p>总共{{tableDAtaTatol}}条记录</p>
                    </div> -->
                    
                </FormItem>
                
                
                
                
            </Form>
            
        </div>
        <!-- -->
    </Modal>
</template>
<script>

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {reqAdd,reqGet,projectListDataNew,selbusinessList,userstoryFilesList ,downFile} = Common.restUrl;

let _bfunc_typeFn = (val)=>{
    let _name = false;
    if(val == 1){
        _name = "优化"
    }else if(val == 2){
        _name = "新增"
    }else if(val == 3){
        _name = "重构"
    }else{
        _name = "未知"
    }
    return _name;
}

export default {
    props: {
        isShow: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        isLoading: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        
    },
    watch:{
        isShow() {
            this.modaAdd = this.isShow;
        },
        data(){
            this.formValidate.bfunc_id = this.data.bfunc_id;
            this.formValidate.bfunc_name = this.data.bfunc_name;
            this.formValidate.logic_sys_no = this.data.logic_sys_name;
            this.formValidate.businessDes = this.data.bfunc_desc;
            this.formValidate.bfunc_type = _bfunc_typeFn(this.data.bfunc_type);
            this.formValidate.bfunc_status = this.data.bfunc_status;
            this.formValidate.who = this.data.who;
            this.formValidate.synergetic_relation = this.data.synergetic_relation;
            this.formValidate.operation_step = this.data.operation_step;
            this.getFilesList(userstoryFilesList);
            
        },
    },
    beforecreated(){
        console.log("beforecreated----业务查看弹出---",this.formValidate)
    },
    created(){
        console.log("created----业务查看弹出---",this.formValidate)
    },
    beforeUpdate(){
        console.log("beforeUpdate---业务查看弹出----",this.formValidate)
    },
    updated(){
        console.log("updated----业务查看弹出---",this.formValidate)
    },
    mounted(){
        
    },
    data() {
        return {
            modaAdd: false,
            modal_add_loading: this.isLoading,
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
            typeList:[],
            logicList:[],
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
                                attrs:{
                                    id:"id"+params.row.fileId,
                                },
                                key:"key"+params.row.fileId,
                                ref:"ref"+params.row.fileId,
                                //domProps:{href:params.row.url,target:"_blank"},
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
                    title: '发布人',
                    key: 'creater',
                    align: 'center',
                },
                {
                    title: '创建时间',
                    key: 'created_time',
                    align: 'center',
                },
                
            ],
            tableDAtaTatol:0,
            tableDAtaPageLine:3,
            
        }
    },
    methods:{
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
        getFilesList(URL){
            let _params = {
                version:this.data.version,
                bfunc_id:this.data.bfunc_id,
            }
            Common.GetFilesList(this,defaultAXIOS,URL,_params) 
        },
        changeCurrentPage(i) {
            
        },
        changePageSize(i) {
        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
        selbusinessListFn(URL,params = {}){
            return Common.SelbusinessList(this,defaultAXIOS,URL,params);
        },
        ok(){
            this.modal_add_loading = false;
            this.$nextTick(() => {
              this.modal_add_loading = true;
            });
                
            this.modal_add_loading = true;
            this.$nextTick(() => {
              this.modal_add_loading = true;
            });
            this.$emit("buspopClose",false)
        },
        cancel(){
            this.$emit("buspopClose",false)
        },
        showError(ERR){
            Common.CommonError(this,ERR);
        },
    },
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.pageBox {
    padding-bottom:0px;
    padding-top:10px;
    overflow: hidden;
}

</style>
<style>
.stepBox img {
    max-width: 100%;
    display: block;
}
</style>