/**
 * Created by tianjinfeng on 16-7-12.
 */
$(document).ready(function(){
    add_count();
    add_count_cart();
    shopping();
    add_cart_goods_amount();
    add_quntitey();
    reduce_quntitey();
});
function add_count() {
    if (localStorage.getItem("clicks") == null) {
        localStorage.setItem("clicks", 0);
    }
    var num = localStorage.getItem("clicks");
    $("#number").text(num);
    $("#amount").text(num);
}
function add_cart_goods_amount() {
    if (localStorage.getItem("clicks") == null) {
        localStorage.setItem("clicks", 0);
    }
    var num = localStorage.getItem("cart_goods_amount");
    $("#amount").text(num);
}
function add_count_cart() {
    $(".add_order_button").click(function () {
        var count = $("#number").text();
        count = parseInt(count) + 1;
        localStorage.setItem("clicks", count);
        $("#number").text(count);
    });
};
function add_quntitey() {
    $(".add_count").click(function () {
        /*if (localStorage.getItem("cart_goods_amount") == null) {
            localStorage.setItem("cart_goods_amount", 0);
        }*/
        var count = $("#amount").html();
        count = parseInt(count) + 1;
        localStorage.setItem("cart_goods_amount", count);
        var add_num= localStorage.getItem("cart_goods_amount")
        $("#amount").html(add_num);
    });
}
function reduce_quntitey() {
    $(".reduce_count").click(function () {
        var count = $("#amount").html();
        if(count>=1){
        count = parseInt(count) - 1;
        localStorage.setItem("cart_goods_amount", count);
        $("#amount").val(count);
        }
    });
}
function shopping() {
    for(var i=1;i<7;i++){
        if(localStorage.getItem("ID"+i)==null){continue ;}
    var shopping_string = $(".cart_item_template").html();
    var l_string = localStorage.getItem("ID"+i);
    var l=JSON.parse(l_string);
    var shopping_item = shopping_string.replace(/kind/,l.分类).replace(/name/,l.名称).replace(/price/,l.单价).replace(/print/, l.单位).replace(/"0"/, l.count);
    $(".orders_table").append(shopping_item);
}
}