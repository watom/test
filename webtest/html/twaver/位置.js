function initDataBox(box) {
    positions = ["from", "hotspot", "to", "hotspot"];
    alarmSeverity = [twaver.AlarmSeverity.CRITICAL, twaver.AlarmSeverity.MAJOR, twaver.AlarmSeverity.MINOR, twaver.AlarmSeverity.WARNING, twaver.AlarmSeverity.INDETERMINATE];
    for (var i = 0; i < positions.length; i++) {
        var node1 = new twaver.Node();
        node1.setCenterLocation(100, 100);
        box.add(node1);

        var node2 = new twaver.Node();
        node2.setCenterLocation(540, 300);
        box.add(node2);
        var link = new twaver.Link(node1, node2);
        box.add(link);
        link.s('alarm.position', positions[i]);
        if (i === 3) {
            link.s('alarm.xoffset', -0.2);
        } else {
            link.s('alarm.xoffset', 0.2);
        }
        var alarm = new twaver.Alarm("link" + i, link.getId(), twaver.AlarmSeverity.CRITICAL);
        box.getAlarmBox().add(alarm);
        
        var link = new twaver.ShapeLink(node1, node2);
        box.add(link);
        link.addPoint({
            x: 100,
            y: 100
        });

        var list = new twaver.List();
        list.add({
            x: 250,
            y: 500
        });
        list.add({
            x: 400,
            y: 300
        });
        link.addPoint(list);
        link.s('alarm.position', positions[i]);
        if (i === 3) {
            link.s('alarm.xoffset', -0.2);
        } else {
            link.s('alarm.xoffset', 0.2);
        }
        var alarm = new twaver.Alarm("shapelink" + i, link.getId(), alarmSeverity[i + 1]);
        box.getAlarmBox().add(alarm);
    }
}

function initNetwork(network) {
    var view = network.getView();
    document.body.appendChild(view);
    network.adjustBounds({x: 0, y: 0, width: 1300, height: 600});
    twaver.Styles.setStyle('select.color', '#57ab9a');
}

$(document).ready(function () {
    var box = new twaver.ElementBox();
    var network = new twaver.vector.Network(box);
    initNetwork(network);
    initDataBox(box);
});