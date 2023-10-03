class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="navbar bg-primary text-primary-content">
        <a href="/" class="btn btn-ghost normal-case text-xl">DicoMovie</a>
    </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
