//GLOBAL
//API key
const MOVIE_API_KEY = 'caed5284';
//omdbapi.com sayti linki
const MOVIE_SEARCH_URL = `https://omdbapi.com/?apikey=${MOVIE_API_KEY}`

//Elementlarni topib olamiz - DOM ELEMENTS
const elSearchForm = document.querySelector('.js-search-form');
const elSearchInput = document.querySelector('.js-search-input');

const elMoviesList = document.querySelector('.movies-list');
const elModal = document.querySelector('.modal');

const elMoviesItemTemplate = document.querySelector('#movies-item-template').content;


//FUNCTION
function getJSON (url, successFn, errorFn) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        successFn(data);
      } else {
        errorFn(data);
      }
    });
}

function showMovies (data) {
  elMoviesList.innerHTML = '';

  const elMoviesListFragment = document.createDocumentFragment();
  data.Search.forEach(movie => {
    const elMoviesItem = elMoviesItemTemplate.cloneNode(true);
    elMoviesItem.querySelector('.movies-img').src = movie.Poster;
    elMoviesItem.querySelector('.movies-img').alt = movie.Title;
    elMoviesItem.querySelector('h3').textContent = movie.Title;
    elMoviesItem.querySelector('.movies-year').textContent = movie.Year;
    elMoviesItem.querySelector('time').setAttribute = ('datetime', movie.Year);
    elMoviesItem.querySelector('.js-more-info-button').dataset.imdbId = movie.imdbID;

    elMoviesListFragment.appendChild(elMoviesItem);
  });

  elMoviesList.appendChild(elMoviesListFragment);
}


function showError (data) {
  console.log(data);
  console.error(data.Error);
}

function updateMovieInfoModal(data) {
  elModal.querySelector('h3').textContent = data.Title;
  elModal.querySelector('p').textContent = data.Plot;
  elModal.querySelector('.info-modal__duration').textContent = 'Duration - ' + data.Runtime + ',';
  elModal.querySelector('.info-modal__rating').textContent = 'IMDB rating - ' + data.imdbRating;
  elModal.querySelector('.info-modal__awards').textContent = 'Awards - ' + data.Awards;
  elModal.querySelector('time').textContent = data.Released;
}

function onSearchFormSubmit (evt) {
  evt.preventDefault();

  const urlForSearch = `${MOVIE_SEARCH_URL}&s=${elSearchInput.value.trim()}`;

  getJSON(urlForSearch, showMovies, showError);
}

function onMoviesListClick (evt) {
  if (evt.target.matches('.js-more-info-button')) {
    const movieInfoUrl = `${MOVIE_SEARCH_URL}&i=${evt.target.dataset.imdbId}`;

    getJSON(movieInfoUrl, updateMovieInfoModal, showError);
  }
}

//EVENT LISTENER
if (elSearchForm) {
  elSearchForm.addEventListener('submit', onSearchFormSubmit);
}

if (elMoviesList) {
  elMoviesList.addEventListener('click', onMoviesListClick)
}

// getJSON(showMovies);