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

function carouselImages() {
  for (let i = 0; i < images.length; i++) {
    const element = images[i];

    if (i === 0) {
      document.querySelector(".col-9").innerHTML += 
      `<img class="active" src="${element.image}" alt="${element.title}" />
        <div class="image-text active">
          <h3 class="title">${element.title}</h3>
          <p class="text">${element.text}</p>
        </div>`;

      document.querySelector(".col-3").innerHTML = 
      `<div class="row"><img src="${element.image}" alt="" /></div>`;
    } else {
      document.querySelector(".col-9").innerHTML += 
      `<img class="hidden" src="${element.image}" alt="${element.title}" />
        <div class="image-text hidden">
          <h3 class="title">${element.title}</h3>
          <p class="text">${element.text}</p>
        </div>`;
      document.querySelector(".col-3").innerHTML += 
      `<div class="row inactive"><img src="${element.image}" alt="" /></div>`;
    }
  }
}

carouselImages();
