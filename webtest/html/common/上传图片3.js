//选择图片，马上预览
function uploadImg(obj) {
    console.log("读取前：obj="+obj);
    var file = obj.files[0];
    console.log(file);
    console.log("读取前：obj="+obj+"\n file="+file+"\n file.size =" + file.size);
    var reader = new FileReader();
    reader.onerror = function (e) {
        console.log("读取异常....");
    };
    reader.onload = function (e) {
        console.log("成功读取....");
        $("#targetImg").attr("src",e.target.result);

        // var img = document.getElementById("targetImg");
        // img.src = e.target.result;
        //或者 img.src = this.result;  //e.target == this
    };
    reader.readAsDataURL(file)
}
$(document).ready(function () {
    setPostion();
});

function setPostion() {
    var X = $('#targetImg').offset().top;
    var Y = $('#targetImg').offset().left;
    $('#hotArea').css({ "left": X, "top": Y});
}
