<template >
    <div class="body">
        <tab v-if="control.isTab" :nav-info="navInfo"></tab>
        <search v-if="control.isSearch" :search-info="searchInfo" :condition="condition"></search>
        <condition v-if="control.isCondition" :condition="condition" :condition-type="conditionType" :search-info="searchInfo"></condition>
        <ul v-if="control.isCondition" class="chooseCondition">
            <p>已选择条件：</p>
            <li v-for="(key,value) in condition" @click="removeCondition(key)">{{value}}</li>
        </ul>
        <list v-if="control.isList" :list-data="listData" :is-user="navInfo.isUser" :type="type"></list>
        <market v-if="control.isMarket"></market>
        <post v-if="control.isPost" :update-info="updateInfo"></post>
        <detail v-if="control.isDetail" :detail="datailData" :type="type"></detail>
        <tool v-if="control.isTool"></tool>
        <map v-if="control.isMap"></map>
        <bottom v-if="control.isBottom"></bottom>
    </div>
</template>

<script>
import tab from './common/header.vue';
import search from './common/search.vue';
import condition from './common/condition.vue';
import bottom from './common/footer.vue';
import list from './common/list.vue';
import market from './common/market.vue';
import detail from './common/detail.vue';
import post from './common/post.vue';
import tool from './common/tool.vue';
import map from './common/map.vue';
import common from './common/common.js'
export default {
	data:function(){
		return {
            navInfo: {
                type: 'big',  //控制header样式
                isUser: true  //判断是否是用户
            },
            searchInfo: {
                isBig: true,  //控制搜索框样式
                address: null   //将首页的搜索传递到二手房和租房页面中
            },
            listData: {},
            type: 'second',
            control: {
                isTab: true,
                isSearch: true,
                isCondition: false,
                isList: false,
                isMarket: false,
                isBottom: true,
                isDetail: false,
                isPost: false,
                isTool: false,
                isMap: false
            },
            condition: {
                address: null,
                rentMoney: null,
                area: null,
                rentMethod: null,
                money: null
            },
            conditionType: null,
            datailData: null,
            updateInfo: {
                isUpdate: false,
                data: null
            }
		}
	},
    created(){
        this.init()
    },
    components: {
        tab,
        search,
        bottom,
        condition,
        list,
        market,
        detail,
        post,
        tool,
        map
    },
    methods:{
        init(){
            if (!common.getCookie('userInfo')) {
                return false
            };
            let info = JSON.parse(common.getCookie('userInfo'))
            if (info.admin) {
                this.navInfoli.isUser = false
                this.changeNav('manage')
            }else{
                this.navInfo.isUser = true
            }
            this.$broadcast('login',info)
        },
        changeNav(type,flag){
            switch(type){
                case 'index':
                    this.control = {
                        isTab: true,
                        isSearch: true,
                        isBottom: true
                    }
                    this.type = 'second'
                    this.navInfo.type = 'big'
                    this.searchInfo.isBig = true
                break;
                case 'rent':
                    this.control = {
                        isTab: true,
                        isSearch: true,
                        isCondition: true,
                        isList: true,
                        isBottom: true
                    }
                    this.type = 'rent'
                    this.navInfo.type = 'small'
                    this.searchInfo.isBig = false
                    if (flag != 'search') {
                        this.initData(this.type)
                    };
                    this.conditionType = 'rent'
                break;
                case 'second': 
                    this.control = {
                        isTab: true,
                        isSearch: true,
                        isCondition: true,
                        isList: true,
                        isBottom: true
                    }
                    this.listData = {}
                    this.type = 'second'
                    this.navInfo.type = 'small'
                    this.searchInfo.isBig = false
                    if (flag != 'search') {
                        this.initData(this.type)
                    };
                    this.conditionType = 'second'
                break;
                case 'guide':  //市场指南
                    this.control = {
                        isTab: true,
                        isList: true,
                        isBottom: true
                    }
                    this.listData = {}
                    this.type = 'passage'
                    this.initData(this.type)
                    this.navInfo.type = 'small'
                    this.searchInfo.isBig = false
                break;
                case 'market':
                    this.control = {
                        isTab: true,
                        isMarket: true,
                        isBottom: true
                    }
                break;
                case 'post':
                    this.control = {
                        isTab: true,
                        isBottom: true,
                        isPost: true
                    }
                    this.updateInfo.isUpdate = false
                    this.navInfo.type = 'small'
                break;
                case 'manage':
                    this.control = {
                        isTab: true,
                        isList: true,  
                        isBottom: true
                    }
                    this.listData = {}
                    this.type = 'manage'
                    this.navInfo.type = 'small'
                break;
                case 'detail':
                    this.control = {
                        isTab: true,
                        isBottom: true,
                        isDetail: true
                    }
                break;
                case 'tool': 
                    this.control = {
                        isTab: true,
                        isBottom: true,
                        isTool: true
                    }
                break;
                case 'map': 
                    this.control = {
                        isTab: true,
                        isBottom: true,
                        isMap: true
                    }
                    this.navInfo.type = 'small'
                break;
            }
        },
        clear(){
            for(let key in this.control){
                this.control[key] = false
            }
        },
        initData(type){
            let url;
            if (type == 'passage') {
                url = '/api/find' + type
            }else{
                url = '/api/find' + type + 'house'
            }
            let own = this
            let params = {
                address: ''
            }
            own.$http.get(url,{params:params}).then((res)=>{
                let data = JSON.parse(res.data)
                if (data.code == 0) {
                    own.listData = data.data
                }else{
                    own.listData = {}
                }
            })
        },
        removeCondition(key){
            this.condition[key] = null
        }
    },
    events:{
        'changeNav':function(type){
            this.clear()
            this.changeNav(type)
        },
        'indexSearch':function(type,address){
            let url = '/api/find' + type + 'house'
            let own = this
            let params = {
                address: address
            }
            own.$http.get(url,{params:params}).then((res)=>{
                let data = JSON.parse(res.data)
                if (data.code == 0) {
                    own.listData = data.data
                    own.changeNav(type,'search')
                }else{
                    own.listData = {}
                }
            })
        },
        'searchHouse':function(page){
            let url = '/api/find' + this.type + 'house'
            let own = this
            let params = {
                address: this.searchInfo.address || this.condition.address,
                page: page,
                rentMoney: this.condition.rentMoney,
                money: this.condition.money,
                area: this.condition.area,
                rentMethod: this.condition.rentMethod
            }
            own.$http.get(url,{params:params}).then((res)=>{
                let data = JSON.parse(res.data)
                if (data.code == 0) {
                    own.listData = data.data
                    own.changeNav(this.type,'search')
                }else{
                    own.listData = {}
                }
            })
        },
        'toDetail':function(data){
            this.datailData = data;
            this.changeNav('detail')
        },
        'updateInfo': function(data,type){
            this.updateInfo.data = data
            this.updateInfo.isUpdate = true
        }
    }
}
</script>

<style scoped>
    .body{
        background: #f1f1f1;
    }
    .chooseCondition{
        width: 70%;
        height: 30px;
        line-height: 30px;
        margin:  0 auto;
        background: #fff;
        font-size: 14px;
    }
    .chooseCondition p{
        display: inline-block;
        font-weight: bold;
        margin-left: 20px;
    }
    .chooseCondition li{
        display: inline-block;
        margin: 0 10px;
        cursor: pointer;
    }
</style>
