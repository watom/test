if (!indexright) {
	var indexright = {};
}
indexright = {
	myChart1: {}, //本月各单位数据异常统计
	rowstotal:'',
	initswzc: function() {//实物资产
		indexright.myChart1 = echarts.init(document.getElementById("echarts-hxt-jctj"));
		option = {
			tooltip: {
				trigger: 'item',
				formatter: function(params) {
					if (params.indicator2) { // is edge
						return params.indicator2 + ' ' + params.name + ' ' + params.indicator;
					} else { // is node
						return params.name
					}
				}
			},
			legend: {
				x: 50,
				y:70,
				data: [
					{
						name:'设备专业',
						icon:'image://img/oristar.png'	
					}
				],
				textStyle: {
					color: '#fff',
					fontSize:24,
				}
			},
			series: [{
				type: 'chord',
				sort: 'ascending',
				sortSub: 'descending',
				ribbonType: false,
			    radius: ['65%','65%'],
				center: ['50%', '48%'],
				itemStyle: {
					normal: {
						label: {
							rotate: true,
							textStyle: {
								fontSize: 20,
								color: '#fff'
							}
						},
						chordStyle: {
							width: 2,
							color: '#00ffff'
						},
						borderColor: '#fff',
						borderWidth: 2,
					}
				},
				minRadius: 12,
				maxRadius: 20,
				// 使用 nodes links 表达和弦图
				nodes: [{
						name: '隔离开关'
					},
					{
						name: '避雷器'
					},
					{
						name: '站用变'
					},
					{
						name: '电容器'
					},
					{
						name: '接地变'
					},
					{
						name: '消弧线圈'
					},
					{
						name: '开关柜'
					},
					{
						name: '环网柜'
					},
					{
						name: '主变压器'
					},
					{
						name: '配电变压器'
					},
					{
						name: '电流互感器'
					},
					{
						name: '耦合电容器'
					},
					{
						name: '电压互感器'
					},
					{
						name: '断路器'
					},
					{
						name: '组合电器'
					},
					{
						name: '电抗器'
					},
					{
						name: '电力电容器'
					},
					{
						name: '设备专业',
						 symbol: 'star'
					},
				],
				links: [{
						source: '设备专业',
						target: '隔离开关',
						weight: 4,
						name: '属于',
					},
					{
						source: '设备专业',
						target: '避雷器',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '站用变',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '电容器',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '接地变',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '消弧线圈',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '开关柜',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '环网柜',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '主变压器',
						weight: 4,
						name: '属于',
					},
					{
						source: '设备专业',
						target: '配电变压器',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '电流互感器',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '耦合电容器',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '电流互感器',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '断路器',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '组合电器',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '电抗器',
						weight: 4,
						name: '属于'
					},
					{
						source: '设备专业',
						target: '电力电容器',
						weight: 4,
						name: '属于'
					}
				],
			}]
		};
		indexright.myChart1.setOption(option);
		indexright.myChart1.on('click', function(param) {
			if(param.name=='耦合电容器'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>耦合电容器</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>T_SB_ZNYC_OHDRQ</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>PMS</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/01 18:07:49</li>'+
							'<li><span>创建时间 : </span>2014/7/23 17:23:53</li>'+
							'<li><span>记录数 : </span>1031</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>耦合电容器</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=675" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>耦合电容器</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_TFCoCapacitorInfo</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_OHDRQ</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
							
							indexright.myChart1.setOption(option);
					}
				})
				$("#addeacherwin").show();
			}else if(param.name=='环网柜'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>环网柜</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>T_SB_ZNYC_ZNHWG</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>PMS</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/07  22:28:39</li>'+
							'<li><span>创建时间 : </span>2015/7/6  17:23:45</li>'+
							'<li><span>记录数 : </span>10947</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>环网柜</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=659" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>环网柜</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_TERMUInfo</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_ZNHWG</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
					}
				})
				
				$("#addeacherwin").show();
			}else if(param.name=='开关柜'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
						$.ajax({
							type:'post',
							url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
							success: function(json){	
									indexright.rowstotal=json.pageCount;
							},
						})
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>开关柜</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
								'<ul class="ulbox">'+
								'<li><span>元模型 : </span>表</li>'+
								'<li><span>名称 : </span>T_SB_ZNYC_KGG</li>'+
								'<li><span>生命周期状态 : </span>已发布</li>'+
								'<li><span>表所有者 : </span>数据中心、电能质量</li>'+
								'<li><span>所属表空间 : </span>PMS</li>'+
								'<li><span>最后数据更新时间 : </span>2019/02/28  22:23:32</li>'+
								'<li><span>创建时间 : </span>2015/7/5  14:24:35</li>'+
								'<li><span>记录数 : </span>19311</li>'+
								'<li><span>是否系统表 : </span>否</li>'+
								'<li><span>是否临时表 : </span>否</li>'+
								'<li><span>别名 : </span>开关柜</li>'+
								'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
								'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=634" frameborder=0></iframe></div>'+'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=634" frameborder=0></iframe></div>'+
								'</ul></div>';
								$('#tab-2').html(tab2html);
								
								var tab3html='<div class="panel-body">'+
								'<ul class="ulbox3">'+
								'<li><span>数据名称 : </span>开关柜</li>'+
								'<li><span>国网公司模型 : </span>DWD_Ast_TFSwitchCabinetinfo</li>'+
								'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_KGG</li>'+
								'<li><span>是否遵从 : </span>是</li>'+
								'</ul></div>';
								$('#tab-3').html(tab3html);
							}
					})
				$("#addeacherwin").show();
			
			}else if(param.name=='组合电器'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>组合电器</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>t_sb_znyc_zhdq</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>PMS</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/02/28  22:06:06</li>'+
							'<li><span>创建时间 : </span>2015/7/4  17:24:30</li>'+
							'<li><span>记录数 : </span>1300</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>组合电器</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=738" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>组合电器</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_DSCuTInfo</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_BPBJ_ZHDQ</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='避雷器'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>避雷器</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>T_SB_ZNYC_BLQ</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>PMS</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/03  22:27:51</li>'+
							'<li><span>创建时间 : </span>2015/7/4  17:11:45</li>'+
							'<li><span>记录数 : </span>37368</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>避雷器</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=562" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>避雷器</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_TFSGSurgeArrestInfo</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_BLQ</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='电抗器'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>电抗器</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>t_sb_znyc_dkq</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>PMS</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/02  22:17:59</li>'+
							'<li><span>创建时间 : </span>2015/7/4  17:12:33</li>'+
							'<li><span>记录数 : </span>2773</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>电抗器</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=579" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>电抗器</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_DSCuTInfo</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_DKQ</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='断路器'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>断路器</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>T_SB_ZNYC_DLQ</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>PMS</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/02/27  22:31:24</li>'+
							'<li><span>创建时间 : </span>2015/7/4  17:13:44</li>'+
							'<li><span>记录数 : </span>36430</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>断路器</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=588" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>断路器</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_TFSGBreakerInfo</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_DLQ</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='消弧线圈'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>消弧线圈</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>T_SB_ZNYC_XHZZ</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>PMS</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/01  22:28:36</li>'+
							'<li><span>创建时间 : </span>2015/7/5  14:37:26</li>'+
							'<li><span>记录数 : </span>1992</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>消弧线圈</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=593" frameborder=0></iframe></div>'+
							'</ul></div>';;
							$('#tab-2').html(tab2html);
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>消弧线圈</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_TFArcCoilInfo</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_XHZZ</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='配电变压器'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>配电变压器</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>T_SB_ZNYC_PDBYQ</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>PMS</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/02  22:27:11</li>'+
							'<li><span>创建时间 : </span>2015/6/4  17:23:56</li>'+
							'<li><span>记录数 : </span>5166</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>配电变压器</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=679" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>配电变压器</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_DSEquipAsset</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_PDBYQ</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
							
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='电容器'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>电容器</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>T_SB_ZNYC_DLDRQ</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>PMS</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/02/26  22:35:50</li>'+
							'<li><span>创建时间 : </span>2015/7/14  17:24:13</li>'+
							'<li><span>记录数 : </span>2713</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>电容器</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=735" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>电容器</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_TFCapacitorinfo</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_DLDRQ</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='站用变'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>站用变</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>T_SB_ZNYC_BLQ</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>PMS</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/01  22:29:38</li>'+
							'<li><span>创建时间 : </span>2015/7/5  15:07:52</li>'+
							'<li><span>记录数 : </span>172</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>站用变</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=566" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>站用变</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_TFSGSurgeArrestInfo</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_BLQ</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='电流互感器'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>电流互感器</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>T_SB_ZNYC_DLHGQ</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>PMS</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/02  22:28:02</li>'+
							'<li><span>创建时间 : </span>2015/12/4  17:12:43</li>'+
							'<li><span>记录数 : </span>47614</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>电流互感器</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=586" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
							
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>电流互感器</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_DSCuTInfo</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_DLHGQ</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
					},
				})
			
				$("#addeacherwin").show();
			
			}else if(param.name=='隔离开关'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>隔离开关</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>T_SB_ZNYC_GLKG</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>数据中心、电能质量</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/04  22:28:42</li>'+
							'<li><span>创建时间 : </span>2015/9/28  15:49:47</li>'+
							'<li><span>记录数 : </span>78135</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>隔离开关</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
								'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=623" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>隔离开关</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_TFKnifeSwitchInfo</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_GLKG</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='电压互感器'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
									var tab1html='<div class="panel-body">'+
								'<ul class="ulbox">'+
								'<li><span>数据名称 : </span>电压互感器</li>'+
								'<li><span>所属专业 : </span>设备专业</li>'+
								'<li><span>权威数据源 : </span>PMS</li>'+
								'<li><span>共享系统 : </span>ERP</li>'+
								'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
								'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
								'<li><span>数据类型 : </span>设备台账类</li>'+
								'<li><span>是否主数据 : </span>是</li>'+
								'<li><span>使用频度 : </span>实时</li>'+
								'</ul></div>';
								$('#tab-1').html(tab1html);
								
							var tab2html='<div class="panel-body">'+
								'<ul class="ulbox">'+
								'<li><span>元模型 : </span>表</li>'+
								'<li><span>名称 : </span>t_sb_znyc_dyhgq</li>'+
								'<li><span>生命周期状态 : </span>已发布</li>'+
								'<li><span>表所有者 : </span>PMS</li>'+
								'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
								'<li><span>最后数据更新时间 : </span>2019/03/02  22:27:33</li>'+
								'<li><span>创建时间 : </span>2015/7/4  17:21:01</li>'+
								'<li><span>记录数 : </span>15795</li>'+
								'<li><span>是否系统表 : </span>否</li>'+
								'<li><span>是否临时表 : </span>否</li>'+
								'<li><span>别名 : </span>电压互感器</li>'+
								'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
								'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=604" frameborder=0></iframe></div>'+
								'</ul></div>';
								$('#tab-2').html(tab2html);
								
								var tab3html='<div class="panel-body">'+
								'<ul class="ulbox3">'+
								'<li><span>数据名称 : </span>电压互感器</li>'+
								'<li><span>国网公司模型 : </span>DWD_Ast_TFPTinfo</li>'+
								'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_DYHGQ</li>'+
								'<li><span>是否遵从 : </span>是</li>'+
								'</ul></div>';
								$('#tab-3').html(tab3html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='主变压器'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
									var tab1html='<div class="panel-body">'+
								'<ul class="ulbox">'+
								'<li><span>数据名称 : </span>主变压器</li>'+
								'<li><span>所属专业 : </span>设备专业</li>'+
								'<li><span>权威数据源 : </span>PMS</li>'+
								'<li><span>共享系统 : </span>ERP</li>'+
								'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
								'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
								'<li><span>数据类型 : </span>设备台账类</li>'+
								'<li><span>是否主数据 : </span>是</li>'+
								'<li><span>使用频度 : </span>实时</li>'+
								'</ul></div>';
								$('#tab-1').html(tab1html);
								
							var tab2html='<div class="panel-body">'+
								'<ul class="ulbox">'+
								'<li><span>元模型 : </span>表</li>'+
								'<li><span>名称 : </span>T_SB_ZNYC_ZBYQ</li>'+
								'<li><span>生命周期状态 : </span>已发布</li>'+
								'<li><span>表所有者 : </span>PMS</li>'+
								'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
								'<li><span>最后数据更新时间 : </span>2019/03/03  22:21:35</li>'+
								'<li><span>创建时间 : </span>2015/9/16  17:24:16</li>'+
								'<li><span>记录数 : </span>2743</li>'+
								'<li><span>是否系统表 : </span>否</li>'+
								'<li><span>是否临时表 : </span>否</li>'+
								'<li><span>别名 : </span>主变压器</li>'+
								'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
									'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=566" frameborder=0></iframe></div>'+
								'</ul></div>';
								$('#tab-2').html(tab2html);
								
								var tab3html='<div class="panel-body">'+
								'<ul class="ulbox3">'+
								'<li><span>数据名称 : </span>主变压器</li>'+
								'<li><span>国网公司模型 : </span>DWD_Ast_TFMainTransformerInfo</li>'+
								'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_ZBYQ</li>'+
								'<li><span>是否遵从 : </span>是</li>'+
								'</ul></div>';
								$('#tab-3').html(tab3html);
					},
				})
					
				$("#addeacherwin").show();
			}else if(param.name=='接地变'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>接地变</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>T_SB_ZNYC_DLDRQ</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>PMS</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/01 16:06:42</li>'+
							'<li><span>创建时间 : </span>2013/6/13 11:23:50</li>'+
							'<li><span>记录数 : </span>372</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>接地变</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
						'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=578" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>接地变</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_TFCapacitorinfo</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_DLDRQ</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='电力电容器'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>电力电容器</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>PMS</li>'+
							'<li><span>共享系统 : </span>ERP</li>'+
							'<li><span>共享专业 : </span>财务专业、物资专业</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>T_SB_ZNYC_DLDRQ</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>PMS</li>'+
							'<li><span>所属表空间 : </span>TS_SBTZ</li>'+
							'<li><span>最后数据更新时间 : </span>2019/02/28 10:33:53</li>'+
							'<li><span>创建时间 : </span>2014/10/9 10:25:43</li>'+
							'<li><span>记录数 : </span>975</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>电力电容器</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=213" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
							
							var tab3html='<div class="panel-body">'+
							'<ul class="ulbox3">'+
							'<li><span>数据名称 : </span>电力电容器</li>'+
							'<li><span>国网公司模型 : </span>DWD_Ast_TFCapacitorinfo</li>'+
							'<li><span>甘肃公司模型 : </span>T_SB_ZNYC_DLDRQ</li>'+
							'<li><span>是否遵从 : </span>是</li>'+
							'</ul></div>';
							$('#tab-3').html(tab3html);
					},
				})
			
				$("#addeacherwin").show();
			
			}else if(param.name=='电网电压'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>电网电压</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>OMS</li>'+
							'<li><span>共享系统 : </span>数据中心、电能质量</li>'+
							'<li><span>共享专业 : </span>安质部</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>运行类数据</li>'+
							'<li><span>是否主数据 : </span>否</li>'+
							'<li><span>使用频度 : </span>小时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>MWT_UD_DNZL_DWDYSJ</li>'+
							'<li><span>生命周期状态 : </span>OMS</li>'+
							'<li><span>表所有者 : </span>mw_app</li>'+
							'<li><span>所属表空间 : </span>MWS_APP</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/04 11:07:06</li>'+
							'<li><span>创建时间 : </span>2013/6/13 11:23:51</li>'+
							'<li><span>记录数 : </span>2426081</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>电网电压</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=369" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='调度变压器'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>调度变压器</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>OMS</li>'+
							'<li><span>共享系统 : </span>数据中心、电能质量</li>'+
							'<li><span>共享专业 : </span>安质部</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>月</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>MWT_UD_DNZL_ZBSB</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>mw_app</li>'+
							'<li><span>所属表空间 : </span>MWS_APP</li>'+
							'<li><span>最后数据更新时间 : </span>2019/02/28 15:06:46</li>'+
							'<li><span>创建时间 : </span>2013/6/13 11:23:50</li>'+
							'<li><span>记录数 : </span>193</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>调度变压器</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
								'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=572" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='母线切换状态'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>母线切换状态</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>OMS</li>'+
							'<li><span>共享系统 : </span>数据中心、电能质量</li>'+
							'<li><span>共享专业 : </span>安质部</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>否</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>MWT_UD_DNZL_MXZTQHSJ1</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>mw_app</li>'+
							'<li><span>所属表空间 : </span>MWS_APP</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/02 18:14:00</li>'+
							'<li><span>创建时间 : </span>2014/10/9 10:22:01</li>'+
							'<li><span>记录数 : </span>696</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>母线切换状态</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=265" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='线路切换状态'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>线路切换状态</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>OMS</li>'+
							'<li><span>共享系统 : </span>电能质量</li>'+
							'<li><span>共享专业 : </span>安质部</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>否</li>'+
							'<li><span>使用频度 : </span>实时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>MWT_UD_DNZL_JKXLQHSJ1</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>mw_app</li>'+
							'<li><span>所属表空间 : </span>MWS_APP</li>'+
							'<li><span>最后数据更新时间 : </span>2019/02/28 10:33:53</li>'+
							'<li><span>创建时间 : </span>2014/10/9 10:23:57</li>'+
							'<li><span>记录数 : </span>1227</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>线路切换状态</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
								'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=484" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='调度母线'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>调度母线</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>OMS</li>'+
							'<li><span>共享系统 : </span>数据中心、电能质量</li>'+
							'<li><span>共享专业 : </span>安质部</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>是</li>'+
							'<li><span>使用频度 : </span>月</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>MWT_UD_DNZL_MXSB</li>'+
							'<li><span>生命周期状态 : </span>OMS</li>'+
							'<li><span>表所有者 : </span>mw_app</li>'+
							'<li><span>所属表空间 : </span>MWS_APP</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/04 15:06:46</li>'+
							'<li><span>创建时间 : </span>2013/6/13 11:23:50</li>'+
							'<li><span>记录数 : </span>519</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>调度母线</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
						'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=576" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
					},
				})
				
				$("#addeacherwin").show();
			
			}else if(param.name=='电网频率'){
				$.ajax({
					type:'post',
					url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+param.name,
					success: function(json){	
							indexright.rowstotal=json.pageCount;
							var tab1html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>数据名称 : </span>电网频率</li>'+
							'<li><span>所属专业 : </span>设备专业</li>'+
							'<li><span>权威数据源 : </span>OMS</li>'+
							'<li><span>共享系统 : </span>数据中心、电能质量</li>'+
							'<li><span>共享专业 : </span>安质部</li>'+
							'<li><span>业务规则数 : </span><a data-toggle="modal" href="indexuseright.html#modal-form">'+indexright.rowstotal+'</a></li>'+
							'<li><span>数据类型 : </span>设备台账类</li>'+
							'<li><span>是否主数据 : </span>否</li>'+
							'<li><span>使用频度 : </span>小时</li>'+
							'</ul></div>';
							$('#tab-1').html(tab1html);
							
							var tab2html='<div class="panel-body">'+
							'<ul class="ulbox">'+
							'<li><span>元模型 : </span>表</li>'+
							'<li><span>名称 : </span>MWT_UD_DNZL_DWPDSJ</li>'+
							'<li><span>生命周期状态 : </span>已发布</li>'+
							'<li><span>表所有者 : </span>mw_app</li>'+
							'<li><span>所属表空间 : </span>MWS_APP</li>'+
							'<li><span>最后数据更新时间 : </span>2019/03/01 11:07:06</li>'+
							'<li><span>创建时间 : </span>2013/6/13 11:23:51</li>'+
							'<li><span>记录数 : </span>46693</li>'+
							'<li><span>是否系统表 : </span>否</li>'+
							'<li><span>是否临时表 : </span>否</li>'+
							'<li><span>别名 : </span>电网频率</li>'+
							'<h5 style="text-align:center;font-size:16px;color:#333;width:100%;height:32px;line-height:32px;clear:both;">元数据视图</h5>'+
							'<div style="height:400px;width:104%;"><iframe width="100%" height="100%"  allowfullscreen="true"  src="http://10.213.98.220:8080/metaone/external?module=newLineage&username=admin&password=21232f297a57a5a743894a0e4a801fc3&id=3510=310" frameborder=0></iframe></div>'+
							'</ul></div>';
							$('#tab-2').html(tab2html);
					},
				})
				
				$("#addeacherwin").show();
			
			}
			indexright.loadywgz(param.name);
		});
	},
	loadywgz:function(item_name){//业务规则
		$.jgrid.defaults.styleUI = 'Bootstrap';
			//绑定表格数据
			
			 $("#table_listywgz").jqGrid({
				url : "http://10.213.98.77:18070/lvds/data/rute/loadDataGrid?item_name="+item_name,
				datatype : "json",
				height : 200,
				autowidth : false,
				viewrecords : true,
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
			}); 
			$("#pager_listywgz_center").css("width","100%");
			$("#table_listywgz").closest(".ui-jqgrid-bdiv").css({ "overflow" : "hidden" });
			$("#table_listywgz").closest("#gview_table_listywgz").css({ "overflow" : "hidden" });
	},
}
$(".closeWin").click(function() {
	$("#addeacherwin").hide();
});
var i_idex=0;
var index_name;
$(function() {
	// indexright.initdnzl();
	indexright.initswzc()
	// setInterval('getCookies()', 500);
});

function getCookies() {
		var coontent = getCookie("rightname");
		if(index_name!=coontent){
		  index_name=coontent;
			if (coontent == 0) {//电能质量
				indexright.initdnzl();
			} else if (coontent == 1) {//OP互联
				indexright.initophl();
			} else if(coontent == 2){//实物资产
				indexright.initswzc();
			} else if(coontent == 3){//多维精益
				indexright.initdwjy();
			} else if(coontent == 4){//供电服务
				indexright.initgdfw();
			}
		}
}


