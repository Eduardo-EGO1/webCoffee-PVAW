//JUNTEI TUDO NO MAIN.JS





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

  sideCartContainer.classList.remove('ativo')
  if (finishBuy) {
    sideCartContainer.style.width = ""
    console.log('fechou')
    finishBuy = false;
    h2Side.textContent = "SEU CARRINHO"
    initComprarPage()
    addProduto()
  }
  console.log(finishBuy)
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
  console.log(finishBuy)
}


function irPagamento() {
  cartContent.innerHTML = '';
  h2Side.textContent = 'Confirmar Pedido'
  renderPagamento();
}


function renderPagamento() {
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

  // adiciona o botão
  buttonBuy.setAttribute('type', 'submit');
  buttonBuy.textContent = "Efetuar Pedido";
  form.append(buttonBuy);

  // adiciona o form ao DOM
  cartContent.appendChild(form);

  // AGORA que o HTML existe, podemos buscar os elementos
  const pagamento = form.querySelector('#pagamento');
  const areaMetodo = form.querySelector('#area-metodo');

  pagamento.addEventListener("change", () => {
    areaMetodo.innerHTML = ""; // limpa o conteúdo anterior

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
const listProducts = [];
initComprarPage()


/*const addDataToHML = () => {
  productContainer.innerHTML = '';
  if (listProducts.length > 0) {
    productContainer.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('card-style')
      card.innerHTML = `${product.image} ${product.title}, ${product.price}`;
      producContainer.appendChild(card);
    })
  }
}*/
