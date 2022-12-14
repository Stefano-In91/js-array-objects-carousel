"use strict";

/*-----------
  OBJECTS
-----------*/
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

/*-----------
  FUNCTIONS
-----------*/
//Riempie il carosello con le immagini dell'array
function carouselImages(main_template, main_destination, miniature_template, miniature_destination) {
  images.forEach((object, index) => {
    const mainImgCreate = main_template.cloneNode(true);
    const miniatureImgCreate = miniature_template.cloneNode(true);
    mainImgCreate.querySelector(".main-img").src = object.image;
    mainImgCreate.querySelector(".title").innerHTML = object.title;
    mainImgCreate.querySelector(".text").innerHTML = object.text;
    miniatureImgCreate.querySelector("img").src = object.image;
    if (index !== 0) {
      mainImgCreate.querySelector(".main-carousel").classList.add("hidden");
      miniatureImgCreate.querySelector(".miniature-img").classList.add("inactive");
    }
    main_destination.append(mainImgCreate);
    miniature_destination.append(miniatureImgCreate);
  })
}
// Aggiunge listener su click delle miniature
function addMiniatureListener(main_imgArray, miniature_imgArray) {
  for (let i = 0; i < miniature_imgArray.length; i++) {
    miniature_imgArray[i].addEventListener("click", function(){
      playlistTimeout();
      if(miniature_imgArray[i].classList.contains("inactive")) {
        main_imgArray[activeNow].classList.add("hidden");
        miniature_imgArray[activeNow].classList.add("inactive")
        activeNow = i ;
        main_imgArray[activeNow].classList.remove("hidden");
        miniature_imgArray[activeNow].classList.remove("inactive")
      }
    })    
  }
}
//  Swap dell'attuale attivo col prossimo o precedente a seconda della direzione
function swapImg(main_imgArray, miniature_imgArray, direction) {
  main_imgArray[activeNow].classList.add("hidden");
  miniature_imgArray[activeNow].classList.add("inactive")
  if (direction) {
    if (activeNow < images.length - 1) {
      activeNow++;
    } else {
      activeNow = 0;
    }
  } else {
    if (activeNow > 0){
      activeNow--;
    } else {
      activeNow = images.length - 1;
    }
  }
  main_imgArray[activeNow].classList.remove("hidden");
  miniature_imgArray[activeNow].classList.remove("inactive")
}
// Inizializzazione verso swap Img
let onward = true;
// Inizializzazione container degli autoplay
const autoplayList = [];
let autoNow = 0;
// Funzione autoplay
const autoplay = setInterval(function() {
  swapImg(mainImg, miniatureImg, onward);
}, 3000);
autoplayList.push(autoplay);
// Inizializzazione status autoplay
let stopped = 0;
// Funzione timeout per autoplay
function playlistTimeout() {
  // Ferma autoplay
  clearInterval(autoplayList[autoNow]);
  // Controlla che timeout sia partito correttamente
  if (stopped === 0) {
    stopped = 1;
  }
  // Parte timeout se l'ultimo autoplay ?? partito e si ?? fermato correttamente
  if (stopped === 1) {
    stopped = 2;
    setTimeout(() => {
      const autoplay = setInterval(function() {
        swapImg(mainImg, miniatureImg, onward);
      }, 3000);
      autoplayList.push(autoplay);
      autoNow++;
      // Timeout partito correttamente
      stopped = 0;
    }, 9000);
  }
}

/*-----------
    MAIN
-----------*/
// Template immagine grande + destinazione
const mainImgTemplate = document.getElementById("carousel-main_img").content;
const mainDestination = document.querySelector(".col-9");
// Template immagini piccole + destinazione
const miniatureTemplate = document.getElementById("miniature_img").content;
const miniatureDestination = document.querySelector(".col-3");

carouselImages(mainImgTemplate, mainDestination, miniatureTemplate, miniatureDestination);

// Array immagini grandi e relativo testo
const mainImg = document.querySelectorAll(".main-carousel");
// Array immagini piccole
const miniatureImg = document.querySelectorAll(".miniature-img");
// Inizializzazione indice immagine attiva
let activeNow = 0;

addMiniatureListener(mainImg, miniatureImg);

// Pulsanti previous e next
const nextBtn = document.querySelector(".next i");
const prevBtn = document.querySelector(".previous i");
// Event Listener su click
nextBtn.addEventListener("click", function(){
  // Setta verso dello swap
  onward = true;
  swapImg(mainImg, miniatureImg, onward);
  
  playlistTimeout();
})
prevBtn.addEventListener("click", function(){
  // Setta verso dello swap
  onward = false;
  swapImg(mainImg, miniatureImg, onward);

  playlistTimeout();
})