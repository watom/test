//在js中引入
$(document).ready(function () {
    console.log("999999999999999999")
    $('.xinlang').load("http://localhost:8081/test/webtest/html/kotest/test13.html?_ijt=iei583e3tlunqbhjnofac9aokb");
    $('.baidu').load('http://localhost:8081/test/webtest/html/kotest/test07.html?_ijt=qoqab87hkh2p377ill64g0ilrq');

    var statusValue = {
        "dataType": 1,
        "applyOrDownload":2
    };
    console.log("获取状态值===" + statusValue);
    switchState(statusValue);

    //注意：选项卡 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function () {
        var element = layui.element;

        //…
    });
});

function switchState(data) {
    console.log("根据状态显示选项卡内容：");
    $(".aaa").css("diplay","block");
    if (data == 1) {
        // $("meiguotitle").hide();
    } else {
        $('.evaluateMsg').load('http://localhost:8081/test/webtest/html/kotest/test07.html?_ijt=qoqab87hkh2p377ill64g0ilrq');
    }
}

function bbb() {
    console.log("ertyuiop[acubiasciascoascoasociasocuaicasu：");
    $(".content01").html($(".zhongguo").html());
    document.getElementById("a2").innerHTML=document.getElementById("a1").innerHTML;
}

function jumpto() {
    //设置session 
    HttpSession session  = request.getSession();
    session.setAttribute("name","哈哈哈哈");
}