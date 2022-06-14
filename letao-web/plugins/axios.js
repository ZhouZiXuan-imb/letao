import {Toast} from "vant"
import {httpCode} from "./httpCode"
// 二次封装nuxtjs内置的axios插件
export default function ({$axios, redirect, store}, inject) {
  $axios.onRequest((config) => {
    // 使用请求拦截器，在请求发起之前给请求头添加token
    if (store.state.token) {
      $axios.setHeader("Authorization", `Bearer ${store.state.token}`);
    }
  });

  $axios.onResponse(response => {
    const {data: {status, message}} = response;
    if (status !== 200) {
      Toast(message);
    }
    return response
  });

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)


    if (code === 401) {
      store.commit('clearToken')
      redirect('/my/login')

    } else {
      Toast(httpCode[code]);
    }
  });


  // 封装axios请求方式(第一种方式，使用 $axios({}) 的方式)
  // ['get','post','put','delete'].reduce((requestMethod, method) => {
  //   const paramsOrData = method === "get" || method === "delete"? 'params':'data';
  //
  //   return requestMethod[method] = (url,data) => {
  //     return $axios({
  //       url,
  //       method,
  //       [paramsOrData]: data
  //     })
  //   }
  // },{})


  // 封装axios请求方式(第二种方式，使用 $axios.xxx(url,data) 的方式)
  const requestMethod = ['$get', '$post', '$put', '$delete'].reduce((reduce, method) => {
    /**
     *
     * @param url  请求地址
     * @param data   请求参数
     * @returns {*}    返回一个Promise对象
     */
    reduce[method] = (url, data) => {
      return $axios[method](url, data)
    }

    return reduce
  }, {})


  // 封装axios请求方式(第三种方式，使用 forEach 的方式)
  // const requestMethod = {};

  // ['get', 'post', 'put', 'delete'].forEach(( method) => {
  //   requestMethod[method] = (url, data) => {
  //     return $axios[method](url, data);
  //   }
  // })

  // 注入requestMethod方法
  inject('request', requestMethod);
}
