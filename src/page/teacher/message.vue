<template>
  <div>
    {{pd}}
  </div>
</template>
<script>
  import { messageDetail } from "@/api/index.js"

  export default {
    name: 'Message',
    components: {
    },
    data () {
      return {
        pm: {},
        pd: {
          message: null
        }
      }
    },
    mounted () {
    },
    computed: {

    },
    methods: {
    },
    created () {
      this.pm.id = this.$route.params.id
      messageDetail(this.pm.id).then(res => this.pd.message = res)
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
