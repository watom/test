/**
 * 本地校验URL是否正常
 * @param elemId
 * @param urlStr
 */
function URL是否有效() {
    var urlStr = $('#inputValue').val();
    $.ajax({
        type: "GET",
        url: "https://www.baidu.com/",
        success: function () {
            alert('you效');
        },
        error: function () {
            alert('wu效');
        },
        complete: function (response) {
            if (response.status == 200) {
                alert('有效');
            } else {
                alert('无效');
            }
        }
    });
}

function 是否有包含中文() {
    var inputValue = $('#inputValue02').val();
    if (/[\u4E00-\u9FA5]+/.test(inputValue)) {
        alert('包含中文');
        return true;
    } else {
        alert('不含中文');
        return false;
    }
}

function 返回数字的位置序号() {
    var inputValue = $('#inputValue03').val();
    inputValue=inputValue.split(/\d+\)+/);
    inputValue= inputValue.join("<br><li>");
    inputValue="<ol>"+inputValue+"<ol>";
}


function 拼接两个字符串(){
    // var str='<span style="color: whitesmoke;background-color: #268ac5;">DWD_FIN_</span>LOWINCOMEBILL';
    var str='soadias_doi_as';
    if(-1==str.indexOf(">")){
        alert(str);
    }else{
        var pre=str.substring(str.indexOf(">") + 1,str.lastIndexOf("<"));
        var end=str.substring(str.lastIndexOf(">") + 1);
        alert( pre.concat(end));
    }
}