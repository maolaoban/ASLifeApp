<template>
    <div class="commentContainer">
         <div class="cmtHeader">
             <h3>观点</h3>
         </div>
         <div class="cmtList">
             <ul>
                 <li v-for="item in list" :key="item.id">
                     <p>
                         <span class="mui-icon mui-icon-contact"></span>
                        <span class="user">匿名用户</span>
                        <span class="add_time">{{item.add_time | dateFormat}}</span>
                    </p>
                     <p class="content">
                         {{item.content}}
                     </p>
                 </li>
             </ul>
             <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="loadMoreComment">加载更多评论</button>
         </div>
         <div class="postCmt">
            <p>
                <span>发表我的观点:</span>
                <span @click='postComment'>发送</span>
            </p>
            <textarea rows="3" class="txtMsg" placeholder="优质的观点将在前排显示" v-model="msg"></textarea>
        </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
import qs from 'qs';
export default {
    data() {
        return {
            pageindex:1,
            pagesize:10,
            list:[],
            msg:'',
            nullComment:true
        }
    },
    created(){
        this.getComment();
    },
    methods:{
        getComment(){
            this.$ajax({
                method:'get',
                url:'/comment',
                params:{
                    srcid:this.id,
                    pageindex:this.pageindex,
                    pagesize:this.pagesize,
                }
            }).then(response => {
                var data = response.data;
                if(data.Status == 0){
                    if(data.Data.length > 0){
                        this.list = this.list.concat(data.Data);
                    }else{
                        this.nullComment = false;
                    }
                }else{
                    Toast('评论加载失败！！');
                }
            })
        },
        loadMoreComment(){
            this.pageindex++;
            if(!this.nullComment){
                Toast('没有更多评论了！！');
            }else{
                this.getComment();
            }
        },
        postComment(){
            if(this.msg.length > 0){
                var time = new Date().toLocaleTimeString();
                this.$ajax({
                    method:'post',
                    url:'/comment',
                    //get使用params,post使用data
                    data: qs.stringify({
                        srcId:this.id,
                        content:this.msg,
                        add_time : new Date(),
                    }) 
                }).then(response => {
                    //如果psot请求正确响应，我们就可以直接把新的评论组织成一个新的对象，然后添加到list当中
                    this.list.unshift({id:'',content:this.msg,srcId:this.id,add_time:new Date()});
                    this.msg = '';
                });
            }else{
                Toast({
                    message:'不能发表空评论!',
                    duration:2000,
                    position:'bottom'
                })
            }
        }
    },
    props:["id"],//从父组件传递的scrid
}
</script>
<style lang="less">
    .commentContainer{
        .cmtHeader{
            padding: 10px 0;
            border-bottom: 1px solid #ddd;
            h3{
                border-left: 5px solid #ce0000;
                padding-left: 10px;
                font-size: 18px;
                font-family: '微软雅黑';
                font-weight: bold;
                color: #333;
            }
        }
        .cmtList{
            ul{
                list-style: none;
                padding: 0;
                li{
                    padding: 0;
                    margin: 0;
                    border-bottom: 1px solid #ddd;
                    p{
                        padding: 5px 0;
                        margin: 0;
                        font-size: 14px;
                        .user{
                            color: darkgoldenrod;
                            padding-right: 20px;
                        }
                    }
                    p.content{
                        padding-left: 28px;
                        font-size: 16px;
                    }
                }
            }
        }
        .postCmt{
            p{
                display: flex;
                justify-content: space-between;
                span{
                    padding: 5px;
                }
            }
            .txtMsg{
                color: #444;
                font-size: 14px;
            }
        }
    }
</style>