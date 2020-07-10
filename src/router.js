//导入vue-router包
import vueRouter from 'vue-router';
//导入tab栏的5个子组件
import home from './components/tabbar/homeContainer.vue';
import classes from './components/tabbar/classesContainer.vue';
import find from './components/tabbar/findContainer.vue';
import cart from './components/tabbar/cartContainer.vue';
import user from './components/tabbar/userContainer.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import imagelist from './components/photo/imagelist.vue';
import imageinfo from './components/photo/imageinfo.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
var router = new vueRouter({
    
    routes: [  
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/classes',component:classes},
        {path:'/find',component:find},
        {path:'/cart',component:cart},
        {path:'/user',component:user},
        {path:'/home/newslist',component:newslist},
        {path:'/home/newsinfo/:id',component:newsinfo},
        {path:'/home/imagelist',component:imagelist},
        {path:'/home/imageinfo/:id',component:imageinfo},
        {path:'/home/goodslist',component:goodslist},
        {path:'/home/goodsinfo/:id',component:goodsinfo,name:'goodsinfo'},

      ],
      linkActiveClass:'mui-active'

})
export default router;//将路由匹配规则暴露出去