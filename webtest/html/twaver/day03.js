
function initNetwork(network) {
    var view = network.getView();
    document.body.appendChild(view);
    network.adjustBounds({x: 0, y: 0, width: 1300, height: 600});
    //自定义toolTip的提示语:重写network.getToolTip方法
    network.getToolTip = function (element) {
        var Id = element.getId();
        var name = element.getName();
        var name2 = element.getName2();
        var icon = element.getIcon();
        var icon = element.setIcon("jjjjj");
        element.setClient("clientProperty","hhhhhhhhh");
        var clientProperty = element.getClient('clientProperty');
        return 'Id:' + Id + '</br> ' + 'name:' + name + '</br> ' + 'name2:' + name2+ ' </br> ' + 'icon:' + icon+ ' </br> ' + 'clientProperty:' + clientProperty;
    };
    twaver.Styles.setStyle('icon.color','#A657FA');
    twaver.Styles.setStyle('label.color','#ec6c00');
    twaver.Styles.setStyle('label2.color','#7CFA57');
    twaver.Styles.setStyle('select.color','#A657FA');
}

function initDataBox(box) {
    var node = new twaver.Node({ name: 'from', name2: 'from2', location: { x: 300, y: 200 } });
    box.add(node);
    var node2 = new twaver.Node({ name: 'to', name2: 'to2', location: { x: 500, y: 250 } });
    box.add(node2);
    var link = new twaver.Link(node, node2);
    link.setName('Hello TWaver!');
    link.setName2('Hello Vector!');
    link.setClient('clientProperty',node);
    box.add(link);
}


function registerImage(network){
    registerNormalImage('../../images/multilayer-7.png','list_view',network);
    registerNormalImage('../../images/multilayer-7.png','setting1',network);
    registerNormalImage('../../images/multilayer-7.png','wheel',network);
    registerNormalImage('../../images/multilayer-7.png','archive',network);
    registerNormalImage('../../images/multilayer-7.png','mono',network);
    registerNormalImage('../../images/multilayer-7.png','twitter',network);
}

function registerNormalImage(url, name,network) {
    var image = new Image();
    image.src = url;
    image.onload = function() {
        twaver.Util.registerImage(name, image, image.width, image.height);
        image.onload = null;
        network.invalidateElementUIs();
    };
}
function initNode(box,network) {
    var node3 = new twaver.Node("node3");
    node3.setLocation(800, 400);
    box.add(node3);
    node3.setName('icon的布局问题');
    node3.setName2('TWaver支持多组icon同时存在');
    node3.setSize(50,50);
    node3.setStyle('icons.names', [["mono","wheel",'archive'],["wheel",'archive','mono'],["archive",'mono'],["mono",'wheel']]);
    node3.setStyle('icons.position', ['topleft.topleft','topright.topright','bottomleft.bottomleft',
        'bottomright.bottomright']);
    node3.s('icons.orientation',['top','left','right','bottom']);
}


$(document).ready(function () {
    var box = new twaver.ElementBox();
    var network = new twaver.vector.Network(box);
    initNetwork(network);
    initDataBox(box);

    registerImage(network);
    initNode(box);
});