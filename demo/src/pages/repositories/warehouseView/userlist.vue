<template>
    <div class="warehouseViewBox">
        <Form ref="formValidate" class="formValidate" :model="formValidate" :rules="ruleValidate">
            <FormItem >
                <Row class="serchInputBox">
                    <Col span="12">
                        <Row class="SerchBox">
                            <Col span="3" style="text-align: center">查询时间</Col>
                            <Col span="9">
                                <FormItem>
                                    <DatePicker clearable :options="optionsStartTime" placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择查询时间" v-model="formValidate.start_time"></DatePicker>
                                </FormItem>
                            </Col>
                            
                            <Col span="12">
                                <Button type="primary" icon="ios-search" class="_serchBtn" @click="serchAll">
                                    查询
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    
                </Row>
            </FormItem>
        </Form>
        <div class="userlistBox">
            <!--  -->
            <Table border stripe  ref="selection" :columns="columns" :data="tableData" class="myTable" @on-select="onSelectFn" @on-select-all="onSelectAllFn" @on-selection-change="onSelectionChangeFn"></Table>
            <div class="pageBox" v-if="tableData.length">
                <Page :current="tableDAtaPageCurrent" :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
                <p>总共{{tableDAtaTatol}}条记录</p>
            </div>
            <!--  -->
        </div>
    </div>
</template>
<script>
import Store from '@/vuex/store'
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {getDayActiveUserList} = Common.restUrl;
const Condition = require('./condition.js');//记住搜索条件开始
export default {
    props: {
        Data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
    },
    data () {
        let _this = this;
        return {
            optionsStartTime: {
                disabledDate (date) {
                    return date && date.valueOf() > (new Date().getTime() - 86400000);
                }
            },
            formValidate: {
                start_time:"",
            },
            ruleValidate: {
                start_time: [
                     { required: true, type: 'date', message: '请选择日期！', trigger: 'change' }
                ],
            },
            //列表开始
            columns: [
                {
                    title: '用户IP',
                    key: 'ip',
                    width: 350,
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                //style:{color:'#2d8cf0'},
                                //attrs:{title:"xxxxx",href:"###"},
                                //domProps:{innerHTML:"内容",},
                                //"class":{txtBlock:true,txtBlockNone:false},
                                //attrs:{title:params.row.prj_name},
                                on: {
                                    click: () => {
                                        this.goIpSearchFn(params.index,params.row)
                                    }
                                }
                            },
                            params.row.ip
                        );
                    }
                },
                {
                    title: '下载数量',
                    key: 'value',
                    sortable: true,
                },
                {
                    title: '使用时间',
                    key: 'time',
                    align: 'center',
                    sortable: true,
                },
            ],
            tableData: [],
            tableDAtaTatol:0,
            tableDAtaPageLine:10,
            tableDAtaPageCurrent:1,
            actionArr:[],
            //列表结束
            
        }
    },
    methods: {
        //列表开始
        goIpSearchFn(i,obj){
            this.$emit("sendIP",obj.ip);
        },
        tableDataAjaxFn(URL = "",page = 1,limit = 3,start_time = ""){
            let defaultAXIOSParams = {
                page,
                limit,
                startDate:start_time,
            }
            Condition.serachCondition(Common,this,JSON,this.formValidate,"userlistSerch");
            defaultAXIOS(URL,defaultAXIOSParams,{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======maven 活跃用户列表***response+++",response,myData.data.list,"======>");
                if(myData.status == "success"){
                    this.tableData = myData.data;
                    this.tableDAtaTatol = myData.count || myData.total;
                }else{
                    this.showError(URL+"_错误");
                }
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        changeCurrentPage(i) {
            let searchParams = [
                this.formValidate.start_time,
            ]
            this.tableDAtaPageCurrent = i;
            this.tableDataAjaxFn(getDayActiveUserList,i,this.tableDAtaPageLine,...searchParams);
            
        },
        changePageSize(i) {

        },
        onSelectionChangeFn(S){
            console.log("<===*onSelectionChangeFn*===Sel->",S,"<-Sel===*onSelectionChangeFn*===>")
            this.actionArr = S;
        },
        onSelectAllFn(S){
            console.log("<===*onSelectAllFn*===Sel 全选->",S,"<-Sel===*onSelectAllFn*===>")
        },
        onSelectFn(S,R){
            console.log("<===*onSelectFn*===Sel->",S,"<-Sel======ROW->",R,"<-ROW===*onSelectFn*===>")
        },
        //列表结束
        formItemReset(){
            this.formValidate.start_time = "";
            
            this.$refs.formValidate.resetFields();
        },
        submitDate(dateObj){
            let _start_time = Common.DateFormat(Common,this.formValidate.start_time);
            
            let tempData = dateObj ? dateObj : {
                startDate:_start_time,
            }
            let searchParams = [
                tempData.startDate,
            ];

            this.tableDataAjaxFn(getDayActiveUserList,this.tableDAtaPageCurrent,this.tableDAtaPageLine,...searchParams);

        },
        serchAll(){
            this.submitDate();
            return
            this.$refs.formValidate.validate((valid)=>{//验证
                if(valid){
                    this.submitDate();                    
                }else{
                    console.log(valid)
                }
            })

        },
        drawChart() {
        },
    },
    watch: {
        Data(D){
        },
    },
    created() {
        Condition.getSerachCondition(Common,this,"userlistSerch",this.Data);
        console.log("每日下载量--created-------",this.formValidate)
    },
    beforeUpdate(){
        console.log("每日下载量--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("每日下载量--updated-------",this.formValidate)
    },
    mounted(){
        let _start_time = this.formValidate.start_time ? (typeof this.formValidate.start_time == "string" ? this.formValidate.start_time : Common.DateFormat(Common,this.formValidate.start_time)) : Common.DateFormat(Common,new Date().getTime() - 86400000);
        this.tableDataAjaxFn(getDayActiveUserList,this.tableDAtaPageCurrent,this.tableDAtaPageLine,_start_time);
    },
}
</script>

<style lang="less" scoped>
@import './style.less';
@import './style.css';
</style>

