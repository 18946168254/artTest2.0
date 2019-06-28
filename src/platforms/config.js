import { isIos } from './utils'
import config from '@/config/index.js'
import { ANDROID_CALL_PRE, GLOBAL_LOGIN_INFO } from '@/libs/constans.js'

/**
 * js与原生交互统一处理：
 * 1、js调用原生，传参 默认 空字符串
 * 2、原生传值给js 统一调用 window下方法
 * @type {{isIos, callNative: ((p1:*, p2?:*)), getLoginInfo: (())}}
 */
const Platform = {
  isIos: isIos(),
  isBrowser: () => {
    if (Platform.isIos && window.webkit) {
      return false
    } else if (!Platform.isIos && window[ANDROID_CALL_PRE]) {
      return false
    }
    return true
  },
  callNativeIOS: (eventName, pmStr) => {
    window.webkit.messageHandlers[eventName].postMessage(pmStr)
  },
  callNative: (eventName, pm = {}) => {
    if (process.env.NODE_ENV === 'development' && config.isMockApp){
      let str = pm.callBack
      window[str](JSON.stringify({
        image: '我是图片路径.jpg'
      }))
      return;
    }
    if (Platform.isIos) {
      Platform.callNativeIOS(eventName, JSON.stringify(pm))
      window.webkit.messageHandlers[eventName].postMessage(JSON.stringify(pm))
    } else {
      window[ANDROID_CALL_PRE][eventName](JSON.stringify(pm))
    }
  },
  /**
   * 调用原生方法，并告知 回调h5方法名。
   * @param callback 回调h5方法名
   * @param pm 附带参数
   */
  callNativeV2: (callback, pm) => {
    if (process.env.NODE_ENV === 'development' && config.isMockApp) {
      let str = 'g' + eventName.slice(1)
      window[str](JSON.stringify({
        image: '我是图片路径.jpg'
      }))
      return
    }
    const message = JSON.stringify({ callback: callback, pm: pm })
    if (Platform.isIos) {
      window.webkit.messageHandlers.callNative.postMessage(message)
    } else {
      window[ANDROID_CALL_PRE].callNative(message)
    }
  },
  getLoginInfo: () => {
    if (process.env.NODE_ENV === 'development' && config.isMockApp) {
      return {
        telephone: '15214713693',
        uuid: '1cb8d70c2d88b074',
        type: '3',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYXlpbiIsImF1ZCI6ImJheWluQXBwIiwiaWF0IjoxNTYxMTAzNTM3LCJkYXRhIjp7InVzZXJmcm9udF9pZCI6NDEwLCJ1dWlkIjoiMWNiOGQ3MGMyZDg4YjA3NCJ9fQ.qETru6X4NgAf4x--Lw1INg1IY58d04UaP9i9fNO1SU4'
      }
    }
    return Platform.getInitedData(GLOBAL_LOGIN_INFO)
  },
  getInitedData: (eventName) => {
    if (process.env.NODE_ENV === 'development' && config.isMockApp) {
      return {
        lessionId: '72',
        orgId: 392,
        from: 'detail',
        tel: '18161825859',
        userId: 17
      }
    }
    if (Platform.isIos) {
      return window[eventName]
    } else {
      let res = window[ANDROID_CALL_PRE][eventName]('')
      return res ? JSON.parse(res) : ''
    }
  }
}

export default Platform
