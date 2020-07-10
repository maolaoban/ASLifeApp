<template>
    <div class="cartContainer">
        <h2>购物车</h2>
        <transition-group class="mui-table-view" tag="ul">
            <router-link v-for="item in cart" :key="item.id" class="mui-table-view-cell mui-media" tag="li"
            :to=" '/home/goodsinfo/' + item.id">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
				<div class="mui-media-body">
                    <p class="goods-info">
                        <span class="title">{{item.title}}</span>
                        <span class="price">￥{{item.price}}</span>
                    </p>
                    <p class="goods-control">
                        <numberbox :initCount="item.count" :min="1" :max="item.stock" :goodsId="item.id" :isChangeStore="true"></numberbox>
                        <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined" @click.stop="remove(item.id)">
		                <span class="mui-icon mui-icon-trash"></span>
		                删除	
		                </button>
                    </p>
				</div>
            </router-link>
        </transition-group>
        <div class="footer">
            <label for="">合计：</label>
            <span class="total">￥{{this.$store.getters.getTotalPrice}}</span>
            <button type="button" class="mui-btn mui-btn-danger">
				结算
			</button>
        </div>
    </div>
</template>
<script>
import numberbox from '../subComponents/numberbox.vue';
export default {
    //购物车数据结构
    data(){
        return{
            cart:[]
        }
    },
    created(){
        this.getCart();
    },
    methods:{
        getCart(){
            //this.cart = this.$store.state.cart;
            this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
        },
        remove(goodsId){
            this.$store.commit("removeGoods",goodsId);
            this.getCart();
        }
    },
    components:{
        numberbox
    }
}
</script>
<style lang="less">
    .cartContainer{
        /* 添加记录时的动画效果 */
        .v-leave-to{
            opacity: 0;
        }
        // .v-enter-active,
        .v-leave-active{
            transition: all 0.5s ease;
        }
        /* 删除时，li离开的动画效果，两者要搭配使用 */
        .v-move{
            transition: all 0.7s ease;
        }
        .v-leave-active{
            position: absolute;
        }
        h2{
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            color: #444;
            padding:5px;
            background-color: #fff;
        }
        .mui-table-view{
            margin-bottom: 50px;
            .mui-table-view-cell{
                width: 100%;
                .mui-media-object{
                    max-width: 80px;
                    height: 80px;
                }
                .mui-media-body{
                    .goods-info{
                        font-size: 16px;
                        color: #444;
                        line-height: 20px;
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        .price{
                            color: #ce0000;
                            font-weight: bold;
                        }
                    }
                    .goods-control{
                        display: flex;
                        justify-content: space-between;
                        .mui-btn-danger{
                            color: #ce0000;
                        }
                    }
                }
            }
        }
        .footer{
            width: 100%;
            height: 50px;
            background-color: #fff;
            position: fixed;
            bottom:50px;
            padding: 15px;
            label{
                font-size: 20px;
                color: #444;
            }
            span{
                color: #ce0000;
                font-size: 20px;
            }
            .mui-btn-danger{
                position: absolute;
                right: 20px;
                bottom: 8px;
                background-color: #ce0000;
            }
        }
    }
</style>