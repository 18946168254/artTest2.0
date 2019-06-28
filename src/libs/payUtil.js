import { Toast } from 'mint-ui'

const jsApiCall = (vm, params, url) => {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', params,
    function (res) {
      if (res.err_msg === 'get_brand_wcpay_request:ok') {
        vm.$router.replace(url)
      } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
        Toast('已取消支付')
      } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
        Toast('支付失败')
      }
    }
  )
}

export const callWxPayJsApi = (vm, params, url) => {
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', jsApiCall(vm, params, url), false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', jsApiCall(vm, params, url))
      document.attachEvent('onWeixinJSBridgeReady', jsApiCall(vm, params, url))
    }
  } else {
    jsApiCall(params)
  }
}
export const callWxPayH5 = (mweb_url) => {
  location.href = mweb_url
}
export const isWeiXin = () => {　　　　// 判断是否微信平台
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}
