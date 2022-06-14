<template>
  <div class="banner">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" lazy-render>
      <van-swipe-item class="my-swipe-item"  v-for="(item) in bannerList" :key="item.id">
        <img class="swiper-img" :src="item.img_src" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component({})
export default class HomePage extends Vue {
  @Prop({type: Array}) bannerList!: {}[]
}
</script>

<style scoped>
.banner .my-swipe-item {
  width: 100%;
}

.banner img {
  width: 100%;
}
</style>
