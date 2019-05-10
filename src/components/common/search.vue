<template >
    <div>
        <div class="search-big" v-if="searchInfo.isBig">
            <p class="search-title">在这，找到你未来的家</p>
            <ul>
                <li v-for="(inx,item) in lists" @click="chooseType(inx,item)" :class="{'active': item.active}">{{item.name}}</li>
            </ul>
            <div class="input">
                <input type="text" v-model="searchInfo.address" placeholder="请输入区域、商圈或小区名开始找房">
                <div @click="searchHouseBig">开始搜索</div>
            </div>
        </div>
        <div class="search-small"  v-if="!searchInfo.isBig">
            <div class="input">
                <input type="text" v-model="searchInfo.address" placeholder="请输入区域、商圈或小区名开始找房">
                <div @click="searchHouse">开始搜索</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
	data:function(){
		return { 
            lists:[{
                name: '二手房',
                type: 'second',
                active: true
            },{
                name: '租房',
                type: 'rent',
                active: false
            }],
            nowChoose: 'second'
		}
	},
    props:['searchInfo','condition'],
    created(){
        //todo 判断用户是否登录
    },
    methods: {
        chooseType(inx,item){
            let otherInx = Math.abs(inx - 1)
            this.nowChoose = item.type
            this.lists[inx].active = !this.lists[inx].active
            this.lists[otherInx].active = !this.lists[otherInx].active
        },
        searchHouseBig(){
            this.condition.address = null
            this.$dispatch('indexSearch',this.nowChoose,this.searchInfo.address)
        },
        searchHouse(){
            this.condition.address = null
            this.$dispatch('searchHouse')
        }
    }
}
</script>

<style scope>
    .search-big{
        width: 100%;
        height: 662px;
        background: url('//static.djtest.cn/fe/other/lx20170226/img/bg-search-big.jpg');
        background-size: 100% 100%;
    }
    .search-big .input{
        width: 520px;
        margin: 0px auto;
    }
    .search-big ul{
        width: 520px;
        color: #fff;
        font-weight: bold;
        margin: 0 auto;
    }
    .search-big li{
        margin-top: 20px;
        display: inline-block;
        width: 100px;
        text-align: center;
        line-height: 34px;
        background: #00ae66;
        cursor: pointer;
    }
    .search-big .active{
        background: #fff; 
        color: #00ae66;
    }
    .search-small{
        padding-top: 40px;
        width: 100%;
        height: 100px;
        background: #fff;
    }
    .search-small .input{
        width: 600px;
        padding-top: 30px;
        margin: 0 auto;
    }
    .search-small .input input{
        width: 460px;
        height: 40px;
        border: 0px;
        padding-left: 15px;
        line-height: 40px;
        font-size: 14px;
        border: 1px solid #ccc;
    }
    .search-big .input input{
        width: 385px;
        height: 40px;
        border: 0px;
        padding-left: 15px;
        line-height: 40px;
        font-size: 14px;
    }
    .search-big .input div,.search-small .input div{
        width: 120px;
        height: 40px;
        float: right;
        text-align: center;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        line-height: 40px;
        background: #00AE66;
    }
    .search-small .input div{
        background: #00AE66;
        color: #fff;
    }
    .search-title{
        padding-top: 210px;
        text-align: center;
        font-weight: bold;
        font-size: 50px;
        color: #fff;
        letter-spacing: 2px;
    }
</style>
