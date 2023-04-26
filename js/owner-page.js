const header = document.querySelector("header");
const hamburger = document.querySelector(".hamburger-on");
const menu = document.querySelector(".nav-links");
let hamburgerOpen = false;
window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 0)
})

hamburger.addEventListener("click", function(){
    if(!hamburgerOpen){
        menu.classList.toggle("show-menu");
        hamburger.classList.toggle("hamburger-off");
    }else{
        hamburger.classList.remove("show-menu");
        hamburger.classList.remove("hamburger-off");
        hamburgerOpen = false;
    }
})