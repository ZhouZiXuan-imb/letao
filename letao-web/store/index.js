import cookieParser from "cookieparser"

const state = () => {
  return {
    token:"",
    username:"",
    mobile: "",
  }
}

const mutations = {
  // 清空token
  clearToken(state) {
    state.token = '';
  },
  // 设置token的方法
  setToken(state, payload) {
    state.token = payload || ""
  },
  setUserName(state, payload) {
    state.username = payload || ""
  },
  setMobile(state, payload) {
    state.mobile = payload || ""
  },
}

const actions = {
  useSetToken(context, payload) {
    context.commit('setToken', payload);
  },
  useSetUserName(context, payload) {
    context.commit('setUserName', payload);
  },
  useSetMobile(context, payload) {
    context.commit('setMobile', payload);
  },
  nuxtServerInit({dispatch, store},{req}) {
    if(req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie);
      dispatch("useSetToken", parsed.token);
      dispatch("useSetUserName", parsed.username);
      dispatch("useSetMobile", parsed.password);
    }
  },
}

export {state, mutations, actions}
