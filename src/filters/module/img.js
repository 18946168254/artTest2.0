import config from '@/config'
import { IMG_REAL_PRE } from '@/libs/constans.js'
export const imgPre = function (imgUrl) {
  if (imgUrl) { return config.img.domain + imgUrl }
  return ''
}
export const imgPreReal = function (imgUrl) {
  if (imgUrl) { return config.img.domain + config.img[IMG_REAL_PRE] + imgUrl }
  return ''
}
export const preAndDefault = function (imgUrl, defaultImg) {
  let img = imgPre(imgUrl)
  if (!imgUrl) { img = defaultImg }
  return img
}
