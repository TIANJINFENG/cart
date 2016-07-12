/**
 * Created by tianjinfeng on 16-7-1.
 */
$(document).ready(function(){
    var item =[{"分类":"饮料","名称":"可口可乐","单价":3,"单位":"瓶"},
        {"分类":"饮料","名称":"雪碧","单价":3,"单位":"瓶"},
        {"分类":"水果","名称":"苹果","单价":5.5,"单位":"斤"},
        {"分类":"水果","名称":"荔枝","单价":15,"单位":"斤"},
        {"分类":"生活用品","名称":"电池","单价":2,"单位":"个"},
        {"分类":"食品","名称":"方便面","单价":4.5,"单位":"袋"}];
    open_count();
    open_good_list(item);
});
/*function list(item){
        item[1] = JSON.stringify(item[1])
        localStorage.setItem("click", item[1]);
        $("#orders").html(item[1]);
}*/
function open_count() {
        if (localStorage.getItem("clicks") == null) {
            localStorage.setItem("clicks", 0);
        }
        var num = localStorage.getItem("clicks");
        $("#plus").text(num);
}
$(document).ready(function() {
    $(".add_order_button").click(function () {
        var count = $("#plus").text();
        count = parseInt(count) + 1;
        localStorage.setItem("clicks", count);
        $("#plus").text(count);
    });
})
function open_good_list(item) {
    var c='';
    for(var info=0;info<item.length;info++) {
        var tr = $(".l").html();

        c=c+tr.replace(/kind/,item[info].分类).replace(/name/,item[info].名称).replace(/price/,item[info].单价).replace(/print/,item[info].单位)+"\n";
    }
    $(".out_table").append(c);
}