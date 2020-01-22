$(function() {
    //输入框得到焦点时
    $('.input01').on('focus',function(){
        if($('.input01').val()==''){
            console.log("有焦点后，输入框为空");
        }else{
            console.log("有焦点后，有值！");
        }
    });
    //输入框失去焦点时
    $('.input01').on('blur',function(){
        if($('.input').val()==''){
            console.log("无焦点后，输入框为空");
       }else{
            console.log("无焦点后，有值！");
        }
    });

    $('.input01').mouseout(function(){
        if($('.input').val()==''){
            console.log("鼠标移出后，输入框为空");
        }else{
            console.log("鼠标移出后，有值！");
        }
    });
    $('.input01').mouseover(function(){
        if($('.input').val()==''){
            console.log("鼠标移入后，输入框为空");
        }else{
            console.log("鼠标移入后，有值！");
        }
    });

});