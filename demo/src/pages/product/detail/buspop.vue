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
                    <p v-html="formValidate.operation_setp"></p>
                    
                </FormItem>
                <FormItem label="协同相关" >
                    <p >{{formValidate.synergetic_relation}}</p>
                    
                </FormItem>
                <FormItem label="历史版本" >
                    <p>
                        <!-- :to="{path: '/product', query: {board: true}}" -->
                        <router-link to="/">查看历史版本</router-link>
                    </p>
                    
                </FormItem>
                <FormItem label="附件列表" >
                    <Table border :columns="columns" :data="tableData"  />
                    <div class="pageBox" v-if="tableData.length">
                        <Page  :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
                        <p>总共{{tableDAtaTatol}}条记录</p>
                    </div>
                    
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
const {reqAdd,reqGet,projectListDataNew,selbusinessList } = Common.restUrl;

export default {
    props: {
        isShow: {
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
            this.formValidate.bfunc_id = this.data.bfunc_id;
            this.formValidate.bfunc_name = this.data.bfunc_name;
            this.formValidate.logic_sys_no = this.data.logic_sys_name;
            this.formValidate.businessDes = this.data.bfunc_desc;
            this.formValidate.bfunc_type = _bfunc_typeFn(this.data.bfunc_type);
            this.formValidate.bfunc_status = this.data.bfunc_status;
            this.formValidate.who = this.data.who;
            this.formValidate.synergetic_relation = this.data.synergetic_relation;
            this.formValidate.operation_setp = this.data.operation_setp;
            
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
            modal_add_loading: this.addLoading,
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
                {
                   version:"1", 
                   release:"名称1",
                   enclosure:"附件1",
                   date:"2011-10-10",
                },
                {
                   version:"2", 
                   release:"名称2",
                   enclosure:"附件2",
                   date:"2012-11-10",
                },
                {
                   version:"3", 
                   release:"名称3",
                   enclosure:"附件3",
                   date:"2013-12-10",
                },
            ],
            columns: [
                {
                    title: '附件名称',
                    key: 'enclosure',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                style:{color:'#2d8cf0'},
                                //domProps:{href:"###"},
                                on: {
                                    click: () => {
                                        
                                    }
                                }
                            },
                            params.row.enclosure
                        );
                    },
                },
                
                {
                    title: '附件大小',
                    key: 'version',
                    align: 'center'
                },
                
                {
                    title: '上传时间',
                    key: 'date',
                    align: 'center',
                },
                {
                    title: '创建人',
                    key: 'release',
                    align: 'center',
                },
                
            ],
            tableDAtaTatol:0,
            tableDAtaPageLine:3,
            
        }
    },
    methods:{
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