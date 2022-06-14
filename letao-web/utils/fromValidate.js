export const validate = {
  username(userName) {
    if (!userName.trim()) {
      return "用户名不能为空"
    }
    if (!/^[a-zA-Z0-9]{4,20}$/.test(userName.trim())) {
      return "用户名长度必须在4-16位";
    }
  },
  password(password, repeatPassword) {
    if (!password.trim()) {
      return "密码不能为空"
    }

    if (!/^[a-zA-Z0-9]{6,20}$/.test(password.trim())) {
      return "密码必须在6-20位"
    }

    if (repeatPassword && password !== repeatPassword) {
      return "两次密码不一致，请重新输入";
    }
  },
  mobile(mobile) {
    if (!mobile.trim()) {
      return "手机号不能为空"
    }

    if(!/^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/.test(mobile.trim())) {
      return "请检查手机号格式"
    }
  },
  smsCode(smsCode, smsCodeServer) {
    if(!smsCode.trim()) {
      return "验证码不能为空"
    }
    console.log(smsCode, smsCodeServer)
    if(smsCode !== smsCodeServer) {
      return "验证码不正确"
    }
  },
}
