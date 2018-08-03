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
                title: { text: '燃尽图', x: "center" },
                 backgroundColor: '#eee',
                xAxis: {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: "line",
                        name: '总量1',
                        smooth: true
                    },
                    {
                        data: [60, 100, 500, 300, 700, 900, 80],
                        type: "line",
                        name: '总量2',
                        smooth: true
                    }
                ]
            });
        }
    }
};
</script>
