import { toast } from './toastUtil.js'
/**
 * 普通验证
 * 形如 [
 {'请输入姓名': !this.pm.title},
 {'请选择出生年月': !this.pm.birthday},
 {'请选择就读院校': !this.pm.college_id},
 {'请选择所学专业': !this.pm.collegemajor_id},
 {'请先上传身份证明': !this.pm.approve_img.image},
 ]
 * @param pmArr
 * @returns {boolean}
 */
export const commonValidate = function (pmArr) {
  for (let cur of pmArr) {
    let key = Object.keys(cur)[0]
    if (cur[key]) {
      toast(key)
      return false
    }
  }
  return true
}
