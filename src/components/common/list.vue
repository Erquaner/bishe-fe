<template >
	<div class="list">
		<div class="section" v-if="type == 'passage' || type == 'manage'"></div>
		<div class="manage-type" v-if="type == 'manage'">
			<p v-for="(inx,item) in manageType" @click="changeManageType(item.type)" :class="{'active': item.active}">{{item.name}}</p>
		</div>
		<ul>
			<li v-for="(inx,item) in listData.data">
				<div class="img">
					<img :src="item.imgPath[0]" alt="">
				</div>
				<div :class="{'content': isUser,'adminContent': !isUser}">
					<p class="title" @click="toDetail(item)">{{item.title}}</p>
					<p class="desc" v-if="type != 'passage'">
						<span>{{item.xqAddress}}</span>
						<span>{{item.roomConfig}}</span>
						<span>{{item.area}}</span>
					</p>
					<p class="tag" v-if="type == 'second' || type == 'rent' || (type == 'manage' && currType != 'passage')">{{item.desc}}</p>
					<p class="intro" v-if="type == 'passage' || (type == 'manage' && currType == 'passage')">{{item.desc}}</p>
					<p class="time">{{item.postTime | changeTime}}</p>
				</div>
				<div class="collect" v-if="type == 'second' || type == 'rent'">
					<i :class="{'active': item.collectType}" @click="collect(item._id,item.collect,item.collectType,inx)"></i>
				</div>
				<div class="money" v-if="type == 'second' || type == 'rent' || (type == 'manage' && currType != 'passage')">
					<span>{{item.rentMoney || item.money }}</span>
					<span v-if="item.money">万</span>
					<span v-if="!item.money">元/月</span>
				</div>
				<div class="manage" v-if="!isUser">
					<p @click="update(inx)">修改</p>
					<p @click="remove(item._id,inx)">删除</p>
				</div>
			</li>
		</ul>
		<div class="page" v-if="listData.allPage > 1">
			<p>
				<span>{{listData.currPage || 0}}</span>
				<span>/</span>
				<span>{{listData.allPage || 0}}</span>
			</p>
			<p @click="prePage">上一页</p>
			<p @click="nextPage">下一页</p>
		</div>
	</div>
</template>

<script>
import common from './common.js'
export default {
	data:function(){
		return {
			search:{
				big: false,
				small: true
			},
			navOther: true,
			routerUrl: 'second',
			address: '',
			currPage: 1,
			manageType: [{
				name: '二手房',
				type: 'second',
				active: true
			},{
				name: '租房',
				type: 'rent',
				active: false
			},{
				name: '文章',
				type: 'passage',
				active: false
			}],
			currType: 'second'
		}
	},
    props: ['listData','isUser','type'],
    created(){
    	if (this.type == 'manage') {
    		this.changeManageType('second')
    	};
    },
    methods:{
    	prePage(){
			let own = this
			if (this.currPage > 1) {
				this.currPage--
			}else{
				this.currPage = 1
			}
			this.$dispatch('searchHouse',this.currPage)
		},
		nextPage(){
			let own = this
			if (this.currPage < this.listData.allPage) {
				this.currPage++
			}else{
				this.currPage = this.listData.allPage
			}
			this.$dispatch('searchHouse',this.currPage)
		},
		toDetail(item){
			if (this.type == 'passage') {
				
			}else{
				let type = {
					type: 'look'
				}
				this.$http.post('/api/count',type,{emulateJSON: true}).then((res)=>{

				})
				this.$dispatch('toDetail',item)
			}
		},
		update(inx){
			this.$dispatch('changeNav','post')
			this.$dispatch('updateInfo',this.listData.data[inx],'update')
		},
		remove(id,inx){
			let url = '/api/remove'
            let own = this
            let params = {
            	type: this.currType,
            	id: id
            }
            own.$http.post(url,params,{emulateJSON:true}).then((res)=>{
                let data = JSON.parse(res.data)
                if (data.code == 0) {
                	own.listData.data.splice(inx,1)
                }else{
                    alert('删除失败')
                }
            })
		},
		changeManageType(type){
			let url;
            if (type == 'passage') {
                url = '/api/find' + type
            }else{
                url = '/api/find' + type + 'house'
            }
            switch(type){
            	case 'second':
            		this.clear()
            		this.manageType[0].active = true
            		this.currType = 'second'
            		break;
            	case 'rent':
            		this.clear()
            		this.manageType[1].active = true
            		this.currType = 'rent'
            		break;
            	case 'passage':
            		this.clear()
            		this.manageType[2].active = true
            		this.currType = 'passage'
            		break;
            }
            let own = this
            own.$http.get(url).then((res)=>{
                let data = JSON.parse(res.data)
                if (data.code == 0) {
                    own.listData = data.data
                }else{
                    own.listData = null
                }
            })
		},
		clear(){
			for(let key in this.manageType){
				this.manageType[key].active = false
			}
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
           		type: this.currType
           	}
            let own = this
            own.$http.post(url,params,{emulateJSON:true}).then((res)=>{
                let data = JSON.parse(res.data)
                if (data.code == 0) {
                	own.listData.data[inx].collectType = !own.listData.data[inx].collectType
                }else{
                    alert(data.msg)
                }
            })
		}
    },
    events:{
   		'updateCondition': function(){
   			this.$dispatch('searchHouse')
   		}
    },
    filters:{
    	'changeTime': function(value){
    		let time = new Date(value)
    		let y = time.getFullYear()
    		let m = time.getMonth() + 1
    		let d = time.getDate()
    		let h = time.getHours();
    		let min = time.getMinutes()
    		let s = time.getSeconds()
    		let date = y + '年' + m + '月' + d + '日  ' + h + '时' + min + '分' + s + '秒';
    		return date
    	}
    	// 'checkCollect': function(value){
    	// 	if (value.length == 0) {
    	// 		return '添加收藏'
    	// 	};
    	// 	let phone = common.getCookie('userTel');
    	// 	for(let i = 0,len = value.length; i < len;i++){
    	// 		if (value[i] == phone) {
    	// 			return '添加收藏'
    	// 		}else{
    	// 			return '取消收藏'
    	// 		}
    	// 	}
    	// }
    }
}
</script>

<style scoped>
	.second-list{
		background: #F1F1F1;
	}
	.list .manage-type{
		width: 300px;
		margin: 0 auto 20px auto;
		line-height: 40px;
		background: #fff;
	}
	.list .manage-type p{
		display: inline-block;
		width: 100px;
		text-align: center;
	}
	.list .manage-type p.active{
		background: #00AE66;
		color: #fff;
	}
	.list .section{
		height: 80px;
	}
	.list{
		width: 70%;
		margin: 0 auto 40px auto;
	}
	.list li{
		position: relative;
		width: 100%;
		height: 200px;
		margin-top: 10px;
		background: #fff;
	}
	.list .img{
		width: 25%;
		display: inline-block;
		vertical-align: middle;
	}
	.list img{
		padding: 20px;
		width: 220px;
	}
	.list .content,.list .adminContent{
		width: 48%;
		display: inline-block;
		padding-top: 20px;
		vertical-align: top;
		margin-left: 25px;
	}
	.list .intro{
		height: 87px;
		overflow: hidden;
		text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 4;/*设置两行显示省略号*/
	    -webkit-box-orient: vertical;
		margin-bottom: 15px;
	}
	.list .money{
		display: inline-block;
	}
	.list .title{
		font-size: 22px;
		font-weight: bold;
		line-height: 40px;
		color: #009DE8;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}
	.list .desc{
		font-size: 15px;
		color: #000;
		font-weight: bold;
		line-height: 50px;
	}
	.list .tag{
		font-size: 14px;
		color: #3b3b3b;
		line-height: 50px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.list .time{
		font-size: 14px;
		color: #888888;
	}
	.list .money{
		font-weight: bold;
		font-size: 24px;
		vertical-align: top;
		margin-top: 80px;
		text-align: center;
		color: #E4393C;
	}
	.list .manage{
		position: absolute;
		top: 130px;
		right: 7%;
	}
	.list .manage p{
		display: inline-block;
		width: 70px;
		height: 28px;
		border: 1px solid #ddd;
		border-radius: 4px;
		text-align: center;
		line-height: 28px;
		cursor: pointer;
	}
	.list .manage p:hover{
		background: #E4393C;;
		color: #fff;
	}
	.list .collect{
		position: absolute;
		top: 20px;
		right: 40px;
	}
	.list .collect i{
		display: block;
		width: 20px;
		height: 18px;
		background: url(../../../libs/img/love_empty.png);
		background-size: 20px 18px;
	}
	.list .collect i.active{
		background: url(../../../libs/img/love.png);
		background-size: 20px 18px;
	}
	.list ul{
		margin-bottom: 20px;
	}
	.list .page{
		text-align: right;
		background: #f1f1f1;
		margin-bottom: 30px;
	}
	.list .page p{
		display: inline-block;
	}
	.list .page p:nth-of-type(1){
		width: 70px;
		text-align: center;
		font-size: 14px;
	}
	.list .page p:nth-of-type(2),.list .page p:nth-of-type(3){
		width: 80px;
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		border: 1px solid #ccc;
		text-align: center;
		cursor: pointer;
		background: #fff;
	}
</style>
