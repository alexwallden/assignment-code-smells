/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DESCENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ) { }
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  const copiedList: Product[] = [...products];

  switch (sort) {
    case Sort.PRICE_ASCENDING:
      return sortList("Price", copiedList).reverse();
    case Sort.PRICE_DESCENDING:
      return sortList("Price", copiedList);
    case Sort.NAME_ALPHABETIC:
      return sortList("Name", copiedList);
    case Sort.NAME_ALPHABETIC_REVERSE:
      return sortList("Name", copiedList).reverse();
  }
}

function sortList(whichAttribute: string, products: Product[]): Product[] {
  return products.sort((p1, p2) => {
    if (whichAttribute === "Price") {
      return p2.price - p1.price
    } else {
      if (p1.name.toUpperCase() > p2.name.toUpperCase()) {
        return 1;
      } else if (p1.name.toUpperCase() < p2.name.toUpperCase()) {
        return -1;
      }
      return 0;
    }
  });
}

/*
  2. Refaktorera funktionen createProductHtml :)
  */
interface CartItem {
  picture: string;
  pictureAlt: string;
  name: string;
  price: number;
  info: string;
  productSpec: boolean;
  category: string;
}

class Cart {
  addToCart(i: number) { }
}
export const cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export const productList = JSON.parse(localStorage.getItem("savedList") || "[]");

function createDogProductHtml(product: CartItem, cartSymbolContainer: HTMLDivElement) {
  const dogProduct = document.createElement("div");
  const dogImgContainer: HTMLDivElement = document.createElement("div");
  dogImgContainer.className = "dogimgcontainer";
  dogProduct.appendChild(dogImgContainer);
  const dogImg: HTMLImageElement = document.createElement("img");

  dogImg.src = product.picture;
  dogImg.alt = product.pictureAlt;

  dogImgContainer.appendChild(cartSymbolContainer);

  dogImgContainer.appendChild(dogImg);

  addEventlisteners(dogImg, cartSymbolContainer, product)

  return dogProduct
}

function createCartSymbolHtml(i: number) {
  const cartSymbolContainer: HTMLDivElement = document.createElement("div");
  cartSymbolContainer.className = "cartSymbolContainer";
  const cartSymbol: HTMLElement = document.createElement("i");
  cartSymbol.className = "bi bi-bag-plus";
  cartSymbolContainer.appendChild(cartSymbol);

  cartSymbol.addEventListener("click", () => {
    const cart = new Cart();
    cart.addToCart(i);
  });

  return cartSymbolContainer
}

function addEventlisteners(dogImg: HTMLImageElement, cartSymbolContainer: HTMLDivElement, product: CartItem) {
  dogImg.addEventListener("mouseover", () => {
    cartSymbolContainer.classList.add("hover");
    dogImg.classList.add("hover");
  });

  dogImg.addEventListener("mouseout", () => {
    dogImg.classList.remove("hover");
    cartSymbolContainer.classList.remove("hover");
  });

  dogImg.addEventListener("click", () => {
    product.productSpec = !product.productSpec;
    window.location.href = "product-spec.html#backArrow";
    const listAsText = JSON.stringify(productList);
    localStorage.setItem("savedList", listAsText);
  });
}

function createNameHtml(product: CartItem) {
  const name: HTMLHeadingElement = document.createElement("h5");
  name.innerHTML = product.name;
  return name
}

function createPriceHtml(i: number) {
  const price: HTMLHeadingElement = document.createElement("p");
  price.innerHTML = "$" + productList[i].price;
  return price;
}

function createInfoHtml(product: CartItem) {
  const info: HTMLHeadingElement = document.createElement("p");
  info.innerHTML = product.info;

  return info;
}


export function createProductHtml() {
  let quantity = 0;
  for (let i = 0; i < cartList.length; i++) {
    quantity += cartList[i].quantity;
  }

  const floatingCart = document.getElementById(
    "floatingcartnumber"
  ) as HTMLElement;
  floatingCart.innerHTML = "" + quantity;

  for (let i = 0; i < productList.length; i++) {
    const cartSymbolContainer: HTMLDivElement = createCartSymbolHtml(i);
    const dogProduct: HTMLDivElement = createDogProductHtml(productList[i], cartSymbolContainer)

    const name = createNameHtml(productList[i]);
    dogProduct.appendChild(name);

    const price = createPriceHtml(i)
    dogProduct.appendChild(price);


    const info = createInfoHtml(productList[i])
    dogProduct.className = "dogproduct";
    dogProduct.appendChild(info);

    productList[i].productSpec = false;

    switch (productList[i].category) {
      case "sassy":
        (document.getElementById("sassy") as HTMLElement).appendChild(dogProduct);
        break;
      case "kriminella":
        (document.getElementById("kriminella") as HTMLElement).appendChild(dogProduct);
        break;
      case "singlar":
        (document.getElementById("singlar") as HTMLElement).appendChild(dogProduct);
        break;
      case "puppy":
        (document.getElementById("puppy") as HTMLElement).appendChild(dogProduct);
        break;
      case "oldies":
        (document.getElementById("oldies") as HTMLElement).appendChild(dogProduct);
        break;
    }
  }

  localStorage.setItem("savedList", JSON.stringify(productList));
  sessionStorage.clear();
}

/*
  3. Refaktorera funktionen getfromstorage
  */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) { }
}

function createTableHeader(text: string, className?: string) {
  const tableHeader: HTMLTableCellElement = document.createElement('th');
  tableHeader.innerHTML = text;
  if (className) tableHeader.className = className;

  return tableHeader
}

function createQtyBtn(label: string) {
  const button: HTMLButtonElement = document.createElement("button");
  button.className = `${label}-btn`;

  const buttonIcon: HTMLSpanElement = document.createElement('i');
  buttonIcon.className = `fas fa-${label}`;
  button.appendChild(buttonIcon)

  return button;
}

export default function getFromStorage() {
  const container = document.getElementById("checkout-table");

  const cartListFromStorage: string = localStorage.getItem("cartArray") || "";
  const cartList: CartProduct[] = JSON.parse(cartListFromStorage);

  const productCheckOutContainer = document.getElementById(
    "product-checkout-container"
  ) as HTMLDivElement;  

  const amountCheckoutContainer = document.getElementById(
    "amount-checkout-container"
  ) as HTMLDivElement;
  const amountTitle: HTMLTableCellElement = createTableHeader('amount:');
  amountCheckoutContainer.appendChild(amountTitle);

  const titleContainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titleContainer.innerHTML = "<strong>products:</strong>";

  const quantityContainer = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  const changeQuantityTitle: HTMLTableCellElement = createTableHeader('change quantity:')
  quantityContainer.appendChild(changeQuantityTitle);

  const checkOutTotalContainer = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  const checkoutTotalTitle: HTMLTableCellElement = createTableHeader('total:');
  checkOutTotalContainer.appendChild(checkoutTotalTitle);

  for (let i = 0; i < cartList.length; i++) {
    const productNameElement: HTMLTableCellElement = createTableHeader(cartList[i].name, "product-name");
    titleContainer.appendChild(productNameElement);

    const productAmountElement: HTMLTableCellElement = createTableHeader(`x${cartList[i].amount}`, "product-amount");
    amountCheckoutContainer.appendChild(productAmountElement);

    const qtyBtnsContainer: HTMLTableCellElement = document.createElement("th");
    qtyBtnsContainer.className = "qty-btns-container";
    quantityContainer.appendChild(qtyBtnsContainer);


    const qtyMinusButton: HTMLButtonElement = createQtyBtn('minus');
    qtyBtnsContainer.appendChild(qtyMinusButton);
    

    const qtyPlusBtn: HTMLButtonElement = createQtyBtn('plus');
    qtyBtnsContainer.appendChild(qtyPlusBtn);
  }

  let addition = 0;

  for (let i = 0; i < cartList.length; i++) {
    addition += cartList[i].price *= cartList[i].amount;
  }

  const totalPriceElement: HTMLTableCellElement = createTableHeader(`${addition}$`);
  totalPriceElement.id = "total-in-center";
  checkOutTotalContainer.appendChild(totalPriceElement);
}
