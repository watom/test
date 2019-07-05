var box,network;

$(document).ready(function () {
    box = new twaver.ElementBox();
    network = new twaver.vector.Network(box);
    initNetwork();
    initDataBox();
});

function initNetwork() {
    document.body.appendChild(network.getView());
    network.getView().style.background = '#E9E9E9';
    network.adjustBounds({x: 10, y: 10, width: 1000, height: 1000});
    network.addInteractionListener(function (e) {
        console.log(e.kind);
        if (e.kind == "doubleClickElement") {
            if (e.element.getClient("show.tip")) {
                e.element.setClient("show.tip", false);
            } else {
                e.element.setClient("show.tip", true);
            }
        }
    });
}

function initDataBox() {
    var node1 = new CNode();
    // var node1 = new twaver.Node({name: '电脑1', location: {x: 200, y: 200}});
    node1.setClient("show.tip", false);
    node1.setClient("tip", "testTip");
    node1.setClient("tip.fill.color", "rgba(255,255,0,0.8)");
    node1.setClient("tip.width", 80);
    node1.setClient("tip.height", 50);
    node1.setClient("tip.corner.radius", 10);
    node1.setClient("tip.pointer.length", 20);
    node1.setClient("tip.pointer.width", 20);

    var node2 = new CNode();
    // var node2 = new twaver.Node({name: '电脑2', location: {x: 400, y: 200}});
    node2.setClient("show.tip", false);
    node2.setClient("tip", "testTip2");
    node2.setClient("tip.fill.color", "rgba(255,255,0,0.8)");
    node2.setClient("tip.width", 80);
    node2.setClient("tip.height", 50);
    node2.setClient("tip.corner.radius", 10);
    node2.setClient("tip.pointer.length", 20);
    node2.setClient("tip.pointer.width", 20);
    var link = new twaver.Link(node1, node2);
    box.add(node1);
    box.add(node2);
    box.add(link);
}