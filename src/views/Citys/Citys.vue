<template>
  <div>
    <el-tag type="info" size="medium">{{ cityname }}--城市界面</el-tag>
    <div id="main2" style="width: 7.5rem; height: 9rem"></div>
  </div>
</template>

<script>
import api from "@/api";
import "@/utils/map";
import echarts from "echarts";
import '@/utils/map'
export default {
  data() {
    return {};
  },
  props: ["cityname"],
  methods: {
    getCityMap(cityname, data) {
      var myChart = echarts.init(document.getElementById('main2'));
      var option = {
        tooltip: {
          //悬浮弹框
          triggerOn: "click", //提示框触发的条件
          enterable: true,
          formatter(data) {
            //[{} ] data={}
            return data.name;
          },
        },
        visualMap: [
          {
            //映射高亮颜色
            orient: "vertical", //垂直
            type: "piecewise", //离散
            bottom: 0,
            pieces: [
              // 配置颜色区间
              {
                min: 0,
                max: 0,
                color: "#FFFFFF",
              },
              {
                min: 1,
                max: 10,
                color: "#FDFDCF",
              },
              {
                min: 10,
                max: 100,
                color: "#FE9E83",
              },
              {
                min: 100,
                max: 500,
                color: "#E55A4E",
              },
              {
                min: 500,
                max: 10000,
                color: "#4F070D",
              },
            ],
          },
        ],
        series: [
          {
            name: "市",
            type: "map", //地图
            map: cityname, //中国地图
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
    api.getCity(this.cityname).then(res=>{
      let arr = res.data.retdata.subList;
      let newArr = [];
      arr.forEach(element => {
        let obj={};
        obj.name = element.city + "市";
        if ( element.city.endsWith("区") ||element.city.endsWith("州") ||element.city.endsWith("盟")||element.city.endsWith("旗")) {
          obj.name = element.city;
        } else {
          obj.name = element.city + "市";
        }
        obj.value = element.confirm  //累计确诊 
        newArr.push(obj);
      });
      this.getCityMap(this.cityname,newArr)
    })
  },
};
</script>

<style>
</style>