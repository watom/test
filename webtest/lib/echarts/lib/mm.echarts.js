/**
 * mm.echarts.v.1.5
 */
(function ($) {
    "use strict";

    /**
     *
     * @param options mmchart 配置
     * @param settings 配置
     * @returns {Array}
     */
    $.fn.mmEcharts = function (options, settings) {
        var _options = {};
        var length = arguments.length;
        if (length == 1) {
            settings = options || {};
        } else {
            _options = options || {};
            settings = settings || {};
        }
        // Render options
        var charts = [];

        this.each(function () {
            var $chart = $(this);
            var thisSettings = {};
            var chartType = $chart.data('chart_type') || $chart.data('chart-type');//兼容老版本
            var url = $chart.data('query_url') || $chart.data('query-url');
            var sql = $chart.data('query_sql') || $chart.data('query-sql');
            var dataType = $chart.data('data_type') || $chart.data('data-type');
            var chartTheme = $chart.data('chart_theme') || $chart.data('chart-theme');

            var queryParams = $chart.data('query_params') || $chart.data('query-params');
            var params = {};
            if (queryParams && typeof queryParams == "string") {
                params = $.mmEcharts.toJson(queryParams);
            }

            var chartOptions = $chart.data('chart_options') || $chart.data('chart-options');
            if (chartOptions && typeof chartOptions == "string") {
                chartOptions = $.mmEcharts.toJson(chartOptions);
            }
            chartOptions = $.extend(true, chartOptions||{}, _options);

            var valueFields = $chart.data('value-fields');
            if (valueFields && typeof valueFields == "string") {
                valueFields = $.mmEcharts.toJson(valueFields);
            }

            var defaults = {
                $chart: $chart,
                dom: $chart[0],
                type: chartType||'line',
                theme: chartTheme,
                chartOptions: chartOptions,
                valueFields: valueFields,
                queryUrl: url,
                querySql: sql,
                dataType: dataType,
                callback: function (thisChart) {
                    var o = thisChart.options;
                    if (o.dataset) {
                        thisChart.loadData(o.dataset, o.dataType, o.queryParams);
                    } else if (o.querySql) {
                        var sql = $.mmEcharts.tpl(o.querySql, o.queryParams);
                        thisChart.loadDataBySql(sql, o.queryParams, o.dataType);
                    } else if (o.queryUrl) {
                        thisChart.loadDataByUrl(o.queryUrl, o.queryParams, o.dataType);
                    }
                }
            };

            thisSettings = $.extend({}, $chart.data(), defaults,
                settings);
            thisSettings.queryParams = $.extend(params, settings.queryParams || settings.data);
            var MMChart = $.mmEcharts.newChart(thisSettings);
            charts.push(MMChart);
        });
        return charts;
    };

    $.mmEcharts = {};
    $.mmEcharts.cache = {};
    /**
     * 字符串转json对象
     * @param str
     * @returns {*}
     */
    $.mmEcharts.toJson = function (str) {
        try {
            return eval("(" + str + ")");
        } catch (e) {
            console.error(str + '转换出错', e);
        }
        return null;
    };
    /**
     * 模板引擎
     * @param template
     * @param context
     */
    $.mmEcharts.tpl = function (template, context) {
        var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
        return template.replace(tokenReg, function (word, slash1, token, slash2) {
            if (slash1 || slash2) {
                return word.replace('\\', '');
            }
            var variables = token.replace(/\s/g, '').split('.');
            var currentObject = context;
            var i, length, variable;

            for (i = 0, length = variables.length; i < length; ++i) {
                variable = variables[i];
                currentObject = currentObject[variable];
                if (currentObject === undefined || currentObject === null) return '';
            }
            return currentObject;
        })
    };
    /**
     * 生成UUID
     * @param len
     * @param radix
     * @returns {string}
     */
    $.mmEcharts.uuid = function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            var r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    };
    /**
     * 默认配置
     * @type {{ctx: string, chartDataUrl: string, dataFromSqlUrl: string, chinaDataUrl: string, defaultEchartsTheme: string}}
     */
    $.mmEcharts.defaults = {
        ctx: "http://locahost:8080",
        chartDataUrl: '/bi/chart/read/',
        dataFromSqlUrl: '/m/bi/tools/getDataFromSql',
        chinaDataUrl: '/bi/chart/map/china',
        defaultEchartsTheme: "walden"
    };
    /**
     * 修改默认配置
     * @param options
     */
    $.mmEcharts.options = function (options) {
        $.mmEcharts.defaults = $.extend($.mmEcharts.defaults, options);
    };
    /**
     * 通过chartId获取 已经实例的mmecharts对象
     * @param chartId
     * @returns {MMChart}
     */
    $.mmEcharts.getChartById = function (chartId) {
        return $.mmEcharts.cache[chartId];
    };

    /**
     * 获取chartId获取
     * @param chartId
     * @returns {string
     */
    $.mmEcharts.getChartId = function ($element) {
        return $element.attr('id');
    };

    var MMChart = function (options) {
        var me = this;
        me.options = $.extend({}, $.mmEcharts.defaults, options);
        me.chart = ChartType[options.type];
        if (options.chartOptions && options.chartOptions.series) {
            this.defaultOptions = {};
            this.defaultOptions = $.extend({}, options.chartOptions);
            options.chartOptions.series = [];
        } else {
            this.defaultOptions = options.chartOptions;
        }
        var chartOptions = $.extend(true, {}, this.chart.option(), options.chartOptions);
        me.type = options.type;
        me.theme = options.theme;
        me.dataUrl = me.options.ctx + me.options.dataFromSqlUrl;
        me.chartDataFromIdUrl = me.options.ctx + me.options.chartDataUrl;
        me.before = options.before || (me.options.on && me.options.on.before);
        me.renderBefore = options.renderBefore || (me.options.on && me.options.on.renderBefore);
        me.complete = options.complete || (me.options.on && me.options.on.complete);
        me.click = options.click;
        me.initChart(options.$chart, options.dom, me.theme, chartOptions, options.callback);
    };

    $.mmEcharts.MMChart = MMChart;

    MMChart.prototype = {
        helpers: {},
        /**
         * 初始化
         * @param $chart
         * @param dom
         * @param theme
         * @param chartOptions
         * @param callback
         */
        initChart: function ($chart, dom, theme, chartOptions, callback) {
            var me = this;
            var chartId = $chart.attr("id");
            theme = theme || me.options.defaultEchartsTheme;
            if (!chartId) {
                chartId = "mm_chart_" + $.mmEcharts.uuid(8, 16).toLocaleLowerCase() + "_" + theme;
                $chart.attr("id", chartId);
            }
            var myChart = $.mmEcharts.cache[chartId];
            if (!myChart) {
                myChart = echarts.init(dom, theme);//,'walden'
                $.mmEcharts.cache[chartId] = this.echarts = myChart;
            } else {
                this.echarts = myChart;
                this.echarts.clear();
            }
            if (me.before) {
                isFunction(me.before) ? me.before(this) : eval(me.before + "(chartOptions)");
            }
            if (this.type == ChartType.map.type) {
                ChartType.map.loadMap(me.options, function () {
                    myChart.setOption(chartOptions);
                    callback(me);
                });
            } else {
                myChart.setOption(chartOptions);
                callback(me);
            }
            me.initEvent();
        },
        /**
         * 初始化事件
         */
        initEvent: function () {
            var me = this;
            if (me.click) {
                me.echarts.on('click', function (params) {
                    isFunction(me.click) ? me.click(params) : eval(me.click + "(params)");
                });
            }
            if (me.options.on) {
                $.each(me.options.on, function (name, fun) {
                    me.echarts.on(name, fun);
                });
            }
        },
        echarts: function () {
            return this.echarts;
        },
        /**
         * 设置echarts配置
         * @deprecated
         * @param option
         */
        setOption: function (option) {
            this.echarts.setOption(option);
        },
        /**
         * 获取echarts配置
         *@deprecated
         */
        getOption: function () {
            return this.echarts.getOption();
        },
        /**
         * 设置echarts配置
         * @param option
         */
        setEchartsOption: function (option) {
            this.echarts.setOption(option);
        },
        /**
         * 获取echarts配置
         */
        getEchartsOption: function () {
            return this.echarts.getOption();
        },
        /**
         * 设置MMChart配置
         * @param options
         */
        setOptions: function (options) {
            $.extend(true,this.options,options);
        },
        /**
         * 获取MMChart配置
         * @returns {*}
         */
        getOptions: function () {
            return this.options;
        },
        /**
         *
         * @param data 返回数据
         * @param dataType
         * @param params ajax查询参数
         * @param defaultOptions
         */
        loadData: function (data, dataType, params, defaultOptions) {
            if (dataType == 'column') {
                data = this.helpers.columnToRowData(data, this);
            }
            if (this.renderBefore) {//数据渲染之前回调函数
                data = isFunction(this.renderBefore) ? this.renderBefore(data, params, this) : eval(this.renderBefore + "(data,params,this)");
            }
            var option = this.chart.decodeData(data, this);
            defaultOptions = defaultOptions || this.defaultOptions;
            if (defaultOptions) {
                option = $.extend(true, option, defaultOptions);
            }
            try {
                this.echarts.setOption(option);
            } catch (e) {
                console.error(e);
            }
            if (this.complete) {//回调函数
                isFunction(this.complete) ? this.complete(this) : eval(this.complete + "(this)");
            }
        },
        /**
         *加载数据
         * @param url
         * @param data
         * @param dataType row or column 返回的数据X坐标是 行数据的Name，还是列名
         * @param callback
         */
        loadDataByUrl: function (url, params, dataType, defaultOptions, callback) {
            var me = this;
            me.url = url;
            me.getDataByUrl(url, params, function (data) {
                me.loadData(data, dataType, params, defaultOptions);
                if (callback) {
                    callback(data);
                }
            });
        },
        /**
         * 通过URL获取图表数据
         * @param url
         * @param params
         * @param callback
         */
        getDataByUrl: function (url, params, callback) {
            var me = this;
            if (url) {
                url = typeof url === 'number' || url.indexOf('http') == -1 ? me.chartDataFromIdUrl + url : url;
            }
            me.url = url;
            params = jQuery.param(params || {}, true);
            var post = $.extend({
                url: url,
                type: 'POST',
                data: params,
                dataType: 'json',
                beforeSend: function () {
                    me.echarts.showLoading();
                },
                success: function (data) {
                    me.echarts.hideLoading();
                    if (callback) {
                        callback(data);
                    }
                },
                complete: function () {
                    me.echarts.hideLoading();
                }
            }, me.options.ajax);
            $.ajax(post);
        },
        loadDataBySql: function (sql, params, dataType, defaultOptions, callback) {
            this.sql = sql;
            var data = {sql: sql, params: params || []};
            this.loadDataByUrl(this.dataUrl, data, dataType, defaultOptions, callback);
        },
        /**
         * 添加混合图形
         * @param chartType 图标类型：bar bar2 line
         * @param yAixs 是否增加Y轴
         * @param sql
         * @param params
         * @param dataType row或column
         * @param callback
         */
        addChartBySql: function (options, chartType, yAixs, sql, params, dataType, callback) {
            var data = {sql: sql, params: params || []};
            this.addChartByUrl(options, chartType, yAixs, this.dataUrl, data, dataType, callback);
        },
        /**
         * 添加混合图形
         * @param chartType 图标类型：bar bar2 line
         * @param yAixs 是否增加Y轴
         * @param url 获取数据url or 后台配置的图表ID
         * @param params 参数
         * @param dataType row或column
         * @param callback
         */
        addChartByUrl: function (options, chartType, yAixs, url, params, dataType, callback) {
            var me = this;
            me.getDataByUrl(url, params, function (data) {
				if (options.renderBefore) {//数据渲染之前回调函数
					data = isFunction(options.renderBefore) ? options.renderBefore(data, params, me) : eval(options.renderBefore + "(data,params,me)");
				}
                me.addChartByData(options, chartType, yAixs, data, dataType, callback);
				if (options.complete) {//回调函数
					isFunction(options.complete) ? options.complete(me) : eval(options.complete + "(me)");
				}
            });
        },
        /**
         * 添加混合图形
         * @param options 图表配置
         * @param chartType 图表类型
         * @param yAixs 是否增加Y轴
         * @param data 图表数据
         * @param dataType row|column
         * @param callback
         */
        addChartByData: function (options, chartType, yAixs, data, dataType, callback) {
            var me = this;
            if (dataType == 'column') {
                data = me.helpers.columnToRowData(data, me);
            }
            var _char = ChartType[chartType];
            var option = _char.decodeData(data, me);
            var old = me.echarts.getOption();
            $.each(option.legend.data, function (index, e) {
                old.legend[0].data.push(e);
                if (yAixs) {
                    old.yAxis.push(yAixs === true ? {
                        type: 'value'
                    } : yAixs);
                }
            });

            $.each(option.series, function (index, e) {
                if (yAixs) {
                    e.yAxisIndex = index + 1;
                }
                old.series.push(e);
            });
            if (options) {
                old = $.extend(true, old, options);
            }
            try {
                me.echarts.setOption(old);
            } catch (e) {
                console.error(e);
            }
            if (callback) {
                callback(option);
            }
        },
        reloadData: function (params, dataType, defaultOptions, callback) {
            if (this.sql) {
                this.loadDataBySql(this.sql, params, dataType, defaultOptions, callback);
            } else if (this.url) {
                this.loadDataByUrl(this.url, params, dataType, defaultOptions, callback);
            } else {
                throw new Error('must init sql or url');
            }
        },
        resize: function () {
            this.echarts.resize();
        }
    };

    /**
     * 定义图表类型 通用配置，和数据解码函数
     * @type {{line: {type: string, option: option, decodeData: decodeData}, bar: {type: string, option: option, decodeData: decodeData}, bar2: {type: string, option: option, decodeData: decodeData}, pie: {type: string, option: option, decodeData: decodeData}, map: {type: string, name: string, option: option, loadMap: loadMap, decodeData: decodeData}}}
     */
    var ChartType = {
        line: {
            type: 'line',
            /**
             * 通用配置
             * @param defaultOption 修改通用配置
             * @returns {*}
             */
            option: function (defaultOption) {
                if (this._option) {
                    return this._option = defaultOption ? $.extend(true, this._option, defaultOption) : this._option;
                }
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        show: true
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: []
                };
                return this._option = defaultOption ? $.extend(true, option, defaultOption) : option;
            },
            /**
             * 数据解码
             * @param data 数据
             * @param mmChart
             * @returns {*}
             */
            decodeData: function (data, mmChart) {
                return MMChart.prototype.helpers.decodeData(data, this.type, false, mmChart);
            }
        },
        bar: {
            type: 'bar',
            /**
             * 通用配置
             * @param defaultOption 修改通用配置
             * @returns {*}
             */
            option: function (defaultOption) {
                if (this._option) {
                    return this._option = defaultOption ? $.extend(true, this._option, defaultOption) : this._option;
                }
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        show: true
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            interval: 0
                        }
                    },
                    yAxis: {
                        type: 'value'
                    }
                };
                return this._option = defaultOption ? $.extend(true, option, defaultOption) : option;
            },
            /**
             * 数据解码函数
             * @param data
             * @param mmChart
             * @returns {*}
             */
            decodeData: function (data, mmChart) {
                return MMChart.prototype.helpers.decodeData(data, this.type, false, mmChart);
            }
        },
        /**
         * 倒排柱形图
         */
        bar2: {
            type: 'bar',
            option: function (defaultOption) {
                if (this._option) {
                    return this._option = defaultOption ? $.extend(true, this._option, defaultOption) : this._option;
                }
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        show: true
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            interval: 0
                        }
                    }
                    ,
                    xAxis: {
                        type: 'value'
                    }
                };
                return this._option = defaultOption ? $.extend(true, option, defaultOption) : option;
            },
            decodeData: function (data, mmChart) {
                return MMChart.prototype.helpers.decodeData(data, this.type, true, mmChart);
            }
        },
        pie: {
            type: 'pie',
            option: function (defaultOption) {
                if (this._option) {
                    return this._option = defaultOption ? $.extend(true, this._option, defaultOption) : this._option;
                }
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        show: true,
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: []
                };
                return this._option = defaultOption ? $.extend(true, option, defaultOption) : option;

            },
            decodeData: function (data, mmChart) {
                return MMChart.prototype.helpers.decodePieData(data, this.type, mmChart);
            }

        },
        map: {
            type: 'map',
            name: 'china',
            option: function (defaultOption) {
                if (this._option) {
                    return this._option = defaultOption ? $.extend(true, this._option, defaultOption) : this._option;
                }
                var option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        show: true
                    },
                    series: []
                };
                return this._option = defaultOption ? $.extend(true, option, defaultOption) : option;
            },
            loadMap: function (options, callback) {
                var me = this;
                var mapData = echarts.getMap(me.name);
                if (mapData) {
                    callback(mapData);
                } else {
                    var url = options.ctx + options.chinaDataUrl;
                    $.getJSON(url, function (data) {
                        if (data) {
                            echarts.registerMap(me.name, data);
                        }
                        callback(data);
                    });
                }
            },
            decodeData: function (data, mmChart) {
                return MMChart.prototype.helpers.decodeMapData(data, this.type, mmChart);
            }
        }
    };
    $.mmEcharts.chartType = ChartType;

    $.mmEcharts.newChart = function (options) {
        return new MMChart(options);
    };

    /**
     * 判断是否是函数
     * @param obj
     * @returns {boolean}
     */
    function isFunction(obj) {
        return Object.prototype.toString.apply(obj) === "[object Function]";
    };

    function _registerHelper(namespace, name, fn) {
        var length = arguments.length;
        fn = arguments[length - 1];
        if (!isFunction(fn)) {
            throw new Error('this last  argument must be a function');
        }
        if (length == 3 && namespace) {//有命名空间
            if (!MMChart.prototype.helpers[namespace]) {
                MMChart.prototype.helpers[namespace] = {};
            }
            MMChart.prototype.helpers[namespace][name] = fn;
        } else {
            MMChart.prototype.helpers[namespace] = fn;
        }
    };

    /**
     * 注册自定义函数
     * @param namespace 命名空间
     * @param name 函数名称
     * @param fn 处理逻辑
     */
    $.mmEcharts.registerHelper = function (namespace, name, fn) {
        var length = arguments.length;
        if (length == 0) {
            throw new Error('arguments length must be >0');
        }
        var lastArg = arguments[length - 1];
        var functionName, isObj = lastArg.length === undefined;
        if (isObj) {
            namespace = length == 1 ? undefined : namespace;
            for (functionName in lastArg) {
                _registerHelper(namespace, functionName, lastArg[functionName]);
            }
        } else if (length == 2) {
            _registerHelper(namespace, lastArg);
        } else if (length == 3) {
            _registerHelper(namespace, name, lastArg);
        }
    };

    /**
     * 删除自定义函数
     * @param namespace 命名空间
     * @param name 函数名称
     */
    $.mmEcharts.unregisterHelper = function (namespace, name) {
        if (1 in arguments) {//有命名空间
            if (MMChart.prototype.helpers[namespace]) {
                MMChart.prototype.helpers[namespace][name] = undefined;
                delete MMChart.prototype.helpers[namespace][name];
            }
        } else {
            MMChart.prototype.helpers[namespace] = undefined;
            delete MMChart.prototype.helpers[namespace];
        }
    };

    /**
     *
     * @param data 图表数据
     * @param type 图表类
     * @param isHorizontal 是否 x 轴和y轴数据交换
     * @param mmChart
     * @returns {*}
     */
    function isRowCategory(data, type, isHorizontal, mmChart) {
        var legend = [], xAxisData = [], date, legendMap = {}, xAxisMap = {}, legendItem, series = [],
            o = mmChart.options;
        var groupField = o.groupField || "date";
        var categoryField = o.categoryField || "name";
        var valueField = o.categoryValueField || "value";
        if (data) {
            $.each(data, function (index, e) {
                date = e[groupField];
                if (!xAxisMap[date]) {
                    xAxisData.push(date);
                    xAxisMap[date] = {};
                }
                legendItem = e[categoryField];
                if (!legendMap[legendItem]) {
                    legend.push({name: legendItem});
                    legendMap[legendItem] = {};
                }
            });
            var value;
            $.each(legend, function (index, item) {
                var values = [];
                $.each(xAxisData, function (index, xAxis) {
                    var found = false;
                    $.each(data, function (index, e) {
                        date = e[groupField];
                        legendItem = e[categoryField];
                        value = e[valueField];
                        if (date == xAxis && item.name == legendItem) {
                            values.push(value);
                            found = true;
                        }
                    });
                    if (!found) {
                        values.push(0);
                    }

                });
                series.push({name: item.name, type: type, data: values});
            });

        } else {
            series.push({type: type, data: []});
        }
        if (isHorizontal) {
            return {
                legend: {
                    data: legend
                },
                yAxis: {
                    data: xAxisData
                },
                series: series
            };
        } else {
            return {
                legend: {
                    data: legend
                },
                xAxis: {

                    data: xAxisData
                },
                series: series
            };
        }

    };

    /**
     * 简单数据额解码
     * @param data 图表数据
     * @param type 图表类
     * @param isHorizontal 是否 x 轴和y轴数据交换
     * @param mmChart
     * @returns {*}
     */
    function simpleData(data, type, isHorizontal, mmChart) {
        var xAxisData = [], map = {}, series = [], legendData = [], o = mmChart.options;
        var groupField = o.groupField || "name";
        if (data && data.length > 0) {
            $.each(data, function (index, e) {
                $.each(e, function (key, value) {
                    if (key == groupField || key.toLowerCase() == groupField) {
                        xAxisData.push(value);
                    } else {
                        var keyName = o.valueFields ? o.valueFields[key] : key;
                        if (keyName) {
                            var itemData = map[keyName];
                            if (!itemData) {
                                itemData = {name: keyName, type: type, data: []};
                                map[keyName] = itemData;
                            }
                            itemData.data.push(value);
                        }
                    }
                });
            });
            $.each(map, function (key, value) {
                legendData.push(key);
                series.push(value);
            });
        } else {
            series.push({type: type, data: []});
        }
        if (isHorizontal) {
            return {
                legend: {
                    data: legendData
                },
                yAxis: {
                    splitLine: {
                        show: false
                    },
                    data: xAxisData
                },
                series: series
            };
        } else {
            return {
                legend: {
                    data: legendData
                },
                xAxis: {
                    splitLine: {
                        show: false
                    },
                    data: xAxisData
                },
                series: series
            };
        }
    };
    /**
     * line bar bar2数据解码
     */
    $.mmEcharts.registerHelper('decodeData', function (data, type, isHorizontal, mmChart) {

        if (mmChart.options.categoryField) {
            return isRowCategory(data, type, isHorizontal, mmChart)
        } else {
            return simpleData(data, type, isHorizontal, mmChart);
        }
    });
    /**
     * 饼状图数据解码
     */
    $.mmEcharts.registerHelper('decodePieData', function (data, type, mmChart) {
        var legendData = [], map = {}, series = [], o = mmChart.options;
        var groupField = o.groupField || "name";
        if (data && data.length > 0) {
            $.each(data, function (index, e) {
                $.each(e, function (key, value) {
                    if (key == groupField || key.toLowerCase() == groupField) {
                        legendData.push({name: value});
                    } else {
                        var keyName = o.valueFields ? o.valueFields[key] : key;
                        // var keyName=(o.valueFields&&o.valueFields[key])||key;
                        if (keyName) {
                            var itemData = map[keyName];
                            if (!itemData) {
                                itemData = {name: keyName, type: type, selectedMode: 'single', data: []};
                                map[keyName] = itemData;
                            }
							var groupName=e[groupField]||e[groupField.toUpperCase()];
                            itemData.data.push({name: groupName, value: value});
                        }
                    }
                });
            });
            $.each(map, function (key, value) {
                series.push(value);
            });
            var length = series.length;
            if (length > 1) {
                var first = series[0];
                first.labelLine = {
                    normal: {
                        show: false
                    }
                };
                first.label = {
                    normal: {
                        position: 'inner'
                    }
                };
                first.radius = [0, '40%'];
                var second = series[1];
                second.radius = ['60%', '90%'];
            }

        }
        return {
            legend: {
                data: legendData
            },
            series: series
        };
    });
    /**
     * 地图数据数据解码
     */
    $.mmEcharts.registerHelper('decodeMapData', function (data, type, mmChart) {
        var map = {}, min = 0, max = 0, series = [], legendData = [], o = mmChart.options;
        var groupField = o.groupField || "name";
        if (data && data.length > 0) {
            $.each(data, function (index, e) {
                $.each(e, function (key, value) {
                    if (key != groupField && key.toLowerCase() != groupField) {
                        var keyName = o.valueFields ? o.valueFields[key] : key;
                        if (keyName) {
                            var itemData = map[keyName];
                            if (!itemData) {
                                map[keyName] = itemData = {
                                    mapType: 'china',
                                    roam: false,
                                    label: {
                                        normal: {
                                            show: true
                                        },
                                        emphasis: {
                                            show: true
                                        }
                                    }, name: keyName, type: type, data: []
                                };
                            }
                            if (value < min) {
                                min = value;
                            }
                            if (value > max) {
                                max = value;
                            }
                            var groupName=e[groupField]||e[groupField.toUpperCase()];
                            itemData.data.push({name: groupName, value: value});
                        }

                    }
                });
            });

            $.each(map, function (key, value) {
                legendData.push({name: key});
                series.push(value);
            });

        } else {
            series.push({
                type: 'map', roam: false, mapType: 'china', data: [], label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                }
            });
        }
        return {
            visualMap: {
                min: min,
                max: max,
                range: null,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],           // 文本，默认为数值文本
                calculable: true
            },
            legend: {
                data: legendData
            },
            series: series
        };
    });
    //把列数据转换为行数据
    $.mmEcharts.registerHelper('columnToRowData', function (data, mmChart) {
        var result = [], map = {}, groupName, o = mmChart.options;
        var groupField = o.groupField || "name";
        if (data) {
            $.each(data, function (index, e) {
                $.each(e, function (key, value) {
                    if (key != groupField && key.toLowerCase() != groupField) {
                        var itemData = map[key];
                        if (!itemData) {
                            map[key] = itemData = {};
                        }
                        itemData.name = key;
                        itemData[e[groupField]] = value;
                    }
                });
            });
            $.each(map, function (index, e) {
                result.push(e);
            });
        }
        return result;
    });

})(jQuery);