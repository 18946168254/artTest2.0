import config from '@/config/index.js'
import storage from '@/libs/storage.js'
import { LOCALDATA, CLOSE_WEB_PAGE, IN_APP, GO_LOGIN } from '@/libs/constans.js'
import Platform from '@/platforms/config'

export const setToken = (token) => {
  config.token = token
}
export const getToken = () => {
  const token = config.token
  if (token) return token
  else return false
}
export const setINAPP = (flag) => {
  config[IN_APP] = flag
}
export const isINAPP = () => {
  return config[IN_APP]
}
export const closeWebPage = () => {
  Platform.callNative(CLOSE_WEB_PAGE)
}
export const getLoginInfo = () => {
  return Platform.getLoginInfo()
}
export const goLoginPage = () => {
  Platform.callNative(GO_LOGIN)
}
export const getUrlParam = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}
export const initRecord = () => {
  if(!storage.getLocalStorage(LOCALDATA.RAIL_ALLOW_RECORD)){
    wx_jssdk.startRecord().then(() => {
      storage.setLocalStorage(LOCALDATA.RAIL_ALLOW_RECORD, true)
      wx_jssdk.stopRecord()
    }, (err) => toast(err))
  }
}

