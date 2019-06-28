<template>
  <div>
    <main class="flex-layout">
      <img src="../../assets/img/auth/success_green.png">
      <div>提交成功</div>
    </main>
  </div>
</template>
<script>
  export default {
    name: 'Suc',
    components: {
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    computed: {
    },
    methods: {

    }
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
