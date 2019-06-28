import Vue from 'vue'
import Router from 'vue-router'
import storage from '@/libs/storage.js'

const Detail = () => import('@/page/index/detail')
const Log = () => import('@/page/index/log')
const Report = () => import('@/page/index/report')
const Suc = () => import('@/page/index/suc')
const Home = () => import('@/page/index/home')

Router.prototype.goBack = (vm) => {
  vm.$router.isBack = true
  window.history.length > 1
    ? vm.$router.go(-1)
    : vm.$router.push('/')
}
// 返回根页面，最好的还是直接 router.go()。
// 当前方法 是按照 history长度 自动返回，仅限于 app内嵌。
Router.prototype.goBackRoot = (vm) => {
  vm.$router.isBack = true

  // history 不是从 当前域名开始计数的，而是从 该窗口打开开始计数
  let length = window.history.length
  alert('history长度：' + length)
  if (length > 2) { vm.$router.go(-(length - 1)) } else { vm.$router.goBack() }
}

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/log',
      name: 'Log',
      component: Log
    },
    {
      path: '/report',
      name: 'Report',
      component: Report
    },
    {
      path: '/suc',
      name: 'Suc',
      component: Suc
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
export default router
