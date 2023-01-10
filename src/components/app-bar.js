class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <header class="bg-tema-cokelat text-white">
    <nav class="flex h-16 items-center px-4">
        <span class="logo font-bold">E-Commercean</span>
        <ul class="ml-auto flex gap-6">
            <li class="cursor-pointer hover:text-tema-accent">About Me</li>
            <li class="cursor-pointer cart-link">Cart</li>
            <li class="cursor-pointer">All Products</li>
        </ul>
    </nav>
</header>
        `;
  }
}

customElements.define('app-bar', AppBar);
