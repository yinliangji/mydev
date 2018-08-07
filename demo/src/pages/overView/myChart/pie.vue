<template>

  <div id="myChart" :style="{width: '500px', height: '500px'}" ref="myChart"></div>
</template>
<script>
export default {
    name: "hello",
    data() {
        return {
            msg: "饼图"
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
                    text: "人员构成图",
                    // subtext: "纯属虚构",
                    x: "center",
                    bottom: 10,
                    textStyle: { fontSize: 14 }
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                series: [
                    {
                        name: "人员占比",
                        type: "pie",
                        color: [
                            "#66ccff",
                            "#ff6666",
                            "#ffcb5b",
                            "#76c043",
                            "#ea7e53",
                            "#eedd78"
                        ],
                        label: {
                            normal: {
                                show: true,
                                //  position:"inside",
                                formatter: '{b}:{d}'
                            }
                        },

                        // color: ['#0b62a4','#7a92a3','#3980b5','#67a7c5','#ea7e53','#eedd78'],
                        radius: "55%",
                        center: ["50%", "50%"],
                        data: [
                            { value: 3, name: "总体组" },
                            { value: 10, name: "开发一组" },
                            { value: 10, name: "开发二组" },
                            { value: 10, name: "开发三组" },
                            { value: 6, name: "测试组" }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            });
        }
    }
};
</script>
