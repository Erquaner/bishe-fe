<template >
	<div class="condition" :class="{'second': conditionType == 'second'}">
		<p class="title">全部房源</p>
		<div>
			<p>区域：</p>
			<ul>
				<li v-for="(inx,item) in conditions.address" @click="chooseAddress(item)">{{item}}</li>
			</ul>
		</div>
		<div v-if="conditionType == 'rent'">
			<p>总价（元）：</p>
			<ul>
				<li v-for="(inx,item) in conditions.rentMoney" @click="chooseMoney(item,'rentMoney')">{{item}}</li>
			</ul>
		</div>
		<div v-if="conditionType == 'second'">
			<p>总价（万）：</p>
			<ul>
				<li v-for="(inx,item) in conditions.money" @click="chooseMoney(item,'money')">{{item}}</li>
			</ul>
		</div>
		<div>
			<p>面积：</p>
			<ul>
				<li v-for="(inx,item) in conditions.area" @click="chooseArea(item)">{{item}}</li>
			</ul>
		</div>
		<div v-if="conditionType == 'rent'">
			<p>方式：</p>
			<ul>
				<li v-for="(inx,item) in conditions.rentMethod" @click="chooseRentMethod(item)">{{item}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data:function(){
		return {
			conditions:{
				address: ['全部','东城区','西城区','朝阳区','海淀区','昌平区','通州区','石景山区','丰台区','顺义区','门头沟区'],
				rentMoney: ['全部','0-1000','1000-2000','2000-3000','3000-4000','4000-6000','6000以上'],
				money: ['全部','0-10','10-50','50-200','200-500','500-1000','1000以上'],
				area: ['全部','40以下','40-60','60-80','80-100','100-120','120以上'],
				rentMethod: ['全部','整套出租','单间出租']
			}
		}
	},
	created(){
		// let own = this
		// own.$http.get(url,{params:params}).then((res) => {
  //           if (res.code = 0) {
  //               alert('登录成功')
  //           }else{
  //               alert(req.error)
  //           }
  //       })
	},
	props:['condition','searchInfo','conditionType'],
	methods:{
		chooseAddress(params){
			this.searchInfo.address = null
			this.condition.address = params
			this.$dispatch('searchHouse')
		},
		chooseMoney(params,type){
			this.searchInfo.address = null
			if (type == 'rentMoney') {
				this.condition.rentMoney = params
			}else{
				this.condition.money = params
			}
			
			this.$dispatch('searchHouse')
		},
		chooseArea(params){
			this.searchInfo.address = null
			this.condition.area = params
			this.$dispatch('searchHouse')
		},
		chooseRentMethod(params){
			this.searchInfo.address = null
			this.condition.rentMethod = params
			this.$dispatch('searchHouse')
		}
	}
}
</script>

<style scope>
	.condition{
		width: 70%;
		height: 205px;
		border: 1px solid #fcfcfc;
		margin: 20px auto 5px auto;
		padding-bottom: 5px;
		font-size: 14px;
		background: #fff;
	}n
	.condition.second{
		height: 165px;
	}
	.condition .title{
		width: 98%;
		height: 50px;
		line-height: 50px;
		padding-left: 2%;
		margin-bottom: 10px;
		font-weight: bold;
		font-size: 18px;
		background: #00AE66;
		color: #fff;
	}
	.condition div{
		clear: both;
		width: 100%;
		height: 34px;
		padding-left: 20px;
		padding-right: 20px;
		line-height: 34px;
		color: #3B3B3B;
	}
	.condition p,.condition ul{
		float: left;
		font-weight: bold;
	}
	.condition li{
		font-weight: normal;
		margin: 0px 10px;
		float: left;
		cursor: pointer;
	}
</style>
