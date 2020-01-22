$(function () {
    $("#btn1").click(function () {
        getAttr01();
    });
    $("#btn2").click(function () {
        getAttr02();
    });
    $("#btn3").click(function () {
        getAttr03();
    });
});

function getAttr01() {
    // document.getElementsByTagName("INPUT")[0].setAttribute("type", "button");
    // document.getElementsByTagName("INPUT")[0].setAttribute("class", "mayouchen");
    // document.getElementsByTagName("INPUT")[0].setAttribute("id", "test1");

    console.log("id=====" + document.getElementsByTagName("INPUT")[0].getAttribute("id"));
    console.log("class=====" + document.getElementsByTagName("INPUT")[0].getAttribute("class"));
    console.log("id=====" + document.getElementsByTagName("INPUT")[1].getAttribute("id"));
    console.log("class=====" + document.getElementsByTagName("INPUT")[1].getAttribute("class"));
}

function getAttr02() {
    var tree = document.getElementById("tree");
    //getAttribute()取值属性
    console.log("data-leaves======" + tree.getAttribute("data-leaves"));
    console.log("data-plant-height======" + tree.getAttribute("data-plant-height"));

    //setAttribute()赋值属性
    tree.setAttribute("data-come", "49");

    //data-前缀属性可以在JS中通过dataset取值，更加方便
    console.log("通过dataset获得data-leaves====" + tree.dataset.leaves);
    console.log("通过dataset获得data-plant-height====" + tree.dataset.plantHeight);

    //注意在这里连字符的访问时，属性要写成驼峰形式
}

function fun(obj) {
    $(obj).find("input").first().val("12#$567890");

}