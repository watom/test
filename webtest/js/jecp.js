/**
 * 管理全局内容，提供全局方法。cube对象为全局对象，可直接使用。
 */
/*
 * 解决IE下不支持Array的IndexOf方法
 */
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elt/*, from*/) {
		var len = this.length >>> 0;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0){
			from += len;
		}

		for (; from < len; from++) {
			if (from in this && this[from] === elt){
				return from;
			}
		}
		return - 1;
	};
}




/**
 * 管理全局内容，对knockout的封装。
 * 后续如果替换mvvm的框架，或者该框架重新实现，框架升级时，不影响业务系统。
 */
CUBE = function()
{
	var self = this;

	/**
	 * 网关地址
	 *
	 * @default id + port
	 */
	self.gatewayURL_test = "http://localhost:8082";
	/**
	 * 获取设置一个 Boolean 值，表示当前是否开发模式。如果为 true 表示当前是开发模式；反之当前为运行时模式。
	 *
	 * @default false
	 */
	self.debugMode = true;
	/**
	 * 每页显示多少条
	 */
	self.pageSize=5;
	/**
	 * 获取设置框架的国际化信息。
	 *
	 * @default zh_CN
	 */
	self.locale = "zh_CN";

	/**
	 * 获取设置框架的国际化信息文件路径。
	 *
	 * @default cube
	 */
	self.localePath = "cube";

	/**
	 * 设置模块名称
	 *
	 * @default 空
	 */
	self.bundleName = "";

	/**
	 * 设置场景名称
	 *
	 * @default 空
	 */
	self.name = "";

	/**
	 * 获取设置的错误类型，如果为 normal 表示正常提示错误信息，如果为 friendly 表示不显示后台错误信息。
	 *
	 * @default normal
	 */
	self.errorType = "normal";

	/**
	 * 当IE版本小于9.0时跨域请求是否使用代理，该属性主要适用于微服务请求。
	 *
	 * @default false
	 */
	self.ieCorsProxy = false;

	/**
	 * 跨域代理地址，当 {@link ieCorsProxy}属性开启时生效。
	 *
	 * @default /corsproxy
	 */
	self.ieCorsProxyHost = "~/corsproxy";

	/**
	 * 获取当前工程的根路径。
	 */
	self.rootPath = "/webtest/";

	/**
	 * require资源配置
	 */
	self.requirePaths = {
		"text":                 	"js/require.text",
		"sammy":					"js/sammy",
		"director":					"js/director"
	};

	/**
	 * 初始化
	 * @ignore
	 */
	self.init = function(){
		// 初始化JS
		self._includeFrameworkJs("js/jquery.min.js");
		self._includeFrameworkJs("lib/layui/layui.js");
		self._includeFrameworkJs("js/xadmin.js");
		self._includeFrameworkJs("js/RestClientTest.js");
		self._includeFrameworkJs("js/RESTClient.js");
		self._includeFrameworkJs("js/ObjectUtil.js");
		self._includeFrameworkJs("lib/knockout/knockout-3.2.0.js");
		self._includeFrameworkJs("lib/knockout/knockout.cube.js");
		self._includeFrameworkJs("lib/knockout/knockout.mapping.js");
		// 初始化css
		// self._includeFrameworkCSS("css/font.css");
		// self._includeFrameworkCSS("css/styleNew.css");
		self.logSwitch();
		//配置require资源加载
		require = {
			paths: self.requirePaths
		};
	};

	/**
	 * 日志开关
	 */
	self.logSwitch=function() {
		self.debugMode?window.log=window.console.log.bind(window.console):window.log=function(){};
		self.debugMode?window.console.log.bind(window.console.log):window.console.log=function(){};
	};
	/**
	 * 加载框架所需css
	 * @ignore
	 */
	self._includeFrameworkCSS = function(name, ieVersion) {
		var ieStrat = "", ieEnd = "";
		if (typeof ieVersion != "undefined" && typeof(ieVersion) == "number"){
			ieStrat = "<!--[if lte IE " + ieVersion + "]>";
			ieEnd = "<![endif]-->";
		}

		document.write(ieStrat + "<link rel='stylesheet' href='" + self.rootPath + name + "'>" + ieEnd);

	}

	/**
	 * 调试LESS时加载框架less
	 * @ignore
	 */
	self._includeFrameworkLess = function(name) {
		document.write("<link rel='stylesheet/less' type='text/css' href='" + self.rootPath + name + "'>");
	}

	/**
	 * 加载框架所需JS
	 * @ignore
	 */
	self._includeFrameworkJs = function(name) {
		document.write("<script type='text/javascript' src='" + self.rootPath  + name + "'></script>");
	}

	/**
	 * 获取随机数
	 */
	self.random = function (p_number){
		var seed = new Date().getTime();
		seed = (seed * 9301 + 49297) % 233280;
		if (p_number == null || parseInt(p_number) == NaN)
			return Math.ceil(seed/233280.0 * 10000000000000000);
		else
			return Math.ceil(seed/233280.0 * parseInt(p_number));
	}

	/**
	 * 判断浏览器是否支持html5
	 */
	self.isSupportHtml5 = function() {
		if (window.applicationCache) {
			return true;
		} else {
			return false;
		}
	};

	/**
	 * 判断浏览器是否IE6
	 */
	self.isIE6 = function() {
		return navigator.userAgent.toLowerCase().indexOf('msie 6.0') > -1;
	};

	//-----以下为knockout相关------

	/**
	 * 已注册组件
	 * @ignore
	 */
	self.importedComponents = [];

	/**
	 * 已注册vvm
	 * @ignore
	 */
	self.loadedPagePartVVM = [];

	/**
	 * pureComputed
	 */
	self.compWritable = function(p_obj) {
		return ko.pureComputed(p_obj);
	};

	/**
	 * computed
	 */
	self.notPureCompWritable = function(p_obj) {
		return ko.computed(p_obj);
	};

	/**
	 * pureComputed
	 */
	self.comp = function(p_func, p_obj) {
		return ko.pureComputed(p_func,p_obj);
	};

	/**
	 * computed
	 */
	self.notPureComp = function(p_func, p_obj) {
		return ko.computed(p_func,p_obj);
	};

	/**
	 * 将对象转换为可监控跟踪状态
	 * @param p_obj 对象
	 */
	self.obj = function(p_obj) {
		if(typeof p_obj == "function") {
			return p_obj;
		}
		return ko.observable(p_obj);
	}

	/**
	 * 判断对象是否为observable状态
	 */
	self.isObservable = function(value) {
		return ko.isObservable(value);
	}

	/**
	 * 将数组转换为可监控跟踪状态
	 * @param p_arr 数组对象
	 * @returns 监控状态的数组
	 */
	self.array = function(p_arr) {
		if(typeof p_arr == "function") {
			return p_arr;
		}
		return ko.observableArray(p_arr);
	}

	/**
	 * 属性订阅
	 * @param p_observable：处于监控状态的属性
	 * 		  p_callback：回调函数，当属性发生变化时将调用该函数
	 */
	self.subscribe = function(p_observable, p_callback, p_callbackTarget, p_event) {
		if(p_observable && typeof p_observable == "function" && typeof p_observable.subscribe == "function"){
			return p_observable.subscribe(p_callback, p_callbackTarget, p_event);
		}
		return null;
	}

	/**
	 * 绑定页面，开始视图展现
	 * @param p_pvm ViewModel
	 */
	self.startWebPage = function(p_pvm) {
		//self.includeMessages();
		ko.applyBindings(p_pvm);
		self._setAjax();
	}
	/**
	 * 初始化组件的视图模型属性。由于外部传入的内容有可能为不可变/可变/未传入等情况，在组件内部统一处理为observable属性。
	 * @param param: 组件viewmode的params参数对应的某一个属性
	 * @param initVal：如果组件没有传入参数，希望设置的初始值
	 * @param type：包括obj和arr两种
	 */
	self.initComponentProperty = function(param, initVal, type) {
		if(type == null)
			type = 'obj';
		if(type == 'obj') {
			if(typeof param == "function") {
				return param;
			} else if(param != null) {
				return cube.obj(param);
			}
			else {
				return cube.obj(initVal);
			}
		} else if(type == 'arr') {
			if(typeof param == "function") {
				return param;
			} else if(param != null) {
				return cube.array(param);
			}
			else {
				return cube.array(initVal);
			}
		}
		return null;
	};

	/**
	 * 根据节点获取其绑定的ViewModel
	 * @param node 一个dom节点对象或jquery节点对象
	 */
	self.getPageViewModelByNode = function(node){
		if(node instanceof jQuery){
			node = node.children().get(0);
		}else{
			node = node.childNodes[0];
		}

		if (node) {
			return ko.dataFor(node);
		}

		return null;
	}

	/**
	 * 已有元素绑定组件
	 * @param node：元素
	 * @param name：组件名称
	 * @param params：组件参数
	 */
	self.bindSubWebPageVVM = function(node, name, params){
		if(!node instanceof jQuery){
			node = $(node);
		}
		if(name){
			node.attr("data-bind", "component: {name : '" + name + "',params:" +  (params ? ko.toJSON(params) : "{}") + "}");
		}

		ko.applyBindingsToNode(node[0]);
	}

	/**
	 * 已有元素绑定组件
	 * @param node：元素
	 * @param bindings：要绑定的对象
	 */
	self.bindComponentByNode = function(node, bindings){
		if(!node instanceof jQuery){
			ko.applyBindingsToNode(node, bindings);
		}else{
			ko.applyBindingsToNode(node[0], bindings);
		}
	}

	/**
	 * 给节点绑定ViewModel
	 * @param node：节点对象
	 * @param viewModel：ViewModel
	 */
	self.bindTemlate = function(node, viewModel){
		if(node instanceof jQuery){
			node = node.get(0);
		}

		ko.applyBindingsToNode(node, null, viewModel);
	}

	/**
	 * 以创建组件标签形式绑定组件
	 * @param name：节点名称
	 * @param params：组件参数
	 */
	self.bindComponent = function(name, params){
		var node = document.createElement(name);
		node = $(node);
		$("body").append(node);
		node.attr("id",  new Date().getTime());
		node.attr("params",  ko.toJSON(params));
		ko.applyBindingsToNode(node[0]);
		return node;
	}

	/**
	 * 给节点及子节点绑定ViewModel
	 * @param node：节点对象
	 * @param viewModel：ViewModel
	 */
	self.applyBindings = function(node, viewModel){
		if(node instanceof jQuery){
			node = node.get(0);
		}

		if (node) {
			ko.applyBindings(viewModel, node);
		}
	}

	/**
	 * @ignore
	 */
	self._setAjax = function() {
		$.ajaxSetup({
			global: true,
			complete:function(e) {
				var sessionstate = e.getResponseHeader("sessionstate");
				var redirecturl = e.getResponseHeader("redirecturl");

				if ((sessionstate != null && sessionstate == 'timeout') || e.responseText == "timeout") {
					//cube.indicate("info", cube.msg("SESSION_TIMEOUT"));
					alert("SESSION_TIMEOUT");
					if (redirecturl != null) {
						redirecturl = encodeURI(redirecturl);
						redirecturl = redirecturl.replace("&","&amp;").replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/javascript/gi, "");
						if (!redirecturl.toLowerCase().indexOf("http://") && !redirecturl.toLowerCase().indexOf("https://") )
							top.window.location.href = redirecturl;
					} else {
						top.window.location.reload();
					}
				} else if (e.responseText == "authorizeFail") {
					alert("OPERATION_NOT_ALLOWED");
					//cube.indicate("warning", cube.msg("OPERATION_NOT_ALLOWED"));
				}
			}
		});

		// 指定预处理参数选项的函数
		$.ajaxPrefilter( function(options, originalOptions, jqXHR){
			var version = getIEVersion();
			if (self.ieCorsProxy && version > -1 && version <= 9.0 && crosDomain(options.url))
			{
				var url = options.url;
				options.beforeSend = function (request) {
					request.setRequestHeader("X-CorsProxy-Url", url);
				};

				options.url = self.mappath(self.ieCorsProxyHost);
				options.crossDomain = false;
			}
		});
	}

	/**
	 * @ignore
	 * 以异步或同步方式进行 REST 服务调用，超时timeout时间为60000
	 * @param p_path 指定的 REST 服务路径，
	 * @param p_method 指定 HTTP 方法的名称。如“GET”、“POST”等。
	 * @param [p_data] 指定传入的参数信息。通常是一个 JSON 对象。如 { id: 1984, name: "中文" } 会被转换成“id=1984&name=%E4%B8%AD%E6%96%87”作为参数拼入 URL（使用 HTTP POST 方法时，是作为内容传递），其中中文部分会使用 UTF-8 进行编码。
	 * @param [p_async=true] 一个 Boolean 值，表示是否采用异步调用。true 表示异步调用；false 表示同步调用。
	 * @param [p_callback] 一个 Function 对象，表示回调方法。方法的原型为 function(p_context)，其中 p_context 是一个 JSON 对象，其中 successful 表示调用是否成功，如果成功则返回 true，并且可通过 result 字段获取返回值；如果失败则返回 false，并且可通过 error 字段获取失败的异常对象。
	 * @param [p_isCubeobj] 一个Boolean值。表示当前的json对象是否为cube obj对象。
	 * @param [isHaveToken] 一个Boolean值。表示response结果是否含有token 除登录外其他接口均不传值或传false。
	 */
	self.interactToServer = function(p_path, p_method, p_data, p_async,  p_isCubeObj, successCall,failCall,isHaveToken) {
		// var tokenOper = isHaveToken != undefined && isHaveToken;
		// var localtokenId = sessionStorage.getItem("Authorization");
		// if(!isHaveToken || isHaveToken == null){
		// 	if(localtokenId == null || localtokenId == ''){
		// 		location.href = '/jecp/home/login.html'
		// 	}
		// }
		//console.log("localtokenId:"+localtokenId);
		var url = p_path != null ? p_path : "";

		var method = p_method != null ? p_method.toUpperCase() : "GET";

		var async = true;
		if (p_async != null)
		{
			async = p_async;
		}

		//如果是cubeobj，需要先通过ko.toJSON转换为json对象
		var isCubeObj = p_isCubeObj == null ? false : p_isCubeObj;

		var ajaxSetting = {
			url: url,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			timeout:60000,
			type: method,
			contentType: "application/json",
			dataType: "json",
			cache: false,
			async: async,
			data: ko.toJSON(p_data),
			beforeSend: function (XMLHttpRequest) {
				// XMLHttpRequest.setRequestHeader("Authorization", localtokenId);
			},
			success: function(dataResult,textStatus, request) {
				try {

				console.log("dataResult:"+JSON.stringify(dataResult));
				console.log("dataResult:"+dataResult.successful);
				if(tokenOper){
					sessionStorage.setItem("Authorization",request.getResponseHeader("Authorization"));
				}

				if(isCubeObj) {
					if(dataResult.successful){
						var vm = ko.mapping.fromJS(dataResult);
						delete vm.__ko_mapping__;

						if ($.isFunction(successCall)){
							successCall(vm);
						}

					}else{

						if ($.isFunction(failCall)){

							failCall({
								type: 2,
								msg:dataResult.resultHint?dataResult.resultHint:"获取业务数据失败",
							});

						}else{
							self.cuTosi(dataResult.resultHint?dataResult.resultHint:"获取业务数据失败");
						}
					}
				} else {

					if(dataResult.successful){

						if ($.isFunction(successCall)){
							successCall(dataResult);
						}

					}else{
						if ($.isFunction(failCall)){
							failCall({
								type: 2,
								msg:dataResult.resultHint?dataResult.resultHint:"获取业务数据失败"
							});

						}else{
							self.cuTosi(dataResult.resultHint?dataResult.resultHint:"获取业务数据失败");
						}
					}
				}
				}catch (e) {
				}finally {
					cube.loading(1);
				}

			},
			error: function(p_request, p_status, p_err) {
				try {

				if ($.isFunction(failCall))
				{
					//var error = _resolveError(p_request, url, p_status, p_err);
					var error = new Error(p_request.responseText);
					error.url= url;

					failCall({
						type: 1,
						msg:"网络请求失败",
						error: error
					});
				}else{
					self.cuTosi("网络请求失败");
				}

				}catch (e) {
				}finally {
					cube.loading(1);
				}

			}
		};

		var req="";
		cube.loading(0);
		if(async){
			setTimeout(function () {
				req =  $.ajax(ajaxSetting);
			},50);
		}else{
			 req =  $.ajax(ajaxSetting);
			cube.loading(1);
		}


		return req;
	};

	var cubeLoadingIndex;
	/**0启用1关闭*/
	self.loading=function (type) {
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


	self.cuTosi=function(msg){
		layui.use('layer', function () {
			var layer = layui.layer;
			// layer.msg(msg);
			layer.msg(msg, {icon: 5, time: 1000});
		});
	};

	// function cuTosi(msg) {
	// 	layui.use('layer', function () {
	// 		var layer = layui.layer;
	// 		// layer.msg(msg);
	// 		layer.msg(msg, {icon: 5, time: 1000});
	// 	});
	// };



	//-----以下为pubsub订阅发布相关------

	/**
	 *	发布主题消息，将数据传递给它的订阅者
	 *	@param
	 *		message: 字符串，发布的消息
	 *		data：传递给订阅者的数据
	 */
	self.publishTopic = function(topic, data){
		return PubSub.publish(topic, data);
	}

	/**
	 *	发布同步主题消息，将数据传递给它的订阅者，与publishTopic的区别为：发布消息时立即执行订阅者所有回调函数，publishTopic所有延迟。
	 *	@param
	 *		topic: 字符串，发布的消息
	 *		data：传递给订阅者的数据
	 */
	self.publishTopicSync = function(topic, data){
		return PubSub.publishSync(topic, data);
	}

	/**
	 *	订阅主题
	 *	订阅/发布机制，用于组件间调用传参
	 *	发布时使用如下代码：
	 *		cube.publish('menuStatChanged', e.text );
	 *	参数说明：'menuStatChanged'为发布主题的名称。必选。
	 *			e.text 为参数。必选。
	 *
	 *	订阅时使用如下代码：
	 *		var onMenuChanged = function( topics , data ){ 
	 * 			console.log( topics + ": " + data ); 
	 * 		};
	 * 		cube.subscribeTopic('menuStatChanged', onMenuChanged );
	 * 	参数说明：
	 * 			'menuStatChanged'为发布主题的名称。必选。
	 * 			onMenuChanged为需要执行的事件。必选。
	 *
	 * 	举例说明：当订阅者订阅了'menuStatChanged'主题后，如果发布者发布了'menuStatChanged'主题，
	 * 	那么就会执行订阅者的订阅事件onMenuChanged。每个主题可以由多个订阅者订阅，当发布该主题时，
	 *	所有订阅该主题的订阅者都会执行订阅事件。
	 *  注意事项: 在订阅时，每个主题的多个订阅者存在一个id号，在订阅时需保证id号不重复，如果重复，那么新的订阅者无法订阅成功，需要使用新的id号。
	 *
	 *	@param
	 *		id: 数字，订阅编号，必须，多个订阅者之间订阅编号不能重复
	 *		topic: 字符串，订阅的主题
	 *		func：回调函数，当新消息发布时将被调用
	 *	@return
	 *		返回唯一的令牌，如果退订时需要用到
	 *
	 */
	self.subscribeTopic = function(id, topic, func){
		return PubSub.subscribe(id, topic, func);
	}

	/**
	 *	退订订阅主题
	 *	@param
	 *		value: 令牌、函数或主题
	 *		当value为token令牌时，删除具体订阅者
	 *		当value为function时，删除所有订阅回调函数为该function的订阅者
	 *		当value为topic主题时，删除所有订阅主题为该topic的订阅者
	 *	@return
	 *		boolean，是否退订成功
	 */
	self.unsubscribeTopic = function(value){
		return PubSub.unsubscribe(value);
	}

	/**
	 *	清除所有订阅者
	 */
	self.clearAllSubscribeTopic = function(){
		PubSub.clearAllSubscriptions();
	}

	/**
	 *	清除指定主题的订阅者
	 *	@param
	 *		topic: 字符串，订阅的主题
	 */
	self.clearSubscribeTopic = function(topic){
		PubSub.clearSubscriptions(topic);
	}

	//----pubsub订阅发布相关结束------

	/**
	 * 清除组件缓存
	 * @param name：组件名称
	 */
	self.clearComponentCached = function(name){
		ko.components.clearCachedDefinition(name)
	}

	/**
	 * 使用params自动初始化ViewModel属性，同时将属性转变为监控状态
	 * @param viewModel：ViewModel对象
	 * @param params：ViewModel接收的参数
	 */
	self.endViewModel = function(viewModel, params){
		for ( var key in viewModel){
			var value, argValue = params[key], defaultValue = viewModel[key];
			if(typeof defaultValue === "function"){
				continue;
			}

			if(typeof argValue != "undefined"){
				value = argValue;
			}else{
				value = defaultValue;
			}

			if(value instanceof Array){
				value = self.array(value);
			}else if(typeof value != "undefined" && typeof value !== "function"){
				value = self.obj(value);
			}

			viewModel[key] = value;
		}

		if(typeof viewModel._init === "function"){
			viewModel._init();
		}
	}

	// 基于laypage二次封装
	self.page =  function(result, pageViewModel){
		//debugger;
		var totalCount = result.resultValue.itemCount;
		var totalPageCount = (totalCount % self.pageSize) == 0 ? parseInt(totalCount / self.pageSize) : parseInt(totalCount / self.pageSize) + 1;
		pageViewModel.itemCount(result.resultValue.itemCount);//总条数赋值
		pageViewModel.totalCount = result.resultValue.itemCount;//总条数赋值
        pageViewModel.totalPageCount = totalPageCount;
        pageViewModel.lastPageCount = pageViewModel.totalCount % pageViewModel.pageSize;
	    laypage({
	         cont: "laypage",  //分页需要显示的地方
	         pages: pageViewModel.totalPageCount,    //总页数
	         curr: pageViewModel.pageIndex(),     //当前页
	         groups: 3,//连续显示分页数
	         skip: false,     //是否开启跳页
	         first: 1,
	         last: pageViewModel.totalPageCount,
	         skin: "#00C69D",//设置当前页样式，加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
	         prev: "<", //若不显示，设置false即可
	         next: ">", //若不显示，设置false即可
	         jump: function (obj, first) { //触发分页后的回调
	             //first判断是否第1次切换页码，这里只要不是第1次切换就调用分页获取数据函数获取指定页数据
	             if (!first) { //点击不同页码触发的函数，并传递当前页：obj.curr
	            	 pageViewModel.pageIndex(obj.curr);
	             	 pageViewModel.loadData();
	             }
	         }
	    });
	}
	
	/**
	 * 获取IE版本
	 */
	function getIEVersion()
	{
		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null) {
				rv = parseFloat(RegExp.$1);
			}
		}

		return rv;
	}

	/**
	 * 判断是否跨域
	 */
	function crosDomain(p_url) {
		if (typeof(p_url) == "undefined" || !p_url || (p_url.indexOf("http://") == -1 && p_url.indexOf("https://") == -1)) {
			return false;
		}

		var durl = /((http|https):\/\/[^\/]+)\//i;
		var domain = p_url.match(durl);
		if (domain && domain.length > 1 && domain[1] == (window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''))) {
			return false;
		}

		return true;
	}
};
cube = new CUBE();
cube.init();
