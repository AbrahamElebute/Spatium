var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("closex")[0];
const Btn = document.querySelector("#myBtn");
const closeVerticalModal = document.body
myBtn.addEventListener("click",function(){
    modal.style.display = "block";
})

span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {

  if (event.target == modal) {
    modal.style.display = "none";
  }
}
