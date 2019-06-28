$(function() {
    //为星星设置hover效果
    var isClicked = false;
    var beforeClickedIndex = -1;
    var clickNum = 0; //点击同一颗星次数

    $('li').hover(
        function() {
            if(!isClicked) {
                $(this).css('color', '#F0AD4E');
                var index = $(this).index();

                for(var i = 0; i <= index; i++) {
                    $('li:nth-child(' + i + ')').css('color', '#F0AD4E');
                }
            }
        },
        function() {
            if(!isClicked) {
                $('li').css('color', '#ADADAD');
            }
        }
    );

    //星星点击事件
    $('li').click(function() {
        $('li').css('color', '#ADADAD');
        isClicked = true;
        var index = $(this).index();

        for(var i = 1; i <= index+1; i++) {
            $('li:nth-child(' + i + ')').css('color', '#F0AD4E');
        }
        if(index == beforeClickedIndex) { //两次点击同一颗星星 该星星颜色变化
            clickNum++;
            if(clickNum % 2 == 1) {
                $('li:nth-child(' + (index + 1) + ')').css('color', '#ADADAD');
            } else {
                $('li:nth-child(' + (index + 1) + ')').css('color', '#F0AD4E');
            }

        } else {
            clickNum = 0;
            beforeClickedIndex = index;
        }
    });
});

function strideCall(){
    haha("已经调用到了");
}