<template>
	<div class="pageContent">
        <goAgile :go="'/demand'" :text="'返回项目需求项'" :TOP="'5'" />
       <Card>
            <div class="productAddBox">
                
                <Form  :label-width="120">
                    <h3 class="Title"><span>新增业务功能</span></h3>
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
                        <p >{{formValidate.stepview}}</p>
                        
                    </FormItem>
                    <FormItem label="协同相关" >
                        <p >{{formValidate.synergetic_relation}}</p>
                        
                    </FormItem>
                    
                    <Table border :columns="columns" :data="tableData"  />
                    <div class="pageBox" v-if="tableData.length">
                        <Page  :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
                        <p>总共{{tableDAtaTatol}}条记录</p>
                    </div>
                    
                    
                    
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
export default {
    data(){
        return {
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
                    title: '版本号',
                    key: 'version',
                    align: 'center'
                },
                {
                    title: '发布名称',
                    key: 'release',
                    align: 'center',
                },
                {
                    title: '创建时间',
                    key: 'date',
                    align: 'center',
                },
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
    },
    mounted(){
        this.selbusinessListFn(selbusinessList,{prj_id:Common.GETprjid(this,Common)});
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
}
</script>
<style lang="less" scoped>
@import '../../../product/detail/style.less';
@import '../../../product/detail/style.css';
.pageBox {
    padding-bottom:0px;
    padding-top:10px;
    overflow: hidden;
}
</style>