/**
 * Created by tianjinfeng on 16-7-26.
 */
/**
 * Created by tianjinfeng on 16-7-12.
 */
$(document).ready(function(){
    load_order_items();
    show_total_and_cart_count_and_save();
    show_time();
});
function dateDigitToString (num) {
    return num < 10 ? '0' + num : num;
}
function get_moment(){
    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    return formattedDateString;
}
function show_time(){
    $(".time").html(get_moment());
}
function load_order_items(){
    var cart_items_barcade=get_local_storage("items_barcade");
    var save_total = 0;
    $.each(cart_items_barcade,function(index,id){
        var local_items = get_local_storage("cart"+id);
        if(local_items!=null){
            save_total += (local_items.original_price-local_items.save);
            replace_goods_items(local_items,id);
            replace_save_items(local_items,id);
        }
    });
    set_local("save",save_total);
}
function replace_goods_items(local_items,id) {
    var goods_string = $(".cart_item_template").html();
    var goods_item = goods_string.replace(/kind/,local_items.kinds)
            .replace(/name/,local_items.name)
            .replace(/price/,local_items.price)
            .replace(/unit/, local_items.unit)
            .replace(/count/,local_items.count)
            .replace(/delate/, local_items.ID)
    $(".orders_table").append(goods_item);
    show_sub_total(id);
}
function replace_save_items(local_items,id) {
    var goods_string = $(".pay_item_template").html();
    var preferential_items=get_local_storage("preferential_items_id")
    if(preferential_items.indexOf(local_items.ID)>-1&&local_items.count>=3) {
        var goods_item = goods_string.replace(/kind/, local_items.kinds)
                .replace(/name/, local_items.name)
                .replace(/count/, parseInt(local_items.count / 3))
                .replace(/delate/, local_items.ID)
        $(".save_table").append(goods_item);
    }
    delete_local_storage(id);
}
function show_total_and_cart_count_and_save(){
    show_cart_goods_count();
    show_goods_total();
    show_goods_save_price();
}
function show_sub_total(cart_items_barcade){
    var cart_items=get_local_storage("cart"+cart_items_barcade)
    show_shopping_sub_total(cart_items,cart_items_barcade)
}
function delete_local_storage(cart_items_barcade){
    $("#pay_delete").click(function(){
        localStorage.removeItem("cart"+cart_items_barcade)
        localStorage.removeItem("total");
        localStorage.removeItem("count");
        localStorage.removeItem("save");
    })
}
function show_shopping_sub_total(local_items,cart_items_barcade){
    var preferential_items=get_local_storage("preferential_items_id")
    if(preferential_items.indexOf(local_items.ID)>-1&&local_items.count>=3){
        show("#"+ cart_items_barcade+" .goods_little_price",local_items.save+"元"+"(原价:"+local_items.original_price+"元)");
    }else {
        show("#"+ cart_items_barcade+" .goods_little_price",local_items.original_price+"元")
    }
}
function show_goods_save_price(){
    var money=Number(get_local_storage("save"));
    show("#save_goods_money",Number(money).toFixed(2));
}
function show_goods_total(){
    var money=Number(get_local_storage("total"));
    show("#sum_goods_money",Number(money).toFixed(2));
}
function show_cart_goods_count(){
    var cart_number = get_local_storage("count")||0;
    show("#number",cart_number);
}
function set_local(key,item){
    localStorage.setItem(key,item);
}
function get_local_storage(key){
    var value_string = localStorage.getItem(key);
    var cart_items=JSON.parse(value_string);
    return cart_items;
}
function show(id,items){
    $(id).html(items);
}

