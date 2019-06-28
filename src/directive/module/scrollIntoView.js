/**
 * 聚焦事件，使输入框 展示在可视范围内。
 * 解决 键盘遮挡输入框问题。
 */
export default {
  bind: function (el, binding, vnode) {
    el.addEventListener('focus', () => {
      setTimeout(() => { el.scrollIntoViewIfNeeded() }, 500)
    }, true)
  }
}
