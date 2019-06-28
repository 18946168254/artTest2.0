/**
 * video标签的伪 poster 功能
 * 适用于小米、三星、ios可用，华为不可用(究极是无法自动播放、手动播放会暂停一次)。
 * <video muted autoplay="autoplay" controls="controls" webkit-playsinline playsinline></video>
 *
 * 注：效果体验并不是太好，建议由后台传输 此项 图片。
 */
export default {
  bind: function (el, binding, vnode) {
    el.posterSetted = false
    el.addEventListener('timeupdate', () => {
      if (!el.posterSetted && el.currentTime > 0.1) {
        el.pause()
        el.currentTime = 0
        el.posterSetted = true
      }
    })
  }
}
