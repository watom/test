function init() {
    var box = new twaver.ElementBox();
    var network = new twaver.vector.Network(box);

    document.body.appendChild(network.getView());
    network.adjustBounds({x: 0, y: 0, width: 500, height: 500});

    var node1 = new twaver.Node();
    node1.setName("TWaver");
    node1.setLocation(100, 100);
    twaver.Styles.setStyle('node1.color', '#ec6c00');
    box.add(node1);

    var node2 = new twaver.Node();
    node2.setName("HTML5");
    node2.setLocation(300, 200);
    box.add(node2);

    var link = new twaver.Link(node1, node2);
    link.setName("Hello!");
    link.setToolTip("<b>Hello!</b>");
    box.add(link);


    /*为选中的网元，增加阴影效果*/
    var selectionModel = box.getSelectionModel();
    selectionModel.setSelectionMode("singleSelection");

    twaver.Styles.setStyle("shadow.yoffset", 0);
    twaver.Styles.setStyle("shadow.xoffset", 0);

    var mouseObj = null;
    // network.getView().addEventListener("mousemove", function (e) {
    //     var element = network.getElementAt(e);
    //     if (element instanceof twaver.Node) {
    //         mouseObj = element;
    //         selectionModel.setSelection(element);
    //     } else if (mouseLocation) {
    //         selectionModel.removeSelection(mouseObj);
    //     }
    // });
    network.getView().addEventListener("mousedown", function (e) {
        var element = network.getElementAt(e);
        if (element instanceof twaver.Node) {
          alert("你好")
        }
    });

}



$(document).ready(function () {
    init();
});