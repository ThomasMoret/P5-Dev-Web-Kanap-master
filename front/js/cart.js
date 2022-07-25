// let cart = [];
// cart.forEach((item) => {

// });

// getLocalStorage();
// fetchData();

// function getLocalStorage() {
//   let numberOfItems = localStorage.length;
//   for (let i = 0; i < numberOfItems; i++) {
//     let item = localStorage.getItem(localStorage.key(i));
//     let itemArray = JSON.parse(item);
//     cart.push(itemArray);
//   }
// }

// function fetchData() {
//   cart.map(function (element) {
//     return `${element.id}`;
//   });
//   cart.forEach((element) => {
//     fetch(`http://localhost:3000/api/products/${element.id}`)
//       .then((response) => response.json())
//       .then((data) => cart.push(data))
//       .catch((error) => console.error("Erreur : " + error));
//   });
//   console.log(cart);
// }
const numberOfItems = localStorage.length;
const cart = [];

getLocalStorage();
fetchData();

cart.forEach((item) => displayKanaps(item));

function getLocalStorage() {
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemArray = JSON.parse(item);
    cart.push(itemArray);
  }
}

function fetchData() {
  for (let i = 0; i < numberOfItems; i++) {
    fetch(`http://localhost:3000/api/products/${cart[i].id}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Erreur : " + error));
  }
}

function displayKanaps(item) {
  const article = createArticle(item);
  const img = createDivImg(item);
  const content = createItemContent(item);

  article.appendChild(img);
  article.appendChild(content);
}

function createArticle(item) {
  const cartItems = document.querySelector("#cart__items");

  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.colors = item.color;

  cartItems.appendChild(article);

  return article;
}

function createDivImg(item) {
  const divImg = document.createElement("div");
  divImg.classList.add("cart__item__img");

  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.textContent = item.altTxt;

  divImg.appendChild(img);

  return divImg;
}

function createItemContent(item) {
  const itemContent = document.createElement("div");
  itemContent.classList.add("cart__item__content");

  const itemDescription = createItemDescription(item);

  const itemSettings = createItemSettings(item);

  itemContent.appendChild(itemDescription);
  itemContent.appendChild(itemSettings);

  return itemContent;
}

function createItemDescription(item) {
  const itemDescription = document.createElement("div");
  itemDescription.classList.add("cart__item__content__description");

  const h2 = document.createElement("h2");
  h2.textContent = item.name;

  const color = document.createElement("p");
  color.textContent = item.color;

  const price = document.createElement("p");
  price.textContent = item.price + "€";

  itemDescription.appendChild(h2);
  itemDescription.appendChild(color);
  itemDescription.appendChild(price);

  return itemDescription;
}

function createItemSettings(item) {
  const itemSettings = document.createElement("div");
  itemSettings.classList.add("cart__item__content__settings");

  const settingsQuantity = createSettingsQuantity(item);
  const settingsDelete = createSettingsDelete(item);

  itemSettings.appendChild(settingsQuantity);
  itemSettings.appendChild(settingsDelete);

  return itemSettings;
}

function createSettingsQuantity(item) {
  const settingsQuantity = document.createElement("div");
  settingsQuantity.classList.add("cart__item__content__settings__quantity");

  const quantity = document.createElement("p");
  quantity.textContent = "Qté : " + item.quantity;

  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "ItemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;

  settingsQuantity.appendChild(quantity);
  settingsQuantity.appendChild(input);

  return settingsQuantity;
}

function createSettingsDelete(item) {
  const settingsDelete = document.createElement("div");
  settingsDelete.classList.add("cart__item__content__settings__delete");

  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.textContent = "Supprimer";

  settingsDelete.appendChild(deleteItem);

  return settingsDelete;
}
