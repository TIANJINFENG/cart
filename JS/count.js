/**
 * Created by tianjinfeng on 16-6-29.
 */
if(sessionStorage.getItem("clicks")==null){sessionStorage.setItem("clicks",0);}
function listcount() {
    var count=document.getElementById("plus").innerHTML;
    count= parseInt(count)+1;
    sessionStorage.setItem("clicks",count);
    document.getElementById("plus").innerHTML = sessionStorage.getItem("clicks");
}
var shoppingcount=sessionStorage.getItem("clicks");
    if(isNaN(shoppingcount )){shoppingcount=0;}
document.getElementById("plus").innerHTML=shoppingcount;
