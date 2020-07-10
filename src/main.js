//导入Vue
import Vue from 'vue';
//导入app.vue
import app from './app.vue';
//导入路由模块
import router from './router.js';
//导入mui的样式包
import './lib/mui/dist/css/mui.css';
//导入mui的拓展图标
import './lib/mui/examples/hello-mui/css/icons-extra.css';
//导入路由vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//引入Mint-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);
//导入axios，并挂载到vue.prototype身上
//axios不支持vue.use()的语法挂载
import axios from 'axios';
//配置请求的域名
axios.defaults.baseURL='http://www.barteam.cn:8086';
Vue.prototype.$ajax = axios;
//导入moment组件
import Moment from 'moment';
//日期的过滤器
Vue.filter('dateFormat',function(dateStr,pattern = 'YYYY-MM-DD HH:MM'){
    return Moment(dateStr).format(pattern);
})
//导入vue-preview插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

import store from './store.js';

var vm = new Vue({
    el:'#app',
    render: c => c(app),
    router,
    store
})