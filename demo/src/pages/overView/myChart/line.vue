<template>

  <div id="myChart" :style="{width: '500px', height: '500px'}" ref="myChart"></div>
</template>
<script>
export default {
    name: "hello",
    data() {
        return {
            msg: "折线图"
        };
    },
    //标题名称、X数据、Y数据、X轴名称、Y轴名称、xy颜色
    props: [
        "titleName",
        "dataX",
        "dataY",
        "xyAxisColor",
        "xAxisName",
        "yAxisName"
    ],
    mounted() {
        this.drawChart();
    },
    methods: {
        drawChart() {
            // 基于准备好的dom，初始化echarts实例
            // let myChart = this.$echarts.init(document.getElementById('myChart'))
            let myChart = this.$echarts.init(this.$refs.myChart);
            // 绘制图表
            myChart.setOption({
                title: {
                    text: this.titleName,
                    x: "center",
                    bottom: 10,
                    textStyle: { fontSize: 14 }
                },
                tooltip: {
                    trigger: "axis"
                },
                //  backgroundColor: '#eee',
                xAxis: {
                    data: this.dataX,
                    name: this.xAxisName,
                    nameTextStyle: {
                        color: this.xyAxisColor
                    }
                },
                yAxis: {
                    type: "value",
                    name: this.yAxisName,
                    nameTextStyle: {
                        color: this.xyAxisColor
                    }
                },
                series: [
                    {
                        data: this.dataY,
                        type: "line",
                        smooth: true
                    }
                ]
            });
        }
    }
};
</script>
