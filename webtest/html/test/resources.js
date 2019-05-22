

var SysPostViewModel = {
    resultList: ko.observableArray([]),
    postName: ko.observable(),
    postCode: ko.observable(),
    postType: ko.observable(),
    postStutas: ko.observable(),
    dictnames: ko.observableArray([]),
    dictname: ko.observable(),
    selectedType: ko.observable(),
    selectedStatus: ko.observable(),
    itemCount: ko.observable(),
    pageSize: cube.pageSize,//每页显示条数
    totalPageCount: 1,//总页数
    pageIndex: ko.observable(1),//当前页
    lastPageCount: 0,
    totalCount: 0,
    loadData: function () {
        //这个地方调用ajax，在回调方法给resultList 赋值
        var data = {
            "postName": SysPostViewModel.postName(),
            "postCode": SysPostViewModel.postCode(),
            "postType": SysPostViewModel.selectedType(),
            "state": SysPostViewModel.selectedStatus(),
            "pageIndex": this.pageIndex,
            "pageSize": this.pageSize
        };
        cube.interactToServer(cube.gatewayURL_sys + "/sysPost/", "POST", data, true, false, function (result) {
            if (result.successful == true) {
                if (result.resultValue.items.length == 0 && SysPostViewModel.pageIndex() != 1) {
                    SysPostViewModel.pageIndex(SysPostViewModel.pageIndex() - 1);
                    SysPostViewModel.postRest(SysPostViewModel.pageIndex());
                    return;
                }
                SysPostViewModel.resultList(result.resultValue.items);//resultList 赋值
                // 调用jecp.js中的page方法
                cube.page(result, SysPostViewModel);
            } else {
                layer.msg('请求失败，请检查后台服务或者网络!', {icon: 5, time: 1000});
            }
        });
        SysPostViewModel.getPostType({"code": "sys_post"});
    },
    //查询岗位类型
    getPostType: function (data) {
        cube.interactToServer(cube.gatewayURL_sys + "/sysPost/queryPostTypeByDict/", "POST", data, true, false, function (result) {
            if (result.successful == true) {
                SysPostViewModel.dictnames(result.resultValue);
            }
        });
    },

    //搜索框
    postSreach: function () {
        //执行ajax
        this.pageIndex(1);
        this.loadData();
    },
    //重置按钮
    postRest: function (pageIndex) {
        //执行ajax
        this.pageIndex(pageIndex);
        this.loadData();
    },
    switchPostStatus: function (data) {
        var stateValue = data._status == 1 ? 2 : 1;
        cube.interactToServer(cube.gatewayURL_sys + "/sysPost/updatePostStatusByID/", "POST", {"id": data.id, "state": stateValue}, true, false, function (result) {
            if (result.successful == true) {
                if (stateValue==1) {
                    layer.msg("启用成功", {icon: 6, time: 1000});
                    SysPostViewModel.loadData();
                } else {
                    layer.msg("停用成功", {icon: 6, time: 1000});
                    SysPostViewModel.loadData();
                }
            }
        })
    },
    //删除单条
    deleteById: function (data) {
        //这个地方写ajax，执行成功在回调方法中进行前台删除，或者直接调用重新加载数据
        var ids = {"ids": [data.id]};
        layer.confirm('确认要删除吗？', function () {
            //发异步删除数据
            cube.interactToServer(cube.gatewayURL_sys + "/sysPost/delete/", "POST", ids, true, false, function (result) {
                if (result.successful == true) {
                    layer.msg('已删除!', {icon: 6, time: 1000});
                    SysPostViewModel.resultList.remove(data);
                    //刷新页面
                    SysPostViewModel.postRest(SysPostViewModel.pageIndex());
                } else {
                    if (result.resultHint != null || result.resultHint != "") {
                        layer.msg(result.resultHint, {icon: 5, time: 1000});
                    } else {
                        layer.msg('删除失败!', {icon: 5, time: 1000});
                    }
                }
            });
        });
    },
    //删除全部
    deleteAll: function (data) {
        layer.msg('请勾选再删除!', {icon: 7, time: 1000});
    },
    //跳转到编辑页面
    update: function (data) {
        x_admin_show('编辑岗位', 'postAdd.html?id=' + data.id, 30, 65)
    },

    //重置
    postSreachRest: function () {
        SysPostViewModel.postName("");
        SysPostViewModel.postCode("");
        SysPostViewModel.selectedType("");
        SysPostViewModel.selectedStatus("");
        SysPostViewModel.loadData();
    }
}

