/**
 * 入口文件
 */
layui.config({
    base: 'modules/'
}).use('myIndex'); //加载入口


/**
 * 引用layui中的各模块组件
 * 这些组件会在使用时自动引入。
 */
// layui.use(['layer', 'form'], function () {
//     var layer = layui.layer, form = layui.form;
// });


// ;!function () {
//     var form = layui.form;
//     var layer = layui.layer;
//     var carousel = layui.carousel;
//     var code = layui.code;
//     var colorpicker = layui.colorpicker;
//     var element = layui.element;
//     var flow = layui.flow;
//     var laydate = layui.laydate;
//     var layedit = layui.layedit;
//     var laypage = layui.laypage;
//     var laytpl = layui.laytpl;
//     var mobile = layui.mobile;
//     var rate = layui.rate;
//     var slider = layui.slider;
//     var table = layui.table;
//     var tree = layui.layer;
//     var upload = layui.upload;
//     var util = layui.util;
// }();