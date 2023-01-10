import './cart-wrapper';
// eslint-disable-next-line import/no-unresolved
import Swal from 'sweetalert2';

class CartItem extends HTMLElement {
  set item(item) {
    this._item = item;
    this.render();
  }

  // eslint-disable-next-line class-methods-use-this
  showAlert(text) {
    Swal.fire({
      title: 'Success!',
      text,
      icon: 'success',
      confirmButtonText: 'Cool',
    });
  }

  render() {
    this.classList.add(
      'container-list__item',
      'h-32',
      'w-full',
      'bg-tema-accent',
      'rounded',
      'p-4',
      'flex',
      'gap-4'
    );
    this.innerHTML = `
    <div class="container-list__item--image w-32 max-h-32">
        <img src="${this._item.image}" alt=""
        class="w-full h-full rounded object-cover hover:object-contain border border-tema-cokelat">
    </div>
    <div
        class="container-list__item--description basis-full w-full h-full p-2 flex flex-col justify-between">
        <h5 class="text-h5 text-tema-cokelat">${this._item.title}</h5>
        <h6 class="text-sm text-tema-cokelat">${this._item.price}</h6>

        <div class="tools w-32 h-fit grid grid-cols-3">
            <button class="border rounded-l bg-tema-cokelat tools-kurang">-</button>
            <div class="border text-center text-tema-cokelat">${this._item.total}</div>
            <button class="border rounded-r bg-tema-cokelat tools-tambah">+</button>
        </div>
    </div>
    `;

    this.querySelector('.tools .tools-tambah').addEventListener('click', () => {
      const oldData = JSON.parse(window.localStorage.getItem('cart'));

      const isAlready = oldData.findIndex((item) => item.id === this._item.id);
      oldData[isAlready].total += 1;

      const cartWrapper = document.querySelector('cart-wrapper');
      cartWrapper.items = oldData;
      this.showAlert(`Menambahkan ${oldData[isAlready].title} sebanyak 1 buah`);

      window.localStorage.setItem('cart', JSON.stringify(oldData));
    });

    this.querySelector('.tools .tools-kurang').addEventListener('click', () => {
      const oldData = JSON.parse(window.localStorage.getItem('cart'));

      const isAlready = oldData.findIndex((item) => item.id === this._item.id);
      oldData[isAlready].total -= 1;

      const cartWrapper = document.querySelector('cart-wrapper');
      cartWrapper.items = oldData;
      this.showAlert(
        `Mengurangkan ${oldData[isAlready].title} sebanyak 1 buah`
      );

      window.localStorage.setItem('cart', JSON.stringify(oldData));
    });
  }
}

customElements.define('cart-item', CartItem);
