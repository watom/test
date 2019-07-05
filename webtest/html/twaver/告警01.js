//单个网元告警变红

function initNetwork(network) {
    var view = network.getView();
    document.body.appendChild(view);
    network.adjustBounds({x: 0, y: 0, width: 1300, height: 600});
    network.getToolTip = function (element) {
        return '中国制造的电脑';
    };
    twaver.Styles.setStyle('select.color', '#57ab9a');
    //字符定义告警内容
    network.getAlarmLabel = function (element) {
        var severity = element.getAlarmState().getHighestNewAlarmSeverity();
        if (severity) {
            if (element.getName() === 'Jeff.fu') {
                var label = severity.nickName;
            } else if (element.getName() === 'alex.dong') {
                var label = "alexAlarm";
            } else if (element.getChildrenSize() !== 0) {
                var label = "parentAlarm";
            } else {
                var label = element.getAlarmState().getNewAlarmCount(severity) + severity.nickName;
            }
            if (element.getAlarmState().hasLessSevereNewAlarms()) {
                label += "+";
            }
            return label;
        }
        return null;
    }
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

function initDataBox(box) {
    var node1 = new twaver.Node({name: '电脑', location: {x: 200, y: 200}});
    var alarm = new twaver.Alarm("alarm 1", node1.getId(), twaver.AlarmSeverity.CRITICAL );
    box.getAlarmBox().add(alarm);

    node1.setClient('vector', true);
    box.add(node1);

}

/**
 * 设置异常数据变红
 * @param alarmNobel 异常网元
 * @param box 容器
 */
function setAlarmNodel(alarmNobel,box) {
    box.getAlarmBox().add(new twaver.Alarm("alarmNobel 1", alarmNobel.getId(), twaver.AlarmSeverity.CRITICAL ));
    box.add(alarmNobel);
}


$(document).ready(function () {
    var box = new twaver.ElementBox();
    var network = new twaver.vector.Network(box);
    initNetwork(network);
    registerImage();
    initDataBox(box);
});