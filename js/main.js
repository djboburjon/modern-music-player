const body = document.querySelector("body")
const mode = document.querySelector(".playlist-left")


mode.addEventListener("click", () => {
  body.classList.toggle("active") 
})