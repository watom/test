var vm = {
    resultList: ko.observableArray([
        {name: "Bungle", time: "1960-5", score: 3, "xingxing": 2},
        {name: "George", time: "1998-5", score: 2, "xingxing": 1},
        {name: "Zippy", time: "2009-3", score: 4, "xingxing": 4},
        {name: "Tom", time: "2019-4", score: 1, "xingxing": 3}
    ]),

    commentList: ko.observableArray([
        {name: "张三", time: "1960-5", "comment": "哈哈哈哈"},
        {name: "李四", time: "1998-5", "comment": "哈哈哈哈"},
        {name: "王五", time: "2009-3", "comment": "哈哈哈哈"},
        {name: "贾六", time: "2019-4", "comment": "哈哈哈哈"}
    ]),
    setRanking00: function (data) {
        console.log("王海涛：" + data1+"--"+data2);
        for (i = 0; i < 5; i++) {
            if (i > data) {
                $(".item2"+data).before("<img src='../../images/star.png'/> ");
            } else {
                $(".item2").before("  <img src='../../images/staractive.png'/> ");
            }
        }
    },
    // setRanking: function (data1, data2) {
    //     console.log("王海涛888：" + data1 + "--" + data2);
    //     for (i = 0; i < 5; i++) {
    //         if (i > data2) {
    //             $("#item" + data1).before("<img src='../../images/star.png'/> ");
    //             // console.log("item的class：" + $(flag(data1)).attr("id"));
    //         } else {
    //             $("#item" + data1).before("  <img src='../../images/staractive.png'/> ");
    //             // console.log("item的class：" + $(flag(data1)).attr("id"));
    //         }
    //     }
    // },
    setRanking: function (data1, data2) {
        console.log("王海涛888：" + data1 + "--" + data2);
        // for (i = 0; i < 5; i++) {
        //     if (i > data2) {
        //         $(flag(data1)).before("<img src='../../images/star.png'/> ");
        //         console.log("item的class：" + $(flag(data1)).attr("id"));
        //     } else {
        //         $(flag(data1)).before("  <img src='../../images/staractive.png'/> ");
        //         console.log("item的class：" + $(flag(data1)).attr("id"));
        //     }
        // }
        console.log("item的class：" + $(flag(data1)).attr("id"));
    },
    setRanking01: function (data1, data2) {
        for (i = 0; i < 5; i++) {
            console.log("王海涛888：" + data1 + "--" + data2);
            if (i > data2) {
                $(".item" + data1).before("<img src='../../images/star.png'/> ");

            } else {
                $(".item" + 2).before("  <img src='../../images/staractive.png'/> ");
                console.log("item的class：" + $(".item"+data1).attr("class"));
            }
        }
    },
    setRanking02: function (data1, data2) {
        for (i = 0; i < 5; i++) {
            console.log("王海涛：" + data1 + "--" + data2);
            if (data2 - 1 < i) {
                $(".item" + data1).before("<img src='../../images/star.png'/> ");
            } else {
                $(".item" + data1).before("  <img src='../../images/staractive.png'/> ");
            }
        }
    },

    www: function (data) {
        console.log("item的class44444444444：" + $(flag(data)).attr("id"));
    },
    reply: function (data1, data2) {
        // alert("显示索引：" + JSON.stringify(data1));
        console.log("增加的Item" + data1);
        var str = "为了解决这个问题";
        $("<p>" + str + "</p>").appendTo("#comment" + data1);
        // $("<p>" + str + "</p>").appendTo(".uuu");
    },
    classValue: function (data) {
        console.log("classValue：" + data);
    },
    addClass: function (data) {
        var classname = $(".context").attr("class");
        if (classname.indexOf("comment"+(data-1)) == -1) {
            $(".context").addClass('comment' + data);
        } else {
            $(".comment").attr("class", ("context " + "comment" + data));
        }
        console.log("item增加属性" + $(".context").attr("class"));
    },
    createId:function (data) {
        $(".context").addClass('comment' + data);
    }

}

function flag(data) {
    var a="item"+data;
    console.log("王海涛6666666666：" + a);
    return a;
};

vm.addComments=function (data) {
    console.log("回复了："+data.name)
    vm.commentList.push( {name: "张三", time: "1960-5", "comment": "哈哈哈哈"});
};

vm.removeComments=function (data) {
    console.log("删除了："+data.name)
    vm.commentList.remove(this);
}


function dianji(data) {
    var data = "为了解决这个问题，我们可以换做另外一种方法";
    $("#fun123").append("<p>  " + data + "</p>");
}

$(document).ready(function () {
    ko.applyBindings(vm);
});