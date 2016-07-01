/**
 * Created by tianjinfeng on 16-7-1.
 */
var count=0;
goodlist()
function goodlist() {
    var a=[{"分类":"饮料","名称":"可口可乐","单价":3,"单位":"瓶"},
        {"分类":"饮料","名称":"雪碧","单价":3,"单位":"瓶"},
        {"分类":"水果","名称":"苹果","单价":5.5,"单位":"斤"},
        {"分类":"水果","名称":"荔枝","单价":15,"单位":"斤"},
        {"分类":"生活用品","名称":"电池","单价":2,"单位":"个"},
        {"分类":"食品","名称":"方便面","单价":4.5,"单位":"袋"}];
    count = parseInt(count)+1;
    if(count==1){
        for(var i=0;i<a.length;i++) {
            //获取行下标
            var rowIndex = document.getElementById("order").rows.length;
//插入新行
            var newRow = document.getElementById("order").lastChild.insertRow(rowIndex);
//插入4个列
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);

//设置行id
            //newRow.id = "row" + rowIndex;
//设置列属性
            cell1.innerHTML = a[i].分类;
            cell2.innerHTML = a[i].名称;
            cell3.innerHTML = a[i].单价;
            cell4.innerHTML = a[i].单位;
            cell5.innerHTML = "<button class='addcartbutton' onclick='listcount()'>加入购物车</button>";
        }
    }
}