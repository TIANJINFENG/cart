/**
 * Created by tianjinfeng on 16-7-12.
 */
$(document).ready(function(){
    load_goods_initial_items();
    bind_all_add_and_dec_button();
});
function load_goods_initial_items(){
    var cart_items_barcade=get_local_string("items_barcade");
    var goods_total = 0;
    $.each(cart_items_barcade,function(index,id){
        var local_items = get_local_string("cart"+id);
        if(local_items!=null){
            goods_total += local_items.original_price;
            replace_goods_items(local_items,id);
        }
    });
    set_local("total",goods_total.toFixed(2));
    show_goods_total();
}
function replace_goods_items(local_items,id) {
    var goods_string = $(".cart_item_template").html();
    var goods_item =
        goods_string.replace(/kind/,local_items.kinds)
            .replace(/name/,local_items.name)
            .replace(/price/,local_items.price)
            .replace(/unit/, local_items.unit)
            .replace(/delate/, local_items.ID)
    $(".orders_table").append(goods_item);
    update(id);
}
function bind_all_add_and_dec_button(){
    var cart_items_barcade=get_local_string("items_barcade")
    $.each(cart_items_barcade,function(i){
        bind_add_and_dec_button_function(this);
    });
}
function bind_add_and_dec_button_function(cart_items_barcade){
    $("#"+cart_items_barcade+" .reduce_count , #"+cart_items_barcade+" .add_count").click(function (event){
        var num=(event.target.className== "add_count")? 1:-1;
        var cart_item=get_local_string("cart"+cart_items_barcade);
        var cart_items=compute_goods_items(cart_item,num);
        compute_total_and_sum(num,cart_items,cart_items_barcade);
        update(cart_items_barcade);
        delete_row(cart_items,cart_items_barcade);
    });
}
function update(cart_items_barcade){
    var cart_items=get_local_string("cart"+cart_items_barcade)
    show_goods_count_and_sub_total(cart_items_barcade,cart_items);
    show_goods_total();
    show_cart_goods_count();
}
function compute_total_and_sum(num,cart_items,cart_items_barcade){
    compute_cart_count(num);
    compute_shopping_total(cart_items,num);
    set_local("cart"+cart_items_barcade,JSON.stringify(cart_items));
}
function delete_row(cart_items,cart_items_barcade){
    if(cart_items.count==0){
        $("#"+cart_items_barcade+"").remove();
        localStorage.removeItem("cart"+cart_items_barcade);
    }
}
function compute_goods_items(cart_items,num){
    if(cart_items.count>0){
        cart_items.count=cart_items.count+num;
        cart_items.save = (cart_items.count-parseInt(cart_items.count/3))*cart_items.price;
        cart_items.original_price = cart_items.count*cart_items.price;
    }
    return cart_items;
}
function compute_shopping_total(cart_items,num){
    var  money=Number(get_local_value("total"));
    var total_money=money+(num*cart_items.price);
    set_local("total",total_money.toFixed(2));
}
function compute_cart_count(num){
    var cart_number = get_local_string("count");
    if(cart_number>0){
        cart_number = parseInt(cart_number) + num;
    }
    set_local("count", cart_number);
    if(cart_number==0){window.location.href="goods_list.html"}
}
function show_goods_count_and_sub_total(cart_items_barcade,local_items){
    show_every_quntity(cart_items_barcade,local_items.count);
    show_shopping_sub_total(local_items,cart_items_barcade);
}
function show_shopping_sub_total(local_items,cart_items_barcade){
    var preferential_items=get_local_string("preferential_items_id")
    if(preferential_items.indexOf(local_items.ID)>-1&&local_items.count>=3){
        show("#"+ cart_items_barcade+" .goods_little_price",local_items.save+"元"+"(原价:"+local_items.original_price+"元)");
    }else {
        show("#"+ cart_items_barcade+" .goods_little_price",local_items.original_price+"元")
    }
}
function show_goods_total(){
    var money=Number(get_local_value("total"));
    show("#sum_goods_money",Number(money).toFixed(2));
}
function show_cart_goods_count(){
    var cart_number = get_local_string("count")||0;
    show("#number",cart_number);
}
function set_local(key,item){
    localStorage.setItem(key,item);
}
function get_local_value(key){
    var value = localStorage.getItem(key);
    return value;
}
function get_local_string(key){
    var value_string = localStorage.getItem(key);
    var cart_items=JSON.parse(value_string);
    return cart_items;
}
function show(id,items){
    $(id).html(items);
}
function show_every_quntity(cart_items_barcade,cart_items){
    $("#"+ cart_items_barcade+" .amount").val(cart_items);//在文本显示数量
}

