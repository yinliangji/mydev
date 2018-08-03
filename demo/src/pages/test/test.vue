<template>

  <div id="myChart" :style="{width: '350px', height: '350px'}" ref="myChart2"></div>
</template>
<script>
 export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        // let myChart = this.$echarts.init(document.getElementById('myChart'))
         let myChart = this.$echarts.init(this.$refs.myChart2)
        // 绘制图表
        myChart.setOption({
            title: { text: '迭代上线情况', x: "center" },
            tooltip: {},
            xAxis: {
                data: ["5.1","6.1","7.1","8.1","9.1","10.1"]
            },
            yAxis: {},
            series: [{
                name: '迭代',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
  }
}
</script>
