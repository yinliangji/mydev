<template>
  <div id="myChart" :style="{width: '530px', height: '350px'}" ref="myChart"></div>
</template>
<script>
export default {
    data() {
        return {
            msg: "柱状图"
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
                title: {
                    text: "迭代上线情况",
                    x: "center",
                    textStyle: { fontSize: 14 }
                },
                tooltip: {},
                xAxis: {
                    data: ["5.1", "6.1", "7.1", "8.1", "9.1", "10.1"]
                },
                yAxis: {},
                legend: {
                    data: ['bar', 'bar2', 'bar3', 'bar4'],

                },

                backgroundColor: '#eee',
                series: [
                    {
                        name: "迭代",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20],
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    //首先定义一个数组
                                    var colorList = [
                                        "#66ccff",
                                        "#ff6666",
                                        "#ffcb5b",
                                        "#76c043",
                                        "#ea7e53",
                                        "#eedd78"
                                    ];
                                    return colorList[params.dataIndex];
                                }, //以下为是否显示
                                label: {
                                    show: false
                                }
                            }
                        }
                    }
                ]
            });
        }
    }
};
</Script>
