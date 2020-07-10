<template>
    <div class="newsinfoContainer">
        <section class="title">
            <h2>{{this.news.title}}</h2>
        </section>
        <section class="des">
            <p>
                <span class="author">编辑:{{this.news.author}}</span>
                <span class="add_time">日期:{{this.news.add_time | dateFormat}}</span>
                <span class="click_count">阅读:{{this.news.click_count}}</span>
            </p>
        </section>
        <section class="img">
            <img :src="this.news.img_url" alt="">
        </section>
        <section class="content">
            <div v-html="this.news.content"></div>
        </section>
        <section class="comment">
            <comment :id="this.newsid"></comment>
        </section>
    </div>
</template>
<script>
import comment from '../subComponents/comment.vue';
export default {
    data(){
        return {
            newsid:this.$route.params.id,//获取路由传递过来的参数
            news:{//保存通过ajax请求的数据

            }
        }
    },
    created(){
        this.loadNewsInfo();
    },
    methods:{
        loadNewsInfo : function(){
            this.$ajax({
                method:'get',
                url:'/news/newsinfo',
                params:{
                    newsid:this.newsid
                }
            }).then(response => {
                var data = response.data;
                if(data.Status == 0){
                    this.news = data.Data[0];
                }
            })
        }
    },
    components:{
        comment
    }
}
</script>
<style lang="less">
    .newsinfoContainer{
        padding: 15px;
        .title{
            padding: 5px 0;
            font-size: 24px;
            color: #333;
        }
        .des{
            font-size: 12px;
            color: #aaa;
            padding-top: 10px;
            padding-bottom: 20px;
            p{
                display: flex;
                justify-content: space-between;
            }
        }
        .img{
            img{
                width: 100%;
            }
            padding-bottom: 10px;
        }
        .content{
            p{
                font-size: 16px;
                color: #444;
                text-indent: 32px;
            }
            img{
                width: 100%;
                }
        }
    }
</style>