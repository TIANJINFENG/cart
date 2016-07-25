/**
 * Created by tianjinfeng on 16-7-12.
 */
$(document).ready(function(){
    num_count();
    goods_initial_items();
    chang_shopping_count();
    pan_duan();
});
function Items_barcode(){
    var cart_items_barcade_string=localStorage.getItem("items_barcade");
    var cart_items_barcade=JSON.parse(cart_items_barcade_string);
    return cart_items_barcade;
}
function num_count() {
    var num = localStorage.getItem("clicks")||0;
    show_cart_number(num);
}
function chang_shopping_count(){
    var cart_items_barcade=Items_barcode();
    for(var i=0;i<cart_items_barcade.length;i++){
        pan_duan(cart_items_barcade[i]);
    }
    /*$("tr .plus").each(function(){
        $("#at_id").click(add)
    })
}*/
}
function pan_duan(cart_items_barcade){
    $("#"+cart_items_barcade+" .reduce_count , #"+cart_items_barcade+" .add_count").click(function (event){
        if(event.target.className== "add_count"){
            a=1;
        }
        if(event.target.className=="reduce_count"){
            a=-1;
        }
        add_quntitey(cart_items_barcade,a);
        change_plus_goods_little_money(cart_items_barcade);
        change_plus_goods_save_money(cart_items_barcade);
        change_plus_goods_total_money(cart_items_barcade,a);
        change_plus_cart_goods_count(a);
    })
}
function change_plus_goods_total_money(cart_items_barcade,a){
        var cart_items=get_local_storage(cart_items_barcade);
        var total_shopping_money=localStorage.getItem("total");
        var money=Number(total_shopping_money)+(a*cart_items.price);
        localStorage.setItem("total",money);
        var total_money = localStorage.getItem("total");
        show_total_money(total_money);
    if(cart_items.count==0){
        $("#"+cart_items_barcade+"").remove();
        localStorage.removeItem("cart"+cart_items_barcade);
    }
}
function change_plus_cart_goods_count(a){
    var num = localStorage.getItem("clicks");
    if(num>0){
        num = parseInt(num) + a;
        localStorage.setItem("clicks", num);
        var num = localStorage.getItem("clicks");
        show_cart_number(num);
    }
    if(num==0){window.location.href="goods_list.html"}
}
function change_plus_goods_save_money(cart_items_barcade){
        var cart_items=get_local_storage(cart_items_barcade);
        if(cart_items.unit!="斤"){
            $("#"+cart_items_barcade+" .save_unit").html("元");
            cart_items.save = (cart_items.count-parseInt(cart_items.count/3))*cart_items.price;
            show_goods_save_money(cart_items_barcade,cart_items.save);
        }
        change_local_storage(cart_items,cart_items_barcade);
}
function change_plus_goods_little_money(cart_items_barcade){
        var cart_items=get_local_storage(cart_items_barcade);
        var little_price = cart_items.count*cart_items.price;
        cart_items.original_price=little_price;//改变本地小计价格
        show_little_price(cart_items_barcade,cart_items.original_price);
        change_local_storage(cart_items,cart_items_barcade);
}
function add_quntitey(cart_items_barcade,a) {
    var cart_items=get_local_storage(cart_items_barcade);
    if(cart_items.count>0){
        cart_items.count=cart_items.count+a;
        show_every_quntity(cart_items_barcade,cart_items.count);
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
        var local_items = get_local_storage(cart_items_barcade[i]);
        if(local_items!=null){
            replace_shopping_items(local_items);
            show_shopping_unit_string(local_items,cart_items_barcade[i]);
            goods_sum_price = show_shopping_initial_items(cart_items_barcade[i],local_items,goods_sum_price);
            show_total_money(goods_sum_price);
            localStorage.setItem("total",goods_sum_price.toFixed(2));
        }
    }
}
function show_every_quntity(cart_items_barcade,cart_items){
    $("#"+ cart_items_barcade+" .amount").val(cart_items);//在文本显示数量
}
function show_little_price(cart_items_barcade,cart_items){
    $("#"+cart_items_barcade+" .goods_little_price").html(cart_items);
}
function show_goods_save_money(cart_items_barcade,cart_items){
    $("#"+cart_items_barcade+" .goods_save_price").html(cart_items)
}
function show_cart_number(num){
    $("#number").html(num);
}
function show_total_money(total_money){
    $("#sum_goods_money").html(Number(total_money).toFixed(2));
}
function show_shopping_unit_string(local_items,cart_items_barcade){
        if(local_items.unit!="斤"){
            $("#"+cart_items_barcade+" .save_unit").html("元");
            $("#"+cart_items_barcade+" .original_before").html("(原价:");
            $("#"+cart_items_barcade+" .original_behind").html(")");
        }
}
function show_shopping_initial_items(cart_items_barcade,local_items,goods_sum_price){
        show_every_quntity(cart_items_barcade,local_items.count)
        show_goods_save_money(cart_items_barcade,local_items.save);
        show_little_price(cart_items_barcade,local_items.original_price)
        var shopping_original_price=(local_items.original_price);
        goods_sum_price+=(shopping_original_price);
       return goods_sum_price;
}
function replace_shopping_items(local_items) {
        var shopping_string = $(".cart_item_template").html();
        var shopping_item =
            shopping_string.replace(/kind/,local_items.kinds)
                .replace(/name/,local_items.name)
                .replace(/price/,local_items.price)
                .replace(/unit/, local_items.unit)
                .replace(/delate/, local_items.ID)
        $(".orders_table").append(shopping_item);
}
