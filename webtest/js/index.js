$(function () {
    $("#exitLogin").click(function () {
        dialog();
       // require(['model'], function (model) {
       //     model.homePageRefresh();
       //  });
    });

    $("#exitLoginRight").click(function () {
        dialog();
    });
    
    $("#monitIndex").on('click', function () {
    	$('.side-menu-sub>li').removeClass('current');
    	$(".side-menu-sub").slideUp(200);
    	$("#firstMenu").addClass('active').siblings().removeClass('active open');
        $("#iframe2").hide();
        $("#iframe1").show();
    });

    $("#loginHint").click(function () {
        dialog();
    });

    $(document).on('click', ".layui-tab-close", function () {
        if ($("#tabTitle li").length == 1) {
        	$('.side-menu-sub>li').removeClass('current');
        	$(".side-menu-sub").slideUp(200);
        	$("#firstMenu").addClass('active').siblings().removeClass('active open');
            $("#iframe2").hide();
            $("#iframe1").show();
            // 让左侧菜单选中
        }
    }); 

});

function getUserInfo() {
    let userInfo = sessionStorage.getItem("userInfo");
    let userInfoObj = (userInfo == undefined || userInfo == "") ? {username : "", headImg : "", id : ""} : JSON.parse(userInfo);
    return userInfoObj;
}

function modifyDialog() {
    layer.confirm('首次登录需要重置密码，请前往密码修改页面重置密码！',
        {btn: ['确定'],title:'提示',cancel: function(index, layero){
        return false;
    },success:function (layero) {
                layero.find('.layui-layer-close').hide();
            }}, function (index) {
            window.location.href='html/login/userInfo.html';
        }
    );
}


function dialog() {
    layer.confirm('确认退出系统吗？',
        {btn: ['确定', '取消'],title:'提示'}, function (index) {
            console.log("param1:"+index);
            sessionStorage.setItem("Authorization","");
            // localStorage.clear();
            layer.close(index);
            window.location.href='login.html';
        },function () {

        });
}

function loading() {
    var index = layer.load(0, {shade: true});
}

function initMenuEvent() {
    //触发事件
    var tab = {
        tabAdd: function (title, url, id) {
            //新增一个Tab项
            var tabid=id+"tabid";
            console.log("tabid:"+tabid);
            element.tabAdd('xbs_tab', {
                title: title
                ,
                content: '<iframe id="'+tabid+'" tab-id="' + id + '" frameborder="0" src="' + url + '" scrolling="yes" class="x-iframe"></iframe>'
                ,
                id: id
            })
        }
        , tabDelete: function (othis) {
            //删除指定Tab项

            element.tabDelete('xbs_tab', '44'); //删除：“商品管理”
            othis.addClass('layui-btn-disabled');
        }
        , tabChange: function (id) {
            //切换到指定Tab项
            element.tabChange('xbs_tab', id); //切换到：用户管理
        }
    };
    //左侧菜单栏
    // nav收缩展开
    $('.side-menu-item>a').on('click', function () {
        if (!$('.side').hasClass('nav-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.side-menu-item').children('ul').slideUp(200);
                $(this).next('ul').slideDown(200);
                // $(this).parent().addClass('side-menu-item-open').siblings().removeClass('side-menu-item-open');
                // $(this).parent().addClass('open.define-i-class').siblings().removeClass('open.define-i-class');
                $(this).parent().addClass('open').siblings().removeClass('open');
                // $(this).children("#111").addClass('side-menu-item111').siblings().removeClass('side-menu-item111');
                // $("div").children(".selected").css("color", "blue");
                // side-menu-item-open
            } else {
                //收缩已展开
                $(this).next('ul').slideUp(200);
                $(this).parent().removeClass('open');
            }
        }
    });

    /*$("#indexPage").on('click', function (event) {
        $("#iframe2").hide();
        $("#iframe1").show();
    });*/

    $(".monit-menu").on('click', function (event) {
    	$("#iframe1").show();
        $("#iframe2").hide();
    });
    
    $('.side-menu-sub li a').on('click', function (event) {
    	if(!$(this).attr('_href')){
    		$(".monit-iframe").attr('src', $(this).attr('_url'));
    		$('.side-menu-sub>li').removeClass('current');
    	    $(this).parent().addClass('current');
    	    $(this).parent().parent().parent().addClass('active').siblings().removeClass('active');
    		return;
    	}
        $("#iframe1").hide();
        $("#iframe2").show();
        $('.side-menu-sub>li').removeClass('current');
        $(this).parent().addClass('current');
        $(this).parent().parent().parent().addClass('active').siblings().removeClass('active');
        // 添加标签页
        var url = $(this).attr('_href');
        if (url != null && url != "" && url != "#") {
            var title = $(this).find('span').html();
            var index = $('.side-menu-sub li a').index($(this));
            for (var i = 0; i < $('.x-iframe').length; i++) {
                if ($('.x-iframe').eq(i).attr('tab-id') == index + 1) {
                    tab.tabChange(index + 1);
                    event.stopPropagation();
                    return;
                }
            }
            ;

            tab.tabAdd(title, url, index + 1);
            tab.tabChange(index + 1);
        }

    });


    $('#userCenter').on('click', function (event) {
        $("#iframe1").hide();
        $("#iframe2").show();
        // 添加标签页
        var url = $(this).attr('_href');
        if (url != null && url != "" && url != "#") {
            var title = $(this).find('span').html();
            for (var i = 0; i < $('.x-iframe').length; i++) {
                if ($('.x-iframe').eq(i).attr('tab-id') == 9999) {
                    tab.tabChange(9999);
                    event.stopPropagation();
                    return;
                }
            };

            tab.tabAdd(title, url, 9999);
            tab.tabChange(9999);
        }

    });


    $('.side-menu-nosubmenu a').on('click', function () {
        $('.side-menu-sub>li').removeClass('current');
        $(this).parent().addClass('active').siblings().removeClass('active');
    })
    //nav-mini切换
    $('.btn-fold').on('click', function () {
        //debugger;

        if (!$('.side').hasClass('nav-mini')) {
            $('.side').css({"overflow-y":"visible"});
            $('.side-menu-sub-li-i').css({"margin-left":"-18px","width":"35px","height":"35px"});
            $('.i-left').css("left","20px");
            $('.side').addClass('nav-mini');
            $('.btn-fold').animate({'left': '32px'}, 200);
            $('.main').animate({'left': '68px'}, 50);
            $('.side-menu-item').children('ul').removeAttr('style');
            $('.side-user-info').fadeOut(0);

        } else {
            $('.side').css({"overflow-y":"auto"});
            $('.side-menu-sub-li-i').css({"margin-left":"-35px","width":"50px","height":"50px"});
            $('.i-left').css("left","31px");
            $('.side').removeClass('nav-mini');
            $('.btn-fold').animate({'left': '207px'}, 200);
            $('.main').animate({'left': '240px'}, 200);
            $('.side-user-info').fadeIn(200);

        }
    });
}