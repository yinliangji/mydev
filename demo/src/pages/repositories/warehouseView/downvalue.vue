<template>
    <div >
        <Form ref="formValidate" class="formValidate" :model="formValidate" :rules="ruleValidate">
            <FormItem >
                <Row class="serchInputBox">
                    <Col span="12">
                        <Row class="SerchBox">
                            <Col span="3" style="text-align: center">开始时间</Col>
                            <Col span="9">
                                <FormItem prop="start_time">
                                    <DatePicker clearable placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择开始时间" v-model="formValidate.start_time"></DatePicker>
                                </FormItem>
                            </Col>
                            <Col span="3" style="text-align: center">结束时间</Col>
                            <Col span="9">
                                <FormItem prop="end_time">
                                    <DatePicker clearable :options="options3" placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择结束时间" v-model="formValidate.end_time"></DatePicker>
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
        <div id="downvalue"  ref="downvalue"></div>
    </div>
</template>
<script>
import Store from '@/vuex/store'
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {} = Common.restUrl;
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
        const validateDateEnd = Common.checkEndDate(this);
        return {

            options3: {
                disabledDate (date) {
                    if(_this.formValidate.start_time){
                        return date && date.valueOf() < _this.formValidate.start_time.getTime() + 86400000;//24*60*1000*60
                    }else{
                        //return date && date.valueOf() < Date.now() - 86400000;//24*60*1000*60
                    }
                    
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
        }
    },
    methods: {
        serchAll(){
            this.$refs.formValidate.validate((valid)=>{//验证
                if(valid){
                    
                    
                }else{
                    
                }
            })

        },
        drawChart() {
            let option = {
                title: {
                    text: '每日下载量'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['下载量']
                },
                grid: {
                    left: '3%',
                    right: '3%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'下载量',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                ]
            };
            let myChart = this.$echarts.init(this.$refs.downvalue);
            myChart.setOption(option);

        },
    },
    watch: {
        Data(){
        },
    },
    created() {
        console.log("每日下载量--created-------",this.formValidate)
    },
    beforeUpdate(){
        console.log("每日下载量--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("每日下载量--updated-------",this.formValidate)
    },
    mounted(){
        this.drawChart();
    },
}


</script>

<style lang="less" scoped>
@import './style.less';
@import './style.css';
#downvalue{
    width: 100%;
    height: 295px;
}
</style>

