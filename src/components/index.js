import Quit from '@/components/Quit'
import { Back, NoData, ImgUpload } from 'vue-zyby-ui'

const registComponent = Vue => {
  Vue.component(NoData.name, NoData)
  Vue.component(Back.name, Back)
  Vue.component(Quit.name, Quit)
  Vue.component(ImgUpload.name, ImgUpload)
}
export default registComponent
