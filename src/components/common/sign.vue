<template >
    <div>
        <div class="signUp" v-if="signData.isSignUp">
            <p class="close" @click="close">X</p>
            <p class="title">注册</p>
            <div>
                <label for="">*用户名：</label>
                <input type="text" :class="{'nameError': error.nameError}" v-model="info.name">
            </div>
            <div>
                <label for="">*手机号：</label>
                <input type="text" :class="{'telError': error.telError}" v-model="info.tel" maxlength="11">
            </div>
            <div>
                <label for="">*邮箱：</label>
                <input type="text" :class="{'mailError': error.mailError}" v-model="info.mail">
            </div>
            <div>
                <label for="">*密码：</label>
                <input type="password" :class="{'pwdError': error.pwdError}" v-model="info.password">
            </div>
            <div>
                <label for="">*确认密码：</label>
                <input type="password" :class="{'pwdAgainError': error.pwdAgainError}" v-model="info.pwdAgain">
            </div>
            <div>
                <label for="">*是否是管理员：</label>
                <input type="radio" id="admin" value="false" v-model="info.isAdmin">
                <span>否</span>
                <input type="radio" id="admin" value="true" v-model="info.isAdmin">
                <span>是</span>
                <span :class="{'adminError': error.adminError}" v-show="error.adminError">*请选择</span>
            </div>
            <button @click="signUp">注册</button>
        </div>
        <div class="signIn" v-if="signData.isSignIn">
            <p class="close" @click="close">X</p>
            <p class="title">登录</p>
            <div>
                <label for="">手机号：</label>
                <input type="text" :class="{'telError': error.telError}" v-model="info.tel" maxlength="11">
            </div>
            <div>
                <label for="">密码：</label>
                <input type="password" v-model="info.password">
            </div>
            <p class="href">
                <span @click="toSignUp">去注册</span>
                <span @click="toChangePwd">忘记密码</span>
            </p>
            <button @click="signIn">登录</button>
        </div>
        <div class="changePwd" v-if="signData.isChange">
            <p class="close" @click="close">X</p>
            <p class="title">修改密码</p>
            <div>
                <label for="">原密码：</label>
                <input type="text" :class="{'oldPwdError': error.oldPwdError}" v-model="info.oldPwd">
            </div>
            <div>
                <label for="">新密码：</label>
                <input type="password" v-model="info.password">
            </div>
            <div>
                <label for="">确认密码：</label>
                <input type="password" v-model="info.pwdAgain">
            </div>
            <button>保存</button>
        </div>
        <div class="bg" v-if="signData.isSignIn || signData.isSignUp || signData.isChange " @click="close"></div>
    </div>
</template>

<script>
import common from './common.js'
export default {
	data:function(){
		return {
            info: {
                name: '',
                tel: '',
                mail: '',
                password: '',
                pwdAgain: '',
                oldPwd: '',
                isAdmin: true,
            },
            error: {
                nameError: false,
                telError: false,
                mailError: false,
                pwdError: false,
                pwdAgainError: false,
                oldPwdError: false,
                adminError: false
            }
		}
	},
    props:['signData','navInfo'],
    methods:{
        //todo 如果用户清空 将error去掉
        close(){
            this.signData.isSignIn = false
            this.signData.isSignUp = false
            this.signData.isChange = false
            this.clear()
        },
        clear(){
            for(let key in this.info){
                this.info[key] = ''
            }
            for(let key in this.error){
                this.error[key] = false
            }
        },
        lint(type){
            switch(type){
                case 'signIn':
                    if(!(/^1[34578]\d{9}$/.test(this.info.tel))){
                        this.error.telError = true
                        return false
                    }
                    if (this.info.password == '') {
                        this.error.pwdError = true
                        return false
                    };
                    return true
                break;
                case 'signUp':
                    if(!(/^1[34578]\d{9}$/.test(this.info.tel))){
                        this.error.telError = true
                        return false
                    }
                    if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.info.mail)) {
                        this.error.mailError = true
                        return false
                    }
                    if (this.info.password != this.info.pwdAgain) {
                        this.error.pwdError = true
                        this.error.pwdAgainError = true
                        this.info.pwdAgain = ''
                        this.info.password = ''
                        return false
                    }
                    if (this.info.isAdmin == '') {
                        this.error.adminError = true
                        return false
                    };
                    return true
                break;
                case 'change':
                    if (this.info.password != this.info.pwdAgain) {
                        this.error.pwdError = true
                        this.error.pwdAgainError = true
                        this.info.pwdAgain = ''
                        this.info.password = ''
                        return false
                    }
                    return true
                break;
            }
        },
        signUp(){
            if(this.lint('signUp')){
                let own = this;
                let url = '/api/signup';
                let params = {
                    name: own.info.name,
                    tel: own.info.tel,
                    mail: own.info.mail,
                    password: own.info.password,
                    admin: own.info.isAdmin
                }
                own.$http.post(url,params,{emulateJSON: true}).then((res) => {
                    let data = JSON.parse(res.data)
                    if (data.code == 0) {
                        own.close();
                        own.$dispatch('login', data.data)
                        common.setCookie('userTel',JSON.stringify(data.data.userTel))
                        common.setCookie('userName',JSON.stringify(data.data.userName))
                        common.setCookie('userInfo',JSON.stringify(data.data))
                        alert(data.msg)
                        if (data.data.admin) {
                            own.navInfo.isUser = false
                            this.$dispatch('changeNav','manage')
                        }else{
                            own.navInfo.isUser = true
                        }
                    }else{
                        alert(data.msg)
                    }
                })
            }
        },
        signIn(){
            if(this.lint('signIn')){
                let own = this;
                let url = '/api/signin';
                let params = {
                    tel: own.info.tel,
                    password: own.info.password
                }
                own.$http.post(url,params,{emulateJSON: true}).then((res) => {
                    let data = JSON.parse(res.data)
                    if (data.code == 0) {
                        own.close();
                        common.setCookie('userTel',JSON.stringify(data.data.usertel))
                        common.setCookie('userName',JSON.stringify(data.data.username))
                        common.setCookie('userInfo',JSON.stringify(data.data))
                        own.$dispatch('login', data.data)
                        alert(data.msg)
                        if (data.data.admin) {
                            own.navInfo.isUser = false
                            this.$dispatch('changeNav','manage')
                        }else{
                            own.navInfo.isUser = true
                        }
                    }else{
                        alert(data.msg)
                    }
                })
            }
        },
        changePwd(){

        },
        toSignUp(){
            this.close()
            this.signData.isSignUp = true
        },
        toChangePwd(){
            this.close()
            this.signData.isChange = true
        }
    }
}
</script>

<style scoped>
    .signUp,.signIn,.changePwd{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 5px;
        width: 500px;
        background: #fff;
        z-index: 10;
    }
    .signUp{
        height: 450px;
    }
    .signIn{
        height: 310px;
    }
    .changePwd{
        height: 320px;
    }
    #user,#admin{
        width: 16px;
        height: 16px;
    }
    .signUp .title,.signIn .title,.changePwd .title{
        clear: both;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 10px;
    }
    .signUp button,.signIn button,.changePwd button{
        clear: both;
        width: 260px;
        height: 35px;
        border: 0px;
        border-radius: 5px;
        cursor: pointer;
        background: #00AE66;
        color: #fff;
        margin-left: 120px;
    }
    .signUp button,.changePwd button{
        margin-top: 20px;
    }
    .signIn div,.signUp div,.changePwd div{
        line-height: 50px;
    }
    .signIn .href{
        margin-top: 20px;
        margin-bottom: 50px;
    }
    .signIn .href span{
        font-size: 14px;
    }
    .signIn .href span:nth-child(1){
        float: left;
        margin-left: 120px;
    }
    .signIn .href span:nth-child(2){
       float: right;
       margin-right: 120px;
    }
    .signIn label,.signUp label,.changePwd label{
        float: left;
        width: 120px;
        line-height: 50px;
        margin-left: 70px;
        text-align: right;
    }
    .signIn input,.signUp input,.changePwd input{
        width: 200px;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding-left: 5px;

    }
    .signIn .close,.signUp .close,.changePwd .close{
        float: right;
        margin: 5px 8px 0 0;
        margin-bottom: 0px;
        cursor: pointer;
    }
    .bg{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 9;
        background: rgba(0,0,0,0.8);
    }
    .signUp .nameError,.signUp .telError,.signUp .mailError,.signUp .pwdError,.signUp .pwdAgainError,.signUp .oldPwdError,.signIn .telError{
        border: 1px solid #EA2000;
    }
</style>
