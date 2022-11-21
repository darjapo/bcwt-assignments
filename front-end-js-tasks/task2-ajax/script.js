'use strict'
const apiUrl = 'https://api.tvmaze.com/search/shows?q=';
// get references to DOM elements
const form = document.querySelector('#search-form');
const button = form.querySelector('button');
const input = form.querySelector('input');

button.addEventListener('click', (event) => {
    // do not submit the form to anywhere (no page refresh)
    event.preventDefault();
    // prevent the generic event listener at the bottom
    event.stopPropagation();
    if (input.value.length > 1) {
        const queryParam = input.value;
        getTVSeriesData(queryParam);
    };
});

const renderResults = (data) => {
    // clear existing results before appending new ones
    results.innerHTML = '';
    // loop through all search results
    for (let i=0; i<data.length; i++) {
        const h3 = document.createElement('h3');
        h3.textContent = data[i].show.name;

        const img = document.createElement('img');
        if (data[i].show.image != null) {
            img.src = data[i].show.image.medium
        } else {
            img.src = 'http://placekitten.com/200/300'
        }

        const pSum = document.createElement('p');
        pSum.innerHTML = "<b> Summary: </b>" + data[i].show.summary;

        const pOfSite = document.createElement('p');
        if (data[i].show.officialSite != null) {
            pOfSite.innerHTML = "<b> Official site: </b>" + data[i].show.officialSite;
        } else {
            pOfSite.innerHTML = "<b> Official site: </b> Sorry, there is no official site for this show!";
        }

        const genres = document.createElement('p');
        if (data[i].show.genres.length !== 0) {
            genres.innerHTML = "<b> Genres: </b>" + data[i].show.genres.join('|');
        } else {
            genres.innerHTML = "<b> Genres: </b> Sorry, there are no genres for this show!";
        }

        results.append(h3, img, pSum, pOfSite, genres);
    };
};

const getTVSeriesData = async (name) => {
    try {
        const response = await fetch(apiUrl + name);
        const data = await response.json();
        console.log('results:', data);
        renderResults(data);
    } catch (error) {
        console.log('network failure:', error);
    };
};

// generic event handler
document.addEventListener('click', (event) => {
    console.log('mouse clicked somewhere on the page', event);
});