/**
 * 选择器的公用代码
 * 可单选，可多选
 */
import { Confirm } from '@/libs/popUtil.js'

export default {
  data () {
    return {
      pickerCommonData: {
        visible: false,
        items: [{
          index: 0,
          name: 'title',
          values: []
        }]
      }
    }
  },
  methods: {
    updatePickerItem (who) {
      this.pickerCommonData.isAdd = false
      if (this.pd[who].length < 1) { this.pickerCommonData.isAdd = true }
      this.isShowPicker(who)
    },
    addPickerItem (who) {
      this.pickerCommonData.isAdd = true
      this.isShowPicker(who)
    },
    isShowPicker (who) {
      if (who && this.pd.curPickerName !== who) { this.pickerCommonData.items[0].values = this[who + 'Items'] }
      if (who) { this.pd.curPickerName = who }
      this.pickerCommonData.visible = who ? true : false
    },
    onPickerChange (value1) {
      this.pickerCommonData.temp = value1
    },
    surePicker () {
      this[this.pd.curPickerName + 'Set'](this.pickerCommonData.temp)
    },
    reducePickerItem (who, index) {
      Confirm('确认移除该选项？', () => this.pd[who].splice(index, 1))
    }
  }
}
