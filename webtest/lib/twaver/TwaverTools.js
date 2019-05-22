DataBox = twaver.DataBox;
ElementBox = twaver.ElementBox;

Data = twaver.Data;
Link = twaver.Link;
Node = twaver.Node;
Property = twaver.Property;
Column = twaver.Column;
Tab = twaver.Tab;
Network = twaver.vector.Network;

Accordion = twaver.controls.Accordion;
BorderPane = twaver.controls.BorderPane;
List = twaver.controls.List;
PropertySheet = twaver.controls.PropertySheet;
SplitPane = twaver.controls.SplitPane;
Table = twaver.controls.Table;
TablePane = twaver.controls.TablePane;
TabPane = twaver.controls.TabPane;
TitlePane = twaver.controls.TitlePane;
Tree = twaver.controls.Tree;
TreeTable = twaver.controls.TreeTable;
var BaixunPropertySheet = function(box){
	BaixunPropertySheet.superClass.constructor.call(this, box);
}

twaver.Util.ext('BaixunPropertySheet',twaver.controls.PropertySheet,{
	onCategoryRendered:function(div,categoryName){
		BaixunPropertySheet.superClass.onCategoryRendered.call(this,div,categoryName);
		div.style.color = "white";
	},
	onNameRendered:function(params){
		BaixunPropertySheet.superClass.onNameRendered(this,params);
		params.view.getView().style.color = "white";
	},
});
data = {};

data.Util = {
    registerImage: function (url, svg) {	//注册图片  此方法不支持获得节点连接地址，所以废弃
        var image = new Image();
        image.src = url;
        var views = arguments;
        image.onload = function () {
            twaver.Util.registerImage(data.Util.getImageName(url), image, image.width, image.height, svg === true);
            image.onload = null;
            for (var i = 1; i < views.length; i++) {
                var view = views[i];
                if (view.invalidateElementUIs) {
                    view.invalidateElementUIs();
                }
                if (view.invalidateDisplay) {
                    view.invalidateDisplay();
                }
            }
        };
    },
/*	registerImage:function(url,network){
	    var imageName = this.getImageNameByUrl(url);
	    twaver.Util.registerImageByUrl(url,imageName,network,null);
	},*/
	getImageNameByUrl:function(url){
	    var imageName = url.substring(url.lastIndexOf('/')+1,url.lastIndexOf('.'));
	    return imageName
	},
    getImageName: function (url) {	//获得图片名称
        var index = url.lastIndexOf('/');
        var name = url;
        if (index >= 0) {
            name = url.substring(index + 1);
        }
        index = name.lastIndexOf('.');
        if (index >= 0) {
            name = name.substring(0, index);
        }
        return name;
    },
    addComboBox: function (div, items, callback, value) {
        var comboBox = document.createElement('select');
        comboBox.style.verticalAlign = 'top';
        items.forEach(function (item) {
            var option = document.createElement('option');
            option.appendChild(document.createTextNode(item));
            option.setAttribute('value', item);
            comboBox.appendChild(option);
        });

        if (callback) {
            comboBox.addEventListener('change', callback, false);
        }

        if (value) {
            comboBox.value = value;
        }
        div.appendChild(comboBox);
        return comboBox;
    },
    appendChild: function (e, parent, top, right, bottom, left) {	//添加子元素
        e.style.position = 'absolute';
        if (left != null) e.style.left = left + 'px';
        if (top != null) e.style.top = top + 'px';
        if (right != null) e.style.right = right + 'px';
        if (bottom != null) e.style.bottom = bottom + 'px';
        parent.appendChild(e);
    },
    createTreeToolbar: function (tree) {		//创建树状工具栏
        var toolbar = document.createElement('div');
        data.Util.addButton(toolbar, 'Reset Order', './images/toolbar/reset.png', function () { tree.setSortFunction(null); });
        data.Util.addButton(toolbar, 'Ascend Order', './images/toolbar/ascend.png', function () {
            tree.setSortFunction(function (d1, d2) {
                if (d1.getName() > d2.getName()) {
                    return 1;
                } else if (d1.getName() == d2.getName()) {
                    return 0;
                } else {
                    return -1;
                }
            });
        });
        data.Util.addButton(toolbar, 'Descend Order', './images/toolbar/descend.png', function () {
            tree.setSortFunction(function (d1, d2) {
                if (d1.getName() < d2.getName()) {
                    return 1;
                } else if (d1.getName() == d2.getName()) {
                    return 0;
                } else {
                    return -1;
                }
            });
        });
        data.Util.addButton(toolbar, 'Move Selection To Top', './images/toolbar/top.png', function () { tree.getDataBox().moveSelectionToTop(); });
        data.Util.addButton(toolbar, 'Move Selection Up', './images/toolbar/up.png', function () { tree.getDataBox().moveSelectionUp(); });
        data.Util.addButton(toolbar, 'Move Selection Down', './images/toolbar/down.png', function () { tree.getDataBox().moveSelectionDown(); });
        data.Util.addButton(toolbar, 'Move Selection To Bottom', './images/toolbar/bottom.png', function () { tree.getDataBox().moveSelectionToBottom(); });
        data.Util.addButton(toolbar, 'Expand', './images/toolbar/expand.png', function () {
            if (tree.getSelectionModel().size() == 1) {
                tree.expand(tree.getSelectionModel().getLastData());
            } else {
                tree.expandAll();
            }
        });
        data.Util.addButton(toolbar, 'Collapse', './images/toolbar/collapse.png', function () {
            if (tree.getSelectionModel().size() == 1) {
                tree.collapse(tree.getSelectionModel().getLastData());
            } else {
                tree.collapseAll();
            }
        });
        return toolbar;
    },
    addButton: function (div, name, src, callback) {	//添加按钮
        var button = document.createElement('input');
        button.setAttribute('type', src ? 'image' : 'button');
        button.setAttribute('title', name);
        button.style.verticalAlign = 'top';
        if (src) {
        	button.style.setProperty('vertical-align','middle');
            button.style.padding = '4px 4px 4px 4px';
            if (src.indexOf('/') < 0) {
                src = '../../images/link/toolbar/' + src + '.png';
            }
            button.setAttribute('src', src);
        } else {
            button.value = name;
        }
        button.addEventListener('click', callback, false);
        div.appendChild(button);
        return button;
    },
    addComboBox: function (div, items, callback, value) {
        var comboBox = document.createElement('select');
        comboBox.style.verticalAlign = 'top';
        items.forEach(function (item) {
            var option = document.createElement('option');
            option.appendChild(document.createTextNode(item));
            option.setAttribute('value', item);
            comboBox.appendChild(option);
        });

        if (callback) {
            comboBox.addEventListener('change', callback, false);
        }

        if (value) {
            comboBox.value = value;
        }
        div.appendChild(comboBox);
        return comboBox;
    },
    addCustomComboBox: function (div, items, callback, value) {
        var comboBox = document.createElement('select');
        comboBox.style.verticalAlign = 'middle';
        items.forEach(function (item) {
            var option = document.createElement('option');
            option.appendChild(document.createTextNode(item.text));
            option.setAttribute('value', item.value);
            comboBox.appendChild(option);
        });

        if (callback) {
            comboBox.addEventListener('change', callback, false);
        }

        if (value) {
            comboBox.value = value;
        }
        div.appendChild(comboBox);
        return comboBox;
    },
    addInput: function (div, value, name, callback) {
        var input = document.createElement('input');
        input.id = name;
        input.value = value;
        input.style.textAlign = 'middle';
        input.style.verticalAlign = 'middle';
        input.addEventListener('keydown', function (e) {
            if (e.keyCode == 13) {
                callback(input.value);
            }
        }, false);
        var label = document.createElement('label');
        label.htmlFor = name;
        label.innerHTML = name;
        div.appendChild(label);
        div.appendChild(input);
        return input;
    },
    addLabel:function(div,value){
    	var label = document.createElement('label');
    	label.style.textAlign = 'middle';
    	label.style.verticalAlign = 'middle';
    	label.innerHTML = value;
    	div.appendChild(label);
    },
    addStyleProperty: function (box, propertyName, category, name) {
        return data.Util._addProperty(box, propertyName, category, name, 'style');
    },
    addClientProperty: function (box, propertyName, category, name) {
        return data.Util._addProperty(box, propertyName, category, name, 'client');
    },
    addAccessorProperty: function (box, propertyName, category, name) {
        return data.Util._addProperty(box, propertyName, category, name, 'accessor');
    },
    _addProperty: function (box, propertyName, category, name, proprtyType) {
        var property = new twaver.Property();
        property.setCategoryName(category);
        if (!name) {
            name = data.Util._getNameFromPropertyName(propertyName);
        }
        property.setName(name);
        property.setEditable(true);
        property.setPropertyType(proprtyType);
        property.setPropertyName(propertyName);

        var valueType;
        if (proprtyType === 'style') {
            valueType = twaver.SerializationSettings.getStyleType(propertyName);
        } else if (proprtyType === 'client') {
            valueType = twaver.SerializationSettings.getClientType(propertyName);
        } else {
            valueType = twaver.SerializationSettings.getPropertyType(propertyName);
        }
        if (valueType) {
            property.setValueType(valueType);
        }

        box.add(property);
        return property;
    },
    _getNameFromPropertyName: function (propertyName) {
        var names = propertyName.split('.');
        var name = '';
        for (var i = 0; i < names.length; i++) {
            if (names[i].length > 0) {
                name += names[i].substring(0, 1).toUpperCase() + names[i].substring(1, names[i].length);
            }
            if (i < names.length - 1) {
                name += ' ';
            }
        }
        return name;
    },
    getPropertyName: function (e) {
        var name = e.property;
        if (name.indexOf('C:') == 0) {
            return name.substring(2, name.length);
        }
        if (name.indexOf('S:') == 0) {
            return name.substring(2, name.length);
        }
        return name;
    },
    _createElement: function(network, className, centerLocation, imageSrc, vectorShape, parent) {
        var element = twaver.Util.newInstance(className);
        element.setCenterLocation(centerLocation);

        if (!parent) {
            element.setParent(network.getCurrentSubNetwork());
        } else {
            element.setParent(parent);
        }

        if (imageSrc) {
            element.setImage(imageSrc);
        }
        if(vectorShape){
            element.setStyle('body.type', 'vector');
            element.setStyle('vector.shape', vectorShape);
        }
        network.getElementBox().add(element);
        network.getElementBox().getSelectionModel().setSelection(element);
    },
    isFullScreenSupported: function () {
        var docElm = document.documentElement;
        return docElm.requestFullscreen || docElm.webkitRequestFullScreen || docElm.mozRequestFullScreen;
    },
    toggleFullscreen: function () {
        if (data.Util.isFullScreenSupported()) {
            var fullscreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
            if (!fullscreen) {
                var docElm = document.documentElement;
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                } else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                } else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        }
    },
    getElementById:function(box,id){	//根据ID获得
    	return box.getDataById(id);
    },
    clearAllData:function(box){	//删除方法
    	box.clear();
    },
    getAllNode:function(box){
    	this.getElementByType(box,"Node");
    },
    getAllLink:function(box){
    	this.getElementByType(box,"Link");
    }
};
data.SHAPE_TYPE = ['rectangle', 'oval', 'roundrect', 'star', 'triangle', 'circle', 'hexagon', 'pentagon', 'diamond'];
data.GRADIENT_TYPE = ['linear.east', 'linear.north', 'linear.northeast', 'linear.northwest', 'linear.south', 'linear.southeast', 'linear.southwest', 'linear.west', 'none', 'radial.center', 'radial.east', 'radial.north', 'radial.northeast', 'radial.northwest', 'radial.south', 'radial.southeast', 'radial.southwest', 'radial.west', 'spread.antidiagonal', 'spread.diagonal', 'spread.east', 'spread.horizontal', 'spread.north', 'spread.south', 'spread.vertical', 'spread.west'];
data.DIRECTION_TYPE = ['northwest', 'north', 'northeast', 'east', 'west', 'south', 'southwest', 'southeast'];
data.ATTACHMENT_DIRECTION_TYPE = ['aboveleft', 'aboveright', 'belowleft', 'belowright', 'leftabove', 'leftbelow', 'rightabove', 'rightbelow', 'above', 'below', 'left', 'right'];
data.POSITION_TYPE = ['topleft.topleft', 'top.top', 'topright.topright', 'right.right', 'left.left', 'bottom.bottom', 'bottomleft.bottomleft', 'bottomright.bottomright'];
data.NODE_ATTACHMENT_POSITION_TYPE = ['hotspot',
    'topleft.topleft',
    'topleft.topright',
    'top.top',
    'topright.topleft',
    'topright.topright',
    'topleft',
    'top',
    'topright',
    'topleft.bottomleft',
    'topleft.bottomright',
    'top.bottom',
    'topright.bottomleft',
    'topright.bottomright',
    'left.left',
    'left',
    'left.right',
    'center',
    'right.left',
    'right',
    'right.right',
    'bottomleft.topleft',
    'bottomleft.topright',
    'bottom.top',
    'bottomright.topleft',
    'bottomright.topright',
    'bottomleft',
    'bottom',
    'bottomright',
    'bottomleft.bottomleft',
    'bottomleft.bottomright',
    'bottom.bottom',
    'bottomright.bottomleft',
    'bottomright.bottomright'];
data.LINK_ATTACHMENT_POSITION_TYPE = ['hotspot',
    'from',
    'to',
    'topleft.topleft',
    'topleft.topright',
    'top.top',
    'topright.topleft',
    'topright.topright',
    'topleft',
    'top',
    'topright',
    'topleft.bottomleft',
    'topleft.bottomright',
    'top.bottom',
    'topright.bottomleft',
    'topright.bottomright',
    'left.left',
    'left',
    'left.right',
    'center',
    'right.left',
    'right',
    'right.right',
    'bottomleft.topleft',
    'bottomleft.topright',
    'bottom.top',
    'bottomright.topleft',
    'bottomright.topright',
    'bottomleft',
    'bottom',
    'bottomright',
    'bottomleft.bottomleft',
    'bottomleft.bottomright',
    'bottom.bottom',
    'bottomright.bottomleft',
    'bottomright.bottomright'];
data.LINK_TYPE = ['arc', 'triangle', 'parallel', 'flexional', 'flexional.horizontal', 'flexional.vertical', 'orthogonal', , 'orthogonal.horizontal', 'orthogonal.vertical', 'orthogonal.H.V', 'orthogonal.V.H', 'extend.top', 'extend.left', 'extend.bottom', 'extend.right'];
data.LINK_LOOPED_TYPE = ['arc', 'rectangle'];
data.LINK_CORNER_TYPE = ['none', 'round', 'bevel'];
data.LAYOUT_TYPE = ['round', 'topbottom', 'bottomtop', 'symmetry', 'rightleft', 'leftright', 'hierarchic'];
data.BUS_STYLE_TYPE = ['nearby', 'north', 'south', 'west', 'east'];
data.SHAPELINK_TYPE = ['lineto', 'quadto', 'cubicto'];
data.BODY_TYPE = ['none', 'default', 'vector', 'default.vector', 'vector.default'];
data.SEGMENT_TYPE = ['moveto', 'lineto', 'quadto', 'cubicto'];
data.CAP_TYPE = ['butt', 'round', 'square'];
data.JOIN_TYPE = ['miter', 'round', 'bevel'];
data.ORIENTATION_TYPE = ['top', 'left', 'bottom', 'right'];
data.SELECT_TYPE = ['none', 'shadow', 'border'];
data.ARROW_SHAPE_TYPE = ['arrow.standard', 'arrow.delta', 'arrow.diamond', 'arrow.short', 'arrow.slant','arrow.doubledelta','arrow.tee','arrow.box','arrow.dot','arrow.tail'];
//data.LAYOUT_TYPE = [{'text':'星型布局','value':'round'},{'text':'从高到低','value':'topbottom'},{'text':'从低到高','value':'bottomtop'},{'text':'这个不知道','value':'symmetry'},{'text':'从右到左','value':'rightleft'},{'text':'从左到右','value':'leftright'},{'text':'这个不知道','value':'hierarchic'}];
data.LAYOUT_TYPE = [{'text':'星型布局','value':'round'},{'text':'从高到低','value':'topbottom'},{'text':'从低到高','value':'bottomtop'},{'text':'从右到左','value':'rightleft'},{'text':'从左到右','value':'leftright'}];
