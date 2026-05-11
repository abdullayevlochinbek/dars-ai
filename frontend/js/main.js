// SIDEBAR ELEMENTS

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");


// OPEN SIDEBAR

menuBtn.addEventListener("click", () => {

    sidebar.classList.add("active");
    overlay.classList.add("active");

});


// CLOSE SIDEBAR WITH X BUTTON

closeBtn.addEventListener("click", () => {

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

});


// CLOSE SIDEBAR WITH OVERLAY

overlay.addEventListener("click", () => {

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

});


// CLOSE SIDEBAR WITH ESC KEY

document.addEventListener("keydown", (event) => {

    if(event.key === "Escape"){

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

    }

});


// SMOOTH SCROLL FOR LINKS

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// BUTTON CLICK EFFECT

const buttons = document.querySelectorAll(
    ".btn, .submit-btn, .generate-btn, .plan-btn"
);


buttons.forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(0.95)";

        setTimeout(() => {

            button.style.transform = "scale(1)";

        }, 150);

    });

});


// HEADER SHADOW ON SCROLL

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 20){

        header.style.boxShadow =
            "0 4px 20px rgba(0,0,0,0.4)";

    }
    else{

        header.style.boxShadow = "none";

    }

});


// FADE-IN ANIMATION ON LOAD

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});


// DEFAULT BODY TRANSITION

document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";


// ACTIVE MENU LINK

const navLinks = document.querySelectorAll(".sidebar ul li a");

navLinks.forEach(link => {

    if(link.href === window.location.href){

        link.style.color = "#38bdf8";
        link.style.fontWeight = "bold";

    }

});


// SIMPLE CONSOLE MESSAGE

console.log("SWA Assistant Loaded Successfully 🚀");