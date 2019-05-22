var _queryUrl = null;
var _selectedMulti = null;
var _checkEnable = null;
var _data = null;
var _id = null;
var _pid = null;

var treeSelect = function (title, queryUrl, selectedMulti, checkEnable, data, pid, id, callback){
	_queryUrl = queryUrl; //'/sysResources/queryZtreeByRole/';
	_selectedMulti = selectedMulti;
	_checkEnable = checkEnable;
	_data = data;
	_pid = pid;
	_id = id;
	layer.open({
        type: 2,
        area: ['300px', '400px'],
        fix: false, //不固定
        maxmin: false,
        shadeClose: true,
        shade:0.4,
        title: title,
        content: cube.rootPath + 'html/tagsview/treeselect.html',
        btn: ['确定', '关闭'],
        yes: function(index, layero){
        	var body = layer.getChildFrame('body', index);
        	var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
        	iframeWin.TreeselectViewModel.submitHandle();
        	//layer.close(index);
        	//iframeWin.TreeselectViewModel.idsArray();
			//iframeWin.TreeselectViewModel.nameArray();
        	if (typeof callback == "function"){
                callback(iframeWin.TreeselectViewModel.idsArray(), iframeWin.TreeselectViewModel.nameArray());
            }
        }
        
    });
	
}
