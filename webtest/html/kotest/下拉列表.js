$(document).ready(function () {
    ko.applyBindings(detailModel);
    getDirectorys();
    detailModel.directoryBelongto.subscribe(function (data) {
        if (data && data.resTypeList) {
            // detailModel.departId(data.id);
            detailModel.dataTypes(data.resTypeList);
        }
    });
});

var detailModel = {
    directoryBelongtos: ko.observableArray([]),
    directoryBelongto: ko.observableArray(),
    resTypeList: ko.observable([]),
    dataTypes: ko.observableArray([]),
    selectedValue: ko.observable(),

};



function getDirectorys() {
    // directoryBelongtos: ko.observableArray([
    //     {
    //         "departmentID": "1",
    //         "departmentName": "信息技术部"
    //     }, {
    //         "departmentID": "2",
    //         "departmentName": "财务部"
    //     }]),
    var url = cube.gatewayURL_catalogue + "/cat/selectcattype?catId=1";
    BaixunUtils.request.getJson(url, "", function (resultData) {
        console.log("getDirectorys:" + JSON.stringify(resultData));
        detailModel.directoryBelongtos(resultData.resultValue);
    }, function () {
        tosi("请求失败")
    });
}