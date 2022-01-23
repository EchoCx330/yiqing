/***
 * 请求的接口的方法
 */
//请求的axios
import axios from 'axios'
//接口地址
import base from './base'

import md5 from 'md5-js'
//请求方法
const api = {
    /**
     * 病毒信息获取
     */
    getCovInfo() {
        return axios.get(base.host + base.covInfo)
    },
    /**
     * 获取国内疫情
     */
    getChinaData() {
        return axios.get(base.baseUrl + base.chinaData)
    },
    /**
     * 获取世界疫情
     */
    getWorldData() {
        return axios.get(base.baseUrl + base.worldData)
    },
    /**
     * 获取城市
     */
    getCity(city_name) {
        let rules = md5('appid13623city_name' + city_name + 'formatjsonfd3258f3bd98e750956d5bc95a7bff9d');
        let canshu = 'format=json&appid=13623&city_name=' + city_name + '&sign=' + rules
        // console.log(rules);
        return axios.get(base.baseUrl + base.city + '?' + canshu)
    },
    /***
     * 轮播数据接口
     */
    getSwiperBanner() {
        return axios.get(base.swiperBanner)
    },
    /**
    * 出行城市
    */
    getTravel() {
        return axios.get(base.travel)
    },
    getTravelQuery(params) {//params={from:'',to:''}
        return axios.get(base.travelQuery,{
            params
        })
    },
}
export default api