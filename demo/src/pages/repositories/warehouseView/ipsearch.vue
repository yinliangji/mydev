<template>
    <div class="warehouseViewBox">
        <Form ref="formValidate" class="formValidate" :model="formValidate" :rules="ruleValidate">
            <FormItem >
                <Row class="serchInputBox">
                    <Col span="12">
                        <Row class="SerchBox">
                            <Col span="4" style="text-align: center">ip地址搜索</Col>
                            <Col span="10">
                                <FormItem prop="ipaddress">
                                    <Input v-model="formValidate.ipaddress" placeholder="请填写ip地址"></Input>
                                </FormItem>
                            </Col>
                            <Col span="1" style="text-align: center">&nbsp;</Col>
                            <Col span="9">
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
const {queryUserRecordsByIp} = Common.restUrl;
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
    watch: {
        Data(D){
            
        },
    },
    data () {
        let _this = this;
        const checkIP = (rule, value, callback)=>{
            let regIPv4 = /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/g
            let regIPv6 = /^([\\da-fA-F]{1,4}:){7}([\\da-fA-F]{1,4})$/g
            if (value) {
                return callback();
                return regIPv4.test(value) || regIPv6.test(value) ? callback() : callback(new Error('内容不是IP！'))
            }else{
                return callback(new Error('请填写内容，不能为空！'));
            }
        }
        return {
           
            formValidate: {
                ipaddress:"",
            },
            ruleValidate: {
                ipaddress: [
                    { required: true, type: 'string', validator: checkIP, trigger: 'blur' }
                ],
            },
            //列表开始
            columns: [
                {
                    title: '用户IP',
                    key: 'ip',
                    width: 350,
                    align: 'center',
                },
                {
                    title: '下载数量',
                    key: 'value'
                },
                {
                    title: '使用时间',
                    key: 'time',
                    align: 'center',
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
        tableDataAjaxFn(URL = "",page = 1,limit = 3,ipaddress = ""){
            if(!ipaddress){return}
            let delSpace = (str)=>{
                    let Str = str.replace(/<\/?[^>]*>/gim,"");//去掉所有的html标记
                    let result = Str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
                    return  result.replace(/\s/g,"");//去除文章中间空格
            }
            let defaultAXIOSParams = {
                page,
                limit,
                ip:delSpace(ipaddress),
            }
            Condition.serachCondition(Common,this,JSON,this.formValidate,"iplistSearch");
            
            defaultAXIOS(URL,defaultAXIOSParams,{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======maven 活跃用户列表***response+++",response,myData.data.list,"======>");
                if(myData.status == "success"){
                    this.tableData = myData.data;
                    this.tableDAtaTatol = myData.total;
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
                this.formValidate.ipaddress,
            ]
            this.tableDAtaPageCurrent = i;
            this.tableDataAjaxFn(queryUserRecordsByIp,i,this.tableDAtaPageLine,...searchParams);
            
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
            this.formValidate.ipaddress = "";
            
            this.$refs.formValidate.resetFields();
        },
        submitDate(dateObj){
            let tempData = dateObj ? dateObj : {
                ip:this.formValidate.ipaddress,
            }
            let searchParams = [
                tempData.ip,
            ];
            this.tableDataAjaxFn(queryUserRecordsByIp,this.tableDAtaPageCurrent,this.tableDAtaPageLine,...searchParams);
        },
        serchAll(){
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
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
    },
    
    created() {
        Condition.getSerachCondition(Common,this,"iplistSearch",this.Data);
        console.log("每日下载量--created-------",this.formValidate)
    },
    beforeUpdate(){
        console.log("每日下载量--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("每日下载量--updated-------",this.formValidate)
    },
    mounted(){


        this.tableDataAjaxFn(queryUserRecordsByIp,this.tableDAtaPageCurrent,this.tableDAtaPageLine,this.formValidate.ipaddress);
    },
}
</script>

<style lang="less" scoped>
@import './style.less';
@import './style.css';
</style>

