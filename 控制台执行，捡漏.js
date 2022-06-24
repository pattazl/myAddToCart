/* eslint-disable no-undef */
// 步骤: 1. 安装 myAddToCart_v0.10 插件(替换系统函数) 2. 打开分类页面如 http://shop.huaqin.com/category.php?id=32 3. 选择显示方式“文字” 4.显示控件配置后，勾选“在商品清单页面直接提交订单” 5.设置页面允许打开新窗口 6. 控制台执行,手工抢商品清单脚本
var global_count = 0, global_handle = null;
var global_arr = [1200]; //默认抢购商品的ID清单
var priceList = { '1200': 2 }  // 指定 ID抢购的数量，不填默认为1
var countingMS = 3 * 1000; // 3秒执行一次
function autoAddMyList() {
    console.log('autoAddMyList@' + new Date());
    // 如果购买多次需要停止
    if (global_count >= global_arr.length) {
        clearInterval(global_handle);
        global_handle = null;
        console.log('autoAddMyList Stopped@' + new Date());
        return;
    }
    for (var i = 0; i < global_arr.length; i++) {
        if (global_arr[i] > 0) {
            setTimeout(function (id) {
                let num = priceList[id] == null ? 1 : priceList[id];
                _addToCart(0, id, num);
            }(global_arr[i]), 100 * i); //
        }
    }
}
autoAddMyList(); // 第一次试运行
var intervalTime = 500, countingNum = 0;// 每个商品的间隔0.5秒
global_handle = setInterval(function () {
    var leftTime = (countingMS - countingNum * intervalTime) / 1000;
    document.title = leftTime + ' 已抢:' + global_count;
    countingNum++;
    if (leftTime <= 0) {
        autoAddMyList();
        countingNum = 0;
    }
}, intervalTime);// 30秒执行一次
function alert(s) { console.error('alert:' + s); } // 替换alert 防止阻塞