function addrow() {
    var c = document.getElementById('mytable');//获得表格的信息
    if (c.rows.length == 0) {//如果是向一个空表增加一行
        var x = c.insertRow(0);//向空表插入一行
        var y = x.insertCell(0);//向新行插入一列
        y.innerHTML = "new cell0";
    } else {
        var z = c.rows[0].cells;//如果不是空表，首先获得表格有多少列，先获取再插入新行
        var x = c.insertRow(0);
        for (var i = 0; i < z.length; i++) {//依次向新行插入表格列数的单元格
            var y = x.insertCell(i);
            y.innerHTML = "new cell" + i;
        }
    }
}

function delrow() {
    var x = document.getElementById("mytable");
    x.deleteRow(0);//删除一行
}

function addcol() {
    var c = document.getElementById('mytable');//获取表格信息
    var len = c.rows.length;//获得行数
    var ro = c.rows[0].cells;
    var len2 = ro.length;//获得列数
    for (var i = 0; i < len; i++) {
        var x = c.rows[i].insertCell(len2);//依次向每一行的末尾插入一个新列
        x.innerHTML = "new cell" + len2;
    }
}

function delcol() {
    var c = document.getElementById('mytable');//获取表格信息
    var len = c.rows.length;//获取表格的行数
    var ro = c.rows[0].cells//获取表格的列数
    var len2 = ro.length - 1;
    for (var i = 0; i < len; i++) {
        var x = c.rows[i].deleteCell(len2);//删除每一行末尾的单元格
    }
}

function addrow01() {
    var c = document.getElementById('tableUlId');//获得表格的信息
    var a = "<h3>\n" +
        "                <span><input class=\"layui-table-input\" placeholder=\"请输入\" value=\"111\"/></span>\n" +
        "                <span><input class=\"layui-table-input\" placeholder=\"请输入\"/></span>\n" +
        "                <span><select class=\"layui-table-select\"><option>请选择</option></select></span>\n" +
        "                <span><div class=\"btns\"><button class=\"button-add\">+</button><button class=\"button-reduce\">-</button></div></span>\n" +
        "            </h3>";
    c.insertAdjacentHTML("afterend", a);
}

function delrow01() {
    var x = document.getElementById("mytable");
    x.deleteRow(0);//删除一行
}


function addrow02() {
    // var div = document.getElementsByClassName("tablegrid");
    var div = document.getElementById("fieldRelationId");
    var ul = document.createElement("ul");
    ul.className = "sys-list-wrap rightxxx";
    ul.innerHTML = "hhaha ";
    div.append(ul);
}


var rightRow = "<h3>\n" +
    "            <span>\n" +
    "                <input class=\"layui-table-input\" placeholder=\"请输入\" value=\"111\"/>\n" +
    "            </span>\n" +
    "\n" +
    "                <span>\n" +
    "                <select class=\"layui-table-select\">\n" +
    "                    <option>请选择</option>\n" +
    "                </select>\n" +
    "            </span>\n" +
    "                <span>\n" +
    "                <input class=\"layui-table-input\" placeholder=\"请输入\"/>\n" +
    "            </span>\n" +
    "                <span>\n" +
    "                <input class=\"layui-table-input\" placeholder=\"请输入\"/>\n" +
    "            </span>\n" +
    "                <span>\n" +
    "                    <input class=\"layui-table-input\" placeholder=\"请输入\"/>\n" +
    "                </span>\n" +
    "                <span>\n" +
    "                    <div class=\"btns\">\n" +
    "                        <button class=\"button-add\" onclick=\"addRightRow(this)\">+</button>\n" +
    "                        <button class=\"button-reduce\" onclick=\"removeRow(this)\">-</button>\n" +
    "                    </div>\n" +
    "                </span>\n" +
    "            </h3>";

function addRightRow(obj) {
    var h3 = this.getRowObj(obj);
    if (h3 != null) {
        h3.parentElement.insertAdjacentHTML("afterbegin", rightRow);
    }
    h3.getActiveUniform()
}

$("layui-table-select").hide();
//删除行
function removeRow(obj) {
    var h3 = this.getRowObj(obj);
    if (h3 != null) {
        h3.parentNode.removeChild(h3);
    }
}

function getRowObj(obj) {
    while (obj.tagName.toLowerCase() != "h3") {
        obj = obj.parentNode;
        if (obj.tagName.toLowerCase() == "ul") return null;
    }
    return obj;
}
