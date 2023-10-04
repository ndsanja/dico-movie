import '../components/AppBar';
import '../components/Search';
import '../components/Footer';
import '../components/CardMovie';
import Data from '../data/getData';

const main = async () => {
  const root = document.getElementById('root');
  const dataSource = new Data();

  let initMovieData = [];
  let searchMovieData = [];
  let errorText = '';

  try {
    const data = await dataSource.initData();
    initMovieData = data;
  } catch (error) {
    errorText = error.message;
  }

  root.innerHTML = `
    <header>
        <app-bar><app-bar>
    </header>
    <main class='max-w-7xl mx-auto mb-20 mt-16'>
        <search-bar></search-bar>
        <div id='movies-container' class='mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        </div>
    </main>
    <footer-component></footer-component>
    `;

  const moviesContainer = document.getElementById('movies-container');
  const searchInput = document.getElementById('search-input');
  const searchForm = document.getElementById('search-form');

  // load initial data
  if (initMovieData.length) {
    initMovieData.forEach((movie) => {
      const movieCard = document.createElement('card-movie');
      movieCard.movie = movie;
      moviesContainer.appendChild(movieCard);
    });
  } else {
    moviesContainer.innerHTML = `
    <div>
      <p>${errorText}</p>
    </div>
    `;
  }

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    moviesContainer.innerText = '';

    try {
      const data = await dataSource.searchData(searchInput.value);
      searchMovieData = data;
      if (searchMovieData.length) {
        errorText = 'Movie tidak ditemukan';
      }
    } catch (error) {
      errorText = error.message;
    }

    if (searchMovieData.length) {
      searchMovieData.forEach((movie) => {
        const movieCard = document.createElement('card-movie');
        movieCard.movie = movie;
        moviesContainer.appendChild(movieCard);
      });
    } else {
      moviesContainer.innerHTML = `
      <div>
        <p>${errorText}</p>
      </div>
      `;
    }
  });
};

export default main;
