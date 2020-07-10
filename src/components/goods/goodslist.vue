<template>
    <div class="goodslistContainer">
        <ul class="mui-table-view"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isLoading"
        infinite-scroll-distance="100"
        style="max-height:100vh; overflow-y:auto;">
        <li v-for="item in list" :key="item.id" class="mui-table-view-cell mui-media"
            @click="goToGoodsinfo(item.id)">
            <!-- <router-link :to="'/home/goodsinfo/' + item.id"> -->
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
				<div class="mui-media-body">
					<h3 class="title">{{item.title}}</h3>
                    <p class="price">
                        <span class="sellPrice">￥{{item.sell_price}}</span>
                        <span class="marketPrice">原价:￥{{item.market_price}}</span>
                    </p>
                    <p class="stock">库存:{{item.stock}}</p>
                    <button type="button" class="mui-btn mui-btn-danger">
					购买
				    </button>
				</div>
            <!-- </router-link> -->
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
import {Toast} from 'mint-ui';
export default {
    data(){
        return{
            list:[],
            isLoading:false,
            is_loading_more:false,
            finished:false,
            pageindex:1,
            pagesize:8
        }
    },
    created(){
        this.loadMore();
    },
    methods:{
        loadMore(){
            this.isLoading = true;
            this.is_loading_more = true;
            this.finished = false;
            this.$ajax({
                method:"get",
                url:'/goods/goodslist',
                params:{
                    pageindex:this.pageindex,
                    pagesize:this.pagesize,
                }
            }).then(response => {
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
                    Toast('数据加载失败！');
                }
            })
        },
        goToGoodsinfo(goodsId){
            //编程式导航
            this.$router.push({name:'goodsinfo',params:{id:goodsId}});
        }
    }
}
</script>
<style lang="less">
    .goodslistContainer{
        .mui-table-view-cell{
            .mui-media-object{
                max-width: 120px;
                height: 100px;
            }
            .mui-media-body{
                .title{
                    font-size: 16px;
                    font-weight: bold;
                    font-family: "微软雅黑";
                    color: #333;
                    padding-bottom: 18px;
                }
                .price{
                    font-size: 12px;
                    color: #888;
                    margin: 0;
                    .sellPrice{
                        font-size: 18px;
                        color: #ce0000;
                        font-family: "微软雅黑";
                        font-weight: bold;
                        margin-right: 10px;
                    }
                    .marketPrice{
                        text-decoration: line-through;
                        color: goldenrod;
                    }
                }
                .mui-btn-danger{
                    position: absolute;
                    right: 20px;
                    bottom: 20px;
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
</style>