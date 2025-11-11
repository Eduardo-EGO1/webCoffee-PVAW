
async function getCafeList() {
  try {
    const res = await fetch("http://localhost:3000/cafe")
    if (!res.ok) throw new Error("Erro na requisição")
    const data = await res.json()

    return data;
  }
  catch (error) {
    console.error("Erro capturado", error)
  }
}




// SELETORES DOM
const root = document.querySelector('#root');
const nav = document.createElement('nav');
const sectionNav = document.createElement('section');
const imgLogo = document.createElement('img');
const imgCart = document.createElement('img');
const h1Logo = document.createElement('h1');
const productContainer = document.createElement('div');
const main = document.createElement('main');
const divCart = document.createElement('div');
const spanCart = document.createElement('span');
const sideCartContainer = document.createElement('aside');
const h2Side = document.createElement('h2');
const productTitle = document.createElement('h2')
const cartContent = document.createElement('div');
const cartDetail = document.createElement('div');
const cartQuantity = document.createElement('div');
const buttonIncrement = document.createElement('button');
const buttonDecrement = document.createElement('button');
const spanQuantity = document.createElement('span');

const cartPrice = document.createElement('span')
const total = document.createElement('div')
const totalTitle = document.createElement('div')
const totalPrice = document.createElement('div')
const buttonBuy = document.createElement('button')
const removeCart = document.createElement('img');
const closeCart = document.createElement('img');


//Array de todas os elementos para rootChilds
const rootChilds = [nav, sectionNav, productContainer, main, sideCartContainer]

//Add elementos na div principal root
rootChilds.forEach((item) => {
  root.appendChild(item);
})

//Add elementos
divCart.appendChild(imgCart)
divCart.appendChild(spanCart)
sectionNav.appendChild(imgLogo)
sectionNav.appendChild(h1Logo)
nav.appendChild(sectionNav)
nav.appendChild(divCart)
main.appendChild(productContainer)
sideCartContainer.appendChild(h2Side)
sideCartContainer.appendChild(cartContent)
sideCartContainer.appendChild(total)
sideCartContainer.appendChild(closeCart)
total.appendChild(totalTitle)
total.appendChild(totalPrice)

cartDetail.appendChild(cartQuantity)
cartDetail.appendChild(productTitle)
cartDetail.appendChild(cartPrice)
cartQuantity.appendChild(buttonDecrement)
cartQuantity.appendChild(spanQuantity)
cartQuantity.appendChild(buttonIncrement)




//Add classes
productContainer.classList.add('product-container')
sectionNav.classList.add('logo')
divCart.classList.add('cart-menu')
sideCartContainer.classList.add('cart-container')
cartContent.classList.add('card-content')
cartDetail.classList.add('cart-detail')
cartQuantity.classList.add('cart-quantity')
buttonIncrement.setAttribute('id', 'button-increment')
buttonDecrement.setAttribute('id', 'button-decrement')
spanQuantity.classList.add('number')
cartPrice.classList.add('cart-price')
total.classList.add('total')
totalTitle.classList.add('total-title')
totalPrice.classList.add('total-price')
buttonBuy.classList.add('button-buy')
removeCart.classList.add('cart-remove')
closeCart.setAttribute('id', 'cart-close')
productTitle.classList.add('cart-product-title')
h2Side.classList.add('cart-main')



//Conteudos
h1Logo.innerText = "Café Pelé"
imgLogo.src = 'images/logo.png'
imgCart.src = 'images/cart.png'

let finishBuy = false;

function fecharCarrinho() {

  comprou = false

  sideCartContainer.classList.remove('ativo')
  if (finishBuy) {
    sideCartContainer.style.width = ""
    finishBuy = false;
    h2Side.textContent = "SEU CARRINHO"
    initComprarPage()
    addProduto()
  }
}

closeCart.addEventListener('click', () => {
  fecharCarrinho();
})


function finalizarCompra() {
  productContainer.innerHTML = '';
  finishBuy = true;
  if (finishBuy) {
    sideCartContainer.style.width = "100%";
    buttonBuy.textContent = "Ir ao Pagamento"
  }
}

let comprou = false;

function irPagamento() {
  cartContent.style.display = "none";
  h2Side.textContent = 'Confirmar Pedido'
  renderPagamento();
  comprou = true
}




const form = document.createElement('form');
form.classList.add('checkout-form');

form.innerHTML = `
  <label for="nome">Nome completo</label>
  <input type="text" id="nome" placeholder="Seu nome" autocomplete="name" required>

  <label for="email">E-mail</label>
  <input type="email" id="email" placeholder="seuemail@email.com" autocomplete="email" required>

  <label for="endereco">Endereço</label>
  <input type="text" id="endereco" placeholder="Rua, número, bairro" autocomplete="street-address" required>

  <label for="pagamento">Forma de Pagamento</label>
  <select id="pagamento" required>
    <option value="">Selecione</option>
    <option value="pix">PIX</option>
    <option value="cartao">Cartão de Crédito</option>
    <option value="boleto">Boleto</option>
  </select>

  <!-- área dinâmica -->
  <div id="area-metodo"></div>
`;



function validateForm() {
  let inputsValidos = 0;
  form.childNodes.forEach((child) => {
    if (child.value != '' && child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() === 'input') {
      inputsValidos++
    }
  })
  const teste = inputsValidos === 3
  return teste
}





function renderPagamento() {

  buttonBuy.setAttribute('type', 'submit');
  buttonBuy.textContent = "Efetuar Pedido";
  form.append(buttonBuy);


  sideCartContainer.appendChild(form);

  const pagamento = form.querySelector('#pagamento');
  const areaMetodo = form.querySelector('#area-metodo');

  pagamento.addEventListener("change", () => {
    areaMetodo.innerHTML = "";

    if (pagamento.value === "pix") {
      const chave = document.createElement("h4");
      chave.textContent = "Efetue o pagamento na seguinte chave PIX : cafepele@melhorcafe.com.br ";
      chave.style.marginTop = "10px";
      areaMetodo.appendChild(chave);

    } else if (pagamento.value === "cartao") {
      const numero = document.createElement("input");
      numero.placeholder = "Número do cartão";
      numero.required = true;
      numero.type = "text";
      numero.maxLength = 16;
      numero.autocomplete = "cc-number";
      numero.classList.add('input-pagamento');

      const cvv = document.createElement("input");
      cvv.placeholder = "CVV";
      cvv.required = true;
      cvv.type = "text";
      cvv.maxLength = 3;
      cvv.autocomplete = "cc-csc";
      cvv.classList.add('input-pagamento');

      areaMetodo.append(numero, cvv);

    } else if (pagamento.value === "boleto") {
      const avisoBoleto = document.createElement("p");
      avisoBoleto.textContent = "O boleto será gerado após a confirmação.";
      avisoBoleto.style.marginTop = "10px";
      areaMetodo.appendChild(avisoBoleto);
    }
  });
}






buttonBuy.addEventListener('click', () => {
  if (comprou) {
    let validou = validateForm()
    if (validou) {
      resetLocalStorage()
    }
  }
  if (!finishBuy) {
    finalizarCompra();
  }
  else {
    irPagamento()
  }
})


h2Side.textContent = "SEU CARRINHO"
removeCart.src = 'images/removecart.svg'
closeCart.src = 'images/closecart.svg'
buttonIncrement.textContent = '+'
buttonDecrement.textContent = '-'


const cafeList = await getCafeList()
function initComprarPage() {

  buttonBuy.textContent = "Finalizar Compra"
  sideCartContainer.appendChild(buttonBuy)

  const cafes = cafeList.forEach((cafe) => {

    const card = document.createElement('div');
    card.classList.add('card-style')

    const imgCard = document.createElement('img');
    imgCard.classList.add('image-style');
    imgCard.src = cafe.image;

    const pTitle = document.createElement('h3');
    pTitle.classList.add('title-style');
    pTitle.innerText = cafe.title


    const buttonAdd = document.createElement('button');
    buttonAdd.classList.add('button-add');
    buttonAdd.dataset.id = cafe.id;
    buttonAdd.textContent = "Adicionar ao Carrinho"

    const description = document.createElement('p');
    description.classList.add('description-style');
    description.innerText = cafe.description;

    const ingredientsTitle = document.createElement('ul');
    ingredientsTitle.classList.add('ingredients-title-style');
    ingredientsTitle.innerText = "Ingredientes: "

    const price = document.createElement('li');
    price.classList.add('ingredients-list-style')
    price.textContent = `R$ ${cafe.price.toFixed(2)}`

    const ingredients = document.createElement('li');
    ingredients.classList.add('ingredient-item-style', 'ingredients-list-style');
    ingredients.textContent = cafe.ingredients

    ingredientsTitle.append(ingredients, price);
    card.append(pTitle, imgCard, description, ingredientsTitle, buttonAdd)
    productContainer.appendChild(card)

  })
}




let listProducts = [];
let carts;

function startCarts() {
  carts = JSON.parse(localStorage.getItem('cart')) || [];
}

function abrirCarrinho() {
  cartContent.style.display = "block";
  form.remove()
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

function resetLocalStorage() {
  localStorage.removeItem('cart')
  initGeral()
  alert('COMPRA EFETUADA COM SUCESSO, VOLTE SEMPRE!')
}


function initGeral() {
  initComprarPage()
  startCarts()
  addProduto()
  renderLocalCart()
  atualizarContador()
  somaCarrinho()
  imgCart.onclick = abrirCarrinho
}

initGeral()
