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
        change_cart_goods_count(cart_items_barcade[i]);
        change_goods_total_money(cart_items_barcade[i]);
        change_goods_little_money(cart_items_barcade[i])
    }
}
function get_local_storage(cart_items_barcade){
    var add_string = localStorage.getItem("cart"+cart_items_barcade);
    var cart_items=JSON.parse(add_string);
    return cart_items;
}
function change_cart_goods_count(cart_items_barcade){
    $(".add_count#"+cart_items_barcade+"").click(function () {
        var num = $("#number").text();
        num = parseInt(num) + 1;
        localStorage.setItem("clicks", num);
        var num = localStorage.getItem("clicks");
        $("#number").html(num);
    });
    $(".reduce_count#"+cart_items_barcade+"").click(function (){
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
function change_goods_total_money(cart_items_barcade){

    $(".add_count#"+cart_items_barcade+"").click(function () {
        var cart_items=get_local_storage(cart_items_barcade);
        var total_shopping_money=$("#sum_goods_money").html();
        var money=Number(total_shopping_money)+cart_items.单价;
        localStorage.setItem("total",money);
        var total_money = localStorage.getItem("total");
        $("#sum_goods_money").html(Number(total_money).toFixed(2));
    });
    $(".reduce_count#"+cart_items_barcade+"").click(function (){
        var cart_items=get_local_storage(cart_items_barcade);
        var total_shopping_money=$("#sum_goods_money").html();
        var money=Number(total_shopping_money)-cart_items.单价;
        localStorage.setItem("total",money);
        var total_money = localStorage.getItem("total");
        $("#sum_goods_money").html(Number(total_money).toFixed(2));
    });
}
function change_goods_little_money(cart_items_barcade){
    $(".add_count#"+cart_items_barcade+"").click(function () {
        var cart_items=get_local_storage(cart_items_barcade);
        var little_price = $(".goods_little_price#"+cart_items_barcade+"").html();
        little_price = cart_items.count*cart_items.单价;
        cart_items.original_price=little_price;//改变本地小计价格
        $(".goods_little_price#"+cart_items_barcade+"").html(cart_items.original_price);
        if(cart_items.单位!="斤"){
            $(".save_unit#"+cart_items_barcade+"").html("元");
            cart_items.save = (cart_items.count-parseInt(cart_items.count/3))*cart_items.单价;
            $(".goods_save_price#"+cart_items_barcade+"").html(cart_items.save);
        }
        cart_items_string=JSON.stringify(cart_items);
        localStorage.setItem("cart"+cart_items_barcade, cart_items_string);
    });
    $(".reduce_count#"+cart_items_barcade+"").click(function () {
        var cart_items=get_local_storage(cart_items_barcade);
        var little_price = $(".goods_little_price#"+cart_items_barcade+"").html();
        little_price = cart_items.count*cart_items.单价;
        cart_items.original_price=little_price;//改变本地小计价格
        $(".goods_little_price#"+cart_items_barcade+"").html(cart_items.original_price);
        if(cart_items.单位!="斤"){
            cart_items.save = (cart_items.count-parseInt(cart_items.count/3))*cart_items.单价;
            $(".goods_save_price#"+cart_items_barcade+"").html(cart_items.save);
            $(".save_unit#"+cart_items_barcade+"").html("元");
        }
        cart_items_string=JSON.stringify(cart_items);
        localStorage.setItem("cart"+cart_items_barcade, cart_items_string);
    });
}
function add_quntitey(cart_items_barcade) {
    $(".add_count#"+cart_items_barcade+"").click(function () {
        var cart_items=get_local_storage(cart_items_barcade);
        var plus_count = $("input#"+cart_items_barcade+"").val();
        plus_count = parseInt(plus_count) + 1;
        $("input#"+ cart_items_barcade+"").val(plus_count);//在文本显示数量
        cart_items.count=plus_count;//改变本地商品数量
        cart_items_string=JSON.stringify(cart_items);
        localStorage.setItem("cart"+cart_items_barcade, cart_items_string);
    });
}
function reduce_quntitey(cart_items_barcade) {
    $(".reduce_count#"+cart_items_barcade+"").click(function () {
        var cart_items=get_local_storage(cart_items_barcade);
        var cut_count = $("input#"+cart_items_barcade+"").val();
        if(cut_count>0){
            cut_count = parseInt(cut_count) - 1;
            $("input#"+ cart_items_barcade+"").val(cut_count);//在文本显示数量
            cart_items.count=cut_count;//改变本地商品数量
            cart_items_string=JSON.stringify(cart_items);
            localStorage.setItem("cart"+cart_items_barcade, cart_items_string);
            if(cut_count==0){ $(".cart_items_list#"+cart_items_barcade+"").remove();
                localStorage.removeItem("cart"+cart_items_barcade);
            }
        }

    });
}
function shopping() {
    var cart_items_barcade=Items_barcode();
    var goods_sum_price=0;
    for(var i=0;i<cart_items_barcade.length;i++){
        if(localStorage.getItem("cart"+cart_items_barcade[i])==null){continue ;}
    var shopping_string = $(".cart_item_template").html();
    var l_string = localStorage.getItem("cart"+cart_items_barcade[i]);
    var l=JSON.parse(l_string);
    var shopping_item = shopping_string.replace(/kind/,l.分类)
        .replace(/name/,l.名称)
        .replace(/price/,l.单价)
        .replace(/print/, l.单位)
        .replace(/q/, l.ID).replace(/increat/, l.ID).replace(/reduces/, l.ID)
        .replace(/delate/, l.ID).replace(/goods_original_price/,l.ID).replace(/shoping_save_price/, l.ID)
        .replace(/before_pose/, l.ID).replace(/behind_pose/, l.ID).replace(/save_print/, l.ID);
        $(".orders_table").append(shopping_item);
        $("input#"+ cart_items_barcade[i]+"").val(l.count);
        $(".goods_save_price#"+cart_items_barcade[i]+"").html(l.save);
        if(l.单位!="斤"){
            $(".save_unit#"+cart_items_barcade[i]+"").html("元");
            $(".original_before#"+cart_items_barcade[i]+"").html("(原价:");
            $(".original_behind#"+cart_items_barcade[i]+"").html(")");
        }
        $(".goods_little_price#"+cart_items_barcade[i]+"").html(l.original_price);
        var tian=(l.original_price);
        goods_sum_price+=parseInt(tian);
    }
    $("#sum_goods_money").html((goods_sum_price).toFixed(2));
    localStorage.setItem("total",goods_sum_price.toFixed(2));
}
