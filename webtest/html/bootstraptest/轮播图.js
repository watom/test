/**
 * 轮播图已经有了鼠标悬停停止轮播，左右导航，和下方圆点计数器、给图片添加标题，内容等功能
 */
$(document).ready(function () {
    handlerInit();
    stopCarousel();
    clickMoved()
    // var $active   = this.$element.find('.item.active')
    // getItemForDirection("next",$active);
});


/**
 * 手动初始化轮播效果
 */
function handlerInit() {
    var temp = 99; //防抖
    $(document).on('click.bs.carousel.data-api', '[data-slide]', function () {
        var slideIndex = $("li[class='active']").attr("data-slide-to")
        if (temp != slideIndex) {
            console.log("当前页面======" + slideIndex);
            temp = slideIndex;
        }
    })
}

/**
 * 控制图片轮转的时间间隔
 */
function setIntervalTime() {
    $('#slidershow').carousel({
        interval: 3000
    });
}

/**
 * 设置不自动播放
 */
function stopCarousel() {
    $('#slidershow').carousel({
        pause: true,
        interval: false
    });
}

function clickMoved() {
}

/**
 * 触摸滑动
 */
function touchMoved() {
    var startX, endX;//声明触摸的两个变量
    var offset = 30;//声明触摸距离的变量
    $('.carousel-inner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;//当触摸开始时的x坐标；
    });
    $('.carousel-inner').on('touchmove', function (e) {
        endX = e.originalEvent.touches[0].clientX;//当触摸离开时的x坐标；
    });
    $('.carousel-inner').on('touchend', function (e) {
        //当触摸完成时进行的事件；
        var distance = Math.abs(startX - endX);//不论正负，取值为正值；
        if (distance > offset) {
            if (startX > endX) {
                $('#myCarousel').carousel('next');//当开始的坐标大于结束的坐标时，滑动到下一附图
            } else {
                $('#myCarousel').carousel('prev');//当开始的坐标小于结束的坐标时，滑动到上一附图

            }
        }
    });
}
