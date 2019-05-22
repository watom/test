/**
 * Created by quliang on 2019/4/30.
 */
RestClientTest =  function(){
	let me = this;

	/**
	 * postNotParam无入参方法调用
	 * 调用me.netOfAsync 方法
	 * POST方法无入参
	 * knockout模型对象 false
	 */
	me.postNotParam=function(url,successCall,errorCall){
		return me.netOfAsync(url,"POST", "",true,false,successCall,errorCall);
	};

	/**
	 * get方法普通调用
	 * 调用me.netOfAsync 方法
	 * GET方法
	 * knockout模型对象 false
	 */
	me.get=function(url,successCall,errorCall){
		return me.netOfAsync(url,"GET", "",true,false,successCall,errorCall);
	};

	/**
	 * post有入参方法调用
	 * 调用me.netOfAsync 方法
	 * post方法
	 * knockout模型对象 false
	 */
	me.post=function(url, data,successCall,errorCall){
		return me.netOfAsync(url,"POST", data,true,false,successCall,errorCall);
	};

	/**
	 * getOfModel 返回数据为knockout模型对象
	 * get方法
	 * 调用me.netOfAsync 方法
	 * knockout模型对象 true
	 */
	me.getOfModel=function(url,successCall,errorCall){
		return me.netOfAsync(url,"GET", "",true,true,successCall,errorCall);
	};

	/**
	 * postOfModel 返回数据为knockout模型对象
	 * 调用me.netOfAsync 方法
	 * post方法
	 * knockout模型对象 true
	 */
	me.postOfModel=function(url, data,successCall,errorCall){
		return me.netOfAsync(url,"POST", data,true,true,successCall,errorCall);
	};

	/**
	 * 调用me.netOfNotToken 方法
	 * 异步请求
	 */
	me.netOfAsync=function(url,method, data,isProgress,isCubeObj,successCall,errorCall){
		return me.netOfNotToken(url,method, true, data,isProgress,isCubeObj,successCall,errorCall);
	};

	/**
	 * 调用me.netOfNotToken 方法
	 * 同步请求
	 */
	me.netOfsync=function(url,method, data,isProgress,isCubeObj,successCall,errorCall){
		return me.netOfNotToken(url,method, false, data,isProgress,isCubeObj,successCall,errorCall);
	};



	/**
	 * 调用me.netOfTimeout 方法
	 * 将token验证设置为false
	 */
	me.netOfNotToken=function(url,method, async, data,isProgress,isCubeObj,successCall,errorCall){
		return me.netOfTimeout(url,method, async, data,isProgress,isCubeObj,false,successCall,errorCall);
	};

	/**
	 * 调用me.netOfFixParam 方法
	 * 专门设置超时时间
	 */
	me.netOfTimeout=function(url,method, async, data,isProgress,isCubeObj,isHaveToken,successCall,errorCall){
		return me.netOfFixParam(url, 60000,method, async, data,isProgress,isCubeObj,isHaveToken,successCall,errorCall);
	};

	/**
	 * 调用me.netOfTokenExe 方法
	 * 将isQueue参数值为false
	 */
	me.netOfFixParam=function(url, timeout,method, async, data,isProgress,isCubeObj,isHaveToken,successCall,errorCall){
		return me.netOfparamVerification(url,timeout,method,async,data,false,isProgress,isCubeObj,isHaveToken,successCall,errorCall);
	};

	/**
	 * 调用me.netOfTokenExe 方法
	 * 对isHaveToken，url,method,async,isCubeObj进行验证
	 * url 传固定后缀
	 */
	me.netOfparamVerification=function(url, timeout, method, async, data,isQueue,isProgress,isCubeObj,isHaveToken,successCall,errorCall){
		var localtokenId = sessionStorage.getItem("Authorization");

		if(!isHaveToken&&!localtokenId){
			location.href = '/jecp/home/login.html';
			return;
		}

		url=me.uriComplete(url);

		return me.netOfBusiness(url||"", timeout, method?method.toUpperCase():"GET", async, data,isQueue,isCubeObj,isProgress,isHaveToken,successCall,errorCall);
	};

	/**
	 * 封装请求失败默认提示及knockout模型对象的处理
	 * 调用me.netOfTokenExe 方法
	 * @param isCubeObj 是否为knockout模型对象
	 */
	me.netOfBusiness=function(url, timeout, method, async, data,isQueue,isCubeObj,isProgress,isHaveToken,successCall,errorCall) {
		return me.netOfTokenExe(url, timeout, method, async, data,isQueue,isProgress,isHaveToken,function (dataResult,textStatus, request) {

			if(isCubeObj) {

				if(dataResult.successful){
					var vm = ko.mapping.fromJS(dataResult);
					delete vm.__ko_mapping__;
					if ($.isFunction(successCall)){
						successCall(vm);
					}
				}else{
					$.isFunction(errorCall)?errorCall({
						type: 2,
						msg:dataResult.resultHint?dataResult.resultHint:"获取业务数据失败",
					}):me.cuTosi(dataResult.resultHint?dataResult.resultHint:"获取业务数据失败");

				}

			} else {

				if(dataResult.successful){
					if ($.isFunction(successCall)){
						successCall(dataResult);
					}
				}else{
					$.isFunction(errorCall)?errorCall({
						type: 2,
						msg:dataResult.resultHint?dataResult.resultHint:"获取业务数据失败"
					}):me.cuTosi(dataResult.resultHint?dataResult.resultHint:"获取业务数据失败");
				}

			}

		},function (request, status, err) {

			$.isFunction(errorCall)?errorCall({
				type: 1,
				msg:"网络请求失败",
				error: new Error(request.responseText)
			}):me.cuTosi("网络请求失败");

		});
	};


	/**
	 * 调用me.netOfprogressBar方法
	 * @param isHaveToken true获取服务器返回业务token
	 */
	me.netOfTokenExe=function(url, timeout, method, async, data,isQueue,isProgress,isHaveToken,successCall,errorCall){

		return me.netOfprogressBar(url, timeout, method, async, data,isQueue,isProgress,function (XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("Authorization", sessionStorage.getItem("Authorization"));
		},function (dataResult,textStatus, request) {
			if(isHaveToken){
				sessionStorage.setItem("Authorization",request.getResponseHeader("Authorization"));
			}
			if ($.isFunction(successCall)){
				successCall(dataResult,textStatus, request);
			}

		},function (request, status, err) {
			if ($.isFunction(errorCall)){
			errorCall(request, status, err);}

		});
	};

	/**
	 * 封装默认进度条
	 * 调用me.netOforiginal方法
	 * @param isProgress true显示进度条，false不显示
	 */
	me.netOfprogressBar=function(url, timeout, method, async, data,isQueue,isProgress,beforeSendCall,successCall,errorCall){

		isProgress?me.loading(0):"";
		var result= me.netOfJsonParam(url, timeout, method, async, data,isQueue,function (XMLHttpRequest) {
			if ($.isFunction(beforeSendCall)){
				beforeSendCall(XMLHttpRequest);
			}

		},function (dataResult,textStatus, request) {
			try {
				if ($.isFunction(successCall)){
				successCall(dataResult,textStatus, request);}
			}catch (e) {
			}finally {
				isProgress?me.loading(1):"";
			}

		},function (request, status, err) {
			try {
				if ($.isFunction(errorCall)){
				errorCall(request, status, err);}
			}catch (e) {
			}finally {
				isProgress?me.loading(1):"";
			}

		});
		isProgress?me.loading(1):"";

		return result;
	};

	/**
	 * 调用me.netOfJsonParam方法
	 * @param data 封装为json入参
	 */
	me.netOfJsonParam= function(url, timeout, method, async, data,isQueue,beforeSendCall,successCall,errorCall) {
		return me.netOforiginal(url, timeout, method, async, ko.toJSON(data),isQueue,beforeSendCall,successCall,errorCall);
	};


	/**
	 *原始网络请求
	  @param url 请求地址
	 *
	 *@param timeout 超时时间
	 *
	 *@param method 网络请求方法
	 *
	 *@param async true异步 false同步
	 *
	 *@param data 入参
	 *
	 *@param isQueue true 以单线程队列方式执行 false普通方式执行
	 *
	 *@param beforeSendCall 请求执行前回调
	 *
	 *@param successCall 执行成功回调
	 *
	 *@param errorCall 执行失败回调
	 *
	 */
	me.netOforiginal= function(url, timeout, method, async, data,isQueue,beforeSendCall,successCall,errorCall) {
		var ajaxSetting = {
			url : url,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			timeout : timeout,
			type : method,
			contentType : "application/json",
			dataType : "json",
			cache : false,
			async : async,
			data: data,
			beforeSend: function (XMLHttpRequest) {
				if ($.isFunction(beforeSendCall)){
					beforeSendCall(XMLHttpRequest);
				}
			},
			success : function(dataResult,textStatus, request) {
				if ($.isFunction(successCall)){
					successCall(dataResult,textStatus, request);
				}
			},
			error : function(request, status, err) {
				if ($.isFunction(errorCall)){
					errorCall(request, status, err);
				}
			}
		};

		// return  async? $.ajaxQueue(ajaxSetting) : $.ajax(ajaxSetting);
		return   $.ajax(ajaxSetting);
	};


	var cubeLoadingIndex;
	/**0启用1关闭*/
	me.loading=function (type) {
		layui.use('layer', function () {
			var layer = parent.layui.layer;
			switch (type) {
				case 0:
					layer.close(cubeLoadingIndex);
					cubeLoadingIndex = layer.load(0, {shade: [0.001,'#fff']});
					break;
				case 1:
					layer.close(cubeLoadingIndex);
					break;
				default:
					layer.close(cubeLoadingIndex);
					break
			}
		});
	};

	me.cuTosi=function(msg){
		layui.use('layer', function () {
			var layer = layui.layer;
			// layer.msg(msg);
			layer.msg(msg, {icon: 5, time: 1000});
		});
	};

	me.uriComplete=function(urlSuffix){
		return cube.gatewayURL_sys+urlSuffix;
	};

};



rct = new RestClientTest();