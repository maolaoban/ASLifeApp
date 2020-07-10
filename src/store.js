import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
var lsCart = JSON.parse(localStorage.getItem('cart') || '[]');
const store = new Vuex.Store({
    state:{
        cart:lsCart,
    },
    mutations:{
        addToCart(state,goods){
            //点击加入购入车，把商品信息保存到store中的cart里
            //1. 如果购物车中已经有这个商品了，则更新数量
            //2. 如果购物车中没有该商品，则直接把商品信息push到cart里
            var flag = false; //判断有没有该商品
            state.cart.some(item => {
                if(goods.id == item.id){
                    item.count += parseInt(goods.count);
                    flag = true;
                    return true;
                }
            });
            if(!flag){
                state.cart.push(goods);
            };
            //每次仓储发生改变，都要把数据持久化到localStorage中
            //loaclStorage是以key:value的形式来存储数据，而且value必须是string
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        removeGoods(state,goodsId){
            state.cart = state.cart.filter(item =>{
                return item.id != goodsId;
            })
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        //修改商品个数，合计同步变化
        updateStore(state,goodsInfo){
            state.cart.some(item =>{
                if(item.id == goodsInfo.id){
                    item.count = goodsInfo.count;
                }
            })
            if(state.cart.length > 0){
                localStorage.setItem('cart',JSON.stringify(state.cart));
            }
        }
    },
    getters:{//访问方式：this.$store.getters.getTotalCount
        //获取仓储中cart里所有商品数量的总和
        getTotalCount(state){
            var total = 0;
            state.cart.forEach(item => {
                total += item.count;

            })
            return total;
        },
        getTotalPrice(state){
            var total = 0;
            state.cart.forEach(item => {
                total += item.price * item.count;
            })
            return total;
        }
    }
});
export default store;