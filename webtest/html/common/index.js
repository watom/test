layui.use(['layer', 'form','element'], function () {
    window.layer = layui.layer;
    window.form = layui.form;
    window.element=layui.element;
    mounted();
});

/**
 * 类Vue路由设计，如不需要可删除
 */
function initRouter() {
    var url = window.location.href;
    var router;
    if (url.indexOf("#/") > -1) {
        router = url.substring(url.indexOf('#/') + 2);
        if (router === '') {
            router = 'index.html';
        }
        // $('#iframeParent').attr('src', 'html/' + router);
        $('#iframeParent').attr('src', 'http://www.baidu.com');
    } else {
        $('#iframeParent').attr('src', 'html/index.html');
        history.replaceState(null, null, '#/');
    }
    //地址栏修改不刷新的解决方案
    $('a').click(function () {
        if ($(this).attr('href')) {
            var router = $(this).attr('href');
            // window.location.reload();
            $('#iframeParent').attr('src', router);
        }
    });
}

/**
 *格式化菜单数据
 */
function formatMenus() {
    findChildMenus(-1);
    window.element.render('nav');
}

/**
 * 根据id查找下级菜单
 * @param id
 */
function findChildMenus(id) {
    if(id==-1){
        menuArray.forEach(function (item) {
            if(item.pid==id){
                $('.leftMenu ul')
                    .append('<li menu-id="'+item.id+'" class="layui-nav-item"><a href="'+item.url+'">'+item.name+'</a></li>')
                findChildMenus(item.id);
            }
        });
    }else{
        menuArray.forEach(function (item) {
            if(item.pid==id){
                $('[menu-id="'+item.pid+'"]>a').removeAttr('href');
                if(!$('[menu-id="'+item.pid+'"]').children('dl')[0]){
                    $('[menu-id="'+item.pid+'"]').append('<dl class="layui-nav-child"></dl>')
                }
                $('[menu-id="'+item.pid+'"] dl')
                    .append('<dd menu-id="'+item.id+'"><a href="'+item.url+'">'+item.name+'</a></dd>');
                findChildMenus(item.id);
            }
        });
    }

}


function mounted() {
    //菜单列表数据
    window.menuArray = [
        {
            name: "首页",
            id: 0,
            pid: -1,
            url:'#/'
        }, {
            name: "默认展开",
            id: 1,
            pid: -1,
            url:'#/PDF加载.html'
        }, {
            name: "解决方案",
            id: 2,
            pid: -1,
            url:'/PDF加载.html'
        }, {
            name: "表格",
            id: 3,
            pid: -1,
            url:'#/PDF加载.html'
        }, {
            name: "多图上传",
            id: 4,
            pid: -1,
            url:'#/PDF加载.html'
        }, {
            name: "富文本",
            id: 5,
            pid: -1,
            url:'#/rich_editor.html'
        }, {
            name: "选项1",
            id: 6,
            pid: 1,
            url:''
        }, {
            name: "选项2",
            id: 7,
            pid: 1,
            url:''
        },{
            name: "选项2-2",
            id: 8,
            pid: 7,
            url:''
        },
    ];
    formatMenus();
    initRouter();
    //显示设置弹框
    $('.loginNameDiv').click(function () {
        if ($('.dialogMenu').css('display') === 'block') {
            $('.dialogMenu').css('display', 'none');
        } else {
            $('.dialogMenu').css('display', 'block');
        }

    });
    //退出登录
    $('#parentExit').click(function () {
        $('.dialogMenu').css('display', 'none');
        layer.open({
            type: 1,
            content: `<div style="padding: 20px;">是否退出</div>`,
            btn: ["确定退出", "暂不退出"],
            yes: function (index, layero) {
                location.href = "login.html";
            },
            btn2: function (index, layero) {
                //return false 开启该代码可禁止点击该按钮关闭
            }
        });
    });
    //显示修改密码弹框
    $('#parentChangePassword').click(function () {
        $('.dialogMenu').css('display', 'none');
        layer.open({
            type: 1,
            title: '修改密码',
            content: $('#dialogChangePassword').html(), //这里content是一个普通的String
            btn: ['确定', '取消'],
            success: function (index, layero) {
                form.render();
                $('#dialogChangePasswordForm').submit(function (e) {
                    console.log(formArray2Data($(this).serializeArray()));
                    return false;
                });
            },
            yes: function (index, layero) {
                $('#dialogChangePasswordForm').submit();
            },
            btn2: function (index, layero) {
                //return false 开启该代码可禁止点击该按钮关闭
            }
        });
    });
}

/**
 * 用于将$('form').serializeArray()获取的数组转换为对象
 */
window.formArray2Data=function(array=[]){
    var data={};
    for (var i = 0; i < array.length; i++) {
        data[array[i].name]=array[i].value;
    }
    return data;
};