/**
 * VueHtml5Editor
 */
import VueHtml5Editor from 'vue-html5-editor'
// import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'

import { h5EditorUpload } from '@/api/index.js'
const editor = new VueHtml5Editor(h5EditorUpload())

// const editor = () => import('vue-html5-editor').then(({default: VueHtml5Editor}) => {
//   console.log('VueHtml5Editor', VueHtml5Editor)
//   return new VueHtml5Editor(h5EditorUpload())
// })

export default {
  components: {
    editor
  }
}
