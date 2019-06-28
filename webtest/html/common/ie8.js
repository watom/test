// 捕获图片异常处理
// document.addEventListener("error", function (e) {
//     var elem = e.target;
//     if (elem.tagName.toLowerCase() == "img") {
//         if (elem.id == "headimg") {
//             $("#headimg").attr("src", "../../images/user.png");
//         } else if (elem.id == "logo") {
//             $("#logo").attr("src", "../../images/staractive.png");
//         }
//     }
// }, true);


// $(document).ready(function () {
//     if (window.addEventListener) {// 标准浏览器
//         console.log("=======================")
//         // elem:DOM节点    type:事件类型   handler:事件处理函数
//         // 最后一个参数为true:在捕获阶段调用事件处理程序;为false:在冒泡阶段调用事件处理程序。注意：ie没有这个参数
//         document.addEventListener("error",function (e) {
//             var elem = e.target;
//             if (elem.tagName.toLowerCase() == "img") {
//                 if (elem.id == "headimg") {
//                     $("#headimg").attr("src", "../../images/user.png");
//                 } else if (elem.id == "logo") {
//                     $("#logo").attr("src", "../../images/staractive.png");
//                 }
//             }
//         }, true);
//     } else if (window.attachEvent) {// IE浏览器
//         console.log("============6666666666===========")
//         return function (type, handler) {
//             document.attachEvent("on" + type, handler);
//         }
//     }
// });
$(document).ready(function () {
    piliang

});

function piliang() {
    if (true) {
        if(true){
            alert("hahaha")
        }else{
            alert("wwww")
        }
    } else {
        alert("mememem")
    }
    alert("yiyiyi")
}

document.addEventListener();
if (!document.addEventListener) {
    debugger;
    document.attachEvent("onerror", function (e) {
        console.log("============6666666666===========" + navigator.appName);
        var elem = e.target;
        if (elem.tagName.toLowerCase() == "img") {
            if (elem.id == "headimg") {
                $("#headimg").attr("src", "http://localhost:8081/webtest/" + "images/pic_bulboff.gif");
            } else if (elem.id == "logo") {
                $("#logo").attr("src", "http://localhost:8081/webtest/" + "images/pic_bulboff.gif");
            }
        }
    });
} else {
    debugger;
    document.addEventListener("error", function (e) {
        var elem = e.target;
        if (elem.tagName.toLowerCase() == "img") {
            if (elem.id == "headimg") {
                $("#headimg").attr("src", "http://localhost:8081/webtest/" + "images/pic_bulboff.gif");
            } else if (elem.id == "logo") {
                $("#logo").attr("src", "http://localhost:8081/webtest/" + "images/pic_bulboff.gif");
            }
        }
    }, true);
}
