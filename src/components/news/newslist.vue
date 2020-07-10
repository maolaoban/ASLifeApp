<template>
    <div class="newslistContainer">
        <!-- 使用Mint-UI提供的Infinite scroll实现上滑加载第二页数据 -->
        <!--  v-infinite-scroll="loadMore"用来设置ajax请求数据的方法 -->
        <!-- infinite-scroll-disabled用来设置该组件是否继续响应上滑请求的动作，
        该属性是一个bool类型值，true表示已经加载完所有数据 -->
        <!-- infinite-scroll-distance当组件距离底部多远的时候，就触发loadmore事件 -->
        <ul 
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isLoading"
        infinite-scroll-distance="100"
        style="max-height:100vh; overflow-y:auto;">
        <li v-for="item in list" :key="item.id" class="newslist">
            <router-link :to="'/home/newsinfo/' + item.id">
                <p class="news_title">{{item.title}}</p>
                <p class="news_des">
                <span class="author">{{item.author}}</span>
                <span class="add_time">{{item.add_time | dateFormat}}</span>
                <span class="click_count">阅读{{item.click_count}}</span>
                </p>
            </router-link>
        </li>
        <!-- 加载动画部分 -->
        <li class="more_loading">
            <mt-spinner type="triple-bounce" v-show="is_loading_more" color="#26a2ff"></mt-spinner>
            <span v-show="finished">加载完成</span>
        </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"newslist",
    data(){
        return{
            list:[],//新闻列表
            isLoading:false,
            pageindex:1,
            pagesize:10,
            is_loading_more:false,//控制是否显示加载动画图标
            finished:false,//控制是否显示‘加载完成’
        }
    },
    methods:{
        loadMore:function(){
            this.isLoading = true;
            this.is_loading_more = true;
            this.finished = false;
             this.$ajax({
                method:'get',
                url:'/news/newslist',
                params:{
                    pageindex:this.pageindex,
                    pagesize:this.pagesize
                }
             }).then(response => {
                var data = response.data;
                 if(data.Status == 0){
                     data.Data.forEach(item => {
                         item.add_time = new Date();
                     });
                     this.list = this.list.concat(data.Data);//拼接两个数组，不能直接复制
                     this.pageindex++;
                     this.isLoading = false;
                     this.is_loading_more = false;
                     if(data.Data.length < this.pagesize){//此时请求的数据是最后一页
                        this.isLoading = true;
                        this.finished = true;
                     }
                 }else{//没拿到数据
                    this.finished = true;
                 }
             })
        }
    }
}
</script>
<style lang="less">
    .newslistContainer{
        ul{
            list-style: none;
            padding: 0 16px;
            li{
                border-bottom: 1px solid #ddd;
                padding: 10px 0;
                p{
                    margin: 0;
                }
                p.news_title{
                    font-size: 16px;
                    color: #333;
                }
                .news_des{
                    font-size: 12px;
                    color: #aaa;
                    padding-top: 5px;
                    display: flex;
                    justify-content: space-between;
                }
            }
            .more_loading{
                font-size: 12px;
                color: #aaa;
                text-align: center;
                border: none;
                .mint-spinner-fading-circle{
                    position: relative;
                    left: 45%;
                }
            }
        }
    }
</style>