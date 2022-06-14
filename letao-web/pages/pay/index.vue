<template>
  <div class="pay">
    <div class="payDone" v-if="payFlag">
      <h3>您已支付</h3>
    </div>
    <div class="payUnDone" v-else>
      <h3>支付二维码</h3>
      <van-image width="100" height="100" :src="payUrl"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      payUrl: "",
      timerId: null,
      payFlag: false,
    }
  },
  async mounted() {
    clearInterval(this.timerId)
    const params = {
      body: this.$route.query.name,
      total_fee: this.$route.query.price,
      spbill_create_ip: "127.0.0.1",
      trade_type: "NATIVE"
    }
    // 发起微信支付下单请求
    const {
      data: {
        payUrl,
        result_code,
        return_code,
        return_msg,
        appid,
        mch_id,
        nonce_str,
        out_trade_no
      }
    } = await this.$api.order(params);
    if (result_code[0] === "SUCCESS" && return_msg[0] === "OK" && return_code[0] === "SUCCESS") {
      this.payUrl = payUrl;

      const queryOrderParams = {
        appid,
        mch_id,
        nonce_str,
        out_trade_no
      }
      // 定时器发起请求
      this.timerId = setInterval(async() => {
        const {data:{trade_state}} = await this.$api.queryOrder(queryOrderParams);
        if(trade_state[0] === "SUCCESS") {
          this.payFlag = true;
          clearInterval(this.timerId);
        }
      }, 3000)
    }
  },

}
</script>

<style scoped>
.pay {
  text-align: center;
}
</style>
