<template>
    <Modal ref="addPop" v-model="modaAdd" title="附件浏览" @on-ok="ok" @on-cancel="cancel" ok-text="关闭" :loading="modal_add_loading" width="600px">
        <Table border :columns="columns" :data="tableData"  />
        <div class="pageBox" v-if="tableData.length">
            <Page  :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
            <p>总共{{tableDAtaTatol}}条记录</p>
        </div>
    </Modal>
</template>
<script>



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
            console.log(this.data)
        },
    },
    beforeUpdate(){
        console.log("beforeUpdate---enclosure----")
    },
    updated(){
        console.log("updated----enclosure---")
    },
    mounted(){
        
    },
    data() {
        return {
            modaAdd: false,
            modal_add_loading: this.addLoading,
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
        ok(){
            this.modal_add_loading = false;
            this.$nextTick(() => {
              this.modal_add_loading = true;
            });
                
            this.modal_add_loading = true;
            this.$nextTick(() => {
              this.modal_add_loading = true;
            });
                   
                
            this.$emit("enclosureClose",false)
        },
        cancel(){
            this.$emit("enclosureClose",false)
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