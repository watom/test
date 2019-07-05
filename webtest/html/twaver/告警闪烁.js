var box,network;

$(document).ready(function () {
    box = new twaver.ElementBox();
    network = new twaver.vector.Network(box);
    initNetwork(network);
    registerImage();
    initDataBox(box,network);
});



function initNetwork() {
    var view = network.getView();
    document.body.appendChild(view);
    network.adjustBounds({x: 0, y: 0, width: 1300, height: 600});
}

function registerImage() {
    //register shadow
    twaver.Util.registerImage('shadow', {
        w: 37,
        h: 29,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 5,
        shadowColor: '#ec6c00',
        v: [{shape: 'vector', name: 'node_image', x: 0, y: 0}]
    });
}

function initDataBox() {
    var node1 = new twaver.Node({name: '电脑', location: {x: 200, y: 200}});
    box.add(node1);
    box.getAlarmBox().add(new twaver.Alarm("alarm 1", node1.getId(), twaver.AlarmSeverity.CRITICAL));

    var oldAlarmLabel = network.getAlarmLabel;
    var newAlarmLabel = function (element) {
        return Network.prototype.getAlarmLabel(element);
    };
    setInterval(function () {
        if (self.network.getAlarmLabel == oldAlarmLabel) {
            self.network.getAlarmLabel = newAlarmLabel;
            self.network.getInnerColor = function (data) {
                return "#FF00FF";
            }
        } else if (self.network.getAlarmLabel === newAlarmLabel) {
            self.network.getAlarmLabel = oldAlarmLabel;
            self.network.getInnerColor = function (data) {
                return "#FFF00F";
            }
        }
        self.network.invalidateElementUIs();
    }, 500);
}


