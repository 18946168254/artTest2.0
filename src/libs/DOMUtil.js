/**
 * 得到body高度
 * @returns {Number|number}
 */
export const getClientH = () => {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}
/**
 * 得到元素相对窗口的位置信息-相对于左上角
 * @returns {Number|number}
 */
export const getPosForView = ($el) => {
  return $el.getBoundingClientRect()
}
