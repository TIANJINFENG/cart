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
    show("#number",num);
}
function goods_initial_items(){
    var cart_items_barcade=Items_barcode();
    var goods_sum_price=0;
    $.each(cart_items_barcade,function(i){
        var local_items = get_local_storage(this);
        if(local_items!=null){
            replace_shopping_items(local_items);
            show_shopping_unit_string(local_items,this);
            goods_sum_price = show_shopping_initial_items(local_items,goods_sum_price);
            show("#sum_goods_money",Number(goods_sum_price).toFixed(2))
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
    change_goods_save_money(local_items,cart_items_barcade);
}
function show_shopping_initial_items(local_items,goods_sum_price){
    var shopping_original_price=(local_items.original_price);
    goods_sum_price+=(shopping_original_price);
    return goods_sum_price;
}
function replace_shopping_items(local_items) {
    var shopping_string = $(".cart_item_template").html();
    var shopping_item =
        shopping_string.replace(/kind/,local_items.kinds).replace(/name/,local_items.name).replace(/price/,local_items.price)
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
        var digital=(event.target.className== "add_count")? 1:-1;
        var cart_item=get_local_storage(cart_items_barcade);
        var cart_items=compute_quntity(cart_item,digital)
        show_shopping_unit_string(cart_items,cart_items_barcade)
        show_goods_save_money(cart_items,cart_items_barcade);
        show_goods_total_money(cart_items,cart_items_barcade,digital);
        show_cart_goods_count(digital);
    });
}
function get_local(a){
     return  localStorage.getItem(a);
}
function set_local(c,b){
    localStorage.setItem(c,b);
}
function compute_quntity(cart_items,digital){
    if(cart_items.count>0){
        cart_items.count=cart_items.count+digital;
        cart_items.save = (cart_items.count-parseInt(cart_items.count/3))*cart_items.price;
        cart_items.original_price = cart_items.count*cart_items.price;
    }
    return cart_items;
}
function compute_total_quntity(cart_items,digital){
    var money=Number(get_local("total"))+(digital*cart_items.price);
    return money;
}
function compute_cart_count(digital){
    var cart_number = get_local("clicks");
    if(cart_number>0){
        cart_number = parseInt(cart_number) + digital;
    }
    return cart_number;
}
function show_goods_total_money(cart_items,cart_items_barcade,digital){
    var money=compute_total_quntity(cart_items,digital);
    set_local("total",money);
    show("#sum_goods_money",Number(money).toFixed(2));
    if(cart_items.count==0){
        $("#"+cart_items_barcade+"").remove();
        localStorage.removeItem("cart"+cart_items_barcade);
    }
}
function show_cart_goods_count(digital){
    var cart_number=compute_cart_count(digital)
        set_local("clicks", cart_number);
        show("#number",cart_number);
    if(cart_number==0){window.location.href="goods_list.html"}
}
function show_goods_save_money(cart_items,cart_items_barcade){
    show("#"+ cart_items_barcade+" .goods_little_price",cart_items.original_price);
    show_every_quntity(cart_items_barcade,cart_items.count);
    var preferential_string = localStorage.getItem("preferential_items_id");
    var preferential_items=JSON.parse(preferential_string);
    if(preferential_items.indexOf(cart_items.ID)>-1){
        $("#"+cart_items_barcade+" .save_unit").html("元");
        show("#"+cart_items_barcade+" .goods_save_price",cart_items.save)
    }
    change_local_storage(cart_items,cart_items_barcade);
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
function show(id,items){
    $(id).html(items);
}
function show_every_quntity(cart_items_barcade,cart_items){
    $("#"+ cart_items_barcade+" .amount").val(cart_items);//在文本显示数量
}

