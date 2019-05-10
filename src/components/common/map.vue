<template >
	<div class="map">
	    <div id="container">
	    	<div class="type">
		    	<p>二手房</p>
		    </div>
	    </div>
	    <div class="info" v-if="isShow">
	    	<div class="img">
				<img :src="info.imgPath[0]" alt="">
			</div>
			<div class="money">
				<span>{{info.rentMoney || info.money }}</span>
				<span v-if="info.money">万</span>
				<span v-if="!info.money">元/月</span>
			</div>
			<div class="content">
				<p class="title">{{info.title}}</p>
				<p class="desc">
					<span>{{info.xqAddress}}</span>
					<span>{{info.roomConfig}}</span>
					<span>{{info.area}}</span>
				</p>
				<p class="tag">{{info.desc}}</p>
				<p class="time">{{info.postTime | changeTime}}</p>
			</div>
			<div class="collect">
				<i :class="{'active': info.collectType}" @click="collect(info._id,info.collect,info.collectType,inx)"></i>
			</div>
	    </div>
	</div>
</template>
<script>
import common from './common.js'
export default {
	data:function(){
		return {
			currType: true,
			info: {

			},
			isShow: false
		}
	},
	ready(){
		var map = new AMap.Map('container',{
	        resizeEnable: true,
	        zoom: 13,
	        center: [116.440983, 40.0358]
	    });
	    this.initData(map)
	    AMap.event.addListener(map, 'zoomend', function(){
	    	let currZoom = map.getZoom();
	    	if (currZoom < 14) {
	    		
	    	};
	    });
	},
	methods:{
		initData(map,type){
			let own = this
			let params = {
				type: 'map',
				address: ''
			}
			let url = '/api/findsecondhouse'
			own.$http.get(url,{params:params}).then((res)=>{
				let data = JSON.parse(res.data)
				if (data.code == '0') {
					let array = data.data
					for(let i = 0,len = array.length;i < len;i++){
						if (array[i].gps != '') {
							own.createMark(array[i],map,own)
						};
					}
				};
			})
		},
		createMark(data,map,own){
			var div = document.createElement('div')
			div.className = 'markerIcon'
			var img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAoCAMAAACo9wirAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozQThDNkFGMzIxQ0UxMUU3QkRGRDgxNzQzODk5NDc2QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozQThDNkFGNDIxQ0UxMUU3QkRGRDgxNzQzODk5NDc2QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNBOEM2QUYxMjFDRTExRTdCREZEODE3NDM4OTk0NzZCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNBOEM2QUYyMjFDRTExRTdCREZEODE3NDM4OTk0NzZCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YDchhwAAAAZQTFRFhNLFAAAAkuDdDAAAAAJ0Uk5T/wDltzBKAAAAgklEQVR42szUyw6AIAxE0Zn//2mDj1ig5cpOlswxsUArh6V7dXtTOhilcSCq8keozG+hOr+EFvkptMqb6MH0xw0ktce9ALIzzb8vCiNgg/g18LpMb4DqqPmy8Lr5weCTY4CvmgE2DrceA+zuWWwPkEFkI8h5E+n7EHuFa9DIsHEIMAA8JQIxrAZsUwAAAABJRU5ErkJggg==" />'
			div.innerHTML = img
			var marker = new AMap.Marker({
				content: div,
				title: data.title,
				position: data.gps.split(',')
			})
			marker.setMap(map)
			if (data) {
				div.addEventListener('click',function(){
					own.isShow = true
					own.info = data
				})
			};
		},
		collect(id,collect,type,inx){
			//type true是已收藏 false未收藏
			let url = '/api/collect'
			let phone = common.getCookie('userTel')

			if (!collect) {
				collect = []
			};
			if (type) {
				for(let i = 0; i < collect.length; i++){
					if (collect[i] == phone) {
						collect.splice(inx,1)
					}
				}
				type = false
			}else{
				collect.push(phone)
				type = true
			}
           	let params = {
           		id: id,
           		collect: collect,
           		collectType: type,
           		type: 'second'
           	}
            let own = this
            own.$http.post(url,params,{emulateJSON:true}).then((res)=>{
                let data = JSON.parse(res.data)
                if (data.code == 0) {
                	own.info.collectType = !own.info.collectType
                }else{
                    alert(data.msg)
                }
            })
		}
	},
	filters:{
    	'changeTime': function(value){
    		let time = new Date(value)
    		let y = time.getFullYear()
    		let m = time.getMonth() + 1
    		let d = time.getDay()
    		let h = time.getHours();
    		let min = time.getMinutes()
    		let s = time.getSeconds()
    		let date = y + '年' + m + '月' + d + '日  ' + h + '时' + min + '分' + s + '秒';
    		return date
    	}
    }
}
</script>
<style scoped>
	.map{
		width: 100%;
		height: 623px;
		position: relative;
	}
	#container {
		width: 100%;
		height: 623px;
		margin-top: 40px;
	}
	.map .type{
		position: absolute;
		top: 20px;
		left: 20px;
		width: 80px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #00AE66;
		background: #fff;
		z-index: 100;
	}
	.map .info{
		position: absolute;
		top: 20px;
		right: 30px;
		width: 300px;
		height: 400px;
		background: #fff;
	}
	.map .info .img{
		width: 300px;
		height: 200px;
		display: inline-block;
		vertical-align: middle;
	}
	.map .info img{
		width: 300px;
		height: 200px;
	}
	.map .info .intro{
		padding: 10px;
		height: 87px;
		overflow: hidden;
		text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 4;/*设置两行显示省略号*/
	    -webkit-box-orient: vertical;
		margin-bottom: 15px;
	}
	.map .info .title{
		clear: both;
		position: absolute;
		top: 164px;
		margin-top: 0px;
		font-size: 16px;
		font-weight: bold;
		line-height: 36px;
		height: 36px;
		color: #fff;
		overflow: hidden;
		background: rgba(0,0,0,0.5);
		text-indent: 1em;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}
	.map .info .desc{
		padding: 10px;
		font-size: 14px;
		color: #000;
		line-height: 26px;
	}
	.map .info .tag{
		padding: 10px;
		font-size: 14px;
		color: #3b3b3b;
		line-height: 26px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.map .info .time{
		padding: 10px;
		font-size: 12px;
		color: #888888;
	}
	.map .info .money{
		padding: 10px;
		font-weight: bold;
		font-size: 18px;
		vertical-align: top;
		margin-top: 0px;
		text-align: right;
		color: #E4393C;
	}
	.map .info .collect{
		width: 30px;
		height: 30px;
		border-radius: 26px;
		background: rgba(0,0,0,0.5);
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.map .info .collect i{
		display: block;
		margin: 0 auto;
		margin-top: 6px;
		width: 20px;
		height: 18px;
		background: url(../../../libs/img/love-white.png);
		background-size: 20px 18px;
	}
	.map .info .collect i.active{
		background: url(../../../libs/img/love.png);
		background-size: 20px 18px;
	}
</style>
		