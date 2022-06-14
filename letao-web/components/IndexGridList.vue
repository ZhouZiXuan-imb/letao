<template>
  <div class="grid-list">
    <van-grid :border="false" column-num="3">
      <van-grid-item v-for="item in gridList" :key="item.id">
        <van-image :src="item.img_src"/>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator"

@Component({})
export default class HomePage extends Vue {
  @Prop({type: Array}) gridList!: Array<{}>
}
</script>

<style scoped>

</style>
