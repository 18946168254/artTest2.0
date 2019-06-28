import Vue from 'vue'
import Router from 'vue-router'
import storage from '@/libs/storage.js'

const Test = () => import('@/page/teacher/test')
const Home = () => import('@/page/teacher/home')
const Login = () => import('@/page/teacher/login')
const Edit = () => import('@/page/teacher/edit')
const Message = () => import('@/page/teacher/message')
const Report = () => import('@/page/teacher/report')

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
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/message/:id',
      name: 'Message',
      component: Message
    },
    {
      path: '/report',
      name: 'Report',
      component: Report
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 用户信息完整度：登录信息、openid；
  // 登录一步完成
  // 记录：
  // 检查用户信息：没有 去登录页。
  // step1：在登录页，先获取code，再手机号登录
  let user = storage.getToken()
  if (to.fullPath !== '/login' && !user)
    next('login')
  else if(to.fullPath === '/login' && user)
    next('/')
  else
    next()
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
export default router
