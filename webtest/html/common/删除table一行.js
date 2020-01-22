function instTR() {
    var tab = document.getElementById('tab');
    var n = document.getElementById('x').rowIndex + 1;
    var tr = tab.insertRow(n);
    var td = tr.insertCell(0);
    td.innerHTML = 'new ' + Math.random();//添加一行

    tr.innerHTML = 'new ' + Math.random(); //添加一列
}

function addrow() {
    var c = document.getElementById('tab');//获得表格的信息
    var x = c.insertRow(c.rows.length);
    x.innerHTML = "<tr><td>"+(c.rows.length-1)+"</td><td><input type=\"button\" onclick=\"removeRow(this)\" value=\"删除\"></td></tr>";
}

//删除行
function removeRow(obj) {
    var tr = this.getRowObj(obj);
    if (tr != null) {
        tr.parentNode.removeChild(tr);
    }
}

//得到行对象
function getRowObj(obj) {
    var i = 0;
    while (obj.tagName.toLowerCase() != "tr") {
        obj = obj.parentNode;
        if (obj.tagName.toLowerCase() == "table") return null;
    }
    return obj;
}

//根据得到的行对象得到所在的行数
function getRowNo(obj) {
    var trObj = getRowObj(obj);
    var trArr = trObj.parentNode.children;
    for (var trNo = 0; trNo < trArr.length; trNo++) {
        if (trObj == trObj.parentNode.children[trNo]) {
            alert(trNo + 1);
        }
    }
}
