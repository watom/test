/*下拉树形图*/
var setting = {
    view: {
        showIcon: false,//设置 zTree 是否显示节点的图标。默认值：true
        showLine: true,//设置 zTree 是否显示节点之间的连线。默认值：true
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: onClick
    }
};

function onClick(e, treeId, treeNode) {
    $('#txtTreeSelect').val(treeNode.name);
    hideMenu();
}

function showMenu() {
    $(".ztree").css({"height":"190px","overflow-y":"scroll","overflow-x":"auto"});
    var cityObj = $('#txtTreeSelect');
    var cityOffset = cityObj.offset();
    $("#menuContent").css({
        left: cityOffset.left + "px",
        top: cityOffset.top + cityObj.outerHeight() + "px",
        height:200 + "px",
    }).slideDown("fast");
    $("body").bind("mousedown", onBodyDown);
    return false;
}

function hideMenu() {
    $("#menuContent").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}

function onBodyDown(event) {
    if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
        hideMenu();
    }
}

$(document).ready(function () {
    var zNodes = [
        {id: 1, pId: 0, name: "河北", open: true, url: "jyy"},
        {id: 11, pId: 1, name: "石家庄"},
        {id: 111, pId: 11, name: "衡水"},
        {id: 112, pId: 11, name: "邢台"},
        {id: 113, pId: 11, name: "承德"},
        {id: 114, pId: 11, name: "保定"},
        {id: 12, pId: 1, name: "河南"},
        {id: 121, pId: 12, name: "郑州"},
        {id: 122, pId: 12, name: "郑州1"},
        {id: 123, pId: 12, name: "郑州2"},
        {id: 124, pId: 12, name: "郑州3"},
        {id: 13, pId: 1, name: "武汉", isParent: true},
        {id: 2, pId: 0, name: "四川"},
        {id: 21, pId: 2, name: "成都", open: true},
        {id: 211, pId: 21, name: "成都1"},
        {id: 212, pId: 21, name: "成都2"},
        {id: 213, pId: 21, name: "成都3"},
        {id: 214, pId: 21, name: "成都4"},
        {id: 22, pId: 2, name: "贵州"},
        {id: 221, pId: 22, name: "云南白药"},
        {id: 222, pId: 22, name: "云南白药1"},
        {id: 223, pId: 22, name: "云南白药2"},
        {id: 224, pId: 22, name: "云南白药3"},
        {id: 23, pId: 2, name: "云南"},
        {id: 231, pId: 23, name: "昆明"},
        {id: 232, pId: 23, name: "弥勒"},
        {id: 233, pId: 23, name: "西双版纳"},
        {id: 234, pId: 23, name: "云南白药"},
        {id: 3, pId: 0, name: "深圳", isParent: true}
    ];
    
    var resultValue=[
        {
            "id": "-1",
            "orgId": "GSDL",
            "name": "默认最高机构",
            "viewCode": "GSDL",
            "fullName": "默认最高机构",
            "officeType": "1",
            "leader": "屈总",
            "phone": "2",
            "address": "西安雁塔",
            "zipCode": "710000",
            "email": "123123132@qq.com",
            "status": "1",
            "pId": "-1",
            "parentName": null,
            "remark": null,
            "reserved1": null,
            "reserved2": null,
            "reserved3": null,
            "orgOrder": 3,
            "mxVirtualId": null,
            "dictName": null,
            "childOrgs": [],
            "userInfos": [],
            "checked": false,
            "open": true
        },
        {
            "id": "8a81859d6b21b47c016b25a1f520000c",
            "orgId": null,
            "name": "兰州电力",
            "viewCode": "1001",
            "fullName": "兰州电力",
            "officeType": "2",
            "leader": "lz",
            "phone": "12223333333",
            "address": "兰州",
            "zipCode": null,
            "email": null,
            "status": "1",
            "pId": "8a81858a6ab3ce9a016ab3d0e04b0000",
            "parentName": "甘肃电力",
            "remark": null,
            "reserved1": null,
            "reserved2": null,
            "reserved3": null,
            "orgOrder": 2,
            "mxVirtualId": null,
            "dictName": null,
            "childOrgs": [],
            "userInfos": [],
            "checked": false,
            "open": true
        },
        {
            "id": "8a81858a6ab3ce9a016ab3d0e04b0000",
            "orgId": null,
            "name": "甘肃电力",
            "viewCode": "001",
            "fullName": "大佬不要删",
            "officeType": "1",
            "leader": "gs",
            "phone": "18634834",
            "address": "34",
            "zipCode": "1",
            "email": "22323",
            "status": "1",
            "pId": "0",
            "parentName": "1",
            "remark": null,
            "reserved1": null,
            "reserved2": null,
            "reserved3": null,
            "orgOrder": 1,
            "mxVirtualId": null,
            "dictName": null,
            "childOrgs": [],
            "userInfos": [],
            "checked": false,
            "open": true
        },
        {
            "id": "5c7ac09a6b2ba339016b2bcf5aea0002",
            "orgId": null,
            "name": "电力2",
            "viewCode": "ffff",
            "fullName": "电力2",
            "officeType": "1",
            "leader": "eeeeeeeeeeee",
            "phone": "1111",
            "address": "111",
            "zipCode": null,
            "email": "1111",
            "status": "1",
            "pId": "8a81859d6b21b47c016b25a1f520000c",
            "parentName": "兰州电力",
            "remark": null,
            "reserved1": null,
            "reserved2": null,
            "reserved3": null,
            "orgOrder": 22,
            "mxVirtualId": null,
            "dictName": null,
            "childOrgs": [],
            "userInfos": [],
            "checked": false,
            "open": true
        }
    ];

    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
});
