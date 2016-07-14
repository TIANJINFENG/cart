/**
 * Created by tianjinfeng on 16-7-1.
 */
$(document).ready(function(){
    var item =[{"分类":"饮料","名称":"可口可乐","单价":3,"单位":"瓶",ID:1},
        {"分类":"饮料","名称":"雪碧","单价":3,"单位":"瓶",ID:2},
        {"分类":"水果","名称":"苹果","单价":5.5,"单位":"斤",ID:3},
        {"分类":"水果","名称":"荔枝","单价":15,"单位":"斤",ID:4},
        {"分类":"生活用品","名称":"电池","单价":2,"单位":"个",ID:5},
        {"分类":"食品","名称":"方便面","单价":4.5,"单位":"袋",ID:6}];
    show_count();
    show_good_list(item);
    add_count_cart();
    list(item);
});
function list(item){
    for(var i=0;i<item.length;i++){
    listtt(i+1,item[i]);
    }
}
function listtt(button, item){
    $("#"+button+"").click(function (){
        if(localStorage.getItem("ID"+button)==null){
            item.count=1;
            item_string = JSON.stringify(item);
            localStorage.setItem("ID"+button,item_string);
        }
          else{
            var counts= localStorage.getItem("ID"+button);
            counts=JSON.parse( counts);
            counts.count++;
            item_string = JSON.stringify(counts);
            localStorage.setItem("ID"+button,item_string);
        }
    });
}
function show_count() {
        if (localStorage.getItem("clicks") == null) {
            localStorage.setItem("clicks", 0);
        }
        var num = localStorage.getItem("clicks");
        $("#number").text(num);
}
function add_count_cart() {
    $(".add_order_button").click(function () {
        var count = $("#number").text();
        count = parseInt(count) + 1;
        localStorage.setItem("clicks", count);
        $("#number").text(count);
    });
}
function show_good_list(item) {
    for(var info=0;info<item.length;info++) {
        var shopping_string = $(".item_template").html();
        var shopping_item=shopping_string.replace(/kind/,item[info].分类).replace(/name/,item[info].名称).replace(/price/,item[info].单价).replace(/print/,item[info].单位).replace(/"b"/,item[info].ID);
        $(".inventory_table").append(shopping_item);
    }
}