export const isIos = () => {
  let u = navigator.userAgent
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isIOS) { return true }
  return false
}
