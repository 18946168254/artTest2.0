<template>
  <div>
    <main class="flex-layout">
      <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
      <button @click="goClear">去清除登录</button>
    </main>
  </div>
</template>
<script>
  import { sendCode, login } from "@/api/index.js";
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入雷达图组件
  require('echarts/lib/chart/radar')
  require('echarts/lib/component/legend')

  export default {
    name: 'Edit',
    components: {
    },
    data () {
      return {
      }
    },
    mounted () {
      this.drawLine()
    },
    computed: {
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          legend: {
            orient : 'vertical',
            x : 'right',
            y : 'bottom',
            data:['预算分配（Allocated Budget）','实际开销（Actual Spending）']
          },
          polar : [
            {
              indicator : [
                { text: '销售', max: 6000},
                { text: '管理', max: 16000},
                { text: '信息技术', max: 30000},
                { text: '客服', max: 38000},
                { text: '研发', max: 52000},
                { text: '市场', max: 25000}
              ],
              center: ['50%', '42%'], // 位置
              radius: 80, // 大小
            },
          ],
          series : [
            {
              name: '预算 vs 开销（Budget vs spending）',
              type: 'radar',
              data : [
                {
                  value : [4300, 10000, 28000, 35000, 50000, 19000],
                  name : '预算分配（Allocated Budget）'
                },
                {
                  value : [5000, 14000, 28000, 31000, 42000, 21000],
                  name : '实际开销（Actual Spending）'
                }
              ]
            }
          ]
        });
      },
      goClear () {
        login().then(() => console.log('jk'))
      }
    },
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/css/function.less";
  @import "../../assets/css/variable.less";

  main {
    padding: 126px 0 110px 0;
    align-items: center;
    img {
      .square-hw(87);
    }
    div:first-of-type {
      font-family: PingFangSC-Regular;
      font-size: 33.6px;
      color: @base-finish-color;
      letter-spacing: 0.7px;
      margin-top: 18px;
      margin-bottom: 60px;
    }
    .header-custom {
      padding-top: 0;
    }
  }
</style>
