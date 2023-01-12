import '../components/app-bar';
import '../components/cart-wrapper';
import '../components/cart-item';
// eslint-disable-next-line import/no-unresolved
import Swal from 'sweetalert2';

const PRODUCTS_WRAPPER = 'products-wrapper';
const BUTTON_CLOSE_MODAL_CART = 'carts-wrapper__header button';
const CARTS_WRAPPER = 'carts-wrapper';
const LINK_OPEN_MODAL_CART = 'cart-link';

const main = () => {
  const cartWrapperElement = document.querySelector('cart-wrapper');

  const showSwalError = (message) => {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
    });
  };

  const fetchAllCarts = () => {
    try {
      const allData = JSON.parse(window.localStorage.getItem('cart'));
      cartWrapperElement.items = allData;
    } catch (error) {
      showSwalError(error.message);
    }
  };

  const renderAllProduct = (products) => {
    const productsWrapper = document.querySelector(`.${PRODUCTS_WRAPPER}`);
    productsWrapper.innerHTML = '';

    const addToCart = async (product) => {
      try {
        if (typeof !Storage !== 'undefined') {
          const oldData = JSON.parse(window.localStorage.getItem('cart'));
          const isAlready = oldData.findIndex((item) => item.id === product.id);
          const cartAddData = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            total: 1,
          };
          if (isAlready === -1) {
            oldData.push(cartAddData);
          } else {
            oldData[isAlready].total += 1;
          }
          window.localStorage.setItem('cart', JSON.stringify(oldData));
          fetchAllCarts();
        }
      } catch (error) {
        showSwalError(error.message);
      }
    };

    products.forEach((item, index) => {
      productsWrapper.innerHTML += `
        <div
        class="card-item h-[50vh] bg-tema-cokelat text-white rounded relative group hover:border border-tema-accent flex flex-col">
        <img src="${item.image}" alt=""
            class="h-[50%] w-full object-cover rounded">
        <div class="description-wrapper min-h-[10%] flex justify-between p-2">
            <span class="inline-block max-w-[75%]">--${item.title}--</span>
            <span class="ml-auto inline-block font-semibold text-right max-w-[25%]">Rp. ${item.price}</span>

        </div>
        <div class="description-wrapper h-[30%] p-2 pb-2 text-sm overflow-hidden mt-2 md:mt-4">
            <p class="h-full overflow-hidden text-justify">${item.description}</p>
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

  const fetchAllProducts = async () => {
    try {
      document.querySelector('.category').innerText = 'Semua';
      const response = await fetch('https://fakestoreapi.com/products');
      const responseJson = await response.json();
      renderAllProduct(responseJson);
    } catch (error) {
      showSwalError(error.message);
    }
  };

  const fetchProductByCategory = async (category) => {
    try {
      document.querySelector('.category').innerText = category;
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const responseJson = await response.json();
      renderAllProduct(responseJson);
    } catch (error) {
      showSwalError(error.message);
    }
  };

  const renderAllCategories = (categories) => {
    const listCategories = document.createElement('ul');
    const categoryElementSemua = document.createElement('li');
    categoryElementSemua.innerText = 'Semua';
    categoryElementSemua.classList.add('cursor-pointer', 'pt-2');
    categoryElementSemua.addEventListener('click', () => {
      fetchAllProducts();
    });
    listCategories.appendChild(categoryElementSemua);
    categories.forEach((category) => {
      const categoryElement = document.createElement('li');
      categoryElement.innerText = category;
      categoryElement.classList.add('cursor-pointer', 'pt-2');
      categoryElement.addEventListener('click', () => {
        fetchProductByCategory(category);
      });
      listCategories.appendChild(categoryElement);
    });
    document.querySelector('.list-category').appendChild(listCategories);
  };

  const fetchAllCategories = async () => {
    try {
      const response = await fetch(
        'https://fakestoreapi.com/products/categories'
      );
      const responseJson = await response.json();
      renderAllCategories(responseJson);
    } catch (error) {
      showSwalError(error.message);
    }
  };

  const toggleCartSection = () => {
    if (
      document.querySelector(`.${CARTS_WRAPPER}`).classList.contains('hidden')
    ) {
      document.querySelector(`.${CARTS_WRAPPER}`).classList.remove('hidden');
    } else {
      document.querySelector(`.${CARTS_WRAPPER}`).classList.add('hidden');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.localStorage.setItem('cart', JSON.stringify([]));
    document
      .querySelector(`.${BUTTON_CLOSE_MODAL_CART}`)
      .addEventListener('click', () => {
        toggleCartSection();
      });
    document
      .querySelector(`.${LINK_OPEN_MODAL_CART}`)
      .addEventListener('click', () => {
        toggleCartSection();
      });

    fetchAllProducts();
    fetchAllCategories();
    fetchAllCarts();
    toggleCartSection();
  });
};

export default main;
