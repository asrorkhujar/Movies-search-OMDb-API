const MOVIE_API_KEY = 'caed5284';
const MOVIE_SEARCH_URL = `https://omdbapi.com/?apikey=${MOVIE_API_KEY}`

const elSearchForm = document.querySelector('.js-search-form');
const elSearchInput = document.querySelector('.js-search-input');

const elMoviesList = document.querySelector('.movies-list');
const elMoviesItemTemplate = document.querySelector('#movies-item-template').content;

function showMovies (Search) {
  elMoviesList.innerHTML = '';

  const elMoviesListFragment = document.createDocumentFragment();
  Search.forEach(movie => {
    const elMoviesItem = elMoviesItemTemplate.cloneNode(true);
    elMoviesItem.querySelector('.movies-img').src = movie.Poster;
    elMoviesItem.querySelector('h3').textContent = movie.Title;
    elMoviesItem.querySelector('p').textContent = movie.Type;
    elMoviesItem.querySelector('.movies-year').textContent = movie.Year;

    elMoviesListFragment.appendChild(elMoviesItem);
  });

  elMoviesList.appendChild(elMoviesListFragment);
}

function getNewsJSON (url, callbackFn) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.Response === 'True') {
      callbackFn(data.Search);
    }
  });
}

function onSearchFormSubmit (evt) {
  evt.preventDefault();

  const urlForSearch = `${MOVIE_SEARCH_URL}&s=${elSearchInput.value.trim()}`;

  getNewsJSON(urlForSearch, showMovies);
}

if (elSearchForm) {
  elSearchForm.addEventListener('submit', onSearchFormSubmit);
}

getNewsJSON(showMovies);