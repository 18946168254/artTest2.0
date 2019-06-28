/**
 * 块级元素 展示loading，
 * 场景：
 * 按钮或div，点击后，展示内容为 loading 效果。
 */
export default {
  bind: function (el, binding, vnode) {
    el.originInner = el.innerHTML
  },
  update: function (el, binding, vnode, oldVnode) {
    if (binding.value && binding.value !== binding.oldValue) { // 第一次，设置为 加载中
      el.classList.add('zyby-btn-loading')
      el.innerHTML = `<div class="mint-spinner-triple-bounce">
                <div class="mint-spinner-triple-bounce-bounce1" style="width: 9.33333px; height: 9.33333px; background-color: #${binding.arg};"></div>
                <div class="mint-spinner-triple-bounce-bounce2" style="width: 9.33333px; height: 9.33333px; background-color: #${binding.arg};"></div>
                <div class="mint-spinner-triple-bounce-bounce3" style="width: 9.33333px; height: 9.33333px; background-color: #${binding.arg};"></div>
            </div>`
    } else if (!binding.value && binding.value !== binding.oldValue) { // 还原到老节点
      el.innerHTML = el.originInner
      el.classList.remove('zyby-btn-loading')
    }
  }
}
