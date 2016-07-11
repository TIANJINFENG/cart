/**
 * Created by tianjinfeng on 16-7-11.
 */
window.onload = function () {
    a();
}
function a(){
    if (localStorage.getItem("clicks") == null) {
        loscalStorage.setItem("clicks", 0);
    }
    document.getElementById("plus").innerHTML = localStorage.getItem("clicks");
}
function listcount() {
    var count = document.getElementById("plus").innerHTML;
    count = parseInt(count) + 1;
    localStorage.setItem("clicks", count);
    document.getElementById("plus").innerHTML = localStorage.getItem("clicks");
}