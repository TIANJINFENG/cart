/**
 * Created by tianjinfeng on 16-7-1.
 */
$(document).ready(function(){
//window.onload = function(){
    a();
    goodlist();
});
function a() {
        if (localStorage.getItem("clicks") == null) {
            localStorage.setItem("clicks", 0);
        }
        var num = localStorage.getItem("clicks");
        $("#plus").text(num);
    }
$(document).ready(function() {
    $(".add_cart_button").click(function () {
        var count = $("#plus").text();
        count = parseInt(count) + 1;
        localStorage.setItem("clicks", count);
        $("#plus").text(count);
    });
})
function goodlist() {
    var a=[{"分类":"饮料","名称":"可口可乐","单价":3,"单位":"瓶"},
        {"分类":"饮料","名称":"雪碧","单价":3,"单位":"瓶"},
        {"分类":"水果","名称":"苹果","单价":5.5,"单位":"斤"},
        {"分类":"水果","名称":"荔枝","单价":15,"单位":"斤"},
        {"分类":"生活用品","名称":"电池","单价":2,"单位":"个"},
        {"分类":"食品","名称":"方便面","单价":4.5,"单位":"袋"}];
    for(var i=0;i<a.length;i++) {
       var tr="<tr class='list'><td>"+a[i].分类+"</td><td>"+a[i].名称+"</td><td>"+a[i].单价+"</td><td>"+a[i].单位+"</td>" +
           "<td><button class='add_cart_button'>加入购物车</button></td></tr>"
        $("table").append(tr);
    }
}