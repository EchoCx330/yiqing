<template>
  <div class="zt">
    <div class="title">疫情期间出行防疫政策</div>
    <!-- van-field
            v-model (value)	当前输入的值	number | string	-
            label	输入框左侧文本
            is-link	是否展示右侧箭头并开启点击反馈
            readonly	是否只读

        van-cascader
            title	顶部标题
            options	可选项数据源   数据格式=[] 
            active-color	选中状态的高亮颜色
            事件：  
            finish	全部选项选择完成后触发 { value, selectedOptions, tabIndex }
            close	点击关闭图标时触发
     -->
    <div class="nr">
      <van-field
        v-model="goCity"
        is-link
        readonly
        label="出发城市"
        placeholder="请选择所在地区"
        @click="show = true"
      />
      <van-popup v-model="show" round position="bottom">
        <van-cascader
          v-model="cascaderValue"
          title="请选择出发城市"
          :options="options"
          @close="show = false"
          @finish="onFinish"
        />
      </van-popup>

      <van-field
        v-model="toCity"
        is-link
        readonly
        label="到达城市"
        placeholder="请选择所在地区"
        @click="show2 = true"
      />
      <van-popup v-model="show2" round position="bottom">
        <van-cascader
          v-model="cascaderValue2"
          title="请选择出发城市"
          :options="options"
          @close="show2 = false"
          @finish="toFinish"
        />
      </van-popup>
    </div>
    <!-- 查询按钮 -->
    <div class="search">
      <van-button type="primary" size="large" @click="search">
        查询疫情防疫
      </van-button>
    </div>

    <!-- 政策查询结果 -->
    <div class="content">
      
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      show: false, //弹框状态  false隐藏 true显示
      show2: false, //弹框状态  false隐藏 true显示
      goCity: "", //出发的值
      toCity: "", //到达的值
      from: "", //出发的id值
      to: "",
      cascaderValue: "",
      cascaderValue2: "",
      from_info: "",
      to_info: "",
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [],
    };
  },
  methods: {
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ value, selectedOptions, tabIndex }) {
      this.from = value;
      this.show = false;
      this.goCity = selectedOptions.map((option) => option.text).join("/");
    },
    toFinish({ value, selectedOptions, tabIndex }) {
      this.to = value;
      this.show2 = false;
      this.toCity = selectedOptions.map((option) => option.text).join("/");
    },
    //----------------
    search() {
      console.log("查询城市疫情", this.from, this.to);
      //请求接口
      api
        .getTravelQuery({
          from: this.from,
          to: this.to,
        })
        .then((res) => {
          console.log("-查询城市疫情-", res.data);
          this.from_info = res.data.result.from_info;
          this.to_info = res.data.result.to_info;
        });
    },
  },
  created() {
    api.getTravel().then((res) => {
      let result = res.data.result;
      //处理数据结构：[{text:'',value:'',children:[{}]},{}]
      let arr = [];
      result.forEach((item) => {
        let obj = {};
        obj.text = item.province; //省份名称
        obj.value = item.province_id; //省份的标识id
        obj.children = []; //二级区域
        item.citys.forEach((ele) => {
          let child = {};
          child.text = ele.city;
          child.value = ele.city_id;
          //追加给obj.children=[]
          obj.children.push(child);
        });
        // -----------
        arr.push(obj);
      });
      this.options = arr;
    });
  },
};
</script>

<style lang='less' scoped>
.zt {
  background-image: linear-gradient(rgb(133, 233, 247), white);
  width: 100%;
}
.title {
  padding: 0.2rem;
  margin-bottom: 0.2rem;
  font-size: 0.3rem;
  font-weight: bold;
  color: #666;
}
.nr {
  margin: 0.3125rem;
  border: 1px solid rgb(201, 195, 195);
  border-radius: .125rem;
}
.search {
  margin: 0.5rem;
}
</style>