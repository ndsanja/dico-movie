import axios from 'axios';

export default class Data {
  constructor() {
    this.baseUrl = 'https://api.themoviedb.org';

    this.headersConfig = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTFlMjAyMmE0ZTE4OTdiNGFjN2Y5YmJiYmM1MWFjMSIsInN1YiI6IjY1MWJhZmFkOTY3Y2M3MzQyNjBhNmZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P_eItLivO3NtGKkDWT32fc2TcQWoBiYZHtHGE_uK-zU',
        accept: 'application/json',
      },
    };
  }

  initData() {
    return axios.get(
      `${this.baseUrl}/3/trending/movie/day?language=en-US'`,
      this.headersConfig,
    ).then((response) => {
      if (response.data.results) {
        return Promise.resolve(response.data.results);
      }
      return Promise.reject(new Error('Something Wrong'));
    });
  }

  searchData(searchInput) {
    return axios.get(
      `${this.baseUrl}/3/search/movie?query=${searchInput}`,
      this.headersConfig,
    ).then((response) => {
      if (response.data.results) {
        return Promise.resolve(response.data.results);
      }
      return Promise.reject(new Error('Something Wrong'));
    });
  }
}
