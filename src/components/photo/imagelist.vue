<template>
    <div class="imagelistContainer">
        <!-- 使用Mint-UI提供的Infinite scroll实现上滑加载第二页数据 -->
        <!--  v-infinite-scroll="loadMore"用来设置ajax请求数据的方法 -->
        <!-- infinite-scroll-disabled用来设置该组件是否继续响应上滑请求的动作，
        该属性是一个bool类型值，true表示已经加载完所有数据 -->
        <!-- infinite-scroll-distance当组件距离底部多远的时候，就触发loadmore事件 -->
        <ul class="imagelist"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isLoading"
        infinite-scroll-distance="100"
        style="max-height:100vh; overflow-y:auto;">
        <li v-for="item in list" :key="item.id" class="newslist">
            <router-link :to=" '/home/imageinfo/'+ item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h4 class="info_title">{{item.title}}</h4>
                    <p class="info_abstract">{{item.abstract}}</p>
                </div>
            </router-link>
        </li>
        <!-- 加载动画部分 -->
        <li class="more_loading">
            <mt-spinner type="triple-bounce" v-show="is_loading_more" color="#26a2ff"></mt-spinner>
            <span v-show="finished">已加载全部</span>
        </li>
        </ul>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
    name:'imagelist',
    data(){
        return{
            isLoading: false,
            is_loading_more: false,
            finished:false,
            pageindex: 1,
            pagesize: 5,
            list:[]
        }
    },
    methods:{
        loadMore(){
            this.isLoading = true;
            this.is_loading_more = true;
            this.finished = false;
            this.$ajax({
                method:'get',
                url:'/images/imageslist',
                params:{
                    pageindex:this.pageindex,
                    pagesize:this.pagesize,
                }
            }).then(response =>{
                var data = response.data;
                if(data.Status == 0){
                    if(data.Data.length > 0){
                        this.list = this.list.concat(data.Data);
                        this.pageindex++;
                        this.isLoading = false;
                        this.is_loading_more = false;
                    }
                    if(data.Data.length < this.pagesize){//此时请求的数据是最后一页
                        this.isLoading = true;
                        this.finished = true;
                     }
                }else{
                    Toast('加载失败！');
                }
            })
        }
    }
}
</script>
<style lang="less">
    .imagelistContainer{
        .imagelist{
            list-style: none;
            padding: 10px;
            margin: 0;
            li{
                margin-bottom: 10px;
                position: relative;
                img{
                    width: 100%;
                    height: 260px;
                    box-shadow: 0 2px 4px #999;
                }
                image[lazy=loading] {
                    width: 40px;
                    height: 260px;
                     margin: auto;
                }
                .info{
                    position: absolute;
                    bottom: 0;
                    padding: 5px;
                    color: #eee;
                    background-color: rgba(0, 0, 0, 0.4);
                    .info_title{
                        font-size: 14px;
                    }
                    .info_abstract{
                        color: #eee;
                        font-size: 12px;
                    }
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