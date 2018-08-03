<template>
  <div id="myChart" :style="{width: '530px', height: '350px'}" ref="myChart"></div>
</template>
<script>
export default {
    name: "hello",
    data() {
        return {
            msg: "环状图",

        };
    },
    props: ['titleName','data','name'],
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
                    // subtext: "纯属虚构",
                    x: "center",
                    y:"center",
                    textStyle: { fontSize: 14},

                },
                tooltip: {
                    trigger: "item",
                    show: true,
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                 legend: {
                      orient: 'vertical',
                      left: '10px',
                      top:"10px"

                  },
                series: [
                    {
                        name: this.name,
                        type: "pie",
                        color: ['#66ccff','#ff6666','#ffcb5b','#76c043','#ea7e53','#eedd78'],
                        // color: ['#0b62a4','#7a92a3','#3980b5','#67a7c5','#ea7e53','#eedd78'],
                        radius: ['40%', '60%'],
                        center: ["50%", "50%"],
                        data: this.data,
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
<style>
#myChart{border:1px solid #e8e8e8; margin: 10px auto 0}
</style>
