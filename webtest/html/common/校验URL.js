/**
 * 本地校验URL是否正常
 * @param elemId
 * @param urlStr
 */
function checkNetPing() {
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