var box,network;

$(document).ready(function () {
    box = new twaver.ElementBox();
    network = new twaver.vector.Network(box);
    initNetwork();
    initLayer();
});

function initNetwork() {
    var view = network.getView();
    document.body.appendChild(view);
    network.adjustBounds({x: 0, y: 0, width: 1300, height: 600});
    twaver.Styles.setStyle('select.color', '#F1E09E');
    network.setEditInteractions();
}
function initLayer() {
    var layerBox = box.getLayerBox();
    var layer1 = new twaver.Layer('unmovable', 'unmovable layer');
    layer1.setMovable(false);//网元不可移动
    var layer2 = new twaver.Layer('uneditable', 'uneditable layer');
    layer2.setEditable(false);//网元不可编辑
    var layer3 = new twaver.Layer('unvisible', 'unvisible Layer');
    layer3.setVisible(true);//网元可见
    var layer4 = new twaver.Layer('unrotatable', 'unrotatable Layer');
    layer4.setRotatable(false);//网元不旋转（有问题）

    layerBox.add(layer1);
    layerBox.add(layer2);
    layerBox.add(layer3);
    layerBox.add(layer4);
    createNode(layer1, 'circle', 300, 100, 200, 200, '#57ab9a');
    createNode(layer2, 'diamond', 350, 200, 200, 200, '#090909');
    createNode(layer3, 'rectangle', 200, 200, 200, 200, '#ec6c00');
    createNode(layer4, 'rectangle',500, 200, 200, 200, '#EFE54C');
    createNode(layerBox.getDefaultLayer(), 'rectangle', 100, 100, 250, 250, '#61b6d8');  //默认图层在最下边
}
function createNode(layer, shape, x, y, width, height, fillColor) {
    var node = new twaver.Node();
    node.setLayerId(layer.getId());
    node.setName('layer-' + layer.getId());
    node.setStyle('body.type', 'vector');
    node.setStyle('vector.fill.alpha', 0.7);
    node.setStyle('vector.shape', shape);
    node.setSize(width, height);
    node.setLocation(x, y);
    node.setStyle('vector.fill.color', fillColor);
    box.add(node);
    return node;
}