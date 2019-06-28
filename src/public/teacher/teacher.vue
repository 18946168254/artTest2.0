<template>
  <div id="app">

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="child-view-no-slide"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="child-view-no-slide"></router-view>

    <!--<router-view class="child-view-no-slide"/>-->

    <!--<transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>-->
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        transitionName: 'slide-right' // 默认动态路由变化为slide-right
      }
    },
    mounted () {
    },
    async created(){
      // todo 待：在需要的地方在设置
      await this.wx_jssdk.sdk_init();
      // 用户信息完整度：登录信息、openid；
      /* 登录分两步
      // 记录：
      // 检查用户信息：没有 去登录页。有登录信息，但没有openID，去首页。
      // step1:登录页：登陆成功后，去首页
      // step2:首页：根据是否有openid, 获取openid。
      let userInfo = storage.getLocalStorage(LOCALDATA.USER_INFO)
      if (!userInfo) {
        this.$router.push('login')
        return
      }
      if (userInfo && !userInfo[OPEN_ID]) {
        console.log('去到首页')
        this.$router.push('/')
      }*/
    }
    /* watch: {
      '$route' (to, from) {
        let isBack = this.$router.isBack //  监听路由变化时的状态为前进还是后退
        if (isBack) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
      }
    } */
}
</script>

<style>
  #app {
    background-color: #ffffff;
    height: 100%;
    max-width:677px;/*no*/
    margin-left:auto;
    margin-right:auto;
  }
  .child-view-no-slide {
        width: 100%;
        height: 100%;
  }

  /* 页面切换效果 */
  .child-view {
        /*　　margin: 300px auto; */
    　　width: 100%;
    　　height: 100%;
    　　transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        position: absolute;
  }
  .slide-left-enter, .slide-right-leave-active {
    　　opacity: 0;

    /*　　-webkit-transform: translate(750px, 0); */
    　　transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    　　opacity: 0;

    /*　　-webkit-transform: translate(-750px, 0); */
    　　transform: translate(-100%, 0);
  }

</style>
