import axios from '@/libs/api.request'
import { MessageBox } from 'mint-ui'
import config from '@/config'
import RemoteUrls from '@/libs/constantRemoteUrl.js'
import storage from '@/libs/storage.js'
import { toast } from '@/libs/toastUtil.js'

export const tipShow = () => {
  MessageBox.confirm('去下载?').then(action => {
    var u = navigator.userAgent; var url = config.downLoadUrl.android
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isIOS) {
      url = config.downLoadUrl.ios
    }
    window.open(url, '_blank')
  })
}
export const sendCode = (telephone) => {
  return axios.requestResolve({
    url: RemoteUrls.SEND_CODE,
    method: 'post',
    data: {
      telephone: telephone,
      smstype: 'login_by_code'
    }
  });
}
export const login = (data) => {
  return axios.requestResolve({
    url: RemoteUrls.CODE_LOGIN,
    method: 'post',
    headers: { uuid: config.uuid },
    data
  }, true)
}
export const getOpenId = ({ code }) => {
  return axios.requestResolve({
    url: RemoteUrls.GET_OPENID,
    method: 'post',
    data: {
      code
    }
  })
}
export const getSign = () => {
  return axios.requestResolve({
    url: RemoteUrls.GET_SIGN,
    method: 'post',
    headers: storage.getToken(),
  })
}
export const messagePageList = (params) => {
  return axios.requestResolve({
    url: RemoteUrls.MESSAGE_LIST,
    headers: storage.getToken(),
    params
  }, true)
}
export const messageDetail = (appraisalusrs_id) => {
  return axios.requestResolve({
    url: RemoteUrls.MESSAGE_DETAIL,
    headers: storage.getToken(),
    params: {appraisalusrs_id}
  }, true)
}

/********* 用户 **************/
export const getDirections = () => {
  return axios.requestResolve({
    url: RemoteUrls.DIRECTIONS,
  }, true, 'directions')
}
export const requestTest = (data) => {
  return axios.requestResolve({
    url: RemoteUrls.REQUEST_TEST,
    method: 'post',
    headers: storage.getToken(),
    data
  }, true)
}
