<template >
  <div>
    <div class="navbar" :class="{'nav-other':navInfo.type == 'small'}">
      <div class="register">
        <span v-if="!isLogin" @click="login">登录/注册</span>
        <span v-else>
                <span>{{userName}},欢迎您</span>
                <span @click="loginout">注销</span>
            </span>
      </div>
      <ul class="nav" v-if="navInfo.isUser">
        <li :class="isActive" v-for="item in headerOptions.user" @click="userClickOption(item)">{{item.name}}</li>
      </ul>
      <ul class="nav-admin" v-if="!navInfo.isUser">
        <li :class="isActive" v-for="item in headerOptions.admin" @click="userClickOption(item)">{{item.name}}</li>
      </ul>
    </div>
    <sign :sign-data="signData" :nav-info="navInfo"></sign>
  </div>

</template>

<script>
import sign from './sign.vue'
import common from './common.js'
export default {
	data:function(){
		return {
			isLogin: false,  // 用户是否登录的标志
            headerOptions: {
                user:[{
                        name: '首页',
                        type: 'index'
                    },
                    {
                        name: '二手房',
                        type: 'second'
                    },
                    {
                        name: '租房',
                        type: 'rent'
                    },
                    {
                        name: '房产指南',
                        type: 'guide'
                    },
                    {
                        name: '市场信息',
                        type: 'market'
                    },
                    {
                        name: '工具',
                        type: 'tool'
                    },
                    {
                        name: '地图找房',
                        type: 'map'
                    }
                ],
                admin:[{
                        name: '发布信息',
                        type: 'post'
                    },
                    {
                        name: '管理房产信息',
                        type: 'manage'
                    }
                ]
            },
            isActive: false,
            signData:{
                isSignUp: false,
                isSignIn: false,
                isChange: false
            },
            userName: ''
		}
	},
    props:['navInfo'],
    created(){
        //todo 判断用户是否登录
        this.init()
    },
    methods: {
        userClickOption(item){
            this.$dispatch('changeNav',item.type)
        },
        login(){
            this.signData.isSignIn = true;
        },
        loginout(){
            let url = '/api/loginout'
            let own = this
            let params = {
                usertel: common.getCookie('userTel')
            }
            own.$http.post(url,params,{emulateJSON: true}).then((response)=>{
                let res = JSON.parse(response.data)
                if (res.code == 0) {
                    own.isLogin = false;
                    common.setCookie('userTel','')
                    common.setCookie('userName','')
                    common.setCookie('userInfo','')
                    this.navInfo.isUser = true
                    alert(res.msg)
                    own.$dispatch('changeNav','index')
                }else{
                    alert(res.msg)
                }
            })
        },
        init(){
            if (common.getCookie('userTel')) {
                let reg = new RegExp('"',"g");  
                this.isLogin = true
                this.userName = common.getCookie('userName').replace(reg,'')
            };
        },
    },
    components:{
        sign
    },
    events:{
        'login': function(userInfo){
            this.isLogin = true
            this.userName = userInfo.username
        }
    }
}
</script>

<style scope>
    .navbar{
        width: 100%;
        height: 40px;
        position: fixed;
        top: 0px;
        line-height: 40px;
        font-weight: bold;
        font-size: 16px;
        background: rgba(255,255,255,0.1);
        color: #fff;
        z-index: 999;
    }
    .navbar .nav{
        width: 36%;
        float: right;
    }
    .navbar .nav li{
        float: left;
        padding: 0px 15px;
        cursor: pointer;
        text-align: center;
    }
    .navbar .register{
        margin-right: 30px;
        font-size: 12px;
        float: right;
    }
    .navbar .register span{
        cursor: pointer;
    }
    .navbar.nav-other{
        background: #00AE66;
    }
    .navbar .nav-admin{
        width: 19%;
        float: right;
    }
    .navbar .nav-admin li{
        float: left;
        padding: 0px 15px;
        cursor: pointer;
        text-align: center;
    }
</style>
