var win;

function createWin() {
    win = window.open("", "", "width=300,height=200");
}

function closeWin() {
    if (win) {
        win.close();
    }
}

function alertDialog() {
    alert("您成功执行了这个操作。");
}

function confirmDialog() {
    if (window.confirm("您确认要进行这个操作吗？")) {
        alert("您选择了确定！");
    } else {
        alert("您选择了取消");
    }
}

function promptDialog() {
    var input = window.prompt("请输入内容：");
    if (input != null) {
        window.alert("您输入的内容为" + input);
    }
}