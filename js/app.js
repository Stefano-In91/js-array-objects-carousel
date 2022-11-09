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

//Riempie il carosello con le immagini dell'array
function carouselImages(main_template, main_destination, miniature_template, miniature_destination) {
  for (let i = 0; i < images.length; i++) {
    const element = images[i];
    const mainImgCreate = main_template.cloneNode(true);
    const miniatureImgCreate = miniature_template.cloneNode(true);
    mainImgCreate.querySelector("img").src = element.image;
    mainImgCreate.querySelector(".title").innerHTML = element.title;
    mainImgCreate.querySelector(".text").innerHTML = element.text;
    miniatureImgCreate.querySelector("img").src = element.image;
    if (i !== 0) {
      mainImgCreate.querySelector("img").classList.add("hidden");
      mainImgCreate.querySelector(".image-text").classList.add("hidden");
      miniatureImgCreate.querySelector(".row").classList.add("inactive");
    }
    main_destination.append(mainImgCreate);
    miniature_destination.append(miniatureImgCreate);
  }
}
// Aggiunge listener su click delle miniature
function addMiniatureListener(main_imgArray, main_textArray, miniature_imgArray) {
  for (let i = 0; i < images.length; i++) {
    miniature_imgArray[i].addEventListener("click", function(){
      if(miniature_imgArray[i].classList.contains("inactive")) {
        main_imgArray[activeNow].classList.add("hidden");
        main_textArray[activeNow].classList.add("hidden");
        miniature_imgArray[activeNow].classList.add("inactive")
        activeNow = i ;
        main_imgArray[activeNow].classList.remove("hidden");
        main_textArray[activeNow].classList.remove("hidden");
        miniature_imgArray[activeNow].classList.remove("inactive")
      }
    })    
  }
}
//  Swap dell'attuale attivo col prossimo
function swapOnward(main_imgArray, main_textArray, miniature_imgArray) {
  main_imgArray[activeNow].classList.add("hidden");
  main_textArray[activeNow].classList.add("hidden");
  miniature_imgArray[activeNow].classList.add("inactive")
  if (activeNow < images.length - 1) {
    activeNow++;
  } else {
      activeNow = 0;
  }
  main_imgArray[activeNow].classList.remove("hidden");
  main_textArray[activeNow].classList.remove("hidden");
  miniature_imgArray[activeNow].classList.remove("inactive")
}
// Swap dell'attuale attivo col precedente
function swapBackward(main_imgArray, main_textArray, miniature_imgArray) {
  main_imgArray[activeNow].classList.add("hidden");
  main_textArray[activeNow].classList.add("hidden");
  miniature_imgArray[activeNow].classList.add("inactive")
  if (activeNow > 0){
    activeNow--;
  } else {
    activeNow = images.length - 1;
  }
  main_imgArray[activeNow].classList.remove("hidden");
  main_textArray[activeNow].classList.remove("hidden");
  miniature_imgArray[activeNow].classList.remove("inactive")
}
// Funzione autoplay
let onward = true;
var autoplay = setInterval(function() {
  if(onward) {
    swapOnward(mainImg, mainText, miniatureImg);
  } else {
    swapBackward(mainImg, mainText, miniatureImg);
  }
}, 5000);

// Template immagine grande + destinazione
const mainImgTemplate = document.getElementById("carousel-main_img").content;
const mainDestination = document.querySelector(".col-9");
// Template immagini piccole + destinazione
const miniatureTemplate = document.getElementById("miniature_img").content;
const miniatureDestination = document.querySelector(".col-3");

carouselImages(mainImgTemplate, mainDestination, miniatureTemplate, miniatureDestination);

// Array immagini grandi e relativo testo
const mainImg = document.querySelectorAll(".col-9 img");
const mainText = document.querySelectorAll(".image-text");
// Array immagini piccole
const miniatureImg = document.querySelectorAll(".row");
// Inizializzazione indice immagine attiva
let activeNow = 0;

addMiniatureListener(mainImg, mainText, miniatureImg);
// autoplay(mainImg, mainText, miniatureImg);

// Pulsanti previous e next
const nextBtn = document.querySelector(".next i");
const prevBtn = document.querySelector(".previous i");
// Event Listener su click
nextBtn.addEventListener("click", function(){
  swapOnward(mainImg, mainText, miniatureImg);
  // Ferma autoplay su click
  clearInterval(autoplay);
  // Setta verso dell'autoplay
  onward = true;
  // Timeout prima che ricominci autoplay
  const pausa = setTimeout(() => {
    var autoplay = setInterval(function() {
      if(onward) {
        swapOnward(mainImg, mainText, miniatureImg);
      } else {
        swapBackward(mainImg, mainText, miniatureImg);
      }
    }, 5000);
  }, 10000);
})
prevBtn.addEventListener("click", function(){
  swapBackward(mainImg, mainText, miniatureImg);
  // Ferma autoplay su click
  clearInterval(autoplay);
  // Setta verso dell'autoplay
  onward = false;
  const pausa = setTimeout(() => {
    var autoplay = setInterval(function() {
      if(onward) {
        swapOnward(mainImg, mainText, miniatureImg);
      } else {
        swapBackward(mainImg, mainText, miniatureImg);
      }
    }, 5000);
  }, 10000);
})

