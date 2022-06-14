<template>
  <div class="home">
    <!-- 1.轮播图 -->
    <IndexBanner :bannerList="bannerList"></IndexBanner>
    <!-- 2.宫格 -->
    <IndexGridList :gridList="gridList"></IndexGridList>
    <!-- 3.活动 -->
    <IndexActive></IndexActive>
    <!-- 4.品牌 -->
    <IndexBrand></IndexBrand>
    <!-- 5.运动 -->
    <IndexSportList :sportList="sportList"></IndexSportList>
  </div>
</template>

<script>
export default {
  async asyncData({$api, /*$axios, $request*/ }) {
    const {bannerList = []} = await $api.getBannerList("/banners");
    const {gridList = []} = await $api.getGridList("/gridlist");
    const {sportList = []} = await $api.getSportList("/sports");

    return {
      bannerList: bannerList,
      gridList: gridList,
      sportList: sportList
    }
  }
}
</script>
