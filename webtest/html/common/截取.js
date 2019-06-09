// http://10.1.5.29:8093/file/queryName
$(document).ready(function () {

});


function split(makeUrl) {
    var flagStr = ",";
    var arr = makeUrl.split(flagStr);
    console.log("\r\n数组的长度：" + arr.length);
    var array = new Array();
    for (var i = 0; i < arr.length; i++) {
        var obj = new Object();
        var name = arr[i].substring(arr[i].lastIndexOf("/") + 1);
        obj.fileName = name;
        obj.urlPath = arr[i];
        array.push(obj)
    }
    console.log("JSON.stringify(array)：" + JSON.stringify(array));
    console.log("JSON.stringify(arr)：" + JSON.stringify(arr));
    console.log("array：" + array);
    console.log("arr：" + arr);
}
