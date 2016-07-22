/**
 * Created by tianjinfeng on 16-7-12.
 */
$(document).ready(function(){
    add_count();
    add_count_cart();
    goods_initial_items();
    chang_plus_shopping_count();
    chang_reduce_shopping_count()
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
function chang_plus_shopping_count(){
    var cart_items_barcade=Items_barcode();
    for(var i=0;i<cart_items_barcade.length;i++){
        change_click_plus_data(cart_items_barcade[i]);
    }
}
function change_click_plus_data(cart_items_barcade){
    $(".add_count#increat"+cart_items_barcade+"").click(function () {
        add_quntitey(cart_items_barcade);
        change_plus_cart_goods_count(cart_items_barcade);
        change_plus_goods_little_money(cart_items_barcade);
        change_plus_goods_save_money(cart_items_barcade);
        change_plus_goods_total_money(cart_items_barcade);
    });
}
function change_plus_goods_total_money(cart_items_barcade){
        var cart_items=get_local_storage(cart_items_barcade);
        var total_shopping_money=$("#sum_goods_money").html();
        var money=Number(total_shopping_money)+cart_items.单价;
        localStorage.setItem("total",money);
        var total_money = localStorage.getItem("total");
        $("#sum_goods_money").html(Number(total_money).toFixed(2));
}
function change_plus_cart_goods_count(cart_items_barcade){
        var num = $("#number").text();
        num = parseInt(num) + 1;
        localStorage.setItem("clicks", num);
        var num = localStorage.getItem("clicks");
        $("#number").html(num);
}
function change_plus_goods_save_money(cart_items_barcade){
        var cart_items=get_local_storage(cart_items_barcade);
        if(cart_items.单位!="斤"){
            $(".save_unit#save_print"+cart_items_barcade+"").html("元");
            cart_items.save = (cart_items.count-parseInt(cart_items.count/3))*cart_items.单价;
            $(".goods_save_price#shoping_save_price"+cart_items_barcade+"").html(cart_items.save);
        }
        change_local_storage(cart_items,cart_items_barcade);
}
function change_plus_goods_little_money(cart_items_barcade){
        var cart_items=get_local_storage(cart_items_barcade);
        var little_price = $(".goods_little_price#"+cart_items_barcade+"").html();
        little_price = cart_items.count*cart_items.单价;
        cart_items.original_price=little_price;//改变本地小计价格
        $(".goods_little_price#goods_original_price"+cart_items_barcade+"").html(cart_items.original_price);
        change_local_storage(cart_items,cart_items_barcade);
}
function add_quntitey(cart_items_barcade) {
        var cart_items=get_local_storage(cart_items_barcade);
        var plus_count = $("input#quntitey"+cart_items_barcade+"").val();
        plus_count = parseInt(plus_count) + 1;
        $("input#quntitey"+ cart_items_barcade+"").val(plus_count);//在文本显示数量
        cart_items.count=plus_count;//改变本地商品数量
        change_local_storage(cart_items,cart_items_barcade);
}
function chang_reduce_shopping_count(){
    var cart_items_barcade=Items_barcode();
    for(var i=0;i<cart_items_barcade.length;i++){
        change_click_reduce_data(cart_items_barcade[i]);
    }
}
function change_click_reduce_data(cart_items_barcade){
    $(".reduce_count#reduces"+cart_items_barcade+"").click(function () {
        reduce_quntitey(cart_items_barcade);
        change_reduce_cart_goods_count(cart_items_barcade);
        change_reduce_goods_little_money(cart_items_barcade);
        change_reduce_goods_save_money(cart_items_barcade);
        change_reduce_goods_total_money(cart_items_barcade);
    });
}
function  change_reduce_cart_goods_count(cart_items_barcade){
        var num = $("#number").text();
        if(num>0){
            num = parseInt(num) - 1;
            localStorage.setItem("clicks", num);
            var num = localStorage.getItem("clicks");
            $("#number").html(num);
        }
        if(num==0){window.location.href="goods_list.html"}
}
function  change_reduce_goods_total_money(cart_items_barcade){
        var cart_items=get_local_storage(cart_items_barcade);
        var total_shopping_money=$("#sum_goods_money").html();
        var money=Number(total_shopping_money)-cart_items.单价;
        localStorage.setItem("total",money);
        var total_money = localStorage.getItem("total");
        $("#sum_goods_money").html(Number(total_money).toFixed(2));
        if(cart_items.count==0){
            $(".cart_items_list#delate"+cart_items_barcade+"").remove();
            localStorage.removeItem("cart"+cart_items_barcade);
        }
}
function change_reduce_goods_save_money(cart_items_barcade){
        var cart_items=get_local_storage(cart_items_barcade);
        if(cart_items.单位!="斤"){
            cart_items.save = (cart_items.count-parseInt(cart_items.count/3))*cart_items.单价;
            $(".goods_save_price#shoping_save_price"+cart_items_barcade+"").html(cart_items.save);
            $(".save_unit#save_print"+cart_items_barcade+"").html("元");
        }
        change_local_storage(cart_items,cart_items_barcade);
}
function change_reduce_goods_little_money(cart_items_barcade){
        var cart_items=get_local_storage(cart_items_barcade);
        var little_price = $(".goods_little_price#goods_original_price"+cart_items_barcade+"").html();
        little_price = cart_items.count*cart_items.单价;
        cart_items.original_price=little_price;//改变本地小计价格
        $(".goods_little_price#goods_original_price"+cart_items_barcade+"").html(cart_items.original_price);
        change_local_storage(cart_items,cart_items_barcade);
}
function reduce_quntitey(cart_items_barcade) {
        var cart_items=get_local_storage(cart_items_barcade);
        var cut_count = $("input#quntitey"+cart_items_barcade+"").val();
        if(cut_count>0){
            cut_count = parseInt(cut_count) - 1;
            $("input#quntitey"+ cart_items_barcade+"").val(cut_count);//在文本显示数量
            cart_items.count=cut_count;//改变本地商品数量
            change_local_storage(cart_items,cart_items_barcade);
        }
}
function change_local_storage(cart_items,cart_items_barcade){
    var cart_items_string=JSON.stringify(cart_items);
    localStorage.setItem("cart"+cart_items_barcade, cart_items_string);
}
function get_local_storage(cart_items_barcade){
    var add_string = localStorage.getItem("cart"+cart_items_barcade);
    var cart_items=JSON.parse(add_string);
    return cart_items;
}
function goods_initial_items(){
    var cart_items_barcade=Items_barcode();
    var goods_sum_price=0;
    for(var i=0;i<cart_items_barcade.length;i++){
        if(localStorage.getItem("cart"+cart_items_barcade[i])!=null){
            var local_items=get_local_storage(cart_items_barcade[i]);
            replace_shopping_items(local_items);
            show_shopping_unit_string(local_items,cart_items_barcade[i])
            goods_sum_price = show_shopping_initial_items(cart_items_barcade[i],local_items,goods_sum_price);
            $("#sum_goods_money").html((goods_sum_price).toFixed(2));
            localStorage.setItem("total",goods_sum_price.toFixed(2));
        }
    }
}
function show_shopping_unit_string(local_items,cart_items_barcade){
        if(local_items.单位!="斤"){
            $(".save_unit#save_print"+cart_items_barcade+"").html("元");
            $(".original_before#before_pose"+cart_items_barcade+"").html("(原价:");
            $(".original_behind#behind_pose"+cart_items_barcade+"").html(")");
        }
}
function show_shopping_initial_items(cart_items_barcade,local_items,goods_sum_price){
        $("input#quntitey"+ cart_items_barcade+"").val(local_items.count);
        $(".goods_save_price#shoping_save_price"+cart_items_barcade+"").html(local_items.save);
        $(".goods_little_price#goods_original_price"+cart_items_barcade+"").html(local_items.original_price);
        var shopping_original_price=(local_items.original_price);
        goods_sum_price+=(shopping_original_price);
    return goods_sum_price;
}
function replace_shopping_items(local_items) {
        var shopping_string = $(".cart_item_template").html();
        var shopping_item =
            shopping_string.replace(/kind/,local_items.分类)
                .replace(/name/,local_items.名称)
                .replace(/price/,local_items.单价)
                .replace(/print/, local_items.单位)
                .replace(/quntitey/, "quntitey"+local_items.ID)
                .replace(/increat/, "increat"+local_items.ID)
                .replace(/reduces/, "reduces"+local_items.ID)
                .replace(/delate/, "delate"+local_items.ID)
                .replace(/goods_original_price/,"goods_original_price"+local_items.ID)
                .replace(/shoping_save_price/,"shoping_save_price"+local_items.ID)
                .replace(/before_pose/, "before_pose"+local_items.ID)
                .replace(/behind_pose/, "behind_pose"+local_items.ID)
                .replace(/save_print/, "save_print"+local_items.ID);
        $(".orders_table").append(shopping_item);
}
