/**
 * 多图上传-固定位
 */
import { getImgUrl } from '@/service/common.js'

export default {
  methods: {
    initMultiImg (originImgs, size) {
      this.pd.imgs = []
      let index = 0
      let { length } = originImgs
      while (index < size) {
        this.pd.imgs.push(length > index ? originImgs[index] : {})
        this.pd['imgUrl' + index] = getImgUrl(this.pd.imgs[index])
        index++
      }
    },
    resolveImg (str) {
      let img = str ? JSON.parse(str) : {}
      this.pd.imgs[this.imgData.index] = img
      this.pd['imgUrl' + this.imgData.index] = getImgUrl(img, false)
    },
    deleteImg (index) {
      this.pd['imgUrl' + index] = null
      this.pd.imgs[index] = {}
    }
  }
}
