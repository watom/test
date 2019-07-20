
$(function() {
    // $('#iframeModel').modal('show')
    // $("#iframeContent").attr('src', '模态窗4.html');
    $("#btn-aa").click(function () {
        $('#iframeModel').modal('toggle');
        $("#iframeContent").attr('src', '模态窗4.html');
    })
});
function myClick() {
    // $('#iframeModel').modal('toggle');
    // $("#iframeContent").attr('src', '模态窗4.html');
}