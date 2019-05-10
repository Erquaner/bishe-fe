<template >
	<div class="add-house">
		<div class="section"></div>
	    <div class="add-house-info">
	    	<ul class="tab" v-if="!updateInfo.isUpdate">
	    		<li v-for="(inx,item) in lists" @click="chooseType(inx,item)" :class="{'active': item.active}">{{item.name}}</li>
	    	</ul>
	    	<div>
	    		<div class="label rent-method" v-if="lists[1].active">
	    			<label for="">*出租方式：</label>
	    			<input type="radio" id="one" value="整套出租" v-model="info.rentMethod">
	    			<label for="one">整套出租</label>
	    			<input type="radio" id="one" value="单间出租" v-model="info.rentMethod">
	    			<label for="one">单间出租</label>
	    			<span :class="{'rentMethodError': error.rentMethodError}" v-if="error.rentMethodError">*请选择</span>
	    		</div>
	    		<div class="label address" v-if="!lists[2].active">
	    			<label for="">*小区地址：</label>
	    			<input type="text"  :class="{'xqAddressError': error.xqAddressError}" v-model="info.xqAddress" @blur="addressToGps()" placeholder="哈尔滨市南岗区学府路74号XXX小区">
	    		</div>
	    		<div class="label floor" v-if="!lists[2].active">
	    			<label for="">楼号楼层：</label>
	    			<input type="text" v-model="info.building" placeholder="楼号">
	    			<input type="text" v-model="info.floor" placeholder="层">
	    		</div>
	    		<div class="label house-type" v-if="!lists[2].active">
	    			<label for="">房屋户型：</label>
	    			<input type="text" v-model="info.room" placeholder="室">
	    			<input type="text" v-model="info.drawing" placeholder="厅">
	    			<input type="text" v-model="info.washroom" placeholder="卫">
	    		</div>
	    		<div class="label" v-if="!lists[2].active">
	    			<label for="">*面积：</label>
	    			<input type="text" :class="{'areaError': error.areaError}" v-model="info.area" placeholder="㎡">
	    		</div>
	    		<div class="label decoration" v-if="!lists[2].active">
	    			<label for="">*类型：</label>
	    			<select v-model="info.zxType" :class="{'zxTypeError': error.zxTypeError}">
						<option selected>毛坯</option>
						<option>简单装修</option>
						<option>精装修</option>
					</select>
	    		</div>
	    		<div class="label house-config" v-if="lists[1].active">
	    			<label for="">房屋配置：</label>
    				<input type="checkbox" v-model="info.houseConfig" id="bed" value="床">
	    			<label for="bed">床</label>
	    			<input type="checkbox" v-model="info.houseConfig" id="chest" value="衣柜">
	    			<label for="chest">衣柜</label>
	    			<input type="checkbox" v-model="info.houseConfig" id="sofa" value="沙发">
	    			<label for="sofa">沙发</label>
	    			<input type="checkbox" v-model="info.houseConfig" id="tv" value="电视">
	    			<label for="tv">电视</label>
	    			<input type="checkbox" v-model="info.houseConfig" id="icebox" value="冰箱">
	    			<label for="icebox">冰箱</label>
	    			<input type="checkbox" v-model="info.houseConfig" id="washer" value="洗衣机">
	    			<label for="washer">洗衣机</label>
	    			<input type="checkbox" v-model="info.houseConfig" id="aircondition" value="空调">
	    			<label for="aircondition">空调</label>
	    			<input type="checkbox" v-model="info.houseConfig" id="calorifier" value="热水器">
	    			<label for="calorifier">热水器</label>
	    			<input type="checkbox" v-model="info.houseConfig" id="heating" value="暖气">
	    			<label for="heating ">暖气</label>
	    			<input type="checkbox" v-model="info.houseConfig" id="broad" value="宽带">
	    			<label for="broad">宽带</label>
	    			<input type="checkbox" v-model="info.houseConfig" id="balcony" value="阳台">
	    			<label for="balcony">阳台</label>
	    			<input type="checkbox" v-model="info.houseConfig" id="bathroom" value="独立卫生间">
	    			<label for="bathroom">独立卫生间</label>
	    		</div>
	    		<div class="label money" v-if="lists[1].active">
	    			<label for="">*租金：</label>
	    			<input type="text" v-model="info.rentMoney" placeholder="元/月" :class="{'rentMoneyError': error.rentMoneyError}">
	    			<select v-model="info.payMethod">
						<option selected>押一付一</option>
						<option>押三付一</option>
						<option>半年付</option>
						<option>一年付</option>
					</select>
	    		</div>
	    		<div class="label money" v-if="lists[0].active">
	    			<label for="">*售价：</label>
	    			<input type="text" v-model="info.money" :class="{'moneyError': error.moneyError}">
	    		</div>
	    		<div class="label title">
	    			<label>*标题：</label>
	    			<input type="text" v-model="info.title" :class="{'titleError': error.titleError}">
	    		</div>
	    		<div class="label desc">
	    			<label>描述：</label>
	    			<textarea name="" id="" cols="30" rows="10" v-model="info.desc"></textarea>
	    		</div>
	    		<div class="label img">
	    			<label for="">上传图片：</label>
	    			<div class="upLoad">
	    				<input type="file" id="filesInput" class="fileUpload" multiple />
						<p id="info"></p>
						<!-- <label>读取进度：</label><progress id="Progress" value="0" max="100"></progress> -->
						<!-- <span id="percent"></span> -->
						<!-- <p id="uploadSpeed"></p> -->
	    			</div>
					<p id="btnUpload">开始上传</p>
					<ul id="imageBox">
						<li v-if="updateInfo.isUpdate" v-for="(inx,item) in updateInfo.data.imgPath">
							<img :src="item" alt="">
						</li>
					</ul>
	    		</div>
	    		<div class="label host-name" v-if="!lists[2].active">
	    			<label for="">*联系人姓名：</label>
	    			<input type="text" v-model="info.hostName" :class="{'hostNameError': error.hostNameError}">
	    		</div>
	    		<div class="label host-tel" v-if="!lists[2].active">
	    			<label for="">*联系人电话：</label>
	    			<input type="text" v-model="info.hostTel" :class="{'hostTelError': error.hostTelError}" maxlength="11">
	    		</div>
	    	</div>
	    	<div class="submit" @click="post">发布</div>
	    </div>
	    <div class="section"></div>
	</div>
</template>
<script>
export default {
	data:function(){
		return {
			info: {
				rentMethod: '',
				xqAddress: '',
				building: '',
				floor: '',
				room: '',
				drawing: '',
				washroom: '',
				area: '',
				zxType: '',
				houseConfig: [],
				rentMoney: '',
				payMethod: '',
				title: '',
				desc: '',
				hostName: '',
				hostTel: '',
				type: '',
				money: '',
				gps: '',
				imgPath: [],
				province: '',
				city: '',
				district: ''
			},
			error: {
				rentMethodError: false,
				xqAddressError: false,
				areaError: false,
				zxTypeError: false,
				rentMoneyError: false,
				titleError: false,
				hostNameError: false,
				hostTelError: false,
				moneyError: false
			},
			lists:[{
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
            nowChoose: 'second',
            type: null,
            updateTitle: ''
		}
	},
	props:['updateInfo','isUpdate'],
	created(){
        if(typeof FileReader==='undefined'){
            alert("抱歉，你的浏览器不支持 FileReader");
        }
        if (this.updateInfo.isUpdate) {
        	this.updateInit()
        };
	},
	ready(){
		var own = this
		function $(id) {
		    return document.getElementById(id);
		}
		var filesInput = $("filesInput"),
		    info = $("info"),
		    imageBox = $("imageBox"),
		    btnUpload = $("btnUpload");
		    // progress = $("Progress"),
		    // percent = $("percent"),
		    // uploadSpeed = $("uploadSpeed");
		//定义存放图片对象的数组
		var uploadImgArr = [];
		//防止图片上传完成后，再点击上传按钮的时候重复上传图片
		var isUpload = false;
		//定义获取图片信息的函数
		function getFiles(e) {
		    isUpload = false;
		    e = e || window.event;
		    //获取file input中的图片信息列表
		    var files = e.target.files,
		    //验证是否是图片文件的正则
		    reg = /image\/.*/i;
		    //console.log(files);
		    for (var i = 0,f; f = files[i]; i++) {
		        //把这个if判断去掉后，也能上传别的文件
		        if (!reg.test(f.type)) {
		            imageBox.innerHTML += "<li>你选择的" + f.name + "文件不是图片</li>";
		            //跳出循环
		            continue;
		        }
		        //console.log(f);
		        uploadImgArr.push(f);
		        var reader = new FileReader();
		        //类似于原生JS实现tab一样（闭包的方法），参见http://www.css119.com/archives/1418
		        reader.onload = (function(file) {
		            //获取图片相关的信息
		            var fileSize = (file.size / 1024).toFixed(2) + "K",
		            fileName = file.name,
		            fileType = file.type;
		            //console.log(fileName)
		            return function(e) {
		                //console.log(e.target)
		                //获取图片的宽高
		                var img = new Image();
		                img.addEventListener("load", imgLoaded, false);
		                img.src = e.target.result;
		                function imgLoaded() {
		                    var imgWidth = img.width;
		                    var imgHeight = img.height;
		                    //图片加载完成后才能获取imgWidth和imgHeight
		                    imageBox.innerHTML += "<li><img src='" + e.target.result + "'></li>";
		                    own.info.imgPath.push(e.target.result)
		                }
		            }
		        })(f);
		        //读取文件内容
		        reader.readAsDataURL(f);
		    }
		    //console.log(uploadImgArr);
		}
		if (window.File && window.FileList && window.FileReader && window.Blob) {
		    filesInput.addEventListener("change", getFiles, false);
		} else {
		    info.innerHTML = "您的浏览器不支持HTML5长传";
		    info.className="tips";
		}
		function uploadFun() {
		    var j = 0;
		    function fun() {
		        if (uploadImgArr.length > 0 && !isUpload) {
		            var singleImg = uploadImgArr[j];
		            var xhr = new XMLHttpRequest();
		            if (xhr.upload) {
		                //进度条(见http://www.css119.com/archives/1476)
		                // xhr.upload.addEventListener("progress",
		                // function(e) {
		                //     if (e.lengthComputable) {
		                //         progress.value = (e.loaded / e.total) * 100;
		                //         percent.innerHTML = Math.round(e.loaded * 100 / e.total) + "%";
		                //         //计算网速
		                //         var nowDate = new Date().getTime();
		                //         var x = (e.loaded) / 1024;
		                //         var y = (nowDate - startDate) / 1000;
		                //         uploadSpeed.innerHTML = "网速：" +(x / y).toFixed(2) + " K\/S";
		                //     } else {
		                //         percent.innerHTML = "无法计算文件大小";
		                //     }
		                // },
		                // false);
		                // 文件上传成功或是失败
		                xhr.onreadystatechange = function(e) {
		                    if (xhr.readyState == 4) {
		                        if (xhr.status == 200 && eval("(" + xhr.responseText + ")").status == true) {
		                        	alert(singleImg.name + '上传成功')
		                            // info.innerHTML += singleImg.name + "上传完成; ";
		                            //因为progress事件是按一定时间段返回数据的，所以单独progress不可能100%的，在这设置传完后强制设置100%
		                            // progress.value = 100;
		                            // percent.innerHTML = "100%";
		                            let res = JSON.parse(xhr.response)
		                            isUpload = true;
		                            // own.info.imgPath.push(res.path)
		                        } else {
		                            // info.innerHTML += singleImg.name + "上传失败; ";
		                            alert('上传失败')
		                        }
		                        //上传成功（或者失败）一张后，再次调用fun函数，模拟循环
		                        if (j < uploadImgArr.length - 1) {
		                            j++;
		                            isUpload = false;
		                            fun();
		                        }
		                    }
		                };
		                var formdata = new FormData();
		                formdata.append("FileData", singleImg);
		                // 开始上传
		                xhr.open("POST", "/api/addImg", true);
		                xhr.send(formdata);
		                var startDate = new Date().getTime();
		            }
		        }
		    }
		    fun();
		}
		btnUpload.addEventListener("click", uploadFun, false);

	},
	methods:{
		updateInit(){
			if (this.updateInfo.data.type == "rent") {
				this.chooseType(1,{type:'rent'})
			}else if(this.updateInfo.data.type == "second"){
				this.chooseType(0,{type:'second'})
			}else{
				this.chooseType(2,{type:'passage'})
			}
			this.info = this.updateInfo.data
		},
		addressToGps(){
			var own = this
			let address = this.info.xqAddress
			let url = 'http://restapi.amap.com/v3/geocode/geo'
			let params = {
				address: address,
				output: JSON,
				key: '92d7b71019b4d81530fde625be426b4a'
			}
			own.$http.jsonp(url,{params:params}).then((res)=>{
				if (res.data.status == 1) {
					own.info.gps = res.data.geocodes[0].location
					own.info.province = res.data.geocodes[0].province
					own.info.city = res.data.geocodes[0].city
					own.info.district = res.data.geocodes[0].district
				}else{
					alert('地理位置转GPS坐标失败')
				}
			}).catch((err)=>{
				alert('发布失败')
			})
		},
		clear(){
			for(let key in this.info){
				if (key == 'houseConfig') {
					this.info[key] = []
					break;
				}
				this.info[key] = ''
			}
		},
		clearError(){
			for(let key in this.error){
				this.error[key] = false
			}
		},
		lint(){
			let flag = false
			switch(this.nowChoose){
				case 'passage':
					if (this.info.title == '') {
						this.error.titleError = true
						flag = true
					};
					break;
				case 'rent':
					if (this.info.rentMethod == '') {
						this.error.rentMethodError = true
						flag = true
					}
					if (this.info.xqAddress == '') {
						this.error.xqAddressError = true
						flag = true
					}
					if (this.info.area == '') {
						this.error.xqAddressError = true
						flag = true
					};
					if (this.info.zxType == '') {
						this.error.zxTypeError = true
						flag = true
					};
					if (this.info.rentMoney == '') {
						this.error.rentMoneyError = true
						flag = true
					};
					if (this.info.title == '') {
						this.error.titleError = true
						flag = true
					};
					if (this.info.hostName == '') {
						this.error.hostNameError = true
						flag = true
					};
					if (!(/^1[34578]\d{9}$/.test(this.info.hostTel))) {
						this.error.hostTelError = true
						flag = true
					};
					break
				case 'second':
					if (!(/^1[34578]\d{9}$/.test(this.info.hostTel))) {
						this.error.hostTelError = true
						flag = true
					};
					if (this.info.xqAddress == '') {
						this.error.xqAddressError = true
						flag = true
					};
					if (this.info.area == '') {
						this.error.areaError = true
						flag = true
					};
					if (this.info.zxType == '') {
						this.error.zxTypeError = true
						flag = true
					};
					if (this.info.title == '') {
						this.error.titleError = true
						flag = true
					};
					if (this.info.hostName == '') {
						this.error.hostNameError = true
						flag = true
					};
					if (this.info.money == '') {
						this.error.moneyError = true
						flag = true
					};
					break
			}
			if (flag == true) {
				return false
			}else{
				return true
			}
		},
		post(){
			this.clearError()
			if (this.lint()) {
				let own = this;
				let time = new Date()
				let url;
				let updateFlag;
				let updateId;
				if (this.updateInfo.data) {
					updateFlag = this.updateInfo.isUpdate;
					updateId = this.updateInfo.data._id
				};
				if (this.nowChoose == 'passage') {
					url = '/api/add' + this.nowChoose
				}else{
					url = '/api/add' + this.nowChoose + 'house'
				}
				let roomConfig = this.info.room + '室' + this.info.drawing + '厅' + this.info.washroom + '卫'
				let houstInfo = {
					type: this.nowChoose,
					rentMethod: this.info.rentMethod,
					xqAddress: this.info.xqAddress,
					building: this.info.building,
					floor: this.info.floor,
					area: this.info.area,
					roomConfig: roomConfig,
					zxType: this.info.zxType,
					houseConfig: this.info.houseConfig,
					rentMoney: this.info.rentMoney,
					money: this.info.money,
					payMethod: this.info.payMethod,
					title: this.info.title,
					desc: this.info.desc,
					hostName: this.info.hostName,
					hostTel: this.info.hostTel,
					postTime: time.getTime(),
					gps: this.info.gps,
					imgPath: this.info.imgPath,
					province: this.info.province,
					city: this.info.city,
					district: this.info.district,
					isUpdate: updateFlag,
					id: updateId
				}
				own.$http.post(url,houstInfo,{emulateJSON: true}).then((res)=>{
					let data = JSON.parse(res.data)
					if (data.code == 0) {
						alert(data.msg)
						own.clear()
					}else{
						alert(data.msg)
					}
				}).catch((err)=>{
					alert('发布失败')
				})
			};
		},
		count(){
			let url = 'api/count'
			let params = {
				type: 'add',
				deal: 1
			}
			own.$http.post(url,params,{emulateJSON: true}).then((res)=>{
				let resData = JSON.parse(res.data);
				if (resData.code == 999) {
					alert(resData.msg)
				};
			})
		},
		chooseType(inx,item){
            this.nowChoose = item.type
            switch(inx){
            	case 0:
	            	this.lists[0].active = true
	            	this.lists[1].active = false
	            	this.lists[2].active = false
	            	this.clear()
	            	this.clearError()
	            break;
	            case 1:
	            	this.lists[0].active = false
	            	this.lists[1].active = true
	            	this.lists[2].active = false
	            	this.clear()
	            	this.clearError()
	            break;
	            case 2:
	            	this.lists[0].active = false
	            	this.lists[1].active = false
	            	this.lists[2].active = true
	            	this.clear()
	            	this.clearError()
	            break;
            }
        },
	}
}
</script>


<style scope>
	.add-house{
		background: #F1F1F1;
	}
	.add-house .section{
		height: 80px;
		background: #F1F1F1;
	}
	.add-house-info{
		width: 70%;
		background: #fff;
		margin: 0 auto;
		padding: 30px 40px 40px 40px;
	}
	.add-house-info .label{
		margin-left: 20px;
		line-height: 50px;
		font-size: 14px;
	}
	.add-house-info .tab{
		width: 100%;
		height: 50px;
		border-bottom: 2px solid #00AE66;
		margin-bottom: 20px;
	}
	.add-house-info .tab li{
		display: inline-block;
		width: 150px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		cursor: pointer;
		font-weight: bold;
	}
	.add-house-info .tab .active{
		background: #00AE66;
		color: #fff;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}
	.add-house .label input[type="text"]{
		padding-left: 10px;
		height: 26px;
	}
	.add-house .label.rent-method input{
		width: 16px;
		height: 16px;
		vertical-align: middle;
		margin-left: 20px;
	}
	.add-house .label.district-name input{
		width: 250px;
	}
	.add-house .label.address input{
		width: 350px;
	}
	.add-house .label.floor input,.add-house .label.house-type input{
		width: 80px;
	}
	.add-house .label.decoration select{
		height: 30px;
		width: 150px;
	}
	.add-house .label.house-config input{
		width: 16px;
		height: 16px;
		margin-left: 10px;
		vertical-align: middle;
	}
	.add-house .label.money input{
		width: 150px;
	}
	.add-house .label.money select{
		width: 100px;
		height: 30px;
	}
	.add-house .label.desc label{
		vertical-align: top;
	}
	.add-house .desc textarea{
		width: 70%;
		height: 140px;
	}
	.add-house .label.title input{
		width: 450px;
	}
	.add-house .label.host-name input{
		width: 150px;
	}
	.add-house .label.host-tel input{
		width: 200px;
	}
	.add-house-info .submit{
		width: 200px;
		height: 40px;
		line-height: 40px;
		background: #00AE66;
		text-align: center;
		color: #fff;
		margin: 30px auto 0px auto;
		border-radius: 4px;
		cursor: pointer;
	}
	.add-house .xqAddressError,.add-house .areaError,.add-house .zxTypeError,.add-house .rentMoneyError,.add-house .titleError,.add-house .hostNameError,.add-house .hostTelError,.add-house .moneyError{
		border: 1px solid #EA2000;
	}
	.add-house .rentMethodError{
		color: #EA2000;
	}
	.add-house-info .img{
		/*height: 200px;*/
		position: relative;
	}
	.add-house-info .upLoad{
		background-image: url(../../../libs/img/cloud-up.png);
		background-repeat: no-repeat;
		background-size: 60px;
		background-position: 50% 50%;
		width: 100px;
		height: 100px;
		border: 1px solid #ccc;
		vertical-align: middle;
		display: inline-block;
	}
	.add-house-info .fileUpload{
		opacity: 0;
		display: inline-block;
		width: 100px;
		height: 100px;
		vertical-align: top;
	}
	.add-house-info #btnUpload{
		width: 100px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		cursor: pointer;
		border: 1px solid #aaa;
		margin-top: 20px;
		margin-bottom: 20px;
		margin-left: 75px;
	}
	.add-house-info #imageBox{
		position: absolute;
		top: 0px;
		left: 75px;
	}
	.add-house-info #imageBox li{
		float: left;
		margin-right: 10px;
	}
	.add-house-info #imageBox img{
		width: 100px;
		height: 100px;
		border: 1px solid #ccc;
	}
</style>
