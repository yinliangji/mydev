<template>
    <div class="warehouseViewBox">
        <div class="drawChartBoxRanking" ref="drawChartBox"></div>
    </div>
</template>
<script>
import Store from '@/vuex/store'
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {getDownTopGroupByIp} = Common.restUrl;
//import Condition from './Condition.js'
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
        return {
            ipList:[],
            valueList:[],
        }
    },
    methods: {
        submitDate(dateObj){
            let tempData =  {}
            this.getDate(getDownTopGroupByIp,tempData);
        },
        getDate(URL,param = {}){
            this.ipList = [];
            this.valueList = [];
            defaultAXIOS(URL,param,{timeout:5000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======  下载排行榜 ***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    if(myData.data && Array.isArray(myData.data) && myData.data.length){
                        myData.data.forEach((item)=>{
                            this.valueList.push(item.value+"");
                            this.ipList.push(item.ip+"");
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
        
        drawChart() {
            /*
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
                    right: '5%',
                    bottom: '3%',
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
                    data: this.ipList,
                    //data: ['周一','周二','周三','周四','周五','周六','周日'],
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'下载量',
                        type:'line',
                        stack: '总量',
                        data:this.valueList,
                        //data:[120, 132, 101, 134, 90, 230, 210],
                    },
                ]
            };
            */
            let option = {
                title: {
                    text: '下载排行榜',
                    
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['下载排行榜']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                },
                yAxis: {
                    type: 'category',
                    data: this.ipList,
                    //data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
                },
                series: [
                    {   
                        itemStyle:{
                        },
                        lineStyle:{
                        },
                        barMaxWidth:13,
                        name: '下载排行榜',
                        type: 'bar',
                        data:this.valueList,
                        //data: [19325, 23438, 31000, 121594, 134141, 681807]
                    }
                ]
            };
            let myChart = this.$echarts.init(this.$refs.drawChartBox);
            myChart.setOption(option);

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
        console.log(" 下载排行榜 --created-------",this.ipList,this.valueList);
    },
    beforeUpdate(){
        console.log("下载排行榜--beforeUpdate-------",this.formValidate,this.ipList,this.valueList)
    },
    updated(){
        console.log("下载排行榜--updated-------",this.formValidate,this.ipList,this.valueList)
    },
    mounted(){
       this.submitDate()
    },
}
</script>

<style lang="less" scoped>
@import './style.less';
@import './style.css';

</style>

