// 会打开一个空白页下载，然后空白页消失，用户体验不好
function download1() {
    window.open('http://photocdn.sohu.com/20150710/mp22165085_1436507937601_1_th.jpeg');
}

// 直接下载，用户体验好
function download2() {
    var $form = $('<form method="GET"></form>');
    $form.attr('action', 'http://photocdn.sohu.com/20150710/mp22165085_1436507937601_1_th.jpeg');
    $form.appendTo($('body'));
    $form.submit();
}
////////////////////////////////////////////////////
////                                          //////
////                                          //////
////////////////////////////////////////////////////
var btn = document.getElementById('download-btn');

//将要进行多文件下载的mp3文件地址，以组数的形式存起来（这里只例了3个地址）
var mp3arr = ["http://10.1.5.47:8094/file/download?ids=e8dd7efb-b32b-48fb-99cb-7d695f599202",
    "http://10.1.5.47:8094/file/download?ids=e8dd7efb-b32b-48fb-99cb-7d695f599202",
    "http://10.1.5.47:8094/file/download?ids=e8dd7efb-b32b-48fb-99cb-7d695f599202"];


function download( href) {
    var a = document.createElement("a"), //创建a标签
        e = document.createEvent("MouseEvents"); //创建鼠标事件对象
    e.initEvent("click", false, false); //初始化事件对象
    a.href = href; //设置下载地址
    a.download =name; //设置下载文件名
    a.dispatchEvent(e); //给指定的元素，执行事件click事件
}

//给多文件下载按钮添加点击事件
function piliang() {
    for (var index = 0; index < mp3arr.length; index++) {
        console.log("竟来了")
        download( mp3arr[index]);
    }
}

////////////////////////////////////////////////////
////                                          //////
////                                          //////
////////////////////////////////////////////////////
// var $eleBtn1 = $("#btn1");
// var $eleBtn2 = $("#btn2");

//已知一个下载文件的后端接口：https://codeload.github.com/douban/douban-client/legacy.zip/master
//方法一：window.open()
//     $eleBtn1.click(function(){
//         var url = "https://codeload.github.com/douban/douban-client/legacy.zip/master";
//         window.open(url);
//     });
//
// //方法二：通过form
// $eleBtn2.click(function(){
//     var $eleForm = $("<form method='get'></form>");
//
//     $eleForm.attr("action","https://codeload.github.com/douban/douban-client/legacy.zip/master");
//
//     $(document.body).append($eleForm);
//
//     //提交表单，实现下载
//     $eleForm.submit();
// });
