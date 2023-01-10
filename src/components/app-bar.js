class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <header class="bg-tema-cokelat text-white">
    <nav class="md:flex h-fit md:h-16 items-center px-4">
        <span class="logo font-bold py-4 inline-block">E-Commercean</span>
        <ul class="ml-auto md:flex gap-6">
            <li class="cursor-pointer hover:text-tema-accent py-1 md:p-0"><a href='https://www.linkedin.com/in/jerdasi/'>About Me</a></li>
            <li class="cursor-pointer cart-link py-1 md:p-0">Cart</li>
        </ul>
    </nav>
</header>
        `;
  }
}

customElements.define('app-bar', AppBar);
