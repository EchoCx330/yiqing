<template>
  <div class="home">
    <!-- 1. 疫情图片 -->
    <div class="logo">
      <img src="@/assets/images/logo.png" width="100%" alt="" />
      <!-- 点击进入城市选择 -->
    </div>
    <!-- 2. 病毒信息 -->
    <CovInfo :covDesc="covDesc" :news="news" />
    <!-- 3. 疫情-小导航 -->
    <div class="list">
      <div>
        <router-link to="/area">
          <img src="@/assets/images/1.png" alt="" />
          <div>风险地区</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hesuan">
          <img src="@/assets/images/2.png" alt="" />
          <div>核算检测</div>
        </router-link>
      </div>
      <div>
        <router-link to="/prevention">
          <img src="@/assets/images/3.png" alt="" />
          <div>防疫物资</div>
        </router-link>
      </div>
      <div>
        <router-link to="/travel">
          <img src="@/assets/images/4.png" alt="" />
          <div>出行政策</div>
        </router-link>
      </div>
    </div>
    <!-- 4.数据统计 -->
    <CovNumber :covData="covData" />
    <!-- 5.中国地图 -->
    <ChinaMap />
    <!-- 6.世界地图 -->
    <WorldMap />
    <!-- 7.轮播图 -->
    <VueSwiper />
  </div>
</template>

<script>
import CovInfo from "../Home/CovInfo/CovInfo.vue";
import CovNumber from "./CovInfo/CovNumber.vue";
import ChinaMap from "./VueEcharts/ChinaMap.vue"
import WorldMap from "./VueEcharts/WorldMap.vue"
import VueSwiper from "./VueSwiper/VueSwiper.vue"
import api from "@/api/index";

export default {
  name: "Home",
  data() {
    return {
      covDesc: {},
      news: [],
      covData: {},
    };
  },
  components: {
    CovInfo,
    CovNumber,
    ChinaMap,
    WorldMap,
    VueSwiper
  },
  created() {
    // 请求病毒接口
    api.getCovInfo().then((res) => {
      // 1.病毒信息介绍
      let data = res.data.newslist[0].desc;
      this.covDesc = {
        note1: data.note1,
        note2: data.note2,
        note3: data.note3,
        remake1: data.remake1,
        remake2: data.remake2,
        remake3: data.remake3,
      };
      //2.疫情热点
      this.news = res.data.newslist[0].news;
      // 3.全国疫情的数据统计信息
      this.covData = {
        currentConfirmedCount: data.currentConfirmedCount,
        confirmedCount: data.confirmedCount,
        suspectedCount: data.suspectedCount,
        curedCount: data.curedCount,
        deadCount: data.deadCount,
        seriousCount: data.seriousCount,
        suspectedIncr: data.suspectedIncr,
        currentConfirmedIncr: data.currentConfirmedIncr,
        confirmedIncr: data.confirmedIncr,
        curedIncr: data.curedIncr,
        deadIncr: data.deadIncr,
        seriousIncr: data.seriousIncr,
        modifyTime: data.modifyTime,
      };
    });
  },
};
</script>

<style scope lang="less">
.logo {
  position: relative;
  .select {
    position: absolute;
    right: 0.2rem;
    top: 0.3rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.1);
    padding: 0.1rem 0.2rem;
    border-radius: 0.2rem;
  }
}
.list {
  display: flex;
  padding-bottom: 0.2rem;
  > div {
    flex: 1;
    text-align: center;
    color: #666;
    img {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>
