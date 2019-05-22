if(!index_win){
	var index_win={};
}
index_win={
	init:function(){
		$('#win_table').bootstrapTable({
			method : 'get',        
			url : '',        
			cache : false,        
			pagination : true,        
			root : 'workers',        
			total : 'totalElements',        
			sidePagination : 'server',        
			columns : [ 
				{field : 'address',title : 'Address',align : 'center',valign : 'middle'}, 
				{field : 'state', title : 'State',align : 'center',valign : 'middle',} ,
			]    ,
	 });    
	 $(window).resize(function() {
		 $('#win_table').bootstrapTable('resetView');    
	});


	},
}
$(function () {
	index_win.init();
	$('.closeWin').click(function() {
		alert(123);
			window.parent.editWinClose('1');
	});
});