if(!index_v5img){
	var index_v5img={};
}
function Percentage(number1, number2) { 
	var num=number1;
	var total=number2;
	return (Math.round(num / total * 10000) / 100.00 + "%");// 小数点后两位百分比
}
index_v5img={
	init:function(){
		$.ajax({//工单待办条数
			type: "POST",
			url:"http://10.213.98.77:18070/lvds/Achieve", 	
			dataType:'json',
			success: function(json){	
				$('.comdaiban em').text(json.data[1].READWORK+json.data[0].FINSHWORK);
				$('.comwancheng em').text(json.data[0].FINSHWORK);
				var myChart = echarts.init(document.getElementById('gdFinshed'));
				// var x=(json.data[0].FINSHWORK/(json.data[1].READWORK+json.data[0].FINSHWORK))*100+'%';
				var x=Percentage(json.data[0].FINSHWORK,json.data[1].READWORK+json.data[0].FINSHWORK);
				option = {
					tooltip: {
						show:false,
					},
					legend: {
						show:false,
					},
					grid:{
						y: 0,
					},
					animation: false,
					graphic:[{　　　　　　　　　　　　　　　　//环形图中间添加文字
				        type: 'text',　
				        left: 'center',　　　　　　　　　　
				        top: '30%',
				        style: {　　
				            text: x,
				            textAlign: 'center',
				            fill: '#fff',　　　　　　　　//文字的颜色
				            width: 30,
				            height: 30,
				            fontSize: 28,
				            color: "#fff",
				            fontFamily: "Impact"
				        }
				    }, {
				        type: 'text',
				        left: 'center',
				        top: '58%',
				        style: {
				            text: '整改率',
				            textAlign: 'center',
				            fill: 'rgba(255,255,255,0.6)',
				            width: 30,
				            height: 30,
				            fontSize: 18,
				        }
				    }],
					series: [{
						name: '整改率',
						type: 'pie',
						clockWise: true, //顺时加载
						radius: ['85%', '100%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
							},
						},
						itemStyle: {
							normal: {
								color: function(params) {
									var colorList = ['#107afe', '#fe6a10'];
									return colorList[params.dataIndex];
								}
							}
						},
						data: [{
								value: json.data[0].FINSHWORK,
								name: '完成工单'
							},
							{
								value: json.data[1].READWORK,
								name: '待办工单'
							},
						]
					}]
				};
				myChart.setOption(option);
				window.onresize = function(){
					myChart.resize();
				}
			}
		});	
		
// 		$.ajax({//流程图  缺陷
// 			type: "POST",
// 			url:"http://10.213.98.77:18070/lvds/sheet/workFlowqx?sheettype="+1, 	
// 			dataType:'json',
// 			success: function(json){	
// 				var data=json.data;
// 				console.log(data)
// 				for(var i=0;i<data.length;i++){
// 					if(data[i].taskname=='execute'){//执行
// 						$('.qxzx').html(data[i].amount);
// 					}else if(data[i].taskname=='review'){//审核
// 						$('.qxsh').html(data[i].amount);
// 					}else if(data[i].taskname=='notice'){//填报
// 						$('.qxtb').html(data[i].amount);
// 					}else if(data[i].taskname=='archive'){//归档
// 						$('.qxgd').html(data[i].amount);
// 					}else if(data[i].taskname=='alarm'){//归档
// 						$('.jsyc').html(data[i].amount);
// 					}
// 				}
// 			}
// 		});	
		
		$.ajax({//流程图  隐患
			type: "POST",
			url:"http://10.213.98.77:18070/lvds/sheet/workFlowqx?sheettype="+2, 	
			dataType:'json',
			success: function(json){	
				var data=json.data;
				for(var i=0;i<data.length;i++){
					if(data[i].taskname=='alarm'){//发现
						$('.yhfx').html(data[i].amount);
					}else if(data[i].taskname=='notice'){//填报
						$('.yhtb').html(data[i].amount);
					}else if(data[i].taskname=='review'){//审核
						$('.yhsh').html(data[i].amount);
					}else if(data[i].taskname=='execute'){//加入隐患库
						$('.jryhk').html(data[i].amount);
					}else if(data[i].taskname=='yharchive'){//归档
						$('.yhgd').html(data[i].amount);
					}
				}
			}
		});	
		
	
			
	},tableload:function(searchType){
		$.jgrid.defaults.styleUI = 'Bootstrap';
			//绑定表格数据
			$("#table_list").jqGrid({
				url : "http://10.213.98.77:18070/lvds/sheet/loadDataGrid?searchType="+searchType,
				datatype : "json",
				height : $(window).height() - 500,
				autowidth : false,
				shrinkToFit : true,
				multiselect : false,
				multiboxonly : true,
				rowNum:10,
				rowList : [ 10, 20, 30 ],
				root : "rows",
				colNames : [ '主键ID','流转单编号', '业务场景', '告警类别','问题环节','工单类型','任务环节'],
				colModel : [
					{name:'id',index:'id',hidden:true,},
					{name:'sheetno',index:'sheetno' ,width:240},
					{name:'bizscene',index:'bizscene' ,width:110},
					{name:'alarmdim',index:'alarmdim' ,width:110},
					{name:'bizsys',index:'bizsys' ,width:140},
					{name:'sheettype',index:'sheettype' ,width:140},
					{name:'taskname',index:'taskname' ,width:135},
				],
				sortable : true,
				pager : "#pager_list",
				viewrecords : true,
			});
		$("#pager_list_center").css("width","100%");
		$("#table_list").closest(".ui-jqgrid-bdiv").css({ "overflow" : "hidden" });
		$("#table_list").closest("#gview_table_list").css({ "overflow" : "hidden" });
	},tableload1:function(searchType){
		$.jgrid.defaults.styleUI = 'Bootstrap';
			//绑定表格数据
			$("#table_list1").jqGrid({
			url : "http://10.213.98.77:18070/lvds/sheet/loadDataGrid?searchType="+searchType,
			datatype : "json",
			height : $(window).height() - 500,
			autowidth : false,
			shrinkToFit : true,
			multiselect : false,
			multiboxonly : true,
			rowNum:10,
			rowList : [ 10, 20, 30 ],
			root : "rows",
			colNames : [ '主键ID','流转单编号', '业务场景', '告警类别','问题环节','工单类型','任务环节'],
			colModel : [
				{name:'id',index:'id',hidden:true,},
				{name:'sheetno',index:'sheetno' ,width:240},
				{name:'bizscene',index:'bizscene' ,width:110},
				{name:'alarmdim',index:'alarmdim' ,width:110},
				{name:'bizsys',index:'bizsys' ,width:140},
				{name:'sheettype',index:'sheettype' ,width:140},
				{name:'taskname',index:'taskname' ,width:135},
				],
			sortable : true,
			pager : "#pager_list1",
			viewrecords : true,
			});
		$("#pager_list1_center").css("width","100%"); 
		$("#table_list1").closest(".ui-jqgrid-bdiv").css({ "overflow" : "hidden" });
		$("#table_list1").closest("#gview_table_list1").css({ "overflow" : "hidden" });
	}
}
$(function () {
	  index_v5img.init();
	  $('.gdNum dt a').click(function(){
				var alist=$('.gdNum dt a');
				index=$(this).index();
				if(index==0){//待办工单
					$("#r1").show();
					index_v5img.tableload('readyworkbox');
					$("#r2").hide();
				}else if(index==1){//已完成工单
					$("#r2").show();
					index_v5img.tableload1('finshworkbox');
					$("#r1").hide();
					
				}
	 }) 
});