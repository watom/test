/*保存和发布按钮锁定0未锁定1锁定*/
var subLocking = false;
/*type0添加1编辑*/
/*{"type":0,"id":"C9497D2FA61B493B8DA441A073027BAE"}*/
var datasourceTypeAdd;
var fileArray = [];
/*{"id":"","url":"C9497D2FA61B493B8DA441A073027BAE"}*/
var editFileArray = [];
$(document).ready(function () {

    datasourceTypeAdd = sessionStorage.getItem("datasourceTypeAdd");
    datasourceTypeAdd = JSON.parse(datasourceTypeAdd);
    // datasourceTypeAdd = {"type":0, "id": "C9497D2FA61B493B8DA441A073027BAE"};
    // log("datasourceTypeAdd.type:" + datasourceTypeAdd.type);
    ko.applyBindings(detailModel);

    detailModel.directoryBelongto.subscribe(function (data) {
        if (data && data.resTypeList) {
            detailModel.departId(data.id);
            detailModel.dataTypes(data.resTypeList);

        }
    });

    $("#public").click(function () {
        uploadFileBuses(true);

    });

    $("#save").click(function () {
        uploadFileBuses(false);

    });

    $("#cancer").click(function () {
        history.go(-1);

    });

    $("#files").change(function () {
        var docFiles = document.getElementById("files");
        var fileObj = docFiles.files[0];
        log("fileObj:" + fileObj);
        if (fileObj == null) {
            return;
        }

        var uid = guid();
        fileArray.push({"id": uid, "file": fileObj});
        var editType = 0;
        addImgDiv(uid, editType);
        changImg(fileObj, uid);
    });

    loadingDetail();
});

function addImgDiv(uid, editType) {
    var html = '<li ><img id=' + uid + ' src="../../../images/icon_resource.png"/><i   onclick=deleteImg("' + uid + '","' + editType + '")  class="icondeal ' + uid + '"></i></li>';
    $("#ul-files").append(html);
}


function editShowImg(imgUrls) {
    log("editShowImg:" + imgUrls);
    if (imgUrls) {
        if (imgUrls.indexOf(",") == -1) {
            var uid = guid();
            editFileArray.push({id: uid, url: imgUrls});
            addImgDiv(uid, 1);

        } else {
            var imgUrlArray = imgUrls.split(",");
            for (var i = 0; i < imgUrlArray.length; i++) {
                var uid = guid();
                editFileArray.push({id: uid, url: imgUrlArray[i]});
                addImgDiv(uid, 1);
            }
        }
    }
}

function loadingDetail() {
    var param;
    var url;
    switch (datasourceTypeAdd.type) {
        case 0:
            getDicFre();
            getDicList();
            getDirectorys();
            break;

        case 1:
            param = {"resourceId": datasourceTypeAdd.id};
            //详情接口
            url = "/resource/ResPlatfromDetail";

            getDicFre(function () {
                getDirectorys(function () {
                    getDicList(function () {
                        BaixunUtils.request.postJson(cube.getResource(url), param, function (resultData) {

                            detailModel.resourceName(resultData.resultValue.resourceName);
                            detailModel.digest(resultData.resultValue.digest);
                            detailModel.keywords(resultData.resultValue.keywords);
                            detailModel.resourceDiscrible(resultData.resultValue.resourceDiscrible);
                            detailModel.dataType(resultData.resultValue.dataType);
                            detailModel.resourceProvider(resultData.resultValue.resourceProvider);
                            detailModel.applyScene(resultData.resultValue.applyScene);
                            detailModel.resourceTag(resultData.resultValue.resourceTag);
                            detailModel.resourceType(resultData.resultValue.resourceType);
                            detailModel.directoryBelongto(resultData.resultValue.directoryBelongto);
                            detailModel.publicity(resultData.resultValue.publicity);
                            detailModel.updateFrequency(resultData.resultValue.updateFrequency);
                            detailModel.makeUrl(resultData.resultValue.makeUrl);
                            detailModel.availableTime(dataFormat(resultData.resultValue.availableTime));
                            detailModel.isOpen(resultData.resultValue.isOpen);
                            for (var i = 0; i < detailModel.directoryBelongtos().length; i++) {
                                if (detailModel.directoryBelongtos()[i].catName == resultData.resultValue.directoryBelongto) {
                                    detailModel.directoryBelongto(detailModel.directoryBelongtos()[i]);
                                }
                            }
                            detailModel.dataTypeSelectName(resultData.resultValue.dataType);
                            detailModel.dataType(resultData.resultValue.dataType);

                            if (datasourceTypeAdd.type == 1) {
                                editShowImg(resultData.resultValue.makeUrl);
                            }
                        });
                    });
                });
            });

            break;
    }


}


function deleteImg(uid, editType) {
    log("uid:" + uid);
    // 0图片新增1图片编辑
    log("editType:" + editType);
    $("#" + uid).parent().remove();

    switch (datasourceTypeAdd.type) {
        case 0:
            for (var i = 0; i < fileArray.length; i++) {
                if (fileArray[i].id == uid) {
                    // fileArray.remove(i);
                    fileArray.splice(i, 1);
                    break;
                }
            }
            break;
        case 1:
            if (editFileArray) {
                for (var i = 0; i < editFileArray.length; i++) {
                    if (editFileArray[i].id == uid) {
                        editFileArray.splice(i, 1);
                        break;
                    }
                }
            } else {
                editFileArray = null;
            }
            break;
    }


    log("fileArray.length:" + fileArray.length);
}

function changImg(file, imgId) {

    var freader = new FileReader();
    freader.readAsDataURL(file);
    freader.onload = function (e) {
        // $("#" + imgId).attr("src", e.target.result);
        $("#" + imgId).attr("src", "../../../images/icon_resource.png");
    }
}

var detailModel = {
    "frequencySelectName": ko.observable("请选择更新频率"),
    "dictList": ko.observableArray([]),
    "directoryBSelectName": ko.observable("请选择所属目录"),
    "dataTypeSelectName": ko.observable("请选择数据类型"),
    "directoryBelongtos": ko.observableArray([]),
    "resourceName": ko.observable(),
    "digest": ko.observable(),
    "keywords": ko.observable(""),
    "resourceDiscrible": ko.observable(""),
    "dataTypes": ko.observableArray([]),
    "dataType": ko.observable(""),
    "resourceProvider": ko.observable(""),
    "applyScene": ko.observable(""),
    "availableTime": ko.observable(""),
    "resourceTag": ko.observable(""),
    "directoryBelongto": ko.observable(""),
    "updateFrequencys": ko.observableArray([]),
    "publicity": ko.observable("1"),
    "resourceType": ko.observable(),
    "updateFrequency": ko.observable(""),
    "makeUrl": ko.observable(""),
    "isOpen": ko.observable(),
    "departId": ko.observable(),
    "departmentNameList": ko.observableArray([]),
};

/*true发布false保存*/
function dataSubmit(isPublic, imgUrl) {
    log("dataSubmit_imgUrl:" + imgUrl);
    var department=$("#department").val();
    detailModel.resourceProvider(department);
    if (!invail()) {
        return;
    }

    var userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
    }

    var url;
    var param = {
        "userId": userInfo ? userInfo.userId : "",
        "resourceName": detailModel.resourceName(),
        "digest": detailModel.digest(),
        "keywords": detailModel.keywords(),
        "resourceDiscrible": detailModel.resourceDiscrible(),
        "dataType": detailModel.dataType(),
        "resourceProvider": detailModel.resourceProvider(),
        "applyScene": detailModel.applyScene(),
        "resourceTag": detailModel.resourceTag(),
        "directoryBelongto": detailModel.directoryBelongto().catName,
        "updateFrequency": detailModel.updateFrequency(),
        "availableTime": new Date($("#availableTime").val()).getTime(),
        "resourceType": "3",
        "publicity": detailModel.publicity(),
        "resourceSource": 0
    };

    switch (datasourceTypeAdd.type) {
        case 0:
            //新增接口
            url = "/resource/add";
            param.isOpen = isPublic ? 1 : 0;
            break;
        case 1:
            url = "/resource/update";
            //编辑接口
            if (detailModel.isOpen() != 1) {
                param.isOpen = isPublic ? 1 : 0;
            }
            param.resourceId = datasourceTypeAdd.id;
            break;
    }

    if (imgUrl) {
        param.makeUrl = imgUrl;
    }

    if (detailModel.departId()) {
        param.departId = detailModel.departId();
    }
    param.dataSources = "1";
    BaixunUtils.request.postJson(cube.getResource(url), param, function (resultData) {
        tosi(resultData.resultValue);
        setTimeout(function () {
            history.go(-1);
        }, 1000);
    }, function (errMsg) {

        tosi(errMsg.msg);
    });
}

/*获取数据更新频率字典*/
function getDicFre(sucCall) {
    var url = cube.gatewayURL_resource + "/resource/getDicList";
    BaixunUtils.request.postJson(url, {"dictType": "9529"}, function (resultData) {
        // log("getDicList:"+JSON.stringify(resultData));
        detailModel.updateFrequencys(resultData.resultValue.items);
        if ($.isFunction(sucCall)) {
            sucCall();
        }
    });
}

function getDicList(sucCall) {

    var url = cube.gatewayURL_resource + "/resource/getDicList";
    BaixunUtils.request.postJson(url, {"dictType": "9528"}, function (resultData) {
        log("getDicList:" + JSON.stringify(resultData));
        detailModel.dictList(resultData.resultValue.items);

        detailModel.resourceType("3");
        if ($.isFunction(sucCall)) {
            sucCall();
        }
    });
}

function getDirectorys(sucCall) {

    var url = cube.gatewayURL_catalogue + "/cat/selectcattype?catId=1";
    BaixunUtils.request.getJson(url, "", function (resultData) {
        log("getDirectorys:" + JSON.stringify(resultData));
        detailModel.directoryBelongtos(resultData.resultValue);
        if ($.isFunction(sucCall)) {
            sucCall();
        }
    });

    // var url=cube.gatewayURL_catalogue+"/cat/selectcattype?catId=1";
    // BaixunUtils.request.getJson(url,"", function (resultData) {
    //     log("getDirectorys:"+JSON.stringify(resultData));
    //     detailModel.directoryBelongtos(resultData.resultValue);
    // });
}

function invail() {
    if (!detailModel.resourceName()) {
        tosi("请输入资源名称");
        return false;
    }

    if (!detailModel.digest()) {
        tosi("请输入摘要");
        return false;
    }

    if (!detailModel.keywords()) {
        tosi("请输入关键字");
        return false;
    }

    if (!detailModel.directoryBelongto()) {
        tosi("请选择资源所属目录");
        return false;
    }


    if (!detailModel.resourceProvider()) {
        tosi("请输入数据提供方");
        return false;
    }
    if (!detailModel.applyScene()) {
        tosi("请输入数据应用场景");
        return false;
    }

    if (!detailModel.resourceTag()) {
        tosi("请输入资源标签");
        return false;
    }
    if (!detailModel.dataType()) {
        tosi("请选择数据类型");
        return false;
    }


    if (!detailModel.updateFrequency()) {
        tosi("请输入更新频度");
        return false;
    }

    if (!detailModel.availableTime()) {
        tosi("请选择有效日期");
        return false;
    }

    return true;
}

function tosi(msg) {
    layer.msg(msg);
    // log("msg:" + msg);
    // layui.use('layer', function () {
    //     var layer = layui.layer;
    //
    //     layer.msg(msg);
    // });
}

function uploadFileBuses(isPublic) {
    var formData = new FormData();
    detailModel.availableTime($("#availableTime").val());
    if (!invail()) {
        return;
    }


    switch (datasourceTypeAdd.type) {
        case 0:
            if (fileArray.length == 0) {
                tosi("请选择图片");
                return;
            }
            $.each(fileArray, function (i, item) {
                log("file" + i);
                formData.append("files", item.file);
            });

            break;

        case 1:
            if (fileArray.length == 0 && editFileArray.length == 0) {
                tosi("请选择图片");
                return;
            }

            if (fileArray.length > 0 && editFileArray.length == 0) {
                $.each(fileArray, function (i, item) {
                    log("file" + i);
                    formData.append("files", item.file);
                });
            } else if (fileArray.length == 0 && editFileArray.length >= 0) {
                dataSubmit(isPublic, getImgUrsString());
                return;

            } else if (fileArray.length > 0 && editFileArray.length > 0) {
                $.each(fileArray, function (i, item) {
                    log("file" + i);
                    formData.append("files", item.file);
                });

                formData.append("type", "dataservice-resource-file");
                BaixunUtils.request.uploadFile(cube.getResource("/file/uploads"), formData, function (result) {
                    console.log("uploadFile.result:" + JSON.stringify(result));
                    dataSubmit(isPublic, getImgUrsString() + "," + result.resultValue);
                    // dataSubmit(isPublic,result.resultValue);
                });
                return;
            }
            break;
    }

    formData.append("type", "dataservice-resource-file");
    BaixunUtils.request.uploadFile(cube.getResource("/file/uploads"), formData, function (result) {
        console.log("uploadFile.result:" + JSON.stringify(result));
        dataSubmit(isPublic, result.resultValue);
    });

}

function getImgUrsString() {
    var imgs = "";
    $.each(editFileArray, function (i, item) {
        imgs = imgs + item.url + ",";
    });
    return imgs = imgs.substring(0, imgs.length - 1);
}

function guid() {
    return (S4() + S4() + S4() + S4());
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}


// param = {
//     "resourceName": detailModel.resourceName(),
//     "digest": detailModel.digest(),
//     "keywords": detailModel.keywords(),
//     "resourceDiscrible": detailModel.resourceDiscrible(),
//     "dataType": detailModel.dataType(),
//     "resourceProvider": detailModel.resourceProvider(),
//     "applyScene": detailModel.applyScene(),
//     "resourceTag": detailModel.resourceTag(),
//     "directoryBelongto": detailModel.directoryBelongto(),
//     "updateFrequency": detailModel.updateFrequency(),
//     "resourceType": detailModel.resourceType(),
//     "publicity": "1",
//     // "resourceCode": 1,
//     // "departId": "2",
//     // "provideUser": "王老大",
//     // "provideUserTel": "15646546",
//     // "availableTime": "30",
//     // "cityBelongto": "渭南",
//     // "accessWay": "兰州",
//     // "dataRecord": '12',
//     // "createUser": "列夫托尔斯泰",
//     // "lastUpdateUser": "李四",
//     // "isOpen": isPublic ? 1 : 0,
//     // "departName": "人资部"
//     // "scanCount": 4875,
//     // "downloadCount": 75314,
//     // "makeUrl": "http://pic2.sc.chinaz.com/files/pic/pic9/201905/hpic966.jpg",
//     // "orderType": null,
//     // "pageIndex": null,
//     // "releaseDate": 1558525716000,
//     // "updateDate": 1558525716000,
//     // "createDate": 1415145600000,
//     // "lastUpdateDate": 1543536000000,
//     // "grade": null,
//     // "remark": null,
//     // "ext1": null,
//     // "ext2": null,
//     // "ext3": null,
//     // "resourceId": "92EF907917FC4B08A8BABD702879B5D5",
//     // "pageSize": null
// };