<template>
  <div class="my">
    <h3>个人信息</h3>
    <span>用户名:</span><span>{{this.$store.state.username}}</span>
    <span>手机号:</span><span>{{this.$store.state.mobile}}</span>
  </div>
</template>

<script>
export default {
  name: "my"
}
</script>

<style scoped>
.my {
  text-align: center;
}
</style>
