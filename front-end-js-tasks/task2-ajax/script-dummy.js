'use strict'
console.log("hello");

const figCaptionElem = document.querySelector('figcaption');
const imgElem = document.querySelector('img');

const getData = async () => {
    const response = await fetch('pics.json');
    console.log(response);
    const data = await response.json();
    console.log(data);
    figCaptionElem.innerText = data[0].name;
    imgElem.src = data[0].url;
    imgElem.alt = data[0].description;
};

getData();
figCaptionElem.innerText = "this is figcaption.";
console.log("last line of code");