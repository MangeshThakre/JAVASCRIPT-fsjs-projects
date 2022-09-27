const cart = document.querySelector("#cart");
const tBody = document.querySelector("#tBody");

const cartProduct = JSON.parse(localStorage.getItem("Cart"));

function initialLoad() {
  console.log(cartProduct);
  if (!cartProduct || cartProduct.length == 0) {
    cart.innerHTML = emptyCart();
  } else displayCart();
}

initialLoad();

/// display
function emptyCart() {
  return ` <div class="text-center font-bold text-5xl text-gray-400">
    Empty Cart
    </div>`;
}
// display cart product
function displayCart() {
  cartProduct.forEach((product, index) => {
    const tr = document.createElement("tr");
    tr.id = product.id;
    tr.className = ` ${
      index % 2 ? "bg-[#fcf7b9]" : "bg-[#fefad2]"
    }  dark:border-gray-700`;
    tr.innerHTML = cartProducts(
      product.images[0],
      product.title,
      product.description,
      product.itemCount,
      product.price,
      product.id
    );

    tBody.appendChild(tr);
  });
}

///////////////////handle remove
function handleRemove(productId) {
  for (const product of tBody.children) {
    if (tBody.children.length == 1) cart.innerHTML = emptyCart();
    if (product.id == productId) product.style.display = "none";
  }

  cartProduct.forEach((e, i) => {
    if (e.id == productId) {
      cartProduct.splice(i, 1);
      localStorage.setItem("Cart", JSON.stringify(cartProduct));
    }
  });
}

function handleInc(productId, tbodyEle) {
  let price = 0;
  let count = 1;
  cartProduct.forEach((e, i) => {
    if (e.id == productId) {
      count = e.itemCount + 1;
      price = e.price * (e.itemCount + 1);
      cartProduct[i].itemCount = e.itemCount + 1;
    }
  });

  for (const product of tbodyEle.children) {
    if (product.id == "counter")
      product.firstElementChild.children[1].textContent = count;
    if (product.id == "price")
      product.firstElementChild.textContent = "Rs " + price;
  }
  localStorage.setItem("Cart", JSON.stringify(cartProduct));
}

function handleDec(productId, tbodyEle) {
  let price = 0;
  let count = 0;
  cartProduct.forEach((e, i) => {
    if (e.id == productId && e.itemCount >= 1) {
      count = e.itemCount == 1 ? e.itemCount : e.itemCount - 1;
      price = e.itemCount == 1 ? e.price : e.itemCount * e.price - e.price;
      cartProduct[i].itemCount =
        e.itemCount > 1 ? e.itemCount - 1 : e.itemCount;
    }
  });

  for (const product of tbodyEle.children) {
    if (product.id == "counter")
      product.firstElementChild.children[1].textContent = count;
    if (product.id == "price")
      product.firstElementChild.textContent = "Rs " + price;
  }
  localStorage.setItem("Cart", JSON.stringify(cartProduct));
}

/// table

function cartProducts(image, title, description, itemCount, price, id) {
  return `
  <th
  scope="row"
  class="py-4 px-6 font-medium text-black whitespace-nowrap dark:text-white"
>
  <img class="w-20" src="${image}" alt="productImg" />
</th>

<!-- product info -->
<td class="py-4 px-6 max-w-xs text-gray-900">
  <h1 class="font-bold">${title}</h1>
  <p>${description}</p>
</td>

<!-- increase - decrease count  -->
<td  id ="counter" class="py-4 px-6">
  <div class="flex justify-center items-center gap-6">
    <button
      onclick ="handleInc(${id} , tbody = this.parentElement.parentElement.parentElement )"
      type="button"
      class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mb-2"
    >
      +
    </button>
    <h3 id="itemCount" >${itemCount}</h3>
    <button
    onclick ="handleDec(${id} , tbody = this.parentElement.parentElement.parentElement)"
      type="button"
      class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
    >
      -
    </button>
  </div>
</td>


<td id ="price"  
  class="py-4 px-6 max-w-xs text-gray-900">
  <p 
  class   ="price  font-semibold"> Rs ${price * itemCount}</p>
</td>


<!-- remove -->
<td class="py-4 px-6 flex justify-center items-center">
  <button
    type="button"
    onclick="handleRemove(${id} )"
    class="w-24 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
  >
    Remove
  </button>
</td>
  `;
}
