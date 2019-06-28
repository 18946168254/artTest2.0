// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './teacher.vue'
import Vuex from 'vuex'
import router from './router'
import { Button, Header, Popup, Field, Navbar, TabItem, TabContainer, TabContainerItem, Cell, Spinner, Loadmore, Actionsheet } from 'mint-ui'
import 'lib-flexible'
import axios from 'axios'

// 样式导入
import '@/assets/css/common.css'
// 平台导入
import Platform from '@/platforms/index'// eslint-disable-line no-unused-vars

// 弹幕导入
// import './assets/style.css'

// 全局指令
import registDirective from '@/directive/index.js'

// 全局组件
import registComponent from '@/components/index.js'

// 全局过滤器
import registFilter from '@/filters/index.js'

// jssdk
import wx_jssdk from "@/libs/wx_jssdk.js";

import config from '@/config/index.js'

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Popup.name, Popup)
Vue.component(Field.name, Field)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Cell.name, Cell)
Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Actionsheet.name, Actionsheet)

// 注册指令
registDirective(Vue)

// 注册组件
registComponent(Vue)

// 注册过滤器
registFilter(Vue)

Vue.prototype.axios = axios
Vue.prototype.wx_jssdk = wx_jssdk;

Vue.config.productionTip = false

// 读取接口域名
config.requestRemoteIp().finally(res => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
})
