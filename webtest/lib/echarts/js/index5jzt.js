if(!index5jzt){
	var index5jzt={};
	var url = "http://10.213.98.77:18071/";
	//var url = "http://192.168.136.35:18071/";
}
index5jzt={
	init:function(){
			var list=$('.botbox').find('li');
			var divconbox=$('.bigbox').find('.conbox');
			$('.botbox li').click(function(){
					$('.bigbox').find('.conbox').hide();
					var index=$(this).index();
					SetCookie('ifindex',index);
					SetCookie('rightname',index);
					$('.listcont').removeClass('curcont');
					$(this).addClass('curcont');
					$('.bigbox').find('.conbox').eq(index).show();
			})
			
			$.ajax({//关键信息
				type: "post",
				url:url+"lvds/sheet/dataRoute", 	
				dataType:'json',
				success: function(json){	
					$(".ywgz").html(json.ywgz);
					$(".sjzy").html(json.sjzy);
					$(".jkxt").html(json.jkxt);
					$(".jksj").html(251686);
					$(".zbxx").html(json.zbxx);
				}
			});
	},loadsjzy:function(searchType){//涉及专业,
			$.jgrid.defaults.styleUI = 'Bootstrap';
				//绑定表格数据
				$("#table_listsjzy").jqGrid({
					url : url+"lvds/sheet/dataRouteDetail?searchType="+searchType,
					datatype : "json",
					height : $(window).height() - 500,
					autowidth : false,
					shrinkToFit : true,
					multiselect : false,
					multiboxonly : true,
					rowNum:10,
					rowList : [ 10, 20, 30 ],
					root : "rows",
					colNames : [ '专业ID','专业名称',],
					colModel : [
						{name:'org_id',index:'org_id' ,width:273},
						{name:'org_name',index:'org_name' ,width:273},
					],
					sortable : true,
					pager : "#pager_listsjzy",
					viewrecords : true,
				});
			$("#pager_listsjzy_center").css("width","100%");
			$("#table_listsjzy").closest(".ui-jqgrid-bdiv").css({ "overflow" : "hidden" });
			$("#table_listsjzy").closest("#gview_table_listsjzy").css({ "overflow" : "hidden" });
	},loadywgz:function(){//业务规则
		$.jgrid.defaults.styleUI = 'Bootstrap';
			//绑定表格数据
			$("#table_listywgz").jqGrid({
				url : url+"lvds/route/loadDataGrid",
				datatype : "json",
				height : $(window).height() - 500,
				autowidth : false,
				shrinkToFit : true,
				multiselect : false,
				multiboxonly : true,
				rowNum:10,
				rowList : [ 10, 20, 30 ],
				root : "rows",
				colNames : [ '数据项名称','起始系统','目标系统','中文字段名称','起始字段名称','目标字段名称','起始字段转换','目标字段转换','起始规则','目标规则','错误描述',],
				colModel : [
					{name:'item_name',index:'item_name' ,width:100},
					{name:'initial_system',index:'initial_system' ,width:100},
					{name:'target_system',index:'target_system' ,width:100},
					{name:'c_field',index:'c_field' ,width:100},
					{name:'initial_field',index:'initial_field' ,width:100},
					{name:'targat_field',index:'targat_field' ,width:100},
					{name:'initial_field_conversion',index:'initial_field_conversion' ,width:100},
					{name:'target_field_conversion',index:'target_field_conversion' ,width:100},
					{name:'initial_rule',index:'initial_rule' ,width:100},
					{name:'target_rule',index:'target_rule' ,width:100},
					{name:'error_description',index:'error_description' ,width:100}, 
				],
				sortable : true,
				pager : "#pager_listywgz",
				viewrecords : true,
			});
			$("#pager_listywgz_center").css("width","100%");
			$("#table_listywgz").closest(".ui-jqgrid-bdiv").css({ "overflow" : "hidden" });
			$("#table_listywgz").closest("#gview_table_listywgz").css({ "overflow" : "hidden" });
	},loadzbxx:function(){//指标信息
		$.jgrid.defaults.styleUI = 'Bootstrap';
			//绑定表格数据
			$("#table_listzbxx").jqGrid({
				url : url+"lvds/kpi/loadDataGrid",
				datatype : "json",
				height : $(window).height() - 500,
				autowidth : true,
				shrinkToFit : true,
				multiselect : false,
				multiboxonly : true,
				rowNum:10,
				rowList : [ 10, 20, 30 ],
				root : "rows",
				colNames : [ '评价主题','指标等级','指标名称','指标内容','计算公式及解释','分值'],
				colModel : [
					{name:'pjzt',index:'pjzt' ,width:100},
					{name:'zbdj',index:'zbdj' ,width:100},
					{name:'zbmc',index:'zbmc' ,width:100},
					{name:'zbnr',index:'zbnr' ,width:100},
					{name:'jsgs',index:'jsgs' ,width:100},
					{name:'fz',index:'fz' ,width:100},
				],
				sortable : true,
				pager : "#pager_listzbxx",
				viewrecords : true,
			});
			$("#pager_listzbxx_center").css("width","100%");
			$("#table_listzbxx").closest(".ui-jqgrid-bdiv").css({ "overflow" : "hidden" });
			$("#table_listzbxx").closest("#gview_table_listzbxx").css({ "overflow" : "hidden" });
	},loadjkxt:function(searchType){//监控系统
		$.jgrid.defaults.styleUI = 'Bootstrap';
			//绑定表格数据
			$("#table_listjkxt").jqGrid({
				url : url+"lvds/sheet/dataRouteDetail?searchType="+searchType,
				datatype : "json",
				height : $(window).height() - 500,
				autowidth : false,
				shrinkToFit : true,
				multiselect : false,
				multiboxonly : true,
				rowNum:10,
				rowList : [ 10, 20, 30 ],
				root : "rows",
				colNames : [ '系统编码','系统名称'],
				colModel : [
					{name:'system_code',index:'system_code' ,width:273},
					{name:'system_name',index:'system_name' ,width:273},
				],
				sortable : true,
				pager : "#pager_listjkxt",
				viewrecords : true,
			});
			$("#pager_listjkxt_center").css("width","100%");
			$("#table_listjkxt").closest(".ui-jqgrid-bdiv").css({ "overflow" : "hidden" });
			$("#table_listjkxt").closest("#gview_table_listjkxt").css({ "overflow" : "hidden" });
	},loadjksj:function(searchType){//监控数据
		$.jgrid.defaults.styleUI = 'Bootstrap';
			//绑定表格数据
			$("#table_listjksj").jqGrid({
				url : url+"lvds/monit/loadDataGrid",
				datatype : "json",
				height : $(window).height() - 500,
				autowidth : true,
				shrinkToFit : true,
				multiselect : false,
				multiboxonly : true,
				rowNum:10,
				rowList : [ 10, 20, 30 ],
				root : "rows",
				colNames : [ '业务系统','原系统用户', '数据项', '告警类别','部门名称' ,'系统名称',],
				colModel : [
					{name:'bizsys',index:'bizsys' ,width:100},
					{name:'dbuser',index:'dbuser' ,width:100},
					{name:'tabcnname',index:'tabcnname' ,width:100},
					{name:'alarmdim',index:'alarmdim' ,width:100},
					{name:'deptname',index:'deptname' ,width:100},
					{name:'system_name',index:'system_name' ,width:100},
				],
				sortable : true,
				pager : "#pager_listjksj",
				viewrecords : true,
			});
			$("#pager_listjksj_center").css("width","100%");
			$("#table_listjksj").closest(".ui-jqgrid-bdiv").css({ "overflow" : "hidden" });
			$("#table_listjksj").closest("#gview_table_listjksj").css({ "overflow" : "hidden" });
	}
}

$(function () {
	  index5jzt.init();
	 $('#comulbox li').click(function(){
			index=$(this).index();
			if(index==1){
				$("#sjzy").show();
				index5jzt.loadsjzy('sjzy');
				$("#ywgz").hide();
				$("#zbxx").hide();
				$("#jkxt").hide();
				$("#jksj").hide();
			}else if(index==0){
				$("#ywgz").show();
				index5jzt.loadywgz();
				$("#sjzy").hide();
				$("#zbxx").hide();
				$("#jkxt").hide();
				$("#jksj").hide();
			}else if(index==4){//指标信息
				$("#zbxx").show();
				index5jzt.loadzbxx();
				$("#sjzy").hide();
				$("#ywgz").hide();
				$("#jkxt").hide();
				$("#jksj").hide();
			}else if(index==2){//监控系统
				$("#jkxt").show();
				index5jzt.loadjkxt('jkxt');
				$("#sjzy").hide();
				$("#ywgz").hide();
				$("#zbxx").hide();
				$("#jksj").hide();
			}else if(index==3){//监控数据
				$("#jksj").show();
				index5jzt.loadjksj();
				$("#jkxt").hide();
				$("#sjzy").hide();
				$("#ywgz").hide();
				$("#zbxx").hide();
			}
	 }) 
	 
	 $('#ytsbsA').click(function(){//已贴签设备数
		$.jgrid.gridUnload("table_listytqsbs");
		var cityName = document.getElementById("cityName").value;
		var searchType = document.getElementById("searchType").value;
		loadytqsbs(cityName , searchType);
		$("#ytqsbs").show();
	 });
	 
	 $('#yzssbsA').click(function(){//已追溯设备数
		$.jgrid.gridUnload("table_listyzssbs");
		var cityName = document.getElementById("cityName1").value;
		var searchType = document.getElementById("searchType1").value;
		loadyzssbs(cityName , searchType);
		$("#yzssbs").show();
	 });
	 
});


function loadytqsbs(dataName , searchType){//已贴签设备数
		var reuqestMethod = "lvds/getYtqDataList";
		
		if(searchType == 1) {
			reuqestMethod = "lvds/getYtqDataList";
		} else {
			reuqestMethod = "lvds/getYtqDataListByDevice";
		}
		$.jgrid.defaults.styleUI = 'Bootstrap';
			//绑定表格数据
			$("#table_listytqsbs").jqGrid({
				url : url+ reuqestMethod,
				mtype: 'POST',
				postData:{dataName:dataName},
				datatype : "json",
				height : $(window).height() - 500,
				autowidth : true,
				shrinkToFit : true,
				multiselect : false,
				multiboxonly : true,
				rowNum:10,
				rowList : [ 10, 20, 30 ],
				root : "rows",
				colNames : [ '序号','单位', '市公司', '变电站/线路名称','设备类型' ,'电压等级','电压等级','贴签数量'],
				colModel : [
					{name:'ID',index:'ID' ,width:90},
					{name:'DEPT_NAME',index:'DEPT_NAME' ,width:150},
					{name:'COMPANY_NAME',index:'COMPANY_NAME' ,width:200},
					{name:'LINE_NAME',index:'LINE_NAME' ,width:280},
					{name:'DEVICE_NAME',index:'DEVICE_NAME' ,width:140},
					{name:'DEVICE_TYPE',index:'DEVICE_TYPE' ,width:140},
					{name:'ELC_LEVEL',index:'ELC_LEVEL' ,width:100},
					{name:'TQ_COUNT',index:'TQ_COUNT' ,width:100},
				],
				sortable : true,
				pager : "#pager_listytqsbs",
				viewrecords : true,
			}).trigger('reloadGrid');
			$("#pager_listytqsbs_center").css("width","100%");
			$("#table_listytqsbs").closest(".ui-jqgrid-bdiv").css({ "overflow" : "hidden" });
			$("#table_listytqsbs").closest("#gview_table_listytqsbs").css({ "overflow" : "hidden" });
}

function loadyzssbs(dataName , searchType){//已追溯设备数
		var reuqestMethod = "lvds/getSjzsDataListByCity";
		
		if(searchType == 1) {
			reuqestMethod = "lvds/getSjzsDataListByCity";
		} else {
			reuqestMethod = "lvds/getSjzsDataListByDevice";
		}

		$.jgrid.defaults.styleUI = 'Bootstrap';
			//绑定表格数据
			$("#table_listyzssbs").jqGrid({
				url : url+ reuqestMethod,
				mtype: 'POST',
				postData:{dataName:dataName},
				datatype : "json",
				height : $(window).height() - 500,
				autowidth : true,
				shrinkToFit : true,
				multiselect : false,
				multiboxonly : true,
				rowNum:10,
				rowList : [ 10, 20, 30 ],
				root : "rows",
				colNames : ['序号','实物ID','PMS设备编码','PMS设备描述','所属地市','运行单位编码','运行单位名称','所属站房线路ID','所属站房/线路','投运日期','PM编码','ERP设备编号','设备描述','设备状态','设备类型','设备类型名称','开始日期','制造厂商','型号','ERP维护工厂','维护工厂名称','功能位置','功能位置描述','资产性质','使用保管部门','使用保管部门描述','实物管理部门','实物管理部门描述','电压等级','设备增加方式','设备增加方式描述','资产编号','资产原值','采购订单','行项目','记录的创建日期','物料组','物料组描述','物资编码','物资描述','项目定义','项目描述','WBS元素','WBS描述','项目立项时间','验收时间','创建日期'],
				colModel : [
					{name:'ID',index:'ID' ,width:90},
					{name:'SWID',index:'SWID' ,width:150},
					{name:'PMS_CODE',index:'PMS_CODE' ,width:200},
					{name:'PMS_DESC',index:'PMS_DESC' ,width:280},
					{name:'CITY_NAME',index:'CITY_NAME' ,width:140},
					{name:'DEPT_CODE',index:'DEPT_CODE' ,width:140},
					{name:'DEPT_NAME',index:'DEPT_NAME' ,width:100},
					{name:'LINE_ID',index:'LINE_ID' ,width:100},
					{name:'LINE_NAME',index:'LINE_NAME' ,width:100},
					{name:'USER_DATE',index:'USER_DATE' ,width:100},
					
					{name:'PM_CODE',index:'PM_CODE' ,width:100},
					{name:'ERP_CODE',index:'ERP_CODE' ,width:100},
					{name:'DEVICE_DESC',index:'DEVICE_DESC' ,width:100},
					{name:'DEVICE_STATUS',index:'DEVICE_STATUS' ,width:100},
					{name:'DEVICE_TYPE',index:'DEVICE_TYPE' ,width:100},
					{name:'DEVICE_TYPE_NAME',index:'DEVICE_TYPE_NAME' ,width:100},
					{name:'BEGIN_DATE',index:'BEGIN_DATE' ,width:100},
					{name:'BUILD_COMPANY',index:'BUILD_COMPANY' ,width:100},
					{name:'MODEL_CODE',index:'MODEL_CODE' ,width:100},
					{name:'ERP_COMPANY',index:'ERP_COMPANY' ,width:100},
					
					{name:'COMPLAY_NAME',index:'COMPLAY_NAME' ,width:100},
					{name:'FUNCTION_POSITION',index:'FUNCTION_POSITION' ,width:100},
					{name:'FUNCITON_DESC',index:'FUNCITON_DESC' ,width:100},
					{name:'ASSETS_NATURE',index:'ASSETS_NATURE' ,width:100},
					{name:'KEEP_DEPT',index:'KEEP_DEPT' ,width:100},
					{name:'KEEP_DESC',index:'KEEP_DESC' ,width:100},
					{name:'MANAGER_DEPT',index:'MANAGER_DEPT' ,width:100},
					{name:'MANAGER_DEPT_DESC',index:'MANAGER_DEPT_DESC' ,width:100},
					{name:'ELC_LEVEL',index:'ELC_LEVEL' ,width:100},
					{name:'DEVICE_ADD',index:'DEVICE_ADD' ,width:100},
					
					{name:'DEVICE_ADD_DESC',index:'DEVICE_ADD_DESC' ,width:100},
					{name:'ASSETS_CODE',index:'ASSETS_CODE' ,width:100},
					{name:'ASSETS_SOURCE',index:'ASSETS_SOURCE' ,width:100},
					{name:'PURCHASE_ORDER',index:'PURCHASE_ORDER' ,width:100},
					{name:'PROJECT',index:'PROJECT' ,width:100},
					{name:'RECORE_CREATE',index:'RECORE_CREATE' ,width:100},
					{name:'MATTER_GROUP',index:'MATTER_GROUP' ,width:100},
					{name:'MATTER_GROUP_DESC',index:'MATTER_GROUP_DESC' ,width:100},
					{name:'MATTER_CODE',index:'MATTER_CODE' ,width:100},
					{name:'MATTER_DESC',index:'MATTER_DESC' ,width:100},
					
					{name:'PROJECT_DEFINE',index:'PROJECT_DEFINE' ,width:100},
					{name:'PROJECT_DESC',index:'PROJECT_DESC' ,width:100},
					{name:'WBS_CODE',index:'WBS_CODE' ,width:100},
					{name:'WEB_DESC',index:'WEB_DESC' ,width:100},
					{name:'PROJECT_TIME',index:'PROJECT_TIME' ,width:100},
					{name:'CHECK_TIME',index:'CHECK_TIME' ,width:100},
					{name:'CREATE_TIME',index:'CREATE_TIME' ,width:100}
				],
				sortable : true,
				pager : "#pager_listyzssbs",
				viewrecords : true,
			}).trigger('reloadGrid');
			$("#pager_listyzssbs_center").css("width","100%");
			$("#table_listyzssbs").closest(".ui-jqgrid-bdiv").css({ "overflow" : "hidden" });
			$("#table_listyzssbs").closest("#gview_table_listyzssbs").css({ "overflow" : "hidden" });
}