const nav = document.querySelector("nav");
const hamburger = document.querySelector(".hamburger-on");
const menu = document.querySelector(".nav-links");
let hamburgerOpen = false;
window.addEventListener("scroll", function(){
    nav.classList.toggle("sticky", window.scrollY > 0)
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





const wrapper = document.querySelector(".warpper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const buttonPopup = document.querySelector(".button-popup");
const iconClose = document.querySelector(".icon-close");

registerLink.addEventListener ("click", () =>{
    wrapper.classList.add("active");
});

loginLink.addEventListener ("click", () =>{
    wrapper.classList.remove("active");
});

buttonPopup.addEventListener ("click", () =>{
    wrapper.classList.add("active-popup");
});

historyPopup.addEventListener ("click", () =>{
    wrapper.classList.add("active-popup");
});

iconClose.addEventListener ("click", () =>{
    wrapper.classList.remove("active-popup");
});