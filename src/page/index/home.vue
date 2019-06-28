<template>
  <div class="flex-layout" ref="page">
    <main class="flex-layout-main zyby-container">
      {{pm}}
      <mt-field class="mint-field-custom mint-field-input-none" label="性别">
        <by-radio class="by-radio-custom" ref="sexRadio" :checkedChange="radioChanged" :radiosData="sexRadios.options" :name="sexRadios.name"></by-radio>
      </mt-field>
      <mt-field class="mint-field-custom" label="年龄" placeholder="请输入年龄" type="number" v-model="pm.age" @focus.native.capture="loginIntercept"></mt-field>
      <mt-field class="mint-field-custom mint-field-input-none mint-field-slot-all" label="学习方向">
        <div class="mint-field-slot-more" @click="loginIntercept();isShowPicker('direction')">
          <span class="zyby-form-field-placement" :class="{'mint-field-input-true': pd.direction}">{{pd.direction || '未选择'}}</span>
          <img src="../../assets/img/more.png">
        </div>
      </mt-field>
      <mt-field class="mint-field-custom mint-field-input-none" label="有无基础">
        <by-radio class="by-radio-custom" ref="baseRadio" :checkedChange="radioChanged" :radiosData="baseRadios.options" :name="baseRadios.name"></by-radio>
      </mt-field>
      <template v-if="!pd.inApp">
        <mt-field class="mint-field-custom" label="联系方式" placeholder="输入您的手机号码" v-model="pm.telephone" :attr="{maxlength: 11}">
          <div class="count-down-mod" :class="codeActivited">
            <by-count-down ref="countDown" :getcodebefore="getCode" model="validateCode">
              <span slot="secUnit">s</span>
            </by-count-down>
          </div>
        </mt-field>
        <mt-field class="mint-field-custom" label="验证码" placeholder="输入验证码" type="tel" v-model="pm.smscode" :attr="{maxlength: 6}"></mt-field>
      </template>
    </main>
    <footer class="zyby-footer-bt" @click="goReady" v-block-loading:000="pd.loadingFlag">提交</footer>
    <picker v-model="pickerCommonData.visible" :data-items="pickerCommonData.items" @change="onPickerChange">
      <div class="flex-between picker-operation" slot="top-content"><span @click="isShowPicker(null)">取消</span><span @click="surePicker">确定</span></div>
    </picker>
  </div>
</template>
<script>
  import { Radio, CountDown } from 'vue-zyby-ui'
  import tags from '@/mixins/modules/tags.js'
  import picker from '@/mixins/modules/picker.js'
  import { addMinutes, format} from 'date-fns'
  import { sendCode, getDirections, requestTest } from '@/api/index.js'
  import { cellPhoneValidate, numberValidate } from '@/libs/stringUtil.js'
  import { commonValidate } from '@/libs/validateUtil.js'
  import { getLoginInfo, setToken, isINAPP, goLoginPage } from '@/libs/utils'

  export default {
    name: 'Home',
    mixins: [ tags, picker ],
    components: {
      [Radio.name]: Radio,
      [CountDown.name]: CountDown
    },
    data () {
      return {
        pm: {
          age: null,
          telephone: null,
          smscode: null
        },
        pd: {
          inApp: false,
          direction: null,
          loadingFlag: false,
        },
        sexRadios: {
          options: [{ id: 1, title: '男' }, { id: 2, title: '女' }],
          name: 'sex'
        },
        baseRadios: {
          options: [{ id: 1, title: '有' }, { id: 0, title: '无' }],
          name: 'is_base'
        },
      }
    },
    mounted () {
    },
    computed: {
      codeActivited: function () {
        return {
          'count-down-mod-activited': this.pm.telephone
        }
      },
      needTipLogin () {
        return this.pd.inApp && !this.isLogin
      }
    },
    methods: {
      async pageInit () {
        this.pd.inApp = isINAPP()
        if (this.pd.inApp) {
          // 设置是否 登录
          let loginInfo = getLoginInfo()
          if(loginInfo) {
            this.isLogin = true
            setToken(loginInfo)
          }
        }
        if (!this.pd.inApp || this.isLogin) {
          const directions = await getDirections()
          this.directionItems = directions
          this.directionSet(directions[0])
          this.setSex(this.sexRadios.options[0].id)
          this.setBase(this.baseRadios.options[0].id)
        }
      },
      radioChanged (name, val) {
        if (this.loginIntercept()) {
          this.pm[name] = val
        }
      },
      setSex (id) {
        this.$refs.sexRadio.setCheckedVal(id)
        this.radioChanged('sex', id)
      },
      setBase (id) {
        this.$refs.baseRadio.setCheckedVal(id)
        this.radioChanged('is_base', id)
      },
      loginIntercept () {
        if (this.needTipLogin) {
          goLoginPage()
          return false
        }
        return true
      },
      directionSet (course) {
        let { appraisalcat_id, title } = course
        this.pm.appraisalcat_id = appraisalcat_id
        this.pd.direction = title
        this.isShowPicker(null)
      },

      validatePhone () {
        const validateData = [
          { '请输入联系方式': !this.pm.telephone },
          { '请输入正确的手机号': !cellPhoneValidate(this.pm.telephone) }
        ]
        return commonValidate(validateData)
      },
      getCode () {
        if (this.validatePhone()) {
          this.$refs.countDown.setEnd(format(addMinutes(new Date(), 1), 'YYYY/MM/DD HH:mm:ss'))
          return sendCode(this.pm.telephone)
        }
      },
      goReady () {
        if (!this.loginIntercept())
          return
        if (!this.pd.inApp && !this.validatePhone()) { return }
        const validateData = [
          { '请输入正确的学生年龄': this.pm.age < 1 || this.pm.age > 99},
        ]
        if (commonValidate(validateData)) {
          this.pd.loadingFlag = true
          requestTest(this.pm).then((res) => {
            this.$router.push('suc')
          }).finally(() => this.pd.loadingFlag = false)
        }
      },
    },
    created () {
      this.pageInit()
    },
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../../assets/css/variable.less";
  @import "../../assets/css/componentDeep.less";

  main {
    > div:first-child {
      padding-top: 60px;
    }

    .count-down-mod {
      font-family: PingFangSC-Regular;
      font-size: 20px;
      line-height: 20px;
      color: rgba(75,84,97, .45);
      background: rgba(75, 84, 97, 0.1);
      padding: 10px 20px 9px 20px;
      border-radius: 22px;/*no*/
      margin-left: 10px;
    }
    .count-down-mod-activited {
      color: @base-finish-color !important;
      background: rgba(19,219,191, .1) !important;
    }
    padding-top: 60px !important;
  }
</style>
