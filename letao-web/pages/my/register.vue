<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="repeatPassword"
        type="password"
        name="repeatPassword"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请再次确认密码' }]"
      />
      <van-field
        v-model="mobile"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请确认手机号' }]"
      />
      <van-field
        v-model="smsCode"
        name="smsCode"
        label="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请输入手机验证码' }]"
      >
        <template #button>
          <van-button
            type="primary"
            size="small"
            :disabled="smsCodeBtnFlag"
            @click="sendSmsHandle"
          >{{ smsCodeBtnText }}
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
      <!-- 用户需知 -->
      <van-row type="flex" justify="space-around">
        <van-col span="14">
          <van-checkbox v-model="isAgree">我同意《会员服务协议》</van-checkbox>
        </van-col>
        <van-col span="6">
          <NuxtLink to="/my/login">立即登录</NuxtLink>
        </van-col>
      </van-row>
    </van-form>
  </div>
</template>

<script>
import {validate} from "~/utils/fromValidate"
import {Toast} from "vant";

export default {
  name: "login",
  created() {
    // if(this.$store.state.token) {
    //   this.$router.push('/')
    //   Toast('您已登录，请勿重复登录');
    // }
  },
  data() {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      mobile: "",
      smsCode: "",
      smsCodeServer: "",
      smsCodeBtnFlag: false,
      isAgree: false,

      timer: null, // 初始化定时器

      smsCodeBtnText: "发送短信",

      // username的校验规则
      usernamePattern: /^ [a-zA-Z0-9]{4,16} $/,
      // password的校验规则
      passwordPattern: /^ [a-zA-Z0-9]{6,20} $/,
      // mobile的校验规则
      mobilePattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,

    };
  },
  methods: {

    async sendSmsHandle() {
      if(!this.mobile) {
        return Toast('手机号不能为空')
      }
      // 调用发送验证码接口
      const {code, status} = await this.$api.getSmsCode({mobile:this.mobile});
      if (status === 200) {

        this.smsCodeServer = code;
      }

      // 设置按钮为禁用
      this.smsCodeBtnFlag = true;
      let num = 30;
      // 倒计时三十秒
      this.timer = setInterval(() => {
        num--;
        // 修改按钮文字
        this.smsCodeBtnText = `${num}秒后重新发送`
        if (num === 0) {
          this.smsCodeBtnFlag = false;
          this.smsCodeBtnText = `发送短信`
          clearInterval(this.timer);
        }
      }, 1000)
    },
    onSubmit(values) {
      console.log(values)
      if(!this.isAgree) {
        return Toast('请阅读并同意会员服务协议');
      }
      const {username, password, mobile, smsCode} = values;
      const msg = validate.username(username) || validate.password(password, this.repeatPassword) || validate.mobile(mobile) || validate.smsCode(smsCode, this.smsCodeServer);
      if (msg) {
        return Toast(msg);
      }

      this.$router.push('/my/login');
      // 调用注册接口把用户信息存储到数据库
      this.$api.postUserInfoToDB(values);
      Toast('注册成功');
    },
  },


}
</script>

<style scoped>
</style>
