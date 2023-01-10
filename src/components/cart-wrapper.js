import './cart-item';

class CartWrapper extends HTMLElement {
  set items(items) {
    this._items = items;
    this.render();
  }

  render() {
    this.classList.add(
      'container-list',
      'mt-4',
      'overflow-y-auto',
      'h-full',
      'flex',
      'flex-col',
      'gap-4'
    );
    this.innerHTML = '';
    if (this._items.length) {
      this._items.forEach((item) => {
        const cartItemElement = document.createElement('cart-item');
        cartItemElement.item = item;
        this.appendChild(cartItemElement);
      });
    } else {
      this.innerHTML = 'Kamu Belum Belanja';
    }
  }
}

customElements.define('cart-wrapper', CartWrapper);
