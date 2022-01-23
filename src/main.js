import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/base.css'
import './assets/js/phone'
import {Tabs,TabPane,Tag} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// vant
import Vant from 'vant';
import 'vant/lib/index.css';
import { Cascader } from 'vant';
import { Popup } from 'vant';
import { Field } from 'vant';
import { Button } from 'vant';

Vue.use(Button);
Vue.use(Popup);
Vue.use(Cascader);
Vue.use(Field);


Vue.config.productionTip = false

Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
