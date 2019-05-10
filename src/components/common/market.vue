<template >
    <div class="market">
    	<div class="content">
    		<p class="title">{{city}}{{date}}房产市场行情</p>
	        <ul>
	            <li>
	                <p class="num">{{count.newHouse}}</p>
					<p class="msg">新增房数</p>
	            </li>
                <li>
                    <p class="num">{{count.deal}}</p>
                    <p class="msg">房产交易量</p>
                </li>
                <li>
                    <p class="num">{{count.look}}</p>
                    <p class="msg">房产浏览数</p>
                </li>
	        </ul>
    	</div>
    </div>
</template>

<script>
export default {
	data: function(){
		return {
			isLogin: true,  // 用户是否登录的标志
            city: '北京',
            date: '',
            count: {
                newHouse: 0,
                deal: 0,
                look: 0
            }
		}
	},
    created(){
        //todo 判断用户是否登录
        this.init()
        this.today()
    },
    methods: {
        init(){
            let own = this
            let url = '/api/count'
            let params = {
                type: 'find'
            }
            this.$http.post(url,params,{emulateJSON: true}).then((res)=>{
                let data = JSON.parse(res.data);
                if (data.code == 0) {
                    own.count.deal = data.data.deal
                    own.count.look = data.data.look
                    own.count.newHouse = data.data.newHouse
                }else{
                    alert(data.msg)
                }
            })
        },
        today(){
            let date = new Date();
            let month = date.getMonth()+1;
            let day = date.getDate();
            this.date = month + '月' + day + '日'
        }
    }
}
</script>

<!--  -->
<style scope>
    .market{
    	background: url('//static.djtest.cn/fe/other/lx20170226/img/bg-market.jpg');
    	background-size: 100% 100%; 
    }
    .market .content{
    	width: 100%;
    	height: 662px;
    }
    .market .title{
    	padding-top: 180px;
    	font-size: 36px;
    	color: #fff;
    	font-weight: bold;
    	text-align: center;
    	letter-spacing: 2px;
    }
    .market .content ul{
    	width: 900px;
    	margin: 50px auto;
    }
    .market .content li{
    	width: 260px;
    	height: 160px;
    	margin: 0 20px 0 20px;
    	float: left;
    	color: #fff;
    	text-align: center;
    	background: rgba(255,255,255,0.3);
    }
    .market .content .num{
    	padding-top: 36px;
    	font-size: 28px;
    	font-weight: bold;
    	color: #fff
    }
    .market .content .msg{
    	line-height: 40px;
    }
</style>
