$(document).ready(function () {
    // 第一种方法
    // $(function () {
    //     $('#myTab li:eq(0) a').tab('show');
    // });
    //第二种方式
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // 获取已激活的标签页的名称
        // var activeTab = $(e.target).text();
        var activeTab = $(e.target).attr('id');
        // 获取前一个激活的标签页的名称
        // var previousTab = $(e.relatedTarget).text();
        var previousTab = $(e.relatedTarget).attr('id');
        $(".active-tab span").html(activeTab);
        $(".previous-tab span").html(previousTab);
    });

});