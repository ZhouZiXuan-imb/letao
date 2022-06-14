export default function ({app: {$request}}, inject) {
  inject('api', {
    // 首页API
    // 获取轮播图数据列表
    getBannerList(url, data) {
      return $request.$get(url, data);
    },
    // 获取宫格数据列表
    getGridList(url, data) {
      return $request.$get(url, data)
    },
    // 获取运动专区数据列表
    getSportList(url, data) {
      return $request.$get(url, data)
    },
    // 获取一级分类列表
    getOneCategoryList(data) {
      return $request.$get('/onecategory', data)
    },
    // 获取二级分类列表
    getTwoCategoryList(data) {
      return $request.$get(`/twocategory?id=${data}`);
    },


    // 注册页API
    // 获取短信验证码
    getSmsCode(data) {
      return $request.$post('/sms', data);
    },
    // 注册，存储用户数据到数据库
    postUserInfoToDB(data) {
      return $request.$post('/user/register', data)
    },


    // 登录页API
    login(data) {
      return $request.$post(`/user/login`, data);
    },


    // 支付页API
    // 微信下单
    order(data) {
      return $request.$post('/order', data);
    },
    // 微信订单查询
    queryOrder(data) {
      return $request.$post('/pay/queryOrder', data);
    }
  })
}
