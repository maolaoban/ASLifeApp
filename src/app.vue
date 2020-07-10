<template>
    <div class="appContainer">
        <!-- header -->
        <header id="header" class="mui-bar mui-bar-nav">
			<a v-if="showBack" @click="goback" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">安师生活-爱安师爱生活</h1>
		</header>
        <!-- body -->
        <div class="mui-content">
			<keep-alive include="newslist,imagelist">
				<router-view></router-view>
			</keep-alive>
        </div>
        <!-- footer -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item mui-active" href="#tabbar" to='/home'>
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" href="#tabbar-with-chat" to='/classes'>
				<span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
				<span class="mui-tab-label">分类</span>
			</router-link>
			<router-link class="mui-tab-item" href="#tabbar-with-contact" to='/find'>
				<span class="mui-icon mui-icon-extra mui-icon-extra-find"></span>
				<span class="mui-tab-label">发现</span>
			</router-link>
			<router-link class="mui-tab-item" href="#tabbar-with-map" to='/cart'>
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{this.$store.getters.getTotalCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
            <router-link class="mui-tab-item" href="#tabbar-with-map" to='/user'>
				<span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
    </div>
</template>
<script>
export default {
    data(){
		return{
			showBack:false,//是否显示回退箭头
		}
	},
	methods:{
		goback:function(){
			//$route是管理路由和传参
			//$router是管理url
			this.$router.go(-1);
		}
	},
	created(){
		if(this.$route.path == '/home'){
			this.showBack = false;
		}else{
			this.showBack = true;
		}
	},
	watch:{
		//监听路由，如果是/home不显示回退箭头
		'$route.path':function(newValue,oldValue){
			if(newValue == '/home'){
				this.showBack = false;
			}else{
				this.showBack = true;
			}
		}
	}
}
</script>
<style lang="less">
    .appContainer{
		padding-bottom: 50px;
        .mui-bar-nav{
            background: #ce0000;
            .mui-title{
                color:#eee;
                font-size: 20px;
                font-weight: bold;
                font-family: '微软雅黑';
			}
			a{
				color:#eee;
			}
        }
    }
</style>