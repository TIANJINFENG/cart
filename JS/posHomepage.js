/**
 * Created by tianjinfeng on 16-7-11.
 */
$(document).ready(function(){

    a();
});
function a() {
    if (localStorage.getItem("clicks") == null) {
        localStorage.setItem("clicks", 0);
    }
    var num = localStorage.getItem("clicks");
    $("#plus").text(num);
}
$(document).ready(function() {
    $(".add_cart_button").click(function () {
        var count = $("#plus").text();
        count = parseInt(count) + 1;
        localStorage.setItem("clicks", count);
        $("#plus").text(count);
    });
});
