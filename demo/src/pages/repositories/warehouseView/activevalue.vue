<template>
    <div class="warehouseViewBox">
        <Form ref="formValidate" class="formValidate" :model="formValidate" :rules="ruleValidate">
            <FormItem >
                <Row class="serchInputBox">
                    <Col span="12">
                        <Row class="SerchBox">
                            <Col span="3" style="text-align: center">开始时间</Col>
                            <Col span="9">
                                <FormItem prop="start_time">
                                    <DatePicker clearable :options="optionsStartTime" placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择开始时间" v-model="formValidate.start_time"></DatePicker>
                                </FormItem>
                            </Col>
                            <Col span="3" style="text-align: center">结束时间</Col>
                            <Col span="9">
                                <FormItem prop="end_time">
                                    <DatePicker clearable :options="optionsEndTime" placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择结束时间" v-model="formValidate.end_time"></DatePicker>
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                    <Col span="4" style="text-align: left" class="serchBtnBox">
                        <Button type="primary" icon="ios-search" class="_serchBtn" @click="serchAll">
                            查询
                        </Button>
                    </Col>
                </Row>
            </FormItem>
        </Form>
        <div class="drawChartBox" ref="drawChartBoxActive"></div>
    </div>
</template>
<script>
import Store from '@/vuex/store'
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {getDayActiveUserDownCount} = Common.restUrl;
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
        const validateDateEnd = Common.checkEndDate(this,false,"downvalue");
        return {
            optionsEndTime: {
                disabledDate (date) {
                    if(_this.formValidate.start_time){
                        return date &&  (date.valueOf() < _this.formValidate.start_time.getTime());
                    }else{
                        //return date && date.valueOf() > new Date().getTime();
                    }
                    
                }
            },
            optionsStartTime: {
                disabledDate (date) {
                    return date && date.valueOf() > new Date().getTime();
                }
            },
            formValidate: {
                start_time:"",
                end_time:"",
            },
            ruleValidate: {
                start_time: [
                     { required: true, type: 'date', message: '请选择日期！', trigger: 'change' }
                ],
                end_time: [
                    { required: true, type: 'date', validator: validateDateEnd, trigger: 'change' }
                ],
            },
            dateList:[],
            valueList:[],
        }
    },
    methods: {
        formItemReset(){
            this.formValidate.start_time = "";
            this.formValidate.end_time = "";
            this.$refs.formValidate.resetFields();
        },
        submitDate(dateObj){
            let _start_time = Common.DateFormat(Common,this.formValidate.start_time);
            let _end_time =  Common.DateFormat(Common,this.formValidate.end_time);
            let tempData = dateObj ? dateObj : {
                startDate:_start_time,
                endDate:_end_time,
            }
            this.getDate(getDayActiveUserDownCount,tempData);
            

        },
        getDate(URL,param = {}){
            this.dateList = [];
            this.valueList = [];
            Condition.serachCondition(Common,this,JSON,this.formValidate,"activevalueSerch");
            defaultAXIOS(URL,param,{timeout:5000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<====== 每日下载量 时间搜索***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    if(myData.data && Array.isArray(myData.data) && myData.data.length){
                        myData.data.forEach((item)=>{
                            this.valueList.push(item.value+"");
                            let dateArr = item.date.split("-");
                            let dateArrStr = dateArr.length == 2 ? dateArr[0]+"月-"+dateArr[1]+"日" : dateArr[1]+"月-"+dateArr[2]+"日";
                            //this.dateList.push(dateArrStr);
                            this.dateList.push(item.date);
                        }) 
                    }
                    this.drawChart();
                }else{
                    this.showError(myData.status);
                }
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
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
            let option = {
                title: {
                    text: '每日活跃用户量'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['活跃用户量']
                },
                grid: {
                    left: '3%',
                    right: '5%',
                    bottom: '4%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    axisLabel:{
                        rotate:-45,
                    },
                    type: 'category',
                    boundaryGap: false,
                    data: this.dateList,
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'活跃用户量',
                        type:'line',
                        stack: '总量',
                        data:this.valueList,
                    },
                ]
            };
            let myChart = this.$echarts.init(this.$refs.drawChartBoxActive);
            myChart.setOption(option);
            myChart.on('click',(params)=>{
                this.$emit("sendDate",params.name);
            }); 

            

        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
    },
    watch: {
        Data(){
        },
    },
    created() {
        Condition.getSerachCondition(Common,this,"activevalueSerch");
        console.log("每日下载量--created-------",this.formValidate,this.dateList,this.valueList);

    },
    beforeUpdate(){
        console.log("每日下载量--beforeUpdate-------",this.formValidate,this.dateList,this.valueList)
    },
    updated(){
        console.log("每日下载量--updated-------",this.formValidate,this.dateList,this.valueList)
    },
    mounted(){
        
        this.submitDate({startDate:Common.DateFormat(Common,new Date().getTime()-  86400000*30),endDate:Common.DateFormat(Common,new Date().getTime())});
    },
}

</script>

<style lang="less" scoped>
@import './style.less';
@import './style.css';

</style>

