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
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
        <van-button round block type="primary" @click="gotoRegisterPage">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {validate} from "~/utils/fromValidate"
import {Toast} from "vant";
import cookie from "js-cookie"


import {mapActions} from "vuex";
export default {
  name: "login",
  created() {
    if(this.$store.state.token) {
      this.$router.push('/')
      Toast('您已登录，请勿重复登录');
    }
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['useSetToken','useSetUserName','useSetMobile']),
    async onSubmit(values) {
      const {username, password} = values;
      const msg = validate.username(username) || validate.password(password);

      if(msg) {
        return Toast(msg);
      }
      // 调用登录接口
      const {status, token, message, mobile} = await this.$api.login(values);
      if(status) {
        this.useSetToken(token);
        this.useSetUserName(username);
        this.useSetMobile(mobile);
        // 设置cookie
        cookie.set("token", token, { expires: 1 / 6 });
        cookie.set("username", username, { expires: 1 / 6 });
        cookie.set("mobile", mobile, { expires: 1 / 6 });
        this.$router.push('/');
        Toast(message);
      }

    },
    gotoRegisterPage() {
      this.$router.push('/my/register')
    }
  },
}
</script>

<style scoped>
</style>
