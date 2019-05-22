LinkEditor = function () {
    this.box = new ElementBox();
    this.network = new Network(this.box);
    this.sheet = new BaixunPropertySheet(this.box);
    this.imageNodesDiv = null;
    this.shapeNodesDiv = null;
    this.customNodesDiv = null;
    this.autoLayouter = new twaver.layout.AutoLayouter(this.box);
    this.defaultLayouter = "leftright";
    this.seceneId = null;
    this.network.setLinkFlowEnabled(true);
    this.network.setLinkFlowInterval(50);
    
};
twaver.Util.ext('LinkEditor', Object, {
    init: function () {
    	//this.network.setLinkFlowEnabled(true);
        this.registImages();
        this.sheet.getView().style.width = '250px';
        var toolbar = this.createToolbar(this.network);
        var centerPane = new BorderPane(this.network, toolbar);
        centerPane.setTopHeight(30);
//        var mainSplit = new SplitPane(this.accordion, centerPane, 'horizontal', 0.2);
        data.Util.appendChild(this.sheet.getView(), centerPane.getView(), 100, 17, null, null);
        data.Util.appendChild(centerPane.getView(), document.getElementById('main'), 30, 0, 0, 0);
        this.sheet.setEditable(true);
        this.sheet.getDataBox().getSelectionModel().addSelectionChangeListener(function (e) {
            if (this.sheet.getDataBox().getSelectionModel().getLastData() instanceof Link) {
                this.sheet.getView().style.height = '400px';
            } else {
                this.sheet.getView().style.height = '150px';
            }
        }, this);
        this.initSheet();
        this.initAccordion();
        this.createDraggableNetwork(this.box,this.network);
        window.onresize = function (e) { centerPane.invalidate(); };
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
        
        this.box.addDataPropertyChangeListener(function(e){
        	if(e.property.substr(2) == "system"){
        		var systemArray = e.newValue.split("$");
        		var systemName = systemArray[0];
        		var systemId = systemArray[1];
        		var node = e.source;
        		node.setName(systemName);
        		node.setClient("systemName",systemName);
        		node.setClient("systemId",systemId);
        	}
        },this);
        twaver.Styles.setStyle('label.color','#FFFFFF');
    },
    createToolbar:function(){
    	var toolbar = document.getElementById("toolbar");
        return toolbar;
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
    addDraggableNodeButton:function(src){
        var image = new Image();
        var imageName = data.Util.getImageName(src);
        image.setAttribute('title', imageName);
        image.setAttribute('draggable', 'true');
        image.style.cursor = 'move';
        image.style.verticalAlign = 'top';
        image.style.width = '28px';
        image.style.height = '28px';
//        image.style.padding = '4px 4px 4px 4px';
        image.setAttribute('src', src);
        image.addEventListener('dragstart', function (e) {
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('Text','className:twaver.Node');
            e.dataTransfer.setData('Image', 'image:' + imageName);
        }, false);
        
        var a = document.createElement("a");
        this.imageNodesDiv.appendChild(a);
        a.appendChild(image);
        return image;
    },
    addCustomNodeButton:function(src){
        var image = new Image();
        var imageName = data.Util.getImageName(src);
        image.setAttribute('title', imageName);
        image.setAttribute('draggable', 'true');
        image.style.cursor = 'move';
        image.style.verticalAlign = 'top';
        image.style.width = '28px';
        image.style.height = '28px';
        image.setAttribute('src', src);
        image.addEventListener('dragstart', function (e) {
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('Text','className:twaver.Node');
            e.dataTransfer.setData('Image', 'image:' + imageName);
        }, false);
        var a = document.createElement("a");
        this.customNodesDiv.appendChild(a);
        a.appendChild(image);
        return image;
    },
    addDraggableShapeButton:function(shape){
        var canvas = document.createElement('canvas');
        canvas.setAttribute('title', shape);
        canvas.setAttribute('draggable', 'true');
        canvas.style.cursor = 'pointer';
        var rect = { x: 0, y: 0, width: 28, height: 28 };
        var g = twaver.Util.setCanvas(canvas, rect);
        g.strokeStyle = twaver.Styles.getStyle('vector.outline.color');
        g.lineWidth = 1;
        g.fillStyle = twaver.Styles.getStyle('vector.fill.color');
        g.beginPath();
        twaver.Util.grow(rect, -5, -5);
        twaver.Util.drawVector(g, shape, null, rect);
        g.fill();
        g.stroke();
        canvas.addEventListener('dragstart', function (e) {
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('Text','className:twaver.Node');
            e.dataTransfer.setData('Shape', 'shape:' + shape);
        }, false);
        this.shapeNodesDiv.appendChild(canvas);
        return canvas;
    },
    addDraggableCreateButton:function(src){
        var image = new Image();
        var imageName = data.Util.getImageName(src);
        image.setAttribute('title', imageName);
        image.setAttribute('draggable', 'true');
        image.style.cursor = 'move';
        image.style.verticalAlign = 'top';
        image.style.width = '28px';
        image.style.height = '28px';
        image.style.padding = '0px 5px 13px 5px';
        image.setAttribute('src', src);
        var that = this;
        image.addEventListener('dragstart', function (e) {
            e.dataTransfer.effectAllowed = 'copy';
            that._createShapeNodeInteractions();
        }, false);
        this.shapeNodesDiv.appendChild(image);
        return image;
    },
    initAccordion: function () {	//初始化图形节点各个DIV
    	
    	this.imageNodesDiv = document.getElementById('imageNode');
    	this.shapeNodesDiv = document.getElementById('shapeNode');
    	this.customNodesDiv = document.getElementById('customNode');
    	var customNodeList = viewModel.getCustomNodeList();	//获得所有自定义图片
    	this.addCustomNode(customNodeList);		//添加及注册
    	
    	
        this.addDraggableNodeButton('../../images/link/os/linux.png');
        this.addDraggableNodeButton('../../images/link/os/centos.png');
        this.addDraggableNodeButton('../../images/link/os/debian.png');
        this.addDraggableNodeButton('../../images/link/os/solaris.png');
        this.addDraggableNodeButton('../../images/link/linkimg/HAProxy.png');
        this.addDraggableNodeButton('../../images/link/linkimg/INTARWEB.png');
        this.addDraggableNodeButton('../../images/link/linkimg/SOWEB.png');
        this.addDraggableNodeButton('../../images/link/linkimg/VLAN.png');

        this.addDraggableShapeButton('circle');
        this.addDraggableShapeButton('diamond');
        this.addDraggableShapeButton('hexagon');
        this.addDraggableShapeButton('oval');
        this.addDraggableShapeButton('pentagon');
        this.addDraggableShapeButton('rectangle');
        this.addDraggableShapeButton('roundrect');
        this.addDraggableShapeButton('star');
        this.addDraggableShapeButton('triangle');
        this.addDraggableCreateButton('../../images/link/linkimg/shapeEdit.png');
    },
    addCustomNode:function(customNodeList){
    	for (var i = 0; i < customNodeList.length; i++) {
			var src = customNodeList[i];
	    	this.registerImage(src);	//先注册图片
	    	this.addCustomNodeButton(src);	//然后添加button
		}
    },
    initDataBoxFromSystem:function(dataList){
    	var alreadyAddNode = {};
    	for (var i = 0; i < dataList.length; i++) {
    		if(alreadyAddNode[dataList[i].sSysId]== undefined || alreadyAddNode[dataList[i].sSysId] == null){
    			var fromNode ={"sysId":dataList[i].sSysId,"sysName":dataList[i].sSysName,"image":"linux"};
    			fromNode = this.createNode(fromNode);
    			alreadyAddNode[dataList[i].sSysId] = fromNode.getId(); 
    		}else{
    			fromNode = data.Util.getElementById(this.box,alreadyAddNode[dataList[i].sSysId]);
    		}
    		if(alreadyAddNode[dataList[i].eSysId]== undefined || alreadyAddNode[dataList[i].eSysId] == null){
    			var toNode ={"sysId":dataList[i].eSysId,"sysName":dataList[i].eSysName,"image":"linux"};
    			toNode = this.createNode(toNode);
    			alreadyAddNode[dataList[i].eSysId] = toNode.getId(); 
    		}else{
    			toNode = data.Util.getElementById(this.box,alreadyAddNode[dataList[i].eSysId]);
    		}
			var link = new Link(fromNode,toNode);
			this.box.add(link);
		}
    },
    initSheet: function () {
        this.sheet.setVisibleFunction(function (property) {
            var propertyTpe = property.getPropertyType();
            if (propertyTpe === 'style') {
                var propertyName = property.getPropertyName();
                if (propertyName.indexOf('label') == 0) {
                    return true;
                } else {
                    return this.getDataBox().getSelectionModel().getLastData() instanceof Link;
                };
            }else if(propertyTpe === 'client'){
            	var propertyName = property.getPropertyName();
                if (propertyName.indexOf('system') == 0) {
                	if(this.getDataBox().getSelectionModel().getLastData() instanceof Node){
                		return true;
                	}else{
                		return false;
                	}
                } else {
                    return true;
                };
            }else if(propertyTpe === 'accessor'){
            	var propertyName = property.getPropertyName();
            	if (propertyName.indexOf('name') == 0) {
            		if(this.getDataBox().getSelectionModel().getLastData() instanceof Link){
                		return true;
                	}else{
                		return false;
                	}
                } else {
                    return true;
                };
            }else {
                return true;
            }
        });
        
        this.sheet.setBorderColor("#154E65"); 
        this.sheet.setSelectColor("#12425A");
        this.sheet.setPropertyNameHorizontalAlign("right");
        this.sheet.setRowHeight(24);
        
        var propertyBox = this.sheet.getPropertyBox();
        var systemList = viewModel.getSystemList();	
        var catagory = '基础属性';
        data.Util.addClientProperty(propertyBox,'system',catagory,'系统名称').setEnumInfo(systemList);
        data.Util.addAccessorProperty(propertyBox, 'name', catagory,'名称');
        data.Util.addStyleProperty(propertyBox, 'label.color', catagory,'颜色');
        data.Util.addStyleProperty(propertyBox, 'label.position', catagory,'标签位置').setEnumInfo(data.POSITION_TYPE);
        catagory = '特有属性';
        data.Util.addStyleProperty(propertyBox, 'link.type', catagory,'形状').setEnumInfo(data.LINK_TYPE);
        data.Util.addStyleProperty(propertyBox, 'link.color', catagory,'颜色');
        data.Util.addStyleProperty(propertyBox, 'link.width', catagory,'宽度');
    },
    initBox: function (nodeList,lineList) {		//这个地方，初始化节点及数据   张勇0:在这个地方调用加载数据创建node及link
//        var title = this.createTitle('Stack Overflow\nNetwork Configuration', 5, 40);
    	//根据nodelist 创建节点，根据linelist 创建连线
    	for (var i = 0; i < nodeList.length; i++) {
    		//this.registerImage(nodeList[i].image);
    		var nodeInfo = nodeList[i];
    		this.createNode(nodeInfo);
    	};
    	for (var j = 0; j < lineList.length; j++) {
			var lineInfo =  lineList[j];
			this.createLink(lineInfo);
		}
    	twaver.Styles.setStyle('link.type','arc');
    },
    doAutoLayout:function(type){		//自动布局
    	if(type==null){
    		type = this.defaultLayouter;
    	}
    	var that = this;
    	this.autoLayouter.doLayout(type, function () {
    		that.network.zoomOverview(false);
    	});
    },
    addLinkInteractions:function(type){
    	this.network.setCreateLinkInteractions(function (fromNode, toNode) {
            var link = new Link();
            link.setStyle('link.type', type);
            link.setStyle('link.type', type);
            link.setStyle('arrow.to', true);
            link.setStyle('arrow.to.width', 20);
            link.setStyle('arrow.to.height', 20);
            link.setStyle("arrow.to.xoffset",0);
            link.setStyle("arrow.to.color","#658DC1");
            link.setFromNode(fromNode);
            link.setToNode(toNode);
            return link;
        });
    },
    createDraggableNetwork: function (box,network) {	//初始化network。 这个也需要提到外面去

        network.getView().addEventListener('dragover', function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
            e.dataTransfer.dropEffect = 'copy';
            return false;
        }, false);
        network.getView().addEventListener('drop', function(e) {
            var target = network.getElementAt(e); 
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
            var text = e.dataTransfer.getData('Text');
            var imageText = e.dataTransfer.getData('Image');
            var shapeText = e.dataTransfer.getData('Shape');
            if (!text) {
                return false;
            }
            if (text && text.indexOf('className:') == 0) {
                var className = text.substr(10, text.length)
                if(className === "twaver.Node"){
                    if(imageText && imageText.indexOf('image:') == 0){
                        data.Util._createElement(network, text.substr(10, text.length), network.getLogicalPoint(e), imageText.substr(6, imageText.length));
                    }else if(shapeText && shapeText.indexOf('shape:') == 0){
                        data.Util._createElement(network, text.substr(10, text.length), network.getLogicalPoint(e), null, shapeText.substr(6, shapeText.length));
                    } else {
                        data.Util._createElement(network, text.substr(10, text.length), network.getLogicalPoint(e), null, null, target);
                    }
                } else {
                    data.Util._createElement(network, text.substr(10, text.length), network.getLogicalPoint(e), null, null, target);
                }
            }
            if (text && text.indexOf('<twaver') == 0) {
                network.getElementBox().clear();
                new twaver.XmlSerializer(network.getElementBox()).deserialize(text);
            }
            return false;
        }, false);

        network.getView().setAttribute('draggable', 'true');
        network.getView().addEventListener('dragstart', function (e) {
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('Text', new twaver.XmlSerializer(network.getElementBox()).serialize());
        }, false);

        return network;
    },
    //nodeInfo:{id:'',systemId:'',systemName:'',linkNodeId:'',styles:'',}
    createNode: function (nodeInfo) {
    	if(data.Util.getElementById(this.box,nodeInfo.id)==null || data.Util.getElementById(this.box,nodeInfo.id)== undefined){
    		var node = null
    		if(nodeInfo.id==null||nodeInfo.id==""){
    			node = new Node();
    		}else{
    			node = new Node(nodeInfo.id);
    		}
            if(nodeInfo.location != null){
            	node.setLocation(nodeInfo.location.x, nodeInfo.location.y);
            }
            /*if(styles==判断是否为空，为空不赋值，不为空赋值){
            	
            }*/
            node.setName(nodeInfo.sysName);
            node.setImage(nodeInfo.image);
            node.setClient("systemId",nodeInfo.sysId);		//自定义属性   张勇:  abc_123   abc:系统名称,123:系统的ID
            node.setClient("systemName",nodeInfo.sysName);
            if(nodeInfo.nodeId==null||nodeInfo.nodeId==""||nodeInfo.nodeId==undefined){
            	node.setClient("linkNodeId",nodeInfo.nodeId);
            }
            node.setClient("system",nodeInfo.sysName+"$"+nodeInfo.sysId);  //这个不是从外面传进来的值，是在内部拼接的，为了实现onchange事件修改名称
            
            this.box.add(node);
    	}
        /*if (labelPosition) {
            node.setStyle('label.position', labelPosition);
        }*/
    	
        return node;
    },
    removeAllNodeAndLink:function(){	//移出所有的node及link
    	data.Util.clearAllData(this.box);
    },
	
    createLink: function (lineInfo) {		//张勇
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
    getElementByType:function(box,type){	//根据twaver元素类型获得node或link
    	var that = this;
    	var elementArray = [];
		box.getDatas().forEach(function(element){
			if(type=="Node"){
				if(element instanceof twaver.Node){
					elementArray.push(that.wrapperNode(element));
				}
			}
			if(type=="Link"){
				if(element instanceof twaver.Link){
					elementArray.push(that.wrapperLink(element));
				}
			}
		});
		return elementArray;	
    },
    //拿Link的属性
    wrapperLink:function(element){	//twaver.Link 转换成普通的json对象
    	var link = {id:element.getId(),name:element.getName(),
    				fromNode:this.wrapperNode(element.getFromNode()),
    				toNode:this.wrapperNode(element.getToNode()),
    			    styles:element.getStyleProperties(),type:element.getStyle("link.type"),
    			    linkWidth:element.getStyle("link.width"),color:element.getStyle("link.color"),arrow:element.getStyle("arrow.to.color")};
    	
    	return link;
    },
    //拿node的属性
    wrapperNode:function(element){	//twaver.Node 转换成普通的json对象
    	var node = {id:element.getId(),name:element.getName(),
    				styles:element.getStyleProperties(),
    				clienMap:element.getClientMap(), 
    				location:element.getLocation(),image:element.getImage()};
    	return node;
    },
     _createShapeNodeInteractions: function() {
      this.network.setInteractions([
        new twaver.vector.interaction.CreateShapeNodeInteraction(this.network, false),
        new twaver.vector.interaction.DefaultInteraction(this.network)
      ]);
    },
});
