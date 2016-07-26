/**
 * Created by tianjinfeng on 16-7-11.
 */
$(document).ready(function(){
    a();
});
function a() {

    var num = localStorage.getItem("clicks")||0;
    $("#plus").text(num);
}

