$.mmEcharts.chartType.radar={
    type: 'radar',
    option: function () {
        var option = {
            //title: {
            //    text: '雷达图'
            //},
            tooltip: {
            },
            legend: {
                show: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    //{ name: '销售（sales）', max: 6500},
                ]
            },
            series: []
        };
        return option;
    },
    /**
     * 把数据解码对应的series
     * @param data 数据
     * @param mmChart
     * @returns {echarts.options}
     */
    decodeData: function (data,mmChart) {
        return $.mmEcharts.MMChart.prototype.helpers.resolveRadar(data, this.type,mmChart);
    }
};

$.mmEcharts.registerHelper('resolveRadar', function (data, type,mmChart) {
    var xAxisData = [], map = {},o = mmChart.options;
    var groupField = o.groupField || "name";
    var maxValue = o.maxValue || 100;
    if (data &&data.length>0) {
        $.each(data, function (index, e) {
            $.each(e, function (key, value) {
                if (key == groupField || key.toLowerCase() == groupField) {
                    xAxisData.push(value);
                } else {
                    var keyName = o.valueFields ? o.valueFields[key] : key;
                    if (keyName) {
                        var itemData = map[keyName];
                        if (!itemData) {
                            itemData = [];
                            map[keyName] = itemData;
                        }
                        itemData.push(value);
                    }
                }
            });
        });
        var series = [], legendData = [],data=[],indicator=[],v;
        $.each(map, function (key, value) {
            legendData.push({name:key});
            data.push({name:key,value:value});
        });
        series.push({type:type,itemStyle: {normal: {areaStyle: {type: 'default'}}},data:data});
        $.each(xAxisData,function(index,e){
            indicator.push({name:e,max:maxValue});
        });
    }
    return {
        legend: {
            data: legendData
        },
        radar:{indicator:indicator},
        series: series
    };
});