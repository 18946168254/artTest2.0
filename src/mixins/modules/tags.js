/**
 * 多条标签的公用代码
 */
import { Confirm } from '@/libs/popUtil.js'
import { AWord } from 'vue-zyby-ui'

export default {
  components: {
    [AWord.name]: AWord
  },
  data () {
    return {
      pd: {
        tagInputVisible: false,
        tags: []
      }
    }
  },
  methods: {
    updateTag () {
      this.pd.isAddTag = false
      let curVal = null
      if (!this.pd.tags.length) { this.pd.isAddTag = true } else { curVal = this.pd.tags[0] }
      this.$refs.awordHandle.initContent(curVal)
      this.pd.tagInputVisible = true
    },
    addTag () {
      this.pd.isAddTag = true
      this.$refs.awordHandle.initContent(null)
      this.pd.tagInputVisible = true
    },
    delTag (index) {
      Confirm('确认移除该选项？', () => this.pd.tags.splice(index, 1))
    },
    hideTagInput () {
      this.pd.tagInputVisible = false
    },
    sureTag (tag) {
      if (this.pd.tags.indexOf(tag) > -1) { return }
      if (this.pd.isAddTag) { this.pd.tags.push(tag) } else { this.pd.tags[0] = tag }
    }
  }
}
