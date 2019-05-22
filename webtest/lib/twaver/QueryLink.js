LinkQuery = function () {
    this.box = new ElementBox();
    this.network = new Network(this.box);
    this.network.setLinkFlowEnabled(true);
    this.network.setLinkFlowInterval(50);
    this.autoLayouter = new twaver.layout.AutoLayouter(this.box);
    this.network.setWheelToZoom(false);

};
twaver.Util.ext('LinkQuery', Object, {
    init: function () {
    	console.log("初始化");
    	var mainDiv = document.getElementById('main');
    	console.log(mainDiv.offsetLeft);
    	document.getElementById('main').appendChild(this.network.getView());
		this.network.adjustBounds({x:0,y:0,width:document.getElementById('main').offsetWidth,height:document.getElementById('main').offsetHeight});
        this.registImages();
        this.network.setDragToPan(false); //画布不可以移动
        this.network.setMovableFunction(function (element) { return element.getName() === 'main'; });//设置节点不可移动，根据画布判断
      //  this.initAccordion();
        var that = this;
        window.onresize = function (e) {
        	that.network.adjustBounds({x:0,y:0,width:document.getElementById('main').offsetWidth,height:document.getElementById('main').offsetHeight});
		 };
        this.network.setEditableFunction(function (element) {
            if (element instanceof Node) {
                return element.getWidth() > 0 && element.getHeight() > 0;
            }
            return true;
        });

        var that = this;
        this.network.addElementByInteraction = function(element) {
            twaver.vector.Network.prototype.addElementByInteraction.call(this, element);
            this.setInteractions([new twaver.vector.interaction.DefaultInteraction(this, false)]);
        };
    },
    
    registImages: function () {
        this.registerImage("../../images/link/os/linux.png");
        this.registerImage("../../images/link/os/centos.png");
        this.registerImage("../../images/link/os/debian.png");
        this.registerImage("../../images/link/os/solaris.png");
        this.registerImage("../../images/link/linkimg/HAProxy.png");
        this.registerImage("../../images/link/linkimg/INTARWEB.png");
        this.registerImage("../../images/link/linkimg/SOWEB.png");
        this.registerImage("../../images/link/linkimg/VLAN.png");
        this.registerImage("../../images/link/linkimg/shapeEdit.png");
    },
    registerImage: function (url) {
        data.Util.registerImage(url, this.network);
    },
    doLayout:function(){
    	var that = this;
    	this.autoLayouter.doLayout("leftright", function () {
    		that.network.zoomOverview(false);
    	});
    },
    /*initAccordion: function () {	//初始化图形节点各个DIV
    	var customNodeList = viewModel.getCustomNodeList();	//获得所有自定义图片
    	this.addCustomNode(customNodeList);		//注册
    	},
    addCustomNode:function(customNodeList){
    	for (var i = 0; i < customNodeList.length; i++) {
			var src = customNodeList[i];
	    	this.registerImage(src);	//先注册图片
		}
    },*/
    initDataBoxFromSystem:function(dataList){
    	console.log(dataList);
    	var alreadyAddNode = {};
    	for (var i = 0; i < dataList.length; i++) {
    		if(alreadyAddNode[dataList[i].sSysId]== undefined || alreadyAddNode[dataList[i].sSysId] == null){
    			var fromNode ={"sysId":dataList[i].sSysId,"sysName":dataList[i].sSysName,"image":"linux"};
    			fromNode = this.createNode(fromNode);
    			alreadyAddNode[dataList[i].sSysId] = fromNode.getId(); 
    		}else{
    			fromNode = data.Util.getElementById(this.box,alreadyAddNode[dataList[i].sSysId]);
    			console.log(fromNode.getId());
    		}
    		if(alreadyAddNode[dataList[i].eSysId]== undefined || alreadyAddNode[dataList[i].eSysId] == null){
    			var toNode ={"sysId":dataList[i].eSysId,"sysName":dataList[i].eSysName,"image":"linux"};
    			toNode = this.createNode(toNode);
    			alreadyAddNode[dataList[i].eSysId] = toNode.getId(); 
    		}else{
    			toNode = data.Util.getElementById(this.box,alreadyAddNode[dataList[i].eSysId]);
    		}
			var link = new Link(fromNode,toNode);
			link.setName(dataList[i].connectType);
			this.box.add(link);
		}
    	this.doLayout();
    	//console.log(alreadyAddNode);
    },
   
    initBox: function (nodeList,lineList) {		//这个地方，初始化节点及数据   张勇0:在这个地方调用加载数据创建node及link
    	//根据nodelist 创建节点，根据linelist 创建连线
    	for (var i = 0; i < nodeList.length; i++) {
    		var nodeInfo = nodeList[i];
    		this.registerImage(nodeInfo.image);
    		this.createNode(nodeInfo);
    	};
    	for (var j = 0; j < lineList.length; j++) {
			var lineInfo =  lineList[j];
			console.log(lineInfo);
			this.createLink(lineInfo);
		}
    	twaver.Styles.setStyle('link.type','arc');
    	this.network.zoomOverview(true);
    },
    createNode: function (nodeInfo) {
    	console.log("nodeInfo!!!!!!!!!!!!!!"+nodeInfo.image);
    	if(nodeInfo.id==null||nodeInfo.id==""){
			node = new Node();
		}else{
			node = new Node(nodeInfo.id);
		}
        if(nodeInfo.location != null){
        	node.setLocation(nodeInfo.location.x, nodeInfo.location.y);
        }
           // node = new Node(nodeInfo.id);
           // node.setLocation(nodeInfo.location.x, nodeInfo.location.y);
            node.setName(nodeInfo.sysName);
            node.setImage(nodeInfo.image);
            node.setClient("systemId",nodeInfo.sysId);		//自定义属性   张勇:  abc_123   abc:系统名称,123:系统的ID
            node.setClient("systemName",nodeInfo.sysName);
            /*if(nodeInfo.nodeId==null||nodeInfo.nodeId==""||nodeInfo.nodeId==undefined){
            	//mark 张勇
            	node.setClient("linkNodeId",nodeInfo.nodeId);
            }
            node.setClient("system",nodeInfo.sysName+"$"+nodeInfo.sysId); */ //这个不是从外面传进来的值，是在内部拼接的，为了实现onchange事件修改名称
            
            this.box.add(node);
           /* node.addPropertyChangeListener(function(e){	//node点击属性改变事件
            	if(e.property.substr(2) == "system"){
            		console.log(e.property);
            		console.log(e.newValue);
            		var systemArray = e.newValue.split("$");
            		var systemName = systemArray[0];
            		var systemId = systemArray[1];
            		node.setName(systemName);
            		node.setClient("systemName",systemName);
            		node.setClient("systemId",systemId);
            	}
            });
    	}*/
        /*if (labelPosition) {
            node.setStyle('label.position', labelPosition);
        }*/
    	
        return node;
    },
    removeAllNodeAndLink:function(box){	//移出所有的node及link
    	data.Util.clearAllData(box);
    },
	
    createLink: function (lineInfo) {	
    	console.log(lineInfo);
    	var link = new Link(data.Util.getElementById(this.box,lineInfo.startNode),data.Util.getElementById(this.box,lineInfo.endNode));
    	link.setStyle("link.color",lineInfo.color);
    	link.setStyle("link.width",lineInfo.linkWidth);
    	link.setStyle("link.type",lineInfo.style);
    	link.setStyle("arrow.to.color",lineInfo.arrow);
    	link.setStyle("link.flow", true);
    	link.setStyle("link.flow.color", '#ffffff');
    	link.setStyle("link.pattern",[20,20]);
    	//link.setStyle("link.flow.converse", true);//流动方向
        link.setStyle('arrow.to', true);
        link.setStyle('arrow.to.width', 20);
        link.setStyle('arrow.to.height', 20);
        //link.setStyle('arrow.to.shape', 'arrow.slant');//arrow.singleDirection
        //link.setStyle('arrow.to.outline.width',2);
        //link.setStyle('arrow.to.outline.color','blue');
        // link.setStyle('arrow.to.color','red');
        link.setStyle("arrow.to.xoffset",0);
        this.box.add(link);
        return link;
    },
     _createShapeNodeInteractions: function() {
      this.network.setInteractions([
        new twaver.vector.interaction.CreateShapeNodeInteraction(this.network, false),
        new twaver.vector.interaction.DefaultInteraction(this.network)
      ]);
    },
});
