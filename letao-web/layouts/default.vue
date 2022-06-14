<template>
  <div>
    <!--  头部部分  -->
    <header>
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
      />
    </header>
    <!--  主体部分  -->
    <main>
      <Nuxt/>
    </main>
    <!--  底部部分  -->
    <footer>
      <van-tabbar v-model="active">
        <van-tabbar-item name="index" to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="category" to="/category" icon="bag-o">分类</van-tabbar-item>
        <van-tabbar-item name="cart" to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
        <van-tabbar-item name="my" to="/my" icon="friends-o">我的</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'

@Component({})
export default class DefaultLayout extends Vue {
  // 相当于data属性
  title: string = "" // 定义title
  active: string = this.$route.name as string // 声明标签栏当前选中

  // 定义改变active属性的方法
  handleChangeActive() {
    const currentActive = {
      index: "乐淘-首页",
      category: "乐淘-分类",
      cart: "乐淘-购物车",
      my: "乐淘-我的"
    }[this.$route.name!]

    this.title = currentActive!
  }

  // 使用mounted钩子函数 当DOM渲染完成后调用改变active的方法
  mounted() {
    this.handleChangeActive();
  }

  // 使用watch监听路由改变
  @Watch("$route")
  onChangeValue() { // 有两个参数，一个newVal 一个oldVal
    this.handleChangeActive();
  }



}
</script>

<style scoped>

</style>
