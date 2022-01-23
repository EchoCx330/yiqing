/**
 * 公共的请求的接口
 * 
 */
const base = {
    host: 'http://api.tianapi.com',//天行数据 --疫情病毒
    covInfo: '/ncov/index?key=e830d7d5d226ffeb4482c0a6cbef7973',//疫情病毒信息

    baseUrl: 'https://uaqy.api.storeapi.net',
    chinaData: '/api/94/219?format=json&appid=13623&sign=c1adaa063030f285259b4da4a192ddba',

    worldData: '/api/94/220?format=json&appid=13623&sign=c1adaa063030f285259b4da4a192ddba',

    city: '/api/94/221',
    swiperBanner:'http://iwenwiki.com/wapicovid19/ncovimg.php',//轮播图疫情

    travel:'/api/springTravel/citys?key=f82b61667349345c2175e2811cfdb2fb',
    travelQuery:'/api/springTravel/query?key=f82b61667349345c2175e2811cfdb2fb',//城市疫情&from=10191&to=10349
}

export default base;
