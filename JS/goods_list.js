/**
 * Created by tianjinfeng on 16-7-1.
 */
$(document).ready(function(){
    var item =[{"kinds":"饮料","name":"可口可乐","price":3,"unit":"瓶",ID:"barcade1"},
        {"kinds":"饮料","name":"雪碧","price":3,"unit":"瓶",ID:"barcade2"},
        {"kinds":"水果","name":"苹果","price":5.5,"unit":"斤",ID:"barcade3"},
        {"kinds":"水果","name":"荔枝","price":15,"unit":"斤",ID:"barcade4"},
        {"kinds":"生活用品","name":"电池","price":2,"unit":"个",ID:"barcade5"},
        {"kinds":"食品","name":"方便面","price":4.5,"unit":"袋",ID:"barcade6"}];
    var preferential_items=["barcade1","barcade2","barcade5","barcade6"];
    show_count();
    show_good_list(item);
    add_count_cart();
    list(item,preferential_items);
});
function list(item,preferential_items){
    var items_ID=[];
    for(var i=0;i<item.length;i++){
        add_goods_cart(item[i].ID,item[i]);
        items_ID.push(item[i].ID);
    }
    var items_ID_string=JSON.stringify(items_ID)
    var preferential_items_ID=JSON.stringify(preferential_items)
    localStorage.setItem("items_barcade",items_ID_string);
    localStorage.setItem("preferential_items_id",preferential_items_ID)
}
function add_goods_cart(button, item){
    $("#"+button+"").click(function (){
        if(localStorage.getItem("cart"+button)==null){
            item.count = 1;
            item.original_price = (item.count*item.price);
            if(item.unit!="斤"){
                item.save = (item.count-parseInt(item.count/3))*item.price;
            }else{item.save= item.original_price ;}
            item_string = JSON.stringify(item);
            localStorage.setItem("cart"+button,item_string);
        }
          else{
            var counts= localStorage.getItem("cart"+button);
            counts=JSON.parse( counts);
            counts.count++;
            counts.original_price=(counts.count*counts.price);
            if(counts.unit!="斤"){
                counts.save = (counts.count-parseInt(counts.count/3))*counts.price;
            }
            else{
                counts.save=counts.original_price;}

            item_string = JSON.stringify(counts);
            localStorage.setItem("cart"+button,item_string);
        }
    });
}
function show_count() {
        if (localStorage.getItem("count") == null) {
            localStorage.setItem("count", 0);
        }
        var num = localStorage.getItem("count");
        $("#number").text(num);
}
function add_count_cart() {
    $(".add_order_button").click(function () {
        var count = $("#number").text();
        count = parseInt(count) + 1;
        localStorage.setItem("count", count);
        $("#number").text(count);
    });
}
function show_good_list(item) {
    for(var info=0;info<item.length;info++) {
        var shopping_string = $(".item_template").html();
        var shopping_item=shopping_string.replace(/kind/,item[info].kinds)
            .replace(/name/,item[info].name)
            .replace(/price/,item[info].price)
            .replace(/unit/,item[info].unit)
            .replace(/"b"/,item[info].ID);
        $(".inventory_table").append(shopping_item);
    }
}