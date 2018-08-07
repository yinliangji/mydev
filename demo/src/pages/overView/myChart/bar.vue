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
    // props: {
    //     childMsg: {
    //         type: Array,
    //         default: [0, 0, 0] //这样可以指定默认的值
    //     }
    // },
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
                tooltip: {},
                xAxis: {
                    data: this.dataX,
                    name: this.xAxisName,
                    nameTextStyle: {
                        color: this.xyAxisColor
                    }
                },
                yAxis: {
                    name: this.yAxisName,
                    nameTextStyle: {
                        color: this.xyAxisColor
                    }
                },
                series: [
                    {
                        name: this.name,
                        type: "bar",
                        data: this.dataY,
                        itemStyle: {
                            // normal: {
                            //     color: function(params) {
                            //         //首先定义一个数组
                            //         var colorList = [
                            //             "#66ccff",
                            //             // "#ff6666",
                            //             // "#ffcb5b",
                            //             // "#76c043",
                            //             // "#ea7e53",
                            //             // "#eedd78"
                            //         ];
                            //         return colorList[params.dataIndex];
                            //     }, //以下为是否显示
                            //     label: {
                            //         show: false
                            //     }
                            // }
                            color: this.barColor
                        },
                        label: {
                            show: this.labelOnoff,
                            color: this.labelColor
                        }
                    }
                ]
            });
        }
    }
};
</Script>
