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
    selected: ko.observable(),
    availableCountries: ko.observableArray(['陕西', '四川', '兰州']),
    resultList: ko.observableArray(getData().resultValue)
};


function getDirectorys() {
    directoryBelongtos: ko.observableArray([
        {
            "departmentID": "1",
            "departmentName": "信息技术部"
        }, {
            "departmentID": "2",
            "departmentName": "财务部"
        }])
    detailModel.directoryBelongtos(resultData.resultValue);
}


function getData() {
    var json={
        "successful": true,
        "resultValue": [
            {
                "domainId": "FD56741209674BF4808D38842AB353CE",
                "domainName": "财务域",
                "createUser": "aa",
                "createDate": 1567244181000,
                "lastUpdateUser": "bb",
                "lastUpdateDate": 1566631284000,
                "ext1": null,
                "ext2": null,
                "ext3": null
            },
            {
                "domainId": "0679027635EF47D9A097AF2F1FA21A65",
                "domainName": "市场域",
                "createUser": "aa",
                "createDate": 1566812149000,
                "lastUpdateUser": "bb",
                "lastUpdateDate": 1566631260000,
                "ext1": null,
                "ext2": null,
                "ext3": null
            },
            {
                "domainId": "79F78570285F402382E4498AF042FE1A",
                "domainName": "人员域",
                "createUser": "aa",
                "createDate": 1566639351000,
                "lastUpdateUser": "bb",
                "lastUpdateDate": 1566631261000,
                "ext1": null,
                "ext2": null,
                "ext3": null
            },
            {
                "domainId": "E63BFFF461D2450C992E2A37AF4F7BBC",
                "domainName": "综合域",
                "createUser": "aa",
                "createDate": 1566552890000,
                "lastUpdateUser": "bb",
                "lastUpdateDate": 1566631217000,
                "ext1": null,
                "ext2": null,
                "ext3": null
            },
            {
                "domainId": "CB101BD6CA8848B481FEAAF3148631EB",
                "domainName": "资产域",
                "createUser": "aa",
                "createDate": 1565688900000,
                "lastUpdateUser": "bb",
                "lastUpdateDate": 1566631225000,
                "ext1": null,
                "ext2": null,
                "ext3": null
            },
            {
                "domainId": "45FAFC1F4291492D94ACEEAA782E24CC",
                "domainName": "项目域",
                "createUser": "aa",
                "createDate": 1565602510000,
                "lastUpdateUser": "bb",
                "lastUpdateDate": 1566631232000,
                "ext1": null,
                "ext2": null,
                "ext3": null
            },
            {
                "domainId": "996DFE98B7EF42AFA62D0F35E7B3EBAA",
                "domainName": "客户域",
                "createUser": "aa",
                "createDate": 1565516156000,
                "lastUpdateUser": "bb",
                "lastUpdateDate": 1566631265000,
                "ext1": null,
                "ext2": null,
                "ext3": null
            },
            {
                "domainId": "1326743014014C0B86D775F6F0DD113D",
                "domainName": "物资域",
                "createUser": "aa",
                "createDate": 1565429739000,
                "lastUpdateUser": "bb",
                "lastUpdateDate": 1566631253000,
                "ext1": null,
                "ext2": null,
                "ext3": null
            },
            {
                "domainId": "867CB0CB7D964CED88005E9807AF0F8A",
                "domainName": "电网域",
                "createUser": "aa",
                "createDate": 1565343378000,
                "lastUpdateUser": "bb",
                "lastUpdateDate": 1566631282000,
                "ext1": null,
                "ext2": null,
                "ext3": null
            },
            {
                "domainId": "02F9CAE11CA048268C64D6DB201B2E43",
                "domainName": "安全域",
                "createUser": "aa",
                "createDate": 1565170593000,
                "lastUpdateUser": "bb",
                "lastUpdateDate": 1566631292000,
                "ext1": null,
                "ext2": null,
                "ext3": null
            }
        ]
    }

    return json;
}
