const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector(".aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("visible");
});

closeMenu.addEventListener("click", () => {
    aside.classList.remove("visible");
});

botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("visible");
}));