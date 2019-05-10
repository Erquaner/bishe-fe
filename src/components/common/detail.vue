<template >
	<div class="detail">
		<div class="section"></div>
	    <div class="info">
	    	<p class="title">{{detail.title}}</p>
	    	<div class="house-info">
	    		<div class="img" :class="{'big-img':type == 'passage'}">
	    			<div class="swiper-container">
					    <div class="swiper-wrapper">
					        <div class="swiper-slide" v-for="item in detail.imgPath">
					        	<img :src="item">
					        </div>
					    </div>
					    <!-- 如果需要分页器 -->
					    <div class="swiper-pagination"></div>
					    
					    <!-- 如果需要导航按钮 -->
					    <div class="swiper-button-prev"></div>
					    <div class="swiper-button-next"></div>
					</div>
	    		</div>
	    		<div class="desc" v-if="type != 'passage'">
	    			<p class="money" v-if="type == 'rent'">{{detail.rentMoney}}元/月</p>
	    			<p class="money" v-if="type == 'second'">{{detail.money}}万元</p>
	    			<ul>
	    				<li>面积：{{detail.area}}</li>
	    				<li>楼号：{{detail.building}}号楼</li>
	    				<li>楼层：{{detail.floor}}层</li>
	    				<li>位置：{{detail.xqAddress}}</li>
	    				<li>时间：{{detail.postTime || '最近'}}</li>
	    				<li>房型：{{detail.roomConfig}}</li>
	    				<li>装修类型：{{detail.zxType}}</li>
	    				<li v-if="type == 'rent'">支付方式：{{detail.payMethod}}</li>
	    				<li v-if="type == 'rent'">租赁方式：{{detail.rentMethod}}</li>
	    			</ul>
	    			<div class="owner">
	    				<div>
	    					<p class="name">{{detail.hostName}}</p>
	    					<p class="tel">{{detail.hostTel}}</p>
	    				</div>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="content">
	    		<p class="title">
	    			<span v-if="type != 'passage'">房源介绍</span>
	    			<span v-if="type == 'passage'">文章详情</span>
	    		</p>
	    		<div class="module" v-if="type != 'passage'">
	    			<p class="title">基本信息</p>
	    			<ul class="houseConfig" v-if="type == 'rent'">
	    				<li v-for="item in detail.houseConfig">{{item}}</li>
	    			</ul>
	    			<p class="desc">{{detail.desc}}</p>
	    		</div>
	    		<div class="module" v-if="type == 'passage'">
	    			<p>{{detail.content}}</p>
	    		</div>
	    	</div>
	    </div>
	    <div class="section"></div>
	</div>
</template>

<script>
export default {
	data:function(){
		return {
		}
	},
	ready(){
		var mySwiper = new Swiper ('.swiper-container', {
		    pagination: '.swiper-pagination',
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        paginationClickable: true,
	        spaceBetween: 30,
	        centeredSlides: true,
	        autoplay: 2500,
	        autoplayDisableOnInteraction: false
		})      
		this.count() 
	},
	props:['detail','type'],
	methods:{
		count(){
			let url = '/api/count';
			let params = {
				type: 'add',
				id: this.detail._id,
				look: 1
			}
			this.$http.post(url,params,{emulateJSON:true}).then((res)=>{
				let data = JSON.parse(res.data)
                if (data.code == 999) {
                	alert(data.msg)
                }
			})
		}
	}
}
</script>

<style scope>
	.detail{
		background: #F1F1F1;
	}
	.detail .section{
		height: 80px;
		background: #F1F1F1;
	}
	.detail .swiper-container{
		text-align: center;
		width: 550px;
	}
	.detail .swiper-container img{
		width: 440px;
		line-height: 425px;
	}
	.info{
		width: 70%;
		margin: 0 auto;
		background: #fff;
	}
	.info .title{
		font-size: 26px;
		font-weight: bold;
		line-height: 90px;
		padding-left: 40px;
		color: #333333;
	}
	.house-info .img{
		display: inline-block;
		width: 550px;
		vertical-align: middle;
	}
	.house-info .desc{
		display: inline-block;
		vertical-align: top;
	}
	.house-info .money{
		font-weight: bold;
		font-size: 28px;
		margin-bottom: 30px;
		color: #E4393C;
	}
	.house-info li{
		font-size: 14px;
		line-height: 26px;
		color: #666;
	}
	.house-info .owner{
		margin-top: 20px;
	}
	.house-info .owner img{
		display: inline-block;
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}
	.house-info .owner div{
		display: inline-block;
		vertical-align: top;
	}
	.owner .name{
		font-size: 16px;
		line-height: 36px;
	}
	.owner .tel{
		font-size: 30px;
		font-weight: bold;
		color: #E4393C;
	}
	.info .content .title{
		padding: 0;
		width: 100%;
		height: 45px;
		margin-top: 40px;
		font-size: 20px;
		line-height: 45px;
		background: #00AE66;
		color: #fff;
	}
	.info .content .title span{
		padding-left: 40px;
	}
	.content .module{
		padding: 20px 40px;
	}
	.content .module .title{
		font-size: 18px;
		background: #fff;
		color: #000;
		margin-top: 0px;
		line-height: 40px;
	}
	.content .houseConfig{
		font-size: 0;
	}
	.content .houseConfig li{
		display: inline-block;
		width: 110px;
		height: 40px;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 40px;
		margin: 10px;
		font-size: 14px;
	}
</style>


