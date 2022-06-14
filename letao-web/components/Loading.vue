<template>
  <div class="loading">
    <van-overlay :show="show" @click="show = false">
      <van-loading size="24px">加载中...</van-loading>
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      show: false
    }
  },
  methods: {
    start() {
      this.show = true;
    },
    finish() {
      this.show = false
    }
  }
}
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.loading .van-loading {
  margin-top: 50px;
  color: white !important;
}
</style>
