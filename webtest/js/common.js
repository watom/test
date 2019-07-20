//声明公共css,js变量
console.log('注意：若是路径出错，需配置自己的根目录');

var BaixunUtils = {
    loading: function (type) {
    },
    cuTosi: function (msg) {
        console.log("netMsg:" + msg);
        layer.msg(msg);
    }
};
BaixunUtils.request = {
    postNotParam: function (url, successCall, errorCall) {
        this.netOfAsync(url, "POST", true, false, false, successCall, errorCall);
    },
    getJson: function (url, data, successCall, errorCall) {
        this.netOfAsync(url, "GET", data, false, false, false, successCall, errorCall);
    },
    postJson: function (url, data, successCall, errorCall) {
        this.netOfAsync(url, "POST", data, false, false, false, successCall, errorCall);
    },
    postParam: function (url, data, successCall, errorCall) {
        this.netOfAsync(url, "POST", data, false, false, true, successCall, errorCall);
    },
    postOfModel: function (url, data, successCall, errorCall) {

        this.netOfAsync(url, "POST", data, true, true, false, successCall, errorCall);
    },
    getOfModel: function (url, successCall, errorCall) {

        this.netOfAsync(url, "GET", "", true, true, false, successCall, errorCall);
    },
    netOfAsync: function (url, method, data, isProgress, isCubeObj, isParam, successCall, errorCall) {
        this.netOfparamVerification(url, method, true, data, isProgress, isCubeObj, true, isParam, successCall, errorCall);
    },
    netOfNotToken: function (url, method, async, data, isProgress, isCubeObj, isParam, successCall, errorCall) {

        this.netOfparamVerification(url, method, async, data, isProgress, isCubeObj, false, isParam, successCall, errorCall);
    },
    netOfparamVerification: function (url, method, async, data, isProgress, isCubeObj, isHaveToken, isParam, successCall, errorCall) {

        this.netOfBusiness(url, method ? method.toUpperCase() : "GET", async, data, isCubeObj, isProgress, isHaveToken, isParam, successCall, errorCall);
    },
    netOfBusiness: function (url, method, async, data, isCubeObj, isProgress, isHaveToken, isParam, successCall, errorCall) {	//POST @RequestBody 接受参数

        if (async) {
            isProgress ? BaixunUtils.loading(0) : "";
        }


        this.netOfToken(url, method, async, data, isProgress, isHaveToken, isParam, function (dataResult, textStatus, request) {
            console.log("netOfTokenisHaveToken:" + isHaveToken);
            if (isCubeObj) {

                if (dataResult.successful) {
                    var vm = ko.mapping.fromJS(dataResult);
                    delete vm.__ko_mapping__;
                    if ($.isFunction(successCall)) {
                        successCall(vm, textStatus, request);
                    }
                } else {
                    $.isFunction(errorCall) ? errorCall({
                        type: 2,
                        msg: dataResult.resultHint ? dataResult.resultHint : "获取业务数据失败",
                    }) : BaixunUtils.cuTosi(dataResult.resultHint ? dataResult.resultHint : "获取业务数据失败");

                }

            } else {

                if (dataResult.successful) {
                    if ($.isFunction(successCall)) {
                        successCall(dataResult, textStatus, request);
                    }
                } else {
                    $.isFunction(errorCall) ? errorCall({
                        type: 2,
                        msg: dataResult.resultHint ? dataResult.resultHint : "获取业务数据失败"
                    }) : BaixunUtils.cuTosi(dataResult.resultHint ? dataResult.resultHint : "获取业务数据失败");
                }

            }
            if (async) {
                isProgress ? BaixunUtils.loading(1) : "";
            }

        }, function (request, status, err) {
            $.isFunction(errorCall) ? errorCall({
                type: 1,
                msg: "网络请求失败",
                error: new Error(request.responseText)
            }) : BaixunUtils.cuTosi("网络请求失败");

            if (async) {
                isProgress ? BaixunUtils.loading(1) : "";
            }
        })
    },

    netOfToken: function (url, method, async, data, isProgress, isHaveToken, isParam, success, error) {	//POST @RequestBody 接受参数
        console.log("isHaveToken:" + isHaveToken);
        // if(isHaveToken&&!sessionStorage.getItem("Authorization")&&url.indexOf("/login/login")==-1){
        //         location.href = '/administer/home/login.html';
        //         return;
        // }

        this.netOfprogressBar(url, method, async, data, isProgress, isParam, function (dataResult, textStatus, request) {
            if (isHaveToken) {
                var auth = request.getResponseHeader("Authorization");
                console.log("auth:" + auth);

                if (auth != undefined && auth != null && auth.length > 0) {
                    sessionStorage.setItem("Authorization", request.getResponseHeader("Authorization"));
                }
            }
            if ($.isFunction(success)) {
                success(dataResult, textStatus, request);
            }
        }, function (request, status, err) {
            if ($.isFunction(error)) {
                error(request, status, err);
            }
        }, function (XMLHttpRequest) {

            var reqHederToken = sessionStorage.getItem("Authorization");
            console.log("request.beforeCall1:" + reqHederToken);
            XMLHttpRequest.setRequestHeader("Authorization", reqHederToken);
        });
    },

    netOfprogressBar: function (url, method, async, data, isProgress, isParam, success, error, beforecall) {	//POST @RequestBody 接受参数
        isProgress ? BaixunUtils.loading(0) : "";
        this.netOfJsonParam(url, method, async, data, isParam, function (dataResult, textStatus, request) {
            console.log("request.getResponseHeader(Authorization)2" + request.getResponseHeader("Authorization"));
            // log("request.getResponseHeader(Authorization)111:"+request.getResponseHeader("Authorization"));
            console.log("dataResult:" + JSON.stringify(dataResult));
            if ($.isFunction(success)) {
                success(dataResult, textStatus, request);
            }
        }, function (request, status, err) {
            if ($.isFunction(error)) {
                error(request, status, err);
            }
        }, function (XMLHttpRequest) {
            if ($.isFunction(beforecall)) {
                beforecall(XMLHttpRequest);
            }
        });
    },

    // netOfParam:function(url,method,async,data,success,error,beforecall){	//POST @RequestBody 接受参数
    // 	log("url:"+url);
    //
    // 	this.ajax(url,method,async,false,null,data,null,success,error,beforecall);
    // },
    netOfJsonParam: function (url, method, async, data, isParam, success, error, beforecall) {	//POST @RequestBody 接受参数
        console.log("url:" + url);
        console.log("data:" + JSON.stringify(data));
        isParam ? this.ajax(url, method, async, false, null, data, null, success, error, beforecall) :
            this.ajax(url, method, async, false, "application/json", ko.toJSON(data), null, success, error, beforecall);
    },


    get: function (url, data, success, error) {	//普通GET请求
        this.defaultAjax(url, "GET", null, data, success, error);
    },
    post: function (url, data, success, error) {	//普通POST请求
        console.log(success);
        this.defaultAjax(url, "POST", null, data, success, error);
    },
    postBody: function (url, data, success, error) {	//POST @RequestBody 接受参数
        this.ajax(url, "POST", null, null, "application/json", data, null, success, error);
    },
    syncGet: function (url, data, success, error) {	//同步GET请求
        this.defaultAjax(url, "GET", false, data, success, error);
    },
    syncPost: function (url, data, success, error) {	//同步POST请求
        this.defaultAjax(url, "POST", false, data, success, error);
    },
    defaultAjax: function (url, method, async, data, success, error) {	//默认的AJAX配置  请求
        this.ajax(url, method, async, null, null, data, null, success, error);
    },
    ajax: function (url, method, async, cache, contentType, data, dataType, success, error, beforeSend) {

        var DEFAULT_AJAX_SETTING = {
            "async": true,
            "cache": true,
            "contentType": "application/x-www-form-urlencoded",
            "dataType": "json",
            "crossDomain": true == !(document.all),
            "xhrFields": {
                "withCredentials": true
            }
        };
        DEFAULT_AJAX_SETTING.url = url;
        DEFAULT_AJAX_SETTING.type = method;
        if(async!=null&&async!=undefined){
        	DEFAULT_AJAX_SETTING.async = async;
        }
        if (cache != null) {
            DEFAULT_AJAX_SETTING.cache = cache;
        }
        if (contentType != null) {
            DEFAULT_AJAX_SETTING.contentType = contentType;
        }
        if (data != null) {
            DEFAULT_AJAX_SETTING.data = data;
        }
        if (dataType != null) {
            DEFAULT_AJAX_SETTING.dataType != dataType;
        }
        if (success != null) {
            DEFAULT_AJAX_SETTING.success = success;
        }

        if (beforeSend != null) {
            DEFAULT_AJAX_SETTING.beforeSend = beforeSend;
        }else{
        	DEFAULT_AJAX_SETTING.defaultBefore = this.defaultBefore;
        }
        if (error != null) {
            DEFAULT_AJAX_SETTING.error = error;
        } else {
            DEFAULT_AJAX_SETTING.error = this.defaultError;
        }
        this.originalAjax(DEFAULT_AJAX_SETTING);
    },
    originalAjax: function (setting) {
        $.ajax(setting);
    },
    defaultError: function (xhr, status, error) {
        console.log("错误默认处理" + error + "||" + status);
    },
    defaultBefore:function(xhr){
    	var authorization = sessionStorage.getItem("Authorization");
    	if(authorization==null){
    		location.href=cube.gatewayURL_administer+"/home/login.html";
    	}else{
    		xhr.setRequestHeader("Authorization", authorization);
    	}
    },

    uploadFile: function (url, formData, successCall, completeCall, errCall) {

        console.log("url:" + url);
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            /**
             *必须false才会自动加上正确的Content-Type
             */
            contentType: false,
            /**
             * 必须false才会避开jQuery对 formdata 的默认处理
             * XMLHttpRequest会对 formdata 进行正确的处理
             */
            processData: false,
            dataType: "json",
            // beforeSend: function (XMLHttpRequest) {
            //     XMLHttpRequest.setRequestHeader("Authorization", localtokenId);
            // },
            success: function (data) {
                console.log("success:" + JSON.stringify(data));
                if (data.successful) {
                    if (successCall != undefined) {
                        successCall(data);

                        if (completeCall != undefined) {
                            completeCall();
                        }
                    }
                } else {
                    BaixunUtils.cuTosi(data.resultHint);
                    if (completeCall != undefined) {
                        completeCall();
                    }
                }
            },
            error: function (err) {
                console.log("error:" + JSON.stringify(err));
                if (errCall != undefined) {
                    errCall(err);

                    if (completeCall != undefined) {
                        completeCall();
                    }
                    return;
                }
                BaixunUtils.cuTosi(JSON.stringify(err));
                if (completeCall != undefined) {
                    completeCall();
                }
            }
        });
    }
};


CUBE = function () {
    var self = this;

	/**
     * 网关地址
     *
     * @default id + port
     */

	//本地测试
    // self.gatewayURL_resource = "http://10.1.5.98:9013";// dataPortals-resource资源管理服务地址8104 9013
    self.gatewayURL_resource = "http://localhost:8087";// dataPortals-resource资源管理服务地址8104 9013

    self.gatewayURL_catalogue = "http://localhost:8103";// dataPortals-catalogue目录管理服务地址
    /*资源下载url前缀*/
    self.gatewayURL_download = "http://10.1.5.29:8093/file/download?id=";
    /*图片显示url前缀*/
    self.gatewayURL_imgShow = "http://10.1.5.29:8093/file/query?id=";

    self.gatewayURL_administer = "http://localhost:8080/administer";

  //系统id sysId
    self.sysId = "8a8185a36ac42736016ac428978a0000";	//项目部署所在访问地址
    
    /**
     * 每页显示多少条
     */
    self.pageSize = 10;

    /**
     * 总显示页码是多少条
     */
    self.pageLimitSize = 5;

    /**
     * 获取资源管理服务全路径
     */
    self.getResource = function (urlSuffix) {
        return cube.gatewayURL_resource + urlSuffix;
    };
    /**
     * 初始化
     * @ignore
     */
//	self.init = function(){
//		// 初始化JS
//		
//		// 初始化css
//		
//		
//	};
//	


    /**
     * 初始化
     * @ignore
     */
    self.init = function () {
        // 初始化JS

        // 初始化css

    };


    /**
     * 列表分页
     */
    self.showPageControl = function (viewModel) {
        var pageIndex = viewModel.pageIndex();
        var pageSize = viewModel.pageSize;
        var totalCount = viewModel.totalCount;
        var pageCount = (totalCount % pageSize) == 0 ? parseInt(totalCount / pageSize) : parseInt(totalCount / pageSize) + 1;
        if (pageCount <= 0) {
            $(".navigation ul").html("");
            return;
        }
        //显示分页功能
        $(".navigation ul").html("");
        $(".navigation ul").append("<li id='pre'><a class='Previous'><span><</span></a></li>");
        this.getPageArray(pageIndex, pageCount);
        $(".navigation ul").append("<li id='next'><a class='Next'><span>></span></a></li>");
        //添加点击事件
        $(".navigation ul li").on("click", function () {
            var id = $(this).attr("id");
            console.log("index =" + id);
            if (cube.isEmpty(id)) {
                return;
            }
            if (id == "pre") {
                pageIndex--;
                if (pageIndex < 1) {
                    pageIndex = 1;
                }
            }
            else if (id == "next") {
                pageIndex++;
                if (pageIndex > pageCount) {
                    pageIndex = pageCount;
                }
            } else {
                pageIndex = id;
            }
            console.log("pageIndex =" + pageIndex);
            viewModel.pageIndex(pageIndex);
            viewModel.getList();
        })
    };

    self.getPageArray = function (pageIndex, pageCount) {
        if (pageCount <= this.pageLimitSize) {
            this.appendHtml(1, pageCount, pageIndex);
        } else {
            if (pageIndex <= this.pageLimitSize - 1) {	//前半部分
                this.appendHtml(1, this.pageLimitSize - 1, pageIndex);
                $(".navigation ul").append(" <li><a >...</a></li>");
                $(".navigation ul").append(" <li id='" + (pageCount) + "'><a>" + (pageCount) + "</a></li>")
            } else if (pageCount - pageIndex + 1 <= this.pageLimitSize - 1) {//后半部分
                $(".navigation ul").append(" <li id='1'><a >1</a></li>");
                $(".navigation ul").append(" <li><a>...</a></li>");
                this.appendHtml(pageCount - (this.pageLimitSize - 2), pageCount, pageIndex)
            } else {
                $(".navigation ul").append(" <li id='1'><a >1</a></li>");
                $(".navigation ul").append(" <li><a>...</a></li>");
                if (self.pageLimitSize > 4 && self.pageLimitSize % 2 != 0) {
                    this.appendHtml(parseInt(pageIndex) - Math.ceil((this.pageLimitSize - 3) / 2), parseInt(pageIndex) + Math.ceil((this.pageLimitSize - 3) / 2), pageIndex);
                } else {
                    this.appendHtml(parseInt(pageIndex) - Math.ceil((this.pageLimitSize - 3) / 2), parseInt(pageIndex) + Math.ceil((this.pageLimitSize - 3) / 2) - 1, pageIndex);
                }
                $(".navigation ul").append(" <li><a >...</a></li>");
                $(".navigation ul").append(" <li id='" + (pageCount) + "'><a>" + (pageCount) + "</a></li>")
                // }
            }
        }
    };

    self.appendHtml = function (startIndex, endIndex, pageIndex) {
        for (var i = startIndex; i <= endIndex; i++) {
            var str = " <li id='" + (i) + "'><a>" + (i) + "</a></li>";
            if (i == pageIndex) {
                str = " <li class='active' id='" + (i) + "'><a>" + (i) + "</a></li>"
            }
            $(".navigation ul").append(str);
        }
    };

    //判断字符是否为空的方法
    self.isEmpty = function (obj) {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        } else {
            return false;
        }
    }

};
cube = new CUBE();
cube.init();
