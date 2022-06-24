// ==UserScript==
// @name         myAddToCart
// @namespace    http://huaqin.com/
// @version      0.1
// @description  方便抢购
// @author       Austin
// @match        http://shop.huaqin.com/*
// @grant        none
// ==/UserScript==
(function() {
    var autoSubmit = true; // 是否直接 提交订单
    var directCheckout = true; // 是否略过购物车，直接到提交订单
    'use strict';
    // 添加数量输入框
    var objArr = document.getElementsByClassName("goodsName");
    // 是文字列表
    if(objArr.length>0)
    {
        for( var i=0;i<objArr.length;i++)
        {
            var oNode=document.createElement('span');
            oNode.innerHTML = "<span>数量:<input type='number' id='selfCount"+i+"' value='1' style='width:40px'></span>";
            objArr[i].appendChild(oNode);
            var sHTML = objArr[i].innerHTML;
            sHTML = sHTML.replace("addToCart(","_addToCart("+i+","); // 使用自定义 _addToCart 函数
            objArr[i].innerHTML = sHTML;
        }
        // 添加form对象
        if( document.forms['ECS_FORMBUY'] === undefined)
        {
            var oForm = document.createElement("div");
            oForm.innerHTML = '<form name="ECS_FORMBUY" id="ECS_FORMBUY"><input name="number" type="text" id="number" value="1" /></form>';
            document.body.appendChild(oForm);
        }
        // 增加 _addToCart 函数
        window._addToCart = function(n,id)
        {
            // 取数量
            var num = document.getElementById("selfCount"+n).value;
            document.forms['ECS_FORMBUY'].elements["number"].value= num;
            addToCart(id); // 调用原先函数
        }
        // 修改打开页面为新页面
        var str = addToCartResponse.toString();
        str = str.replace("function addToCartResponse(result)", "window.addToCartResponse = function (result)");
        str = str.replace(/location\.href\s*=(.*);/ig, 'window.open($1,"_blank");');
        // 直接跳转到订单提交页面
        if(directCheckout)str = str.replace('flow.php?step=cart', 'flow.php?step=checkout');
        //str = str.replace("if (result.error > 0)", "result.error=2;debugger;if (result.error > 0)");
        //console.log(str);
        eval(str);
    // 完成函数重定义
    }
    if(location.href.indexOf("flow.php?step=checkout"))
    {
        // 自动提交订单
        if( autoSubmit && document.forms.theForm !=null )
        {
            document.forms.theForm.submit();
        }
    }
})();
