$(document).ready(function () {
    $("#btn0").click(function () {
        var time = dateFormat00(new Date());
        $("#date00").text(time);
    });
    $("#btn1").click(function () {
        var time = dateFormat01("2019/08/01 12:01:23456789");
        $("#date01").text(time);
    });
});


function dateFormat00(timeStr) {
    var date = new Date(timeStr);
    var fmt = "yyyy/MM/dd hh:mm:ss";
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function dateFormat01(dateStr) {
    var endIndex = dateStr.lastIndexOf(":");
    var newDateStr = dateStr.substring(0, endIndex + 3);
    return newDateStr;
}
