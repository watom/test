$(function () {
    $("#btn1").click(function () {
        // console=true;
        console.log("hahha");
    })
});
function console(){
    if (!/console=true/.test(window.location)) {
        console.log = () => {}
    }
}