<template>
    <div class="swipeContainer">
        <mt-swipe :auto="speed">
        <mt-swipe-item v-for="item in swipeList" :key="item.id">
            <img :src="item.img_url" alt="">
        </mt-swipe-item>
    </mt-swipe>
    </div>
</template>
<script>
export default {
    props:["swipeList","speed"]
}
</script>
<style lang="less">
    .swipeContainer{
        .mint-swipe{
        height: 280px;        
        .mint-swipe-indicators {
            .mint-swipe-indicator{
                background-color: gray;
            }
            .mint-swipe-indicator.is-active{
                opacity: 1;
            }
        }
        .mint-swipe-item{     
            img{
                width: 100%;
                height: 100%;
            }      
        }
    }
    }
</style>