window.onload = function () {
    var selectedIndex = 0;
    var childLi = document.getElementsByClassName('content-left-index')[0].getElementsByTagName('li');
    for (var i = 0; i < childLi.length; i++) {
        //这个index就是做个介质，来获取当前的i是第几个，因为系统不会判断你这个i是第几个，智能通过中间的index来获取赋值。
        childLi[i].index = i;
        // childLi[i].onmouseover = function () {
        //     alert(this.index);
        // };
        childLi[i].onclick  = function () {
            if(selectedIndex!=this.index){
                childLi[selectedIndex].childNodes.item(0).classList.remove("active");
                childLi[this.index].childNodes.item(0).classList.add("active");
                selectedIndex = this.index;
            }
        };
    }
};