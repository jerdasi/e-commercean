class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <button class='bg-red text-white'>Tes</button>
        `;
  }
}

customElements.define('app-bar', AppBar);
