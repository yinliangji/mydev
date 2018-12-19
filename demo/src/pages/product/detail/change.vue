<template>
    <div class="tableContBox">
        <Table border :columns="columns" :data="tableData"  />
        <div class="pageBox" v-if="tableData.length">
            <Page :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
            <p>总共{{tableDAtaTatol}}条记录</p>
        </div>
    </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {getMissionChange} = Common.restUrl;
export default {
    props: {
        TASKID: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        
    },
    data () {
        return {
           //-- 用户故事变更记录 
            tableDAtaTatol:0,
            tableDAtaPageLine:5,
            columns: [
                {
                    title: '状态',
                    key: 'userstory_status',
                    align: 'center'
                },
                {
                    title: '变更时间',
                    key: 'change_time',
                    align: 'center',
                    
                },
                {
                    title: '操作者',
                    key: 'operator_name',
                    align: 'center',
                },
                {
                    title: '用户故事',
                    key: 'userstory_id',
                    align: 'center',
                },
            ],
            tableData: [],
            currentPage:1,
            //-- 用户故事变更记录 
        }
    },
    methods: {
        changeCurrentPage(i) {
            this.currentPage = i;
            this.getMissionChangeFn(getMissionChange,this.TASKID,i,this.tableDAtaPageLine)
        },
        changePageSize(i) {
        },
        getMissionChangeFn(URL = "",userstory_id = "",page = "",limit = "",data = ""){
            defaultAXIOS(URL,{userstory_id,page,limit,data},{timeout:5000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======product getMissionChange***response+++",response,myData,"======>");
                this.tableData = myData.rows;
                this.tableDAtaTatol = myData.total;
            })
            .catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        showError(ERR){
            Common.CommonError(this,ERR);
        },
    },
    watch: {
        TASKID(){
            if(this.TASKID){
                this.getMissionChangeFn(getMissionChange,this.TASKID,this.currentPage,this.tableDAtaPageLine);
            }
        },
    },
    created() {
    },
    beforeUpdate(){
        
    },
    updated(){
        
    },
    mounted(){
        if(this.TASKID){
            this.getMissionChangeFn(getMissionChange,this.TASKID,this.currentPage,this.tableDAtaPageLine);
        }
        
    },
}


</script>

<style lang="less" scoped>
@import './style.less';
@import './style.css';
.pageBox {
    padding-bottom:20px;
    padding-top:20px;
    overflow: hidden;
}
</style>

