const body = document.querySelector("body");
const toggle = document.querySelector(".toggle");
toggle.addEventListener("change", (ev) => {
  let darkmode = body.classList.toggle("darkmode");
  localStorage.setItem("Darkmode", darkmode);
});

if (localStorage.getItem("Darkmode") === "true") {
  toggle.querySelector("input").checked = true;
  body.classList.toggle("darkmode");
}
