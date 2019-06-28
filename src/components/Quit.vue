<template>
    <mt-button @click="goQuit">
      <img src="../assets/icon/close_black.png" slot="icon">
    </mt-button>
</template>

<script>

  export default {
    name: 'Quit',
    data () {
      return {
      }
    },
    methods: {
      goQuit () {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../assets/css/function.less";

  img {
    .square-hw(60);
    vertical-align: middle;
  }
</style>
