/**
 * Created by tianjinfeng on 16-7-12.
 */
$(document).ready(function(){
    add_count();
    add_count_cart();
    shopping();
    chang_shopping_count();

});
function Items_barcode(){
    var cart_items_barcade_string=localStorage.getItem("items_barcade");
    var cart_items_barcade=JSON.parse(cart_items_barcade_string);
    return cart_items_barcade;
}
function add_count() {
    if (localStorage.getItem("clicks") == null) {
        localStorage.setItem("clicks", 0);
    }
    var num = localStorage.getItem("clicks");
        $("#number").html(num);
}
function add_count_cart() {
    $(".add_order_button").click(function () {
        var num = $("#number").text();
        num = parseInt(num) + 1;
        localStorage.setItem("clicks", num);
    });
}
function chang_shopping_count(){
    var cart_items_barcade=Items_barcode();
    for(var i=0;i<cart_items_barcade.length;i++){
        add_quntitey(cart_items_barcade[i]);
         reduce_quntitey(cart_items_barcade[i]);
    }
}
function add_quntitey(cart_items_barcade) {
    $(".add_count#"+cart_items_barcade+"").click(function () {
        var plus_count = $("input#"+cart_items_barcade+"").val();
          plus_count = parseInt(plus_count) + 1;
        var num = $("#number").text();
        num = parseInt(num) + 1;
        localStorage.setItem("clicks", num);
        var num = localStorage.getItem("clicks");
        $("#number").html(num);
        $("input#"+ cart_items_barcade+"").val(plus_count);//在文本显示数量
        var add_string = localStorage.getItem("cart"+cart_items_barcade);
        var cart_items=JSON.parse(add_string);
        cart_items.count=plus_count;//改变本地商品数量
        cart_items_string=JSON.stringify(cart_items);
        localStorage.setItem("cart"+cart_items_barcade, cart_items_string);
    });
}
function reduce_quntitey(cart_items_barcade) {
    $(".reduce_count#"+cart_items_barcade+"").click(function () {
        var cut_count = $("input#"+cart_items_barcade+"").val();
        if(cut_count>1){
        cut_count = parseInt(cut_count) - 1;
        $("input#"+ cart_items_barcade+"").val(cut_count);//在文本显示数量
            //goods_sum_price=
        var add_string = localStorage.getItem("cart"+cart_items_barcade);
        var cart_items=JSON.parse(add_string);
        cart_items.count=cut_count;//改变本地商品数量
        cart_items_string=JSON.stringify(cart_items);
        localStorage.setItem("cart"+cart_items_barcade, cart_items_string);
        }
        else{ $(".cart_items_list#"+cart_items_barcade+"").remove();
                localStorage.removeItem("cart"+cart_items_barcade);}
        var num = $("#number").text();
        if(num>0){
            num = parseInt(num) - 1;
            localStorage.setItem("clicks", num);
            var num = localStorage.getItem("clicks");
            $("#number").html(num);
        }
        if(num==0){window.location.href="goods_list.html"}
    });
}
function shopping() {
    var cart_items_barcade=Items_barcode();
    for(var i=0;i<cart_items_barcade.length;i++){
        if(localStorage.getItem("cart"+cart_items_barcade[i])==null){continue ;}
    var shopping_string = $(".cart_item_template").html();
    var l_string = localStorage.getItem("cart"+cart_items_barcade[i]);
    var l=JSON.parse(l_string);
    var shopping_item = shopping_string.replace(/kind/,l.分类)
        .replace(/name/,l.名称)
        .replace(/price/,l.单价)
        .replace(/print/, l.单位)
        .replace(/q/, l.ID).replace(/increat/, l.ID).replace(/reduces/, l.ID).replace(/delate/, l.ID);
        $(".orders_table").append(shopping_item);
        $("input#"+ cart_items_barcade[i]+"").val(l.count);
    }
}
/*function sum_price(){
    var goods_sum_price=
}*/