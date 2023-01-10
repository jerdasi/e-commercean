import '../components/app-bar';

const PRODUCTS_WRAPPER = 'products-wrapper';
const BUTTON_CLOSE_MODAL_CART = 'carts-wrapper__header button';
const CARTS_WRAPPER = 'carts-wrapper';
const LINK_OPEN_MODAL_CART = 'cart-link';

function main() {
  const fetchAllProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const responseJson = await response.json();
      console.log(responseJson);
      renderAllProduct(responseJson);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCarts = () => {
    try {
      const allData = JSON.parse(document.localStorage.getItem('cart'));
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (product) => {
    try {
      if (typeof !Storage !== 'undefined') {
        let oldData = JSON.parse(window.localStorage.getItem('cart'));
        oldData.push(product);
        window.localStorage.setItem('cart', JSON.stringify(oldData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderAllProduct = (products) => {
    let products_wrapper = document.querySelector(`.${PRODUCTS_WRAPPER}`);
    products_wrapper.innerHTML = '';

    products.forEach((item, index) => {
      products_wrapper.innerHTML += `
        <div
        class="card-item h-[50vh] bg-tema-cokelat text-white rounded relative group hover:border border-tema-accent flex flex-col">
        <img src="${item.image}" alt=""
            class="h-[50%] w-full object-cover rounded">
        <div class="description-wrapper min-h-[10%] flex justify-between p-2 ">
            <span>${item.title}</span>
            <span class="ml-auto inline-block">Rp. ${item.price}</span>

        </div>
        <div class="description-wrapper h-[30%] p-2 pb-8 text-sm overflow-hidden mt-4">
            <p class="h-full overflow-hidden">${item.description}</p>
        </div>
        <div
            class="hidden absolute top-0 h-[50vh] w-full z-10 items-center justify-center bg-[#000]/[.7] group-hover:flex border-b border-tema-accent">
            <button class="bg-tema-accent text-tema-cokelat p-2 rounded button-tambah" id=${index}>Tambahkan</button>
        </div>
    </div>
        `;
    });
    document.querySelectorAll('.button-tambah').forEach((button) => {
      button.addEventListener('click', (event) => {
        addToCart(products[event.target.id]);
      });
    });
  };

  const toggleCartSection = () => {
    if (
      document.querySelector(`.${CARTS_WRAPPER}`).classList.contains('hidden')
    ) {
      console.log('Jalan');
      document.querySelector(`.${CARTS_WRAPPER}`).classList.remove('hidden');
    } else {
      document.querySelector(`.${CARTS_WRAPPER}`).classList.add('hidden');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.localStorage.setItem('cart', JSON.stringify([]));
    document
      .querySelector(`.${BUTTON_CLOSE_MODAL_CART}`)
      .addEventListener('click', toggleCartSection);
    document
      .querySelector(`.${LINK_OPEN_MODAL_CART}`)
      .addEventListener('click', toggleCartSection);

    fetchAllProducts();
    toggleCartSection();
    console.log(document.querySelector(`.${PRODUCTS_WRAPPER}`));
  });
}

export default main;
