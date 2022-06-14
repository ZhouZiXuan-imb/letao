<template>
  <div class="category">
    <van-tree-select
      :main-active-index.sync="active"
      height="55vw"
      :items="oneCategory"
      @click-nav="handleChangeNav"
    >
      <template #content>
        <van-grid :border="false" column-num="3">
          <van-grid-item v-for="item in twoCategory" :key="item.id">
            <div class="two-category-image">
              <van-image :src="item.brandLogo"/>
            </div>
            <div>{{ item.brandName }}</div>
          </van-grid-item>
        </van-grid>
      </template>
    </van-tree-select>
  </div>
</template>

<script>

export default {
  name: "category",
  data() {
    return {
      // activeIndex: 0,
    }
  },
  async asyncData({$api, query}) {
    const active = query.id || 0;
    let {oneCategory} = await $api.getOneCategoryList()

    oneCategory = oneCategory.map(item => {
      // console.log(item.categoryName)
      return {
        id: item.id,
        text: item.categoryName
      }
    })

    const {bannerList = []} = await $api.getTwoCategoryList(oneCategory[active]['id']);
    // console.log(bannerList)

    return {
      active,
      oneCategory,
      twoCategory: bannerList
    }
  },
  methods: {
    async handleChangeNav(index) {
      this.$router.replace(`/category?id=${index}`)
      // console.log(index)
      const {bannerList = []} = await this.$api.getTwoCategoryList(this.oneCategory[index]['id']);
      this.twoCategory = bannerList
    }
  }
}
</script>

<style scoped>
.category {
  height: 90vh;
}

.category .van-tree-select {
  height: 90vh !important;
}
</style>
