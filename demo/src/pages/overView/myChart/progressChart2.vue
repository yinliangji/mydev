<template>
  <div id="myChart" :style="{width: '530px', height: '350px'}" ref="myChart"></div>
</template>
<script>
export default {
    name: "hello",
    data() {
        return {
            msg: "环状图"
        };
    },
    props: ["titleName", "data", "name"],
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
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    x: "left",
                    data: [
                        "直接访问",
                        "邮件营销",
                        "联盟广告",
                        "视频广告",
                        "搜索引擎"
                    ]
                },


                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: ["50%", "70%"],
                        calculable: true,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true,

                                    align:"center",
                                    verticalAlign:"middle",
                                    textStyle: {
                                        fontSize: "14",
                                        fontWeight: "bold"
                                    }
                                }
                            }
                        },
                        data: [
                            { value: 335, name: "直接访问" },
                            { value: 310, name: "邮件营销" },
                            { value: 234, name: "联盟广告" },
                            { value: 135, name: "视频广告" },
                            { value: 200, name: "搜索引擎" }
                        ]
                    }
                ]
            });
        }
    }
};
</script>
<style>
#myChart {
    border: 1px solid #e8e8e8;
    margin: 10px auto 0;
}
</style>


