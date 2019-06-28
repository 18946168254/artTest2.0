<template>
  <div>
    <main class="flex-layout">
      <div>编辑</div>
    </main>
  </div>
</template>
<script>
  import { initRecord } from '@/libs/utils.js'

  export default {
    name: 'Edit',
    components: {
    },
    data () {
      return {
      }
    },
    mounted () {
      initRecord()
    },
    computed: {
    },
    methods: {
    },
    /*async created () {
      let code = this.wx_jssdk.get_code('snsapi_userinfo')
      let userInfo = await getOpenId(code)
      storage.setLocalStorage(LOCALDATA.USER_INFO, userInfo)
    }*/
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
