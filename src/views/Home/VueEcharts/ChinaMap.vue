<template>
  <div>
    <div class="title">国内疫情地图</div>
    <!-- 地图容器 -->
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      type="border-card"
      stretch
    >
      <el-tab-pane label="累计确诊" name="first">
        <!-- 累计确诊 -->
        <div id="main" style="width: 7rem; height: 8rem"></div>
      </el-tab-pane>
      <el-tab-pane label="现存确诊" name="second">
        <!-- 现存确诊 -->
        <div id="nowMain" style="width: 7rem; height: 8rem"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 导入echarts
import echarts from "echarts";
import "echarts/map/js/china";
import api from "@/api";
export default {
  data() {
    return {
      arr: [],
      activeName: "first",
    };
  },
  // echarts实例
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
    getChinaMap(data) {
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        tooltip: {
          //悬浮弹框
          triggerOn: "click", //提示框触发的条件
          enterable: true, //鼠标是否可进入提示框浮层中，默认为false
          formatter(item) {
            //item=下面serves里面的data里面的每一项 //[{} ] data={} a b c d
            return (
              '<a href="/citys/' +
              item.name +
              '" style="color:#fff">省份：' +
              item.name +
              "--详情</a>"
            );
          },
        },
        visualMap: [
          {
            //映射高亮颜色
            orient: "horizontal", //水平的
            type: "piecewise", //离散
            bottom: 0,
            textGap: 4,
            itemGap: 4,
            itemWidth: 10,
            itemHeight: 10,
            padding: 2,
            textStyle: {
              fontSize: 9,
            },
            pieces: [
              // 配置颜色区间
              {
                min: 0,
                max: 0,
                color: "#FFFFFF",
              },
              {
                min: 1,
                max: 9,
                color: "#FAEBD2",
              },
              {
                min: 10,
                max: 99,
                color: "#E9A188",
              },
              {
                min: 100,
                max: 499,
                color: "#D56355",
              },
              {
                min: 500,
                max: 999,
                color: "#BB3937",
              },
              {
                min: 1000,
                max: 10000,
                color: "#772526",
              },
              {
                min: 10000,
                color: "#480F10",
              },
            ],
          },
        ],
        series: [
          {
            name: "省",
            type: "map", //地图  bar  line  map
            map: "china", //中国地图 需要引入地图china.js
            roam: false,
            zoom: 1.2,
            aspectScale: 0.75,
            top: 40,
            layoutCenter: ["5%", "5%"],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 8,
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: "rgba(0,255,236,0)",
                borderColor: "rgba(0,0,0,0.2)",
              },
              emphasis: {
                // 选中的区域颜色及阴影效果等
                areaColor: "rgba(255,180,0,0.8)",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
              },
            },
            data,
          },
        ],
      };

      myChart.setOption(option);
    },
    getChinaMap1(data) {
      var myChart = echarts.init(document.getElementById("nowMain"));
      var option = {
        tooltip: {
          //悬浮弹框
          triggerOn: "click", //提示框触发的条件
          enterable: true, //鼠标是否可进入提示框浮层中，默认为false
          formatter(item) {
            //item=下面serves里面的data里面的每一项 //[{} ] data={} a b c d
            return (
              '<a href="/citys/' +
              item.name +
              '" style="color:#fff">省份：' +
              item.name +
              "--详情</a>"
            );
          },
        },
        visualMap: [
          {
            //映射高亮颜色
            orient: "horizontal", //水平的
            type: "piecewise", //离散
            bottom: 0,
            textGap: 4,
            itemGap: 4,
            itemWidth: 10,
            itemHeight: 10,
            padding: 2,
            textStyle: {
              fontSize: 9,
            },
            pieces: [
              // 配置颜色区间
              {
                min: 0,
                max: 0,
                color: "#FFFFFF",
              },
              {
                min: 1,
                max: 9,
                color: "#FAEBD2",
              },
              {
                min: 10,
                max: 99,
                color: "#E9A188",
              },
              {
                min: 100,
                max: 499,
                color: "#D56355",
              },
              {
                min: 500,
                max: 999,
                color: "#BB3937",
              },
              {
                min: 1000,
                max: 10000,
                color: "#772526",
              },
              {
                min: 10000,
                color: "#480F10",
              },
            ],
          },
        ],
        series: [
          {
            name: "省",
            type: "map", //地图  bar  line  map
            map: "china", //中国地图 需要引入地图china.js
            roam: false,
            zoom: 1.2,
            aspectScale: 0.75,
            top: 40,
            layoutCenter: ["5%", "5%"],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 8,
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: "rgba(0,255,236,0)",
                borderColor: "rgba(0,0,0,0.2)",
              },
              emphasis: {
                // 选中的区域颜色及阴影效果等
                areaColor: "rgba(255,180,0,0.8)",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
              },
            },
            data,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    // 获取国内疫情数据
    api.getChinaData().then((res) => {
      // 获取省份数据
      let citys = res.data.retdata;
      let arr = []; //累计确诊
      let nowArr = []; //现存确诊
      for (let i = 0; i < citys.length; i++) {
        let obj = {};
        obj.name = citys[i].xArea;
        obj.value = citys[i].confirm;
        arr.push(obj);

        let now = {};
        now.name = citys[i].xArea;
        now.value = citys[i].curConfirm;
        nowArr.push(now);
      }
      this.arr = arr;
      // this.getChinaMap(arr);
      // this.getChinaMap1(nowArr);

      // vue等待延迟加载
      this.$nextTick(() => {
        this.getChinaMap1(nowArr);
        this.getChinaMap(this.arr);
      });
    });
  },
};
</script>

<style lang="less" scoped>
.title {
  margin: 0.2rem;
  padding-top: 0.2rem;
  border-top: 1px solid #eee;
  font-size: 0.3rem;
  font-weight: bold;
  color: #666;
}
.title::before {
  content: "";
  border-left: 0.1rem solid rgb(9, 60, 202);
  font-size: 0.26rem;
  margin-right: 0.1rem;
}
#main,
#nowMain {
  background: #f5f5f5;
}
</style>