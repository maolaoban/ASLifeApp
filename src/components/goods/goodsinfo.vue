<template>
    <div class="goodsinfoContainer">
        <!-- 轮播图 -->
        <swipe :speed="3000" :swipeList="swipeList"></swipe>
        <!-- 商品信息 -->
        <div class="goodsInfo">
            <p class="price">
                <span class="sellPrice">
                    <span>￥</span>
                    {{goodsInfo.sell_price}}
                </span>
                <span class="marketPrice">
                    <label class="lb">商场价:</label>
                    {{goodsInfo.market_price}}
                </span>
            </p>
            <p class="title">{{goodsInfo.title}}</p>
            <p class="abstract">{{goodsInfo.abstract}}</p>
            <p class="add_time">
                <label class="lb">上架时间:</label>
                {{goodsInfo.add_time | dateFormat}}
            </p>
            <p class="stock">
                <span>
                    <label class="lb">库存:</label>
                    {{goodsInfo.stock}}
                </span>
                <span>
                    <label class="lb">关注:</label>
                    {{goodsInfo.click_count}}
                </span>
            </p>
            <p class="count">购买数量:<numberbox :min="1" :max="goodsInfo.stock" :initCount="1" @getCount="getGoodsCount" :goodsId="this.goodsId" :isChangeStore="false"></numberbox></p>
            <p>
                <button type="button" class="mui-btn mui-btn-warning" @click="addToCart">
					加入购物车
				</button>
				<button type="button" class="mui-btn mui-btn-danger">
					立即购买
				</button>
            </p>
        </div>
        <!-- 卖家信息 -->
        <div class="sellerInfo">
            <h3>卖家信息</h3>
            <p class="seller">
                <label class="lb">卖家:</label>
                {{goodsInfo.seller}}
            </p>
            <p class="seller_phone">
                <label class="lb">联系电话:</label>
                {{goodsInfo.seller_phone}}
            </p>
        </div>
        <!-- 图片信息 -->
        <div class="imgInfo">
            <ul>
                <li v-for="item in swipeList" :key="item.id">
                    <img :src="item.img_url" alt="">
                </li>
            </ul>
        </div>
        <!-- 评论 -->
        <comment :id="goodsId"></comment>
    </div>
</template>
<script>
import swipe from '../subComponents/swipe.vue';
import numberbox from '../subComponents/numberbox.vue';
import comment from '../subComponents/comment.vue';
import {Toast} from 'mint-ui';
export default {
    data(){
        return{
            swipeList:[],
            goodsId:this.$route.params.id,
            goodsInfo:{},
            goodsCount:1,
        }
    },
    created(){
        this.getSwipeData();
        this.getGoodsInfo();
    },
    methods:{
        getSwipeData(){
            this.$ajax({
                method:'get',
                url:'/thumbs/'+ this.goodsId,
            }).then(response => {
                var data = response.data;
                if(data.Status == 0){
                    this.swipeList = data.Data;
                }else{
                    Toast('数据加载失败!');
                }
            })
        },
        getGoodsInfo(){
            this.$ajax({
                method:'get',
                url:'/goods/goodsinfo',
                params:{
                    goodsid:this.goodsId
                }
            }).then(response =>{
                var data = response.data;
                if(data.Status == 0){
                    this.goodsInfo = data.Data[0];
                }else{
                    Toast('数据加载失败！');
                }
            })
        },
        addToCart(){
            var goods = {id: this.goodsId, 
                        title: this.goodsInfo.title,
                        price: this.goodsInfo.sell_price,
                        img_url: this.goodsInfo.img_url, 
                        count: this.goodsCount, 
                        stock: this.goodsInfo.stock,
                        };
            this.$store.commit("addToCart", goods);
        },
        getGoodsCount(count){
            this.goodsCount = count;
        }
    },
    components:{
        swipe,
        numberbox,
        comment
    }
}
</script>
<style lang="less">
    .goodsinfoContainer{
        padding: 6px;
        .goodsInfo{
            padding: 10px;
            margin-top: 6px;
            background-color: #fff;
            border-radius: 5px;
            margin-bottom: 10px;
            p{
                font-size: 14px;
                line-height: 16px;
                color: #333;
                font-family: '微软雅黑';
                margin: 20px 0;
                .lb{
                    color: darkgrey;
                }
            }
            .price{
                .sellPrice{
                    color: #ce0000;
                    font-size: 28px;
                    font-weight: bold;
                    margin-right: 20px;
                    span{
                        font-size: 12px;
                    }
                }
                .marketPrice{
                    text-decoration: line-through;
                    color: darkgrey;
                }
            }
            .title{
                font-size: 16px;
                font-weight: bold;
            }
            .abstract{
                font-size: 14px;
                line-height: 20px;
            }
            .stock{
                span{
                    margin-right: 20px;
                }
            }
            .count{
                color: darkgrey;
                .mui-numbox{
                    color: #333;
                    margin-left: 20px;
                }
            }
        }
        .sellerInfo{
            background-color: #fff;
            padding: 10px 10px;
            border-radius: 5px;
            margin-bottom: 10px;
            h3{
                font-size: 14px;
                color: darkgrey;
                margin-bottom: 20px;
            }
            p{
                color: #333;
                .lb{
                    color: darkgrey;
                    margin-right: 10px;
                }
            }
        }
        .imgInfo{
            background-color: #fff;
            ul{
                list-style: none;
                padding: 0;
                margin: 0;
                li{
                    width: 100%;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }
</style>