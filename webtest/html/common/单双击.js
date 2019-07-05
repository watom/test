// var btn = document.getElementById('btn');
//
// function nclickEvent(n, dom, fn) {
//     dom.removeEventListener('dblclick', null);
//     var n = parseInt(n) < 1 ? 1 : parseInt(n),
//         count = 0,
//         lastTime = 0;//用于记录上次结束的时间
//     var handler = function (event) {
//         var currentTime = new Date().getTime();//获取本次点击的时间
//         count = (currentTime - lastTime) < 300 ? count + 1 : 0;//如果本次点击的时间和上次结束时间相比大于300毫秒就把count置0
//         lastTime = new Date().getTime();
//         if (count >= n - 1) {
//             fn(event, n);
//             count = 0;
//         }
//     };
//     dom.addEventListener('click', handler);
// }
//
// nclickEvent(3, btn, function (event, n) {
//     console.log(n + 'click');
//     //这里面放置要处理的事件
// });
