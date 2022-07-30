const cart = [];

getLocalStorage();

// Distribution des données
cart.forEach((item) => {
  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then((response) => response.json())
    .then((data) => {
      displayKanaps(item, data);
    })
    .catch((error) => console.error(error));
});

const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e));

// Récupération du localStorage
function getLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemArray = JSON.parse(item);
    cart.push(itemArray);
  }
}

// Affichage du panier
function displayKanaps(item, data) {
  const article = createArticle(item);
  const img = createDivImg(item);
  const content = createItemContent(item, data);
  createTotalQuantity();
  createTotalPrice();

  article.appendChild(img);
  article.appendChild(content);
}

// Création de l'article
function createArticle(item) {
  const cartItems = document.querySelector("#cart__items");

  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.colors = item.color;

  cartItems.appendChild(article);

  return article;
}

// Création de l'image
function createDivImg(item) {
  const divImg = document.createElement("div");
  divImg.classList.add("cart__item__img");

  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.textContent = item.altTxt;

  divImg.appendChild(img);

  return divImg;
}

// Création du container déscription et settings
function createItemContent(item, data) {
  const itemContent = document.createElement("div");
  itemContent.classList.add("cart__item__content");

  const itemDescription = createItemDescription(item, data);

  const itemSettings = createItemSettings(item);

  itemContent.appendChild(itemDescription);
  itemContent.appendChild(itemSettings);

  return itemContent;
}

// Création de la description
function createItemDescription(item, data) {
  const itemDescription = document.createElement("div");
  itemDescription.classList.add("cart__item__content__description");

  const h2 = document.createElement("h2");
  h2.textContent = item.name;

  const color = document.createElement("p");
  color.textContent = item.color;

  const price = document.createElement("p");
  price.textContent = data.price + "€";

  itemDescription.appendChild(h2);
  itemDescription.appendChild(color);
  itemDescription.appendChild(price);

  return itemDescription;
}

// Création du container settings
function createItemSettings(item) {
  const itemSettings = document.createElement("div");
  itemSettings.classList.add("cart__item__content__settings");

  const settingsQuantity = createSettingsQuantity(item);
  const settingsDelete = createSettingsDelete(item);

  itemSettings.appendChild(settingsQuantity);
  itemSettings.appendChild(settingsDelete);

  return itemSettings;
}

// Création du settings quantity
function createSettingsQuantity(item) {
  const settingsQuantity = document.createElement("div");
  settingsQuantity.classList.add("cart__item__content__settings__quantity");

  const quantity = document.createElement("p");
  quantity.textContent = "Qté : ";

  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "ItemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;
  input.addEventListener("change", () => {
    changePriceAndQuantity(item.id, item, input.value);
  });

  settingsQuantity.appendChild(quantity);
  settingsQuantity.appendChild(input);

  return settingsQuantity;
}

// Création du settings delete
function createSettingsDelete(item) {
  const divDelete = document.createElement("div");
  divDelete.classList.add("cart__item__content__settings__delete");

  const div = document.createElement("p");
  div.classList.add("deleteItem");
  div.textContent = "Supprimer";
  div.addEventListener("click", () => deleteItem(item));

  divDelete.appendChild(div);

  return divDelete;
}

// Création du total quantity
function createTotalQuantity() {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  document.querySelector("#totalQuantity").textContent = total;
}

// no double fetch :>
// function createTotalPrice(data){
//   let total = 0;
//   cart.forEach((item) => {
//     total += data.price * item.quantity;
//   });
//   document.querySelector("#totalPrice").textContent = total;
// }

// double fetch :<
// Création du total price
function createTotalPrice() {
  let total = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      fetch(`http://localhost:3000/api/products/${item.id}`)
        .then((response) => response.json())
        .then((data) => {
          total += data.price * item.quantity;
          document.querySelector("#totalPrice").textContent = total;
        })
        .catch((error) => console.error(error));
    });
  } else {
    document.querySelector("#totalPrice").textContent = total;
  }
}

// Changement du prix et de la quantité
function changePriceAndQuantity(id, item, newValue) {
  const itemToChange = cart.find(
    (product) => product.id === item.id && product.color === item.color
  );
  itemToChange.quantity = Number(newValue);
  item.quantity = itemToChange.quantity;
  createTotalPrice();
  createTotalQuantity();
  saveNewDataToLocal(item);
}

// Sauvegarde des données dans le localStorage
function saveNewDataToLocal(item) {
  const itemToSave = JSON.stringify(item);
  const itemToSaveKey = `${item.id}-${item.color}`;
  localStorage.setItem(itemToSaveKey, itemToSave);
}

// Suppression d'un item
function deleteItem(item) {
  const itemToDelete = cart.find(
    (product) => product.id === item.id && product.color === item.color
  );
  cart.splice(cart.indexOf(itemToDelete), 1);

  createTotalPrice();
  createTotalQuantity();
  deleteNewDataFromLocal(item);
  deleteArticle(item);
}

// Suppression des données dans le localStorage
function deleteNewDataFromLocal(item) {
  localStorage.removeItem(`${item.id}-${item.color}`);
}

// Suppression de l'article
function deleteArticle(item) {
  const ItemToDelete = document.querySelector(
    `[data-id="${item.id}"][data-colors="${item.color}"]`
  );
  ItemToDelete.remove();
}

// Création d'une requête d'envoi de commande à l'API
function submitForm(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Votre panier est vide");
    return;
  }

  if (isFormInvalid()) return;
  if (isEmailInvalid()) return;

  const body = createRequestBody();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href = "confirmation.html" + "?orderId=" + orderId;
      console.log(data);
    })
    .catch((error) => console.error(error));
}

// Détermine si le formulaire est invalide
function isFormInvalid() {
  const isValid = false;
  const form = document.querySelector(".cart__order__form");
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Veuillez remplir tous les champs");
      isValid = true;
    }
    return isValid;
  });
}

// Détermine si l'email est invalide
function isEmailInvalid() {
  const email = document.querySelector("#email").value;
  const regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
  if (regex.test(email) === false) {
    alert("Votre email est invalide");
    return true;
  }
  return false;
}

// Création du body de la requête
function createRequestBody() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIdsFromLocalStorage(),
  };
  return body;
}

// Récupération des ids des produits dans le localStorage
function getIdsFromLocalStorage() {
  const numberOfProducts = localStorage.length;
  const ids = [];
  for (let i = 0; i < numberOfProducts; i++) {
    const key = localStorage.key(i);
    const id = key.split("-")[0];
    ids.push(id);
  }
  return ids;
}
