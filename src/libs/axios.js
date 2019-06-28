import axios from 'axios'
import { toast } from '@/libs/toastUtil.js'
import config from '@/config'
import cacheData from '@/service/cacheData.js'
import { LOCALDATA } from '@/libs/constans.js'
import storage from '@/libs/storage.js'
const MockUtil = () => import('@/libs/mockUtil.js')

class HttpRequest {
  constructor () {
    this.queue = {}
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      return { data, status }
      // return res.data.data;
    }, err => {
      this.destroy(url)
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '错误请求'
            break
          case 401:
            err.message = '未授权，请重新登录'
            break
          case 403:
            err.message = '拒绝访问'
            break
          case 404:
            err.message = '请求错误,未找到该资源'
            break
          case 405:
            err.message = '请求方法未允许'
            break
          case 408:
            err.message = '请求超时'
            break
          case 500:
            err.message = '服务器端出错'
            break
          case 501:
            err.message = '网络未实现'
            break
          case 502:
            err.message = '网络错误'
            break
          case 503:
            err.message = '服务不可用'
            break
          case 504:
            err.message = '网络超时'
            break
          case 505:
            err.message = 'http版本不支持该请求'
            break
          default:
            err.message = `连接错误${err.response.status}`
        }
      } else {
        err = { message: '连接失败:' + err }
      }
      // addErrorLog(errorInfo)
      if (err && err.message) {
        toast({
          message: err.message,
          position: 'top',
          duration: 3000
        })
      }
      return Promise.reject(err)
    })
  }
  request (options) {
    const instance = axios.create({
      baseURL: process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
    })
    this.interceptors(instance, options.url)
    return instance(options)
  }

  /**
   * 读取接口数据
   * @param options 请求信息
   * @param noMock  在整体使用mock数据的情形下，可 单独设置 某个接口请求真实数据
   * @param cacheId
   * @returns {*}
   */
  requestResolve (options, noMock = false, cacheId) {
    if (process.env.NODE_ENV === 'development' && config.isMockApi && !noMock) { return this.getMockData(options) }

    if (cacheId && cacheData[options.url + cacheId]) { return this.testHttp(cacheData[options.url + cacheId]) }
    return new Promise((resolve, reject) => {
      this.request(options).then(res => {
        if (res.data.code == 1000000) {
          storage.removeToken();
          // 重载当前url，当前路由有local保存
          const redirect = window.location.hash.substring(1)
          storage.setLocalStorage(LOCALDATA.REDIRECT, redirect)
          window.location.reload()
        }
        else if (res.data.code != 200) {
          if (res.data.message) {
            toast({
              message: res.data.message,
              position: 'top',
              duration: 5000
            })
          }
          reject(res.data)
        } else {
          if (cacheId) { cacheData[options.url + cacheId] = res.data.data }
          resolve(res.data.data)
        }
      }, err => {
        reject(err)
      })
    })
    /*
    return new Promise((resolve, reject) => {
      this.request(options).then(res => {
        if (res.data.code != 200) {
          if (res.data.message)
            toast({
            message: res.data.message,
            position: 'top',
            duration: 5000
          })
          reject(res.data)
        } else { resolve(res.data.data) }
      }, err => {
        reject(err)
      })
    })
*/
  }

  /**
   * mock数据按需导入
   * @param options
   * @returns {*}
   */
  async getMockData (options) {
    const Mock = await MockUtil()
    const MockUrl = Mock.default[options.url]
    if (typeof MockUrl !== 'function') { return this.testHttp(MockUrl) }
    if (options.method === 'post') { return this.testHttp(MockUrl(options.data, false)) }
    return this.testHttp(MockUrl(options.params, true))
  }
  testHttp (data) {
    let pro = new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(data)
      }, 500)
    })
    return pro
  }
  testHttpCache (data, cacheId) {
    if (cacheId && cacheData[cacheId]) { return this.testHttp(cacheData[cacheId]) }
    let pro = new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (cacheId) { cacheData[cacheId] = data }
        resolve(data)
      }, 500)
    })
    return pro
  }
}
export default HttpRequest
