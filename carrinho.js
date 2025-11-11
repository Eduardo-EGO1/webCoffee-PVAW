//JUNTEI TUDO NO MAIN.JS 























let listProducts = [];
let carts;

function startCarts() {
  carts = JSON.parse(localStorage.getItem('cart')) || [];
}

function abrirCarrinho() {
  imgCart.addEventListener('click', () => {
    sideCartContainer.classList.add('ativo');
  })
}

function atualizarContador() {
  let total = 0;
  for (let i = 0; i < carts.length; i++) {
    total = total + carts[i].quantity
  }
  spanCart.textContent = total;
}
function fecharCarrinho() {
  addProduto()
}

function somaCarrinho() {
  let soma = 0;
  for (let i = 0; i < carts.length; i++) {
    let id = carts[i].cafe_id
    for (let j = 0; j < cafeList.length; j++) {
      if (String(cafeList[j].id) === String(id)) {
        soma = soma + (cafeList[j].price * carts[i].quantity);
        break;
      }
    }
  }
  return soma;
}

cartContent.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('cart-remove')) {
    const product_id = target.closest('.cart-box').dataset.id;
    const indexCart = carts.findIndex((value) => value.cafe_id == product_id);
    if (indexCart >= 0) {
      carts.splice(indexCart, 1);
      addCarrinhoLocal();
      renderLocalCart();
    }
  }
});

cartContent.addEventListener('click', (event) => {
  const mouseClick = event.target;

  // só entra se o clique for em algum botão de + ou -
  if (mouseClick.classList.contains('button-decrement') || mouseClick.classList.contains('button-increment')) {
    const product_id = mouseClick.closest('.cart-box').dataset.id;

    const type = mouseClick.classList.contains('button-increment')
      ? 'increment'
      : 'decrement';

    changeQuantity(product_id, type);
  }
});

const changeQuantity = (product_id, type) => {
  const indexCart = carts.findIndex((value) => value.cafe_id == product_id);
  if (indexCart >= 0) {
    if (type === 'increment') {
      carts[indexCart].quantity++;
    } else {
      carts[indexCart].quantity--;
    } if (carts[indexCart].quantity <= 0) {
      carts.splice(indexCart, 1);
    }

  }
  addCarrinhoLocal();
  renderLocalCart();
}


const spanPrice = document.createElement('span');
totalPrice.appendChild(spanPrice);

function renderLocalCart() {
  cartContent.innerHTML = '';
  carts.forEach(item => {
    const cafe = cafeList.find(c => String(c.id) === String(item.cafe_id));
    if (!cafe) return;

    const cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');
    cartBox.dataset.id = cafe.id;

    const imgCartBox = document.createElement('img');
    imgCartBox.classList.add('img-cart-box');
    imgCartBox.src = cafe.image;

    const productTitle = document.createElement('h2');
    productTitle.textContent = cafe.title;
    productTitle.classList.add('cart-product-title');

    const cartPrice = document.createElement('span');
    cartPrice.textContent = `R$ ${cafe.price.toFixed(2)}`;
    cartPrice.classList.add('cart-price');

    const cartDetail = document.createElement('div');
    cartDetail.classList.add('cart-detail');

    const cartQuantity = document.createElement('div');
    cartQuantity.classList.add('cart-quantity');

    const buttonIncrement = document.createElement('button');
    buttonIncrement.classList.add('button-increment')
    buttonIncrement.textContent = '+';

    const number = document.createElement('span');
    number.classList.add('number');
    number.innerText = item.quantity;

    const buttonDecrement = document.createElement('button');
    buttonDecrement.classList.add('button-decrement')
    buttonDecrement.textContent = '-';

    const cartRemove = document.createElement('img');
    cartRemove.src = "images/removecart.svg";
    cartRemove.classList.add('cart-remove');



    cartQuantity.append(buttonDecrement, number, buttonIncrement);
    cartDetail.append(productTitle, cartPrice, cartQuantity);
    cartBox.append(imgCartBox, cartDetail, cartRemove);
    cartContent.appendChild(cartBox);
  });

  atualizarContador();
  const soma = somaCarrinho();
  spanPrice.innerHTML = `Total R$ ${soma.toFixed(2)}`;
}


function addProduto() {
  const buttons = document.querySelectorAll('.button-add');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const cafeId = event.target.dataset.id;
      const cafe = cafeList.find(item => item.id == cafeId);

      if (cafe) {
        let indexCart = carts.findIndex((value) => value.cafe_id == cafeId);

        if (indexCart === -1) {
          carts.push({
            cafe_id: cafeId,
            quantity: 1
          });

          const cartBox = document.createElement('div');
          cartBox.classList.add('cart-box');
          cartBox.dataset.id = cafeId;

          const imgCartBox = document.createElement('img');
          imgCartBox.classList.add('img-cart-box');
          imgCartBox.src = cafe.image;

          const productTitle = document.createElement('h2');
          productTitle.textContent = cafe.title;
          productTitle.classList.add('cart-product-title');

          const cartPrice = document.createElement('span');
          cartPrice.textContent = `R$ ${cafe.price.toFixed(2)}`;
          cartPrice.classList.add('cart-price');
          spanPrice

          const cartDetail = document.createElement('div');
          cartDetail.classList.add('cart-detail');

          const cartQuantity = document.createElement('div');
          cartQuantity.classList.add('cart-quantity');

          const buttonIncrement = document.createElement('button');
          buttonIncrement.textContent = '+';
          buttonIncrement.classList.add('button-increment');

          const number = document.createElement('span');
          number.classList.add('number');
          number.innerText = 1;

          const buttonDecrement = document.createElement('button');
          buttonDecrement.textContent = '-';
          buttonDecrement.classList.add('button-decrement');

          const cartRemove = document.createElement('img');
          cartRemove.src = "images/removecart.svg";
          cartRemove.classList.add('cart-remove');

          cartQuantity.append(buttonDecrement, number, buttonIncrement);
          cartDetail.append(productTitle, cartPrice, cartQuantity);
          cartBox.append(imgCartBox, cartDetail, cartRemove);
          cartContent.appendChild(cartBox);


        } else {

          carts[indexCart].quantity++;
          const existingCartBox = cartContent.querySelector(
            `.cart-box[data-id="${cafeId}"]`
          );
          if (existingCartBox) {
            const numberElement = existingCartBox.querySelector('.number');
            if (numberElement) {
              numberElement.innerText = carts[indexCart].quantity;
            }
          }
          console.log('coloquei no carrinho')
        }
        sideCartContainer.classList.add('ativo');

        atualizarContador();
        const soma = somaCarrinho();
        spanPrice.innerHTML = `Total R$ ${soma.toFixed(2)}`
        addCarrinhoLocal();
      }
    });
  });
}


const addCarrinhoLocal = () => {
  localStorage.setItem('cart', JSON.stringify(carts))
};

startCarts()
imgCart.onclick = abrirCarrinho
addProduto()
renderLocalCart()
atualizarContador()
somaCarrinho()
