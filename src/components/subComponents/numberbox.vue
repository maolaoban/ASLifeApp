<template>
    <div class="mui-numbox">
		<button class="mui-btn mui-btn-numbox-minus" type="button" @click.stop="cut" :disabled="cutDis">-</button>
		<input class="mui-input-numbox" type="number" :value="currentCount"/>
		<button class="mui-btn mui-btn-numbox-plus" type="button" @click.stop="plus" :disabled="plusDis">+</button>
    </div>
</template>
<script>
export default {
    props:[
        'initCount',//初始值
        'min',//下限
        'max',//上限
        'goodsId',//对应商品id
        'isChangeStore',//用来判断修改商品个数时是否影响仓储
    ],
    data(){
        return{
            currentCount: 1,
            plusDis:false,
            cutDis:true
        }
    },
    methods:{
        setDisable(){
            if(this.currentCount >= this.max){
                this.plusDis = true;
                this.cutDis = false;
            }else{
                if(this.currentCount <= this.min){
                    this.plusDis = false;
                    this.cutDis = true;
                }else{
                    this.plusDis = false;
                    this.cutDis = false;
                }
            }
        },
        plus(){
            if(this.currentCount < this.max){
                this.currentCount++;
            }
            this.setDisable();
        },
        cut(){
            if(this.currentCount > this.min){
                this.currentCount--;
            }
            this.setDisable();
        }
    },
    created(){
        this.currentCount = this.initCount;
        this.setDisable(); 
    },
    watch:{
        'currentCount':function(newValue,oldValue){
            //数据发生变化，调用父组件传递的方法
            this.$emit("getCount",newValue);
            //当数据更新的时候调用仓储提供的updateStore方法，更新数据，
            //以此更新购物车合计
            //在这里传递过去一个对象，形如{id:goodsId,count:xx}
            if(this.isChangeStore){
                var goodsInfo = {id: this.goodsId,count: this.currentCount};
                this.$store.commit("updateStore",goodsInfo);
            } 
        }
    }
}
</script>
<style lang="less">
    
</style>