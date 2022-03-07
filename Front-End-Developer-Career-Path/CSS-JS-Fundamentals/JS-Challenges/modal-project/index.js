const openModalBtn = document.querySelector("#open-modal");
const closeModalBtn = document.querySelector("#close-modal");
const overlay = document.querySelector("#overlay");

openModalBtn.addEventListener("click", () => {
  overlay.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

