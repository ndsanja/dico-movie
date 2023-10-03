import axios from 'axios';

import '../components/AppBar';
import '../components/Search';
import '../components/Footer';
import '../components/CardMovie';

async function main() {
  const root = document.getElementById('root');

  let initMovieData = [];
  let searchMovieData = [];

  const baseUrl = 'https://api.themoviedb.org';
  const headersConfig = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTFlMjAyMmE0ZTE4OTdiNGFjN2Y5YmJiYmM1MWFjMSIsInN1YiI6IjY1MWJhZmFkOTY3Y2M3MzQyNjBhNmZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P_eItLivO3NtGKkDWT32fc2TcQWoBiYZHtHGE_uK-zU',
      accept: 'application/json',
    },
  };

  async function fetchInitMovies() {
    try {
      const response = await axios.get(
        `${baseUrl}/3/trending/movie/day?language=en-US'`,
        headersConfig,
      );
      const data = response.data.results;
      initMovieData = data;
    } catch (error) {
      throw new Error('Something wrong');
    }
  }
  await fetchInitMovies();

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
  initMovieData.forEach((movie) => {
    const movieCard = document.createElement('card-movie');
    movieCard.movie = movie;
    moviesContainer.appendChild(movieCard);
  });

  // Search Movie
  async function fetchSearchMovies() {
    try {
      const response = await axios.get(
        `${baseUrl}/3/search/movie?query=${searchInput.value}`,
        headersConfig,
      );
      const data = response.data.results;
      searchMovieData = data;
    } catch (error) {
      throw new Error('Something wrong');
    }
  }

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    moviesContainer.innerText = '';

    await fetchSearchMovies();

    if (searchMovieData.length) {
      searchMovieData.forEach((movie) => {
        const movieCard = document.createElement('card-movie');
        movieCard.movie = movie;

        moviesContainer.appendChild(movieCard);
      });
    } else {
      moviesContainer.innerHTML = `
      <div>
        <p>Movie tidak ditemukan</p>
      </div>
      `;
    }
  });
}

export default main;
