<template>
  <div class="wuzi">
    <!-- 顶部图片 -->
    <img src="@/assets/images/wuzi.png" width="100%" alt="" />
    <!-- 内容 Tabs标签 -->
    <div class="wrapper">
      <el-tabs v-model="activeName"  @tab-click="handleClick" stretch type="border-card" >
        <el-tab-pane label="酒精" name="first"><img src="@/assets/images/jiujing.png" alt=""></el-tab-pane>
        <el-tab-pane label="口罩" name="second"><img src="@/assets/images/kouzhao.png" alt=""></el-tab-pane>
      </el-tabs>
    </div>
    
  </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'first',
        }
    },
    methods: {
        handleClick(tab, event) {
        this.activeName = tab.name
      }
    }
};
</script>

<style lang="less" scoped>
.wuzi {
  background: #3343ff;
}
.wrapper {
  background: #3343ff;
  padding: 0.2rem;
}
img {
    width: 100%;
}
</style>