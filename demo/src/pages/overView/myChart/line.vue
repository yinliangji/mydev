<template>

  <div id="myChart" :style="{width: '530px', height: '350px'}" ref="myChart"></div>
</template>
<script>
export default {
    name: "hello",
    data() {
        return {
            msg: "折线图"
        };
    },
    //标题名称、X数据、Y数据、X轴名称、Y轴名称
    props: [
        "titleName",
        "dataX",
        "dataY",
        "name",
        "barColor",
        "xyAxisColor",
        "xAxisName",
        "yAxisName",
        "labelOnoff",
        "labelColor"
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
                    text: "燃尽图",
                    x: "center",
                    bottom: 10,
                    textStyle: { fontSize: 14 }
                },
                //  backgroundColor: '#eee',
                xAxis: {
                    data: ["5.1", "6.1", "7.1", "8.1", "9.1", "10.1"],
                    name: "时间",
                    nameTextStyle: {
                        color: "#66CCFF"
                    }
                },
                yAxis: {
                    name: "完成情况",
                    nameTextStyle: {
                        color: "#66CCFF"
                    }
                },
                color: [
                    "#66ccff",
                    "#ff6666",
                    "#ffcb5b",
                    "#76c043",
                    "#ea7e53",
                    "#eedd78"
                ],
                series: [
                    {
                        data: [800, 700, 600, 500, 400, 300, 200],
                        type: "line",
                        name: "总量1",
                        smooth: true
                    },
                    {
                        data: [750, 650, 500, 300, 200, 100, 10],
                        type: "line",
                        name: "总量2",
                        smooth: true
                    }
                ]
            });
        }
    }
};
</script>
