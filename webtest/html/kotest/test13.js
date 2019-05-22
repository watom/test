var viewModel = {
    hasCellphone: ko.observable(false),
    cellphoneNumber: "",
    switch:function () {
        var btnVal = document.getElementById("s1");
        if (btnVal.value == "启用") {
            btnVal.value = "禁用";
        } else if (btnVal.value == "禁用") {
            btnVal.value = "启用";
        }
    }
};

function changeValue() {
    var btnVal = document.getElementById("s1");
    if (btnVal.value == "启用") {
        btnVal.value = "禁用";
    } else if (btnVal.value == "禁用") {
        btnVal.value = "启用";
    }
}
