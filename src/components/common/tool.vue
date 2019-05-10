<template >
	<div class="tool">
		<p class="title">购房计算器</p>
		<div class="input">
			<div class="money">
				<label for="">贷款金额(元)：</label>
				<input type="text" v-model="money" placeholder="请输入贷款金额">
			</div>
			<div class="month">
				<label for="">还款月数：</label>
				<input type="text" v-model="month" placeholder="请输入还款月数">
			</div>
			<p class="result">每月需还贷：{{count}}</p>
		</div>
	</div>
</template>

<script>

export default {
	data:function(){
		return {
			money: '',
			month: '',
			rate: 0.00575
		}
	},
	computed:{
		count: function(){
			let one = this.money * this.rate * Math.pow((1 + this.rate),this.month)
			let two = Math.pow((1 + this.rate),this.month) - 1
			let result = one / two
			if (!result || result == Infinity) {
				return 0
			};
			return result.toFixed(2)
		}
	}
}
</script>

<style scoped>
	.tool{
    	width: 100%;
    	height: 662px;
    	background: url('//static.djtest.cn/fe/other/lx20170226/img/bg-market.jpg');
    	background-size: 100% 100%; 
    }
    .tool .title{
    	padding-top: 150px;
    	font-size: 34px;
    	font-weight: bold;
    	color: #fff;
    	text-align: center;
    }
    .tool .input{
    	width: 810px;
    	margin: 0 auto;
    }
    .tool .input div{
    	display: inline-block;
    	width: 400px;
		margin-top: 50px;
    }
    .tool label{
    	font-size: 22px;
    	font-weight: bold;
    	color: #fff;
    	vertical-align: middle;
    	line-height: 50px;
    }
    .tool input{
    	width: 300px;
    	height: 40px;
    	border: 0px;
    	color: #fff;
    	font-size: 16px;
    	border-radius: 4px;
    	vertical-align: middle;
    	padding-left: 10px;
    	background: rgba(255,255,255,0.6);
    }
    .tool .result{
    	font-size: 22px;
    	font-weight: bold;
    	color: #fff;
    	line-height: 100px;
    }
</style>
