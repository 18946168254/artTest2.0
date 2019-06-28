// 平台调用
export const PHONE_BACK_BUTTON_LISTENER = 'phoneBackButtonListener'
export const ANDROID_CALL_PRE = 'android'
export const CLOSE_WEB_PAGE = 'closeWebPage'
export const GO_LOGIN = 'goLogin' // 没有登录情形下，请登录，然后刷新页面

// 平台调用-得到初始化数据
export const GLOBAL_LOGIN_INFO = 'globalLoginInfo' // 登录token

// config
export const IMG_TEMP_PRE = 'tempPre'
export const IMG_REAL_PRE = 'realPre'
export const IN_APP = 'IN_APP' // APP内 打开

// 样式
export const BOUNCE_IN_DOWN = 'animated bounceInDown'
export const BOUNCE_OUT_LEFT = 'animated bounceOutLeft'
export const BOUNCE_OUT_RIGHT = 'animated bounceOutRight'

// 广播事件

// 业务相关-身份认证 状态
export const AUTH_NOT = '-1'
export const AUTH_NULL = '0'
export const AUTH_READY = '1'
export const AUTH_SUC = '2'
export const AUTH_FAIL = '3'

// 业务相关-登录标志 openid
export const OPEN_ID = 'openId'

// localstorage
export const LOCALDATA = {
  USER_INFO: 'USER_INFO',
  RAIL_ALLOW_RECORD: 'RAIL_ALLOW_RECORD',
  REDIRECT: 'REDIRECT'
}
