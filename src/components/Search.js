class Search extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <form id='search-form' class='px-4 flex items-center gap-4'>
        <input id='search-input' type="text" placeholder="Search ..." class="input input-bordered w-full" />
        <button type='submit' id='searchButton' class="btn btn-primary">Search</button>
    </form>    
    `;
  }
}

customElements.define('search-bar', Search);
