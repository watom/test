$(function(){
    //取数据
    // var value=window.localStorage.getItem("data");
    var value=window.sessionStorage.getItem("data");
    $("#show").html(value);
    console.log("已经接收到的值是：  "+value)
});
