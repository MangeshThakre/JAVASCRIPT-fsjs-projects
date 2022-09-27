const API = "https://api.escuelajs.co/api/v1";

// elements
const catecoriesEle = document.querySelector("#categories");
const categoryEle = document.querySelectorAll("#category");
const productHeaderText = document.querySelector("#productHeaderText");
const productsEle = document.querySelector("#products");
const cartButton = document.querySelector("#cartButton");
const cartNo = document.querySelector("#cartNo");
const dropdownDefaultRadio = document.querySelector("#dropdownDefaultRadio");
//

let productsArr = [];
let categoriesArr = [];
let category = "";

function initialLoad() {
  const cartProduct = JSON.parse(localStorage.getItem("Cart"));
  if (cartProduct) cartNo.textContent = cartProduct.length;
  categorys();
  FetchProducts();

  //  set filter max price and min price to "" every
  const filterMaxMin = document.querySelectorAll(".filterInput");
  filterMaxMin.forEach((e) => (e.value = ""));
}

initialLoad();

/////////////////////////////////////// fetch
/// fetch categories
async function categorys() {
  try {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/categories?offset=0&limit=5"
    );
    const data = await response.json();
    // add category in dropdown
    categoryDropdown(data, (defaultChecked = "Others"));
    // display category in side bar
    displayCategories(data);
  } catch (error) {
    console.log(error);
  }
}

// getch products
async function FetchProducts(
  categoryID = "5",
  category = "All products",
  ...fliter
) {
  let productApi = categoryID
    ? `${API}/categories/${categoryID}/products?offset=0&limit=${
        fliter.length > 0 ? "50" : "12"
      }`
    : `${API}/products?offset=0&limit=12`;

  productSkeleton();
  try {
    const response = await fetch(productApi);
    const data = await response.json();
    let products = data;
    if (fliter.length > 0) {
      products = data.filter((e) => {
        return e.price >= fliter[0] && e.price <= fliter[1];
      });
    }
    productsArr = products;
    displayProducts(products, (headign = category));
  } catch (error) {
    console.log(error);
  }
}
// FetchProducts();

///////////////////////////////////////////// Display

// Display Products
function displayProducts(productsArr, headign) {
  productsEle.innerHTML = "";
  if (productsArr.length < 1)
    productsEle.innerHTML =
      "<h1 class='text-6xl  text-gray-400  font-semibold' h-[20rem]>Empty</h1>";
  productHeaderText.textContent = headign.toUpperCase();

  const cartArr = JSON.parse(localStorage.getItem("Cart"));
  productsArr.forEach((product) => {
    let isProductPresentInCart = false;
    if (cartArr) {
      isProductPresentInCart = cartArr.some(
        ({ id: value }) => product.id == value
      );
    }
    const productEle = document.createElement("div");
    productEle.id = product.id;
    productEle.className = "product";
    productEle.innerHTML = productCard(
      product.images[0],
      product.title,
      product.price,
      product.id,
      (showCaartButton = isProductPresentInCart)
    );
    productsEle.appendChild(productEle);
  });
}

// Display side-bar category Category
function displayCategories(categories) {
  categories.forEach((category) => {
    const categoryEle = document.createElement("div");
    categoryEle.className = "category cursor-pointer";
    categoryEle.id = category.id;
    categoryEle.innerHTML = categoryCard(
      category.image,
      category.name,
      category.id
    );
    catecoriesEle.appendChild(categoryEle);
  });
}

// Add options in category dropdown
function categoryDropdown(categories, checked) {
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.id = "categoryOption-" + category.id;
    li.innerHTML = categoryOption(
      category,
      category.id,
      checked == category.name // true or false
    );
    dropdownDefaultRadio.firstElementChild.appendChild(li);
  });
}

/////////////////////////////////////////////// Event listner
// sidebar category onClick event
catecoriesEle.onclick = handelCategory(this);

function handelCategory(element) {
  if (!element.id) return;
  const categoryId = element.getAttribute("id");
  const category =
    categoryId == 5 ? "All Products" : element.lastElementChild.textContent;
  FetchProducts(categoryId, category);

  //  set filter max price and min price to "" every
  const filterMaxMin = document.querySelectorAll(".filterInput");
  filterMaxMin.forEach((e) => (e.value = ""));
}
// add product in cart
function handleCart(element) {
  const productID = element.getAttribute("id");
  const product = productsArr.find((product) => productID == product.id);
  const cartProduct = JSON.parse(localStorage.getItem("Cart"));
  product["itemCount"] = 1;
  const newCartProducts = cartProduct ? [...cartProduct, product] : [product];
  localStorage.setItem("Cart", JSON.stringify(newCartProducts));
  element.parentElement.innerHTML = `<a href="../cart.html" type="button" class="focus:outline-none
                                     text-white bg-green-700 hover:bg-green-800 focus:ring-4 
                                     focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
                                     dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Added</a>
                                     `;

  cartNo.innerHTML = newCartProducts.length;
}

// add option in category dropdown
function filterSubmit(event) {
  event.preventDefault();
  const minPrice = event.target[6].value;
  const maxPrice = event.target[7].value;

  const dropdownOptions = document.querySelectorAll("#default-radio-1");
  let categoryID = "";
  let category = "";
  for (let option of dropdownOptions) {
    if (option.checked == true) {
      categoryID = option.value;
      category = option.parentElement.lastElementChild.textContent;
    }
  }

  if (maxPrice < minPrice) {
    event.target[7].focus();
    event.target[7].value = "";
    event.target[7].style.outlineColor = "red";
    event.target[7].placeholder = "maxprice > min price";
  } else {
    event.target[7].style.outlineColor = "orange";
    FetchProducts(categoryID, category, minPrice, maxPrice);
  }
}

////////////////////////////////////////////////////////  HTML Elements
// product card
function productCard(image, title, price, productId, showCaartButton) {
  return `<div class="w-full max-w-[23rem] bg-white rounded-lg shadow-md">
  <a href="#">
    <img id="productImg" class="p-8 rounded-t-lg" src="${image}" alt="product image" />
  </a>
  <div class="px-5 pb-5">
    <a href="#">
      <h5 id="productTitle" class="text-xl font-semibold tracking-tight text-gray-900" >
        ${title}
      </h5>
    </a>
    <div class="flex items-center mt-2.5 mb-5"></div>
    <div class="flex justify-between items-center">
      <span class="text-3xl font-bold text-gray-900">Rs:${price}</span>  
   <div id ="cartButton">
   ${
     !showCaartButton
       ? `<button id =${productId}
         onclick ='handleCart(this)'
         class="text-white bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none
          focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
          dark:hover:bg-blue-700 dark:focus:ring-blue-800"
         >Add to cart</button>`
       : `<a href="../cart.html" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800
         focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600
         dark:hover:bg-green-700 dark:focus:ring-green-800">Added</a>`
   }
     <div>     
    </div>
  </div>
</div>`;
}

// category card
function categoryCard(image, name, categoruId) {
  return `<div id =${categoruId} class="my-8 rounded-sm flex items-center gap-[2rem]" onclick="handelCategory(this)" >
  <img src=${image} alt="img"class ="rounded-md w-[6rem]"   />
  <h3 class ="font-bold" >${categoruId == 5 ? "Products" : name}</h3>
</div>`;
}

function categoryOption(category, categoryId, checked) {
  return `
  <div class="flex items-center">
  <input id="default-radio-1" type="radio"   
checked = ${checked}
  value=${categoryId} name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100
   border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2
    dark:bg-gray-600 dark:border-gray-500">
  <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${
    category.name == "Others" ? "All Products" : category.name
  }</label>
</div>
  `;
}

// product scaleton
function productSkeleton() {
  const skeleton = `<div role="status" class="p-4 max-w-sm rounded border border-gray-200 shadow animate-pulse md:p-6 ">
    <div class="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded ">
        <svg class="w-12 h-12 text-gray-200 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
         fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2
         604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64
         256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1
         202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0
         456.1z"/></svg>
    </div>
    <div class="h-2.5  rounded-full  w-48 mb-4"></div>
    <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full "></div>
    <div class="flex items-center mt-4 space-x-3">
        <svg class="w-14 h-14 text-gray-200 dark:text-gray-200" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
         xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2
          2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd">
          </path></svg>
        <div>
            <div class="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>
            <div class="w-48 h-2  rounded-full "></div>
        </div>
    </div>
    <span class="sr-only">Loading...</span>
</div>`;

  productsEle.innerHTML = skeleton;
}
