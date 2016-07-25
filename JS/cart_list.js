/**
 * Created by tianjinfeng on 16-7-12.
 */
$(document).ready(function(){
    cart_count();
    goods_initial_items();
    change_cart_data();
});
function Items_barcode(){
    var cart_items_barcade_string=localStorage.getItem("items_barcade");
    var cart_items_barcade=JSON.parse(cart_items_barcade_string);
    return cart_items_barcade;
}
function cart_count() {
    var num = localStorage.getItem("clicks")||0;
    show_cart_number(num);
}
function goods_initial_items(){
    var cart_items_barcade=Items_barcode();
    var goods_sum_price=0;
    $.each(cart_items_barcade,function(i){
        var local_items = get_local_storage(this);
        if(local_items!=null){
            replace_shopping_items(local_items);
            show_shopping_unit_string(local_items,this);
            goods_sum_price = show_shopping_initial_items(this,local_items,goods_sum_price);
            show_total_money(goods_sum_price);
            localStorage.setItem("total",goods_sum_price.toFixed(2));
        }
    })
}
function show_shopping_unit_string(local_items,cart_items_barcade){
    var preferential_string = localStorage.getItem("preferential_items_id");
    var preferential_items=JSON.parse(preferential_string);
    if(preferential_items.indexOf(local_items.ID)>-1){
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
function change_cart_data(){
    var cart_items_barcade=Items_barcode();
    $.each(cart_items_barcade,function(i){
       change_cart_shopping_data(this);
    });
}
function change_cart_shopping_data(cart_items_barcade){
    $("#"+cart_items_barcade+" .reduce_count , #"+cart_items_barcade+" .add_count").click(function (event){
        if(event.target.className== "add_count"){
            digital=1;
        }
        if(event.target.className=="reduce_count"){
            digital=-1;
        }
        add_quntitey(cart_items_barcade,digital);
        change_plus_goods_little_money(cart_items_barcade);
        change_plus_goods_save_money(cart_items_barcade);
        change_plus_goods_total_money(cart_items_barcade,digital);
        change_plus_cart_goods_count(digital);
    })
}
function change_plus_goods_total_money(cart_items_barcade,digital){
    var cart_items=get_local_storage(cart_items_barcade);
    var total_shopping_money=localStorage.getItem("total");
    var money=Number(total_shopping_money)+(digital*cart_items.price);
    localStorage.setItem("total",money);
    var total_money = localStorage.getItem("total");
    show_total_money(total_money);
    if(cart_items.count==0){
        $("#"+cart_items_barcade+"").remove();
        localStorage.removeItem("cart"+cart_items_barcade);
    }
}
function change_plus_cart_goods_count(digital){
    var cart_number = localStorage.getItem("clicks");
    if(cart_number>0){
        cart_number = parseInt(cart_number) + digital;
        localStorage.setItem("clicks", cart_number);
        var cart_number = localStorage.getItem("clicks");
        show_cart_number(cart_number);
    }
    if(cart_number==0){window.location.href="goods_list.html"}
}
function change_plus_goods_save_money(cart_items_barcade){
    var cart_items=get_local_storage(cart_items_barcade);
    var preferential_string = localStorage.getItem("preferential_items_id");
    var preferential_items=JSON.parse(preferential_string);
    if(preferential_items.indexOf(cart_items.ID)>-1){
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
function add_quntitey(cart_items_barcade,digital) {
    var cart_items=get_local_storage(cart_items_barcade);
    if(cart_items.count>0){
        cart_items.count=cart_items.count+digital;
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

