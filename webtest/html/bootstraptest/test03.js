var vm = {
    setRanking: function (data) {
        console.log("王海涛：" + data);
        for (i = 0; i < 5; i++) {
            if (i > data) {
                $(".ranking").before("<img src='../../images/star.png'/> ");
            } else {
                $(".ranking").before("  <img src='../../images/staractive.png'/> ");
            }
        }
    }
}

function reply() {
    alert("回复成功");
}

$(document).ready(function () {
    ko.applyBindings(vm);
});