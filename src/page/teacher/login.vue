<template>
  <div class="zyby-container box-sizing-border">
    <!--<mt-header>
      <by-back slot="left"></by-back>
    </mt-header>-->
    <div class="welcome-block">欢迎登录八音！</div>
    <div class="input-block">
      <mt-field
        class="none-border"
        placeholder="手机号"
        type="tel"
        v-model="pm.telephone"
        :attr="{ maxlength: 11 }"
      ></mt-field>
      <mt-field placeholder="验证码" type="tel" v-model="pm.smscode" :attr="{ maxlength: 6 }">
        <count-down
          ref="countDown"
          class="count-down"
          :getcodebefore="getCode"
          :model="codeData.model"
        >
          <span slot="secUnit">s</span>
        </count-down>
      </mt-field>


    </div>
    <div class="interpretation">完成“八音App”登录注册以便后续奖励发</div>
    <mt-button
      class="login-block"
      :class="classObject"
      type="primary"
      size="large"
      :disabled="!loginFlag"
      @click="goLogin"
    >登录</mt-button>

    <div class="tip-block">未注册用户登录代表已同意注册</div>
  </div>
</template>
<script>
import { CountDown } from "vue-zyby-ui";
import { addMinutes, format} from 'date-fns'
import { sendCode, login } from "@/api/index.js";
import { cellPhoneValidate, numberValidate } from "@/libs/stringUtil.js";
import { LOCALDATA } from '@/libs/constans.js'
import storage from '@/libs/storage.js'
import { commonValidate } from '@/libs/validateUtil.js'
import { Confirm } from '@/libs/popUtil.js'
import config from '@/config'

export default {
  name: "Login",

  components: {
    CountDown
  },
  data() {
    return {
      codeData: {
        showCountDown: false,
        model: "validateCode"
      },
      pm: {
        telephone: null,
        code: null,
      }
    };
  },
  mounted() {
    document.querySelectorAll("input").forEach(item => {
      item.addEventListener("blur", function() {
        window.scroll(0, 0);
      });
    });
  },
  computed: {
    classObject: function() {
      return {
        "login-block-active": this.pm.telephone && this.pm.smscode
      };
    },
    loginFlag: function() {
      return this.pm.telephone && this.pm.smscode;
    }
  },
  methods: {
    getCode() {
      if (this.validatePhone()) {
        this.$refs.countDown.setEnd(format(addMinutes(new Date(), 1), 'YYYY/MM/DD HH:mm:ss'))
        return sendCode(this.pm.telephone);
      }
    },
    validatePhone() {
      const validateData = [
        { '请输入联系方式': !this.pm.telephone },
        { '请输入正确的手机号': !cellPhoneValidate(this.pm.telephone) }
      ]
      return commonValidate(validateData)
    },
    goLogin() {

      if (!this.validatePhone()) { return false }
      const validateData = [
        { '请刷新本页并允许授权获取用户信息': !this.pm.code },
        { '请输入验证码': !this.pm.smscode },
        { '请输入正确的验证码': (this.pm.smscode.length != 6 || !numberValidate(this.pm.smscode)) },
      ]
      if (commonValidate(validateData)) {
        Confirm(`确认 ${this.pm.telephone} 与当前微信绑定？`, () => {
          this.pm.isbinding = 1
          login(this.pm).then(res => {
            // 设置登录标志
            res.telephone = this.pm.telephone
            res.uuid = config.uuid
            res.type = 5
            storage.setToken(res)
            const redirect = storage.getLocalStorage(LOCALDATA.REDIRECT)
            if (redirect) storage.remove(LOCALDATA.REDIRECT)
            this.$router.push(redirect || '/')
          })
        })

      }
    }
  },
  created () {
    this.pm.code = this.wx_jssdk.get_code('snsapi_userinfo')
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@import "../../assets/css/function.less";

@no-left-padding: {
  padding-left: 0;
};
@border-bottom-style: {
  border-bottom: 1px solid #d3dfef; /*no*/
};
.input-text(@opacity: 0.45) {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: rgba(75, 84, 97, @opacity);
}
.interpretation{
  width: 100%;
  background-color: #EEFAF8;
  height: 52px;
  line-height: 52px;
  font-size: 24px;
  color: #009F8A;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 180px;
}
.mint-header {
  @no-left-padding();
}
.zyby-container {
  padding-top: 88px;
  position: relative;
  height: 100%;
  background-color: #fff;
}
.welcome-block {
  font-family: PingFangSC-Semibold;
  font-size: 50px;
  color: rgba(62, 74, 89, 0.75);
  letter-spacing: 2px; /*no*/
  text-align: left;
  line-height: 50px;
  margin-top: 56px;
}
.input-block {
  margin-top: 108px;
  /*margin-bottom: 211px;*/
  @border-bottom-style();
  /deep/ .mint-cell-wrapper {
    padding-left: 0;
  }
  .none-border /deep/ .mint-cell-wrapper {
    background: none;
  }
  .mint-field:first-child {
    @border-bottom-style();
  }
  /deep/ input::-webkit-input-placeholder {
    .input-text();
  }
  .count-down {
    .input-text();
    border-left: 1px solid rgba(75, 84, 97, 0.45); /*no*/
    margin-left: 40px;
    padding-left: 10px;
    /deep/ .code-text {
      color: rgba(75, 84, 97, 0.45);
    }
    /deep/ .code-count-down {
      color: rgba(75, 84, 97, 0.8);
    }
  }
}
.tip-block {
  opacity: 0.75;
  font-family: PingFangSC-Regular;
  font-size: 22px;
  color: rgba(75, 84, 97, 0.45);
  line-height: 22px;
  margin-top: 100px;
  text-align: center;
}
.login-block {
  background-color: rgba(0, 0, 0, 0.1);
  height: 100px;
  border-radius: 12px; /*no*/
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: #ffffff;
  letter-spacing: 3px; /*no*/
  text-align: center;
  line-height: 32px;
}
.login-block-active {
  background-color: #3ad29f;
}
</style>
