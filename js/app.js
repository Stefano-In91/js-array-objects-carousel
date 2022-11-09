"use strict";

const images = [
  {
    image: "img/01.webp",
    title: "Marvel's Spiderman Miles Morale",
    text: "Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.",
  },
  {
    image: "img/02.webp",
    title: "Ratchet & Clank: Rift Apart",
    text: "Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.",
  },
  {
    image: "img/03.webp",
    title: "Fortnite",
    text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
  },
  {
    image: "img/04.webp",
    title: "Stray",
    text: "Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city",
  },
  {
    image: "img/05.webp",
    title: "Marvel's Avengers",
    text: "Marvel's Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.",
  },
];


const mainImgTemplate = document.getElementById("carousel-main_img").content;
const miniatureTemplate = document.getElementById("miniature_img").content;
const mainDestination = document.querySelector(".col-9");
const miniatureDestination = document.querySelector(".col-3");

function carouselImages() {
  for (let i = 0; i < images.length; i++) {
    const element = images[i];
    const mainImg = mainImgTemplate.cloneNode(true);
    const miniatureImg = miniatureTemplate.cloneNode(true);
    mainImg.querySelector("img").src = element.image;
    mainImg.querySelector(".title").innerHTML = element.title;
    mainImg.querySelector(".text").innerHTML = element.text;
    miniatureImg.querySelector("img").src = element.image;
    if (i !== 0) {
      mainImg.querySelector("img").classList.add("hidden");
      mainImg.querySelector(".image-text").classList.add("hidden");
      miniatureImg.querySelector(".row").classList.add("inactive");
    }
    mainDestination.append(mainImg);
    miniatureDestination.append(miniatureImg);
  }
}

carouselImages();

const mainImg = document.querySelectorAll(".col-9 img");
const mainText = document.querySelectorAll(".image-text");
const miniatureImg = document.querySelectorAll(".row");
let activeNow = 0;
// Pulsanti previous e next
const nextBtn = document.querySelector(".next i");
const prevBtn = document.querySelector(".previous i");
// Event Listener su click
nextBtn.addEventListener("click", function(){
  mainImg[activeNow].classList.add("hidden");
  mainText[activeNow].classList.add("hidden");
  miniatureImg[activeNow].classList.add("inactive")
  if (activeNow < images.length - 1) {
      activeNow++;
  } else {
      activeNow = 0;
  }  
  mainImg[activeNow].classList.remove("hidden");
  mainText[activeNow].classList.remove("hidden");
  miniatureImg[activeNow].classList.remove("inactive")
})
prevBtn.addEventListener("click", function(){
  mainImg[activeNow].classList.add("hidden");
  mainText[activeNow].classList.add("hidden");
  miniatureImg[activeNow].classList.add("inactive")
  if (activeNow > 0){
      activeNow--;
  } else {
      activeNow = images.length - 1;
  }
  mainImg[activeNow].classList.remove("hidden");
  mainText[activeNow].classList.remove("hidden");
  miniatureImg[activeNow].classList.remove("inactive")
})

function addMiniatureListener() {
  for (let i = 0; i < images.length; i++) {
    miniatureImg[i].addEventListener("click", function(){
      if(miniatureImg[i].classList.contains("inactive")) {
        console.log(i);
        mainImg[activeNow].classList.add("hidden");
        mainText[activeNow].classList.add("hidden");
        miniatureImg[activeNow].classList.add("inactive")
        activeNow = i ;
        mainImg[activeNow].classList.remove("hidden");
        mainText[activeNow].classList.remove("hidden");
        miniatureImg[activeNow].classList.remove("inactive")
      }
    })    
  }
}
addMiniatureListener();