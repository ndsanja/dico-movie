class CardMovie extends HTMLElement {
  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="card w-full bg-base-100 shadow-xl">
    <figure><img src=https://image.tmdb.org/t/p/original/${this._movie.backdrop_path} alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title text-primary line-clamp-1">
      ${this._movie.title}
      </h2>
      <p class='line-clamp-3 mt-4'>${this._movie.overview}</p>
    </div>
  </div>
      `;
  }
}

customElements.define('card-movie', CardMovie);
