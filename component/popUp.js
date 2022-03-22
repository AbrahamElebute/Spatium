document.querySelector('.button').addEventListener('click',function() {
    var child = document.getElementById('clonemother');
    var clone = child.cloneNode(true);
    var node = document.getElementById("toasts").appendChild(clone);
    console.log(node.childNodes);
    
    setTimeout(function() {
      if(node) {
        node.style.animation = "toast 1s ease-out forwards";
        setTimeout(() => {node.remove();} ,500);
      }
    },2000);
  })
  
  

//   ------------------------------
document.querySelector('.buttonTab').addEventListener('click',function() {
    var child = document.getElementById('clonemotherTab');
    var clone = child.cloneNode(true);
    var node = document.getElementById("toastsTab").appendChild(clone);
    console.log(node.childNodes);
    if(window.event.ctrlKey){
        setTimeout(function() {
            if(node) {
              node.childNodes[1].childNodes[5].childNodes[1].innerHTML = "All Tab Successfully Saved"
            }
          },0);
          setTimeout(function() {
            if(node) {
              node.style.animation = "toast 1s ease-out forwards";
              setTimeout(() => {node.remove();} ,500);
            }
          },2000);
        
    }
   else{
    setTimeout(function() {
        if(node) {
          node.style.animation = "toast 1s ease-out forwards";
          setTimeout(() => {node.remove();} ,500);
        }
      },2000);
   }
  })
