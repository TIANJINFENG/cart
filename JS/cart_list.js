/**
 * Created by tianjinfeng on 16-7-12.
 */
$(document).ready(function(){
    goods_initial_items();
    change_cart_data();
});
function goods_initial_items(){
    var cart_items_barcade=get_local_storage("items_barcade");
    var goods_sum_price = 0;
    $.each(cart_items_barcade,function(index,id){
        var local_items = get_local_storage("cart"+id);
        if(local_items!=null){
            goods_sum_price += local_items.original_price;
            replace_shopping_items(local_items,id);
        }
    });
    set_local("total",goods_sum_price.toFixed(2));
    show_goods_total_money();
}
function replace_shopping_items(local_items,id) {
    var shopping_string = $(".cart_item_template").html();
    var shopping_item =
        shopping_string.replace(/kind/,local_items.kinds)
            .replace(/name/,local_items.name)
            .replace(/price/,local_items.price)
            .replace(/unit/, local_items.unit)
            .replace(/delate/, local_items.ID)
    $(".orders_table").append(shopping_item);
    show_items(id);
}
function change_cart_data(){
    var cart_items_barcade=get_local_storage("items_barcade")
    $.each(cart_items_barcade,function(i){
       change_cart_shopping_data(this);
    });
}
function change_cart_shopping_data(cart_items_barcade){
    $("#"+cart_items_barcade+" .reduce_count , #"+cart_items_barcade+" .add_count").click(function (event){
        var digital=(event.target.className== "add_count")? 1:-1;
        var cart_item=get_local_storage("cart"+cart_items_barcade);
        var cart_items=compute_quntity(cart_item,digital);
        compute_items(digital,cart_items,cart_items_barcade);
        show_items(cart_items_barcade);
        delate(cart_items,cart_items_barcade);
    });
}
function show_items(cart_items_barcade){
    var cart_items=get_local_storage("cart"+cart_items_barcade)
    show_goods_items(cart_items_barcade,cart_items);
    show_goods_total_money();
    show_cart_goods_count();
}
function compute_items(digital,cart_items,cart_items_barcade){
    compute_cart_count(digital);
    compute_shopping_total_money(cart_items,digital);
    set_local("cart"+cart_items_barcade,JSON.stringify(cart_items));
}
function delate(cart_items,cart_items_barcade){
    if(cart_items.count==0){
        $("#"+cart_items_barcade+"").remove();
        localStorage.removeItem("cart"+cart_items_barcade);
    }
}
function compute_quntity(cart_items,digital){
    if(cart_items.count>0){
        cart_items.count=cart_items.count+digital;
        cart_items.save = (cart_items.count-parseInt(cart_items.count/3))*cart_items.price;
        cart_items.original_price = cart_items.count*cart_items.price;
    }
    return cart_items;
}
function compute_shopping_total_money(cart_items,digital){
    var  money=Number(get_local("total"));
    var total_money=money+(digital*cart_items.price);
    set_local("total",total_money.toFixed(2));
}
function compute_cart_count(digital){
    var cart_number = get_local_storage("clicks");
    if(cart_number>0){
        cart_number = parseInt(cart_number) + digital;
    }
    set_local("clicks", cart_number);
    if(cart_number==0){window.location.href="goods_list.html"}
}
function show_goods_items(cart_items_barcade,local_items){
    show_every_quntity(cart_items_barcade,local_items);
    show_every_quntity(cart_items_barcade,local_items.count);
    show_shopping_unit_string(local_items,cart_items_barcade);
}
function show_shopping_unit_string(local_items,cart_items_barcade){
    var preferential_items=get_local_storage("preferential_items_id")
    if(preferential_items.indexOf(local_items.ID)>-1&&local_items.count>=3){
        show("#"+ cart_items_barcade+" .goods_little_price",local_items.save+"元"+"(原价:"+local_items.original_price+"元)");
    }else {
        show("#"+ cart_items_barcade+" .goods_little_price",local_items.original_price+"元")
    }
}
function show_goods_total_money(){
    var money=Number(get_local("total"));
    show("#sum_goods_money",Number(money).toFixed(2));
}
function show_cart_goods_count(){
    var cart_number = get_local_storage("clicks")||0;
    show("#number",cart_number);
}
function set_local(key,item){
    localStorage.setItem(key,item);
}
function get_local(key){
    var add_string = localStorage.getItem(key);
    return add_string;
}
function get_local_storage(key){
    var add_string = localStorage.getItem(key);
    var cart_items=JSON.parse(add_string);
    return cart_items;
}
function show(id,items){
    $(id).html(items);
}
function show_every_quntity(cart_items_barcade,cart_items){
    $("#"+ cart_items_barcade+" .amount").val(cart_items);//在文本显示数量
}

