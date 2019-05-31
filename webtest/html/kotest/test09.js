var vm = {
    changeEditor: ko.observable(),
    next: ko.observable(),
    changeEditor: function(aa){
        console.log("canshu:"+aa)
        changeImage(aa);
    }
};


$(document).ready(function () {
    ko.applyBindings(vm);
})

function changeImage() {
    element = document.getElementById('myimage')
    if (element.src.match("bulbon")) {
        element.src = "/images/pic_bulboff.gif";
    }
    else {
        element.src = "/images/pic_bulbon.gif";
    }
}