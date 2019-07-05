function initNetwork1(network1) {
    var view = network1.getView();
    document.body.appendChild(view);
    network1.adjustBounds({x: 0, y: 0, width: 1300, height: 600});
    twaver.Styles.setStyle('select.color', '#57ab9a');
}

function registerImage1() {
//register shadow
    twaver.Util.registerImage('shadow', {
        w: 37,
        h: 29,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 5,
        shadowColor: '#80FF3B',
        v: [{shape: 'vector', name: 'node_image', x: 0, y: 0}]
    });
}

function initDataBox1(box) {
    var parent = new twaver.Group({name: 'parent', location: {x: 300, y: 400},});
    box.add(parent);
    var node1 = new twaver.Node({name: 'Jeff.fu', location: {x: 200, y: 200}});
    node1.setClient('vector', true);
    box.add(node1);
    var node2 = new twaver.Node({name: 'alex.dong', location: {x: 500, y: 350}});
    node2.setClient('vector', true);
    box.add(node2);
    var node3 = new twaver.Node({name: 'paul.peng', location: {x: 200, y: 350}});
    box.add(node3);
    var node4 = new twaver.Node({name: 'vic.cheng', location: {x: 500, y: 200}});
    box.add(node4);
    var link = new twaver.Link(node1, node2);
    link.setName('link1');
    link.setStyle('label.position', 'topleft.topleft');
    box.add(link);
    var link2 = new twaver.Link(node3, node4);
    link2.setName('link2');
    box.add(link2);
    parent.addChild(node1);
    parent.addChild(node2);
    parent.addChild(node3);
    parent.addChild(node4);
    matchFunction = function (e) {
        if (e.getClient('vector')) {
            return true;
        }
    };
    var childrenMatch = parent.toChildren(matchFunction);
    childrenMatch.forEach(function (element) {
        debugger;
        element.setImage('shadow');
        element.setName('child_vector');
    });
}

$(document).ready(function () {
    var box1 = new twaver.ElementBox();
    var network1 = new twaver.vector.Network(box1);
    initNetwork1(network1);
    registerImage1();
    initDataBox1(box1);
});