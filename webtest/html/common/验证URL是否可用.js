/**
 * 本地校验URL是否正常
 */

$(document).ready(function () {
    $("#btn").click(function () {
        checkNetPing($("#content").val());
        // CheckStatus($("#content").val())
    });
});

//校验URl字符串是否符合URL格式
function isValidURL(url){
    var urlRegExp=/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    if(urlRegExp.test(url)){
        return true;
    }else{
        return false;
    }
}

function checkNetPing(urlStr) {
    if(isValidURL(urlStr)){
        $.ajax({
            type: "GET",
            cache: false,
            url: urlStr,
            success: function () {
                alert("该链接可用");
            },
            error: function () {
                alert("该链接无效");
            }
        });
    }else{
        alert("该链接不规范");
    }

}

/**
 *(仅适用于ie)
 * @param url
 * @constructor
 */
function CheckStatus(url) {
    try {
        XMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
        XMLHTTP.open("HEAD", url, false);
        XMLHTTP.send();
        if (XMLHTTP.status == 200) {
            alert("该链接可用");
        } else {
            alert("该链接无效");
        }
    } catch (e) {
        alert("该链接无效1111");
    }
}