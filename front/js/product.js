// Récupération de la querystring du produit
const queryString = window.location.search;
// Récupération de l'id du produit
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

// Récupération des données du produit
fetch("http://localhost:3000/api/products/" + id)
  .then((response) => response.json())
  .then((kanap) => displayKanaps(kanap))
  .catch((error) => console.error("Erreur : " + error));

// Affichage des produits
function displayKanaps(kanap) {
  createDivImg(kanap);
  createH1(kanap);
  createPrice(kanap);
  createP(kanap);
  createColorsOptions(kanap);
}

// Création de l'image pour chaque produit
function createDivImg(kanap) {
  let divImg = document.querySelector(".item__img");
  let img = document.createElement("img");
  img.src = kanap.imageUrl;
  img.textContent = kanap.altTxt;
  divImg.appendChild(img);
  return divImg;
}

// Création du titre pour chaque produit
function createH1(kanap) {
  let h1 = document.querySelector("#title");
  h1.textContent = kanap.name;
  return h1;
}

// Création du prix pour chaque produit
function createPrice(kanap) {
  let price = document.querySelector("#price");
  price.textContent = kanap.price;
  return price;
}

// Création de la description pour chaque produit
function createP(kanap) {
  let p = document.querySelector("#description");
  p.textContent = kanap.description;
  return p;
}

// Création des options de couleur pour chaque produit
function createColorsOptions(kanap) {
  let colorsSelect = document.querySelector("#colors");
  kanap.colors.forEach((color) => {
    let option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    colorsSelect.appendChild(option);
  });
}

// Envoi de données au localStorage
let button = document.querySelector("#addToCart");
button.addEventListener("click", clickEvent);

function clickEvent() {
  let color = document.querySelector("#colors").value;
  let quantity = document.querySelector("#quantity").value;
  if (isOrderInvalid(color, quantity)) return;
  addToCart(color, quantity);
  redirectToCart();
}

function isOrderInvalid(color, quantity) {
  if (color == "" || color == null || quantity == null || quantity < 1) {
    alert("Veuillez remplir tous les champs");
    return true;
  }
}

function addToCart(color, quantity) {
  let key = `${id}-${color}`;
  let value = {
    id: id,
    color: color,
    quantity: Number(quantity),
  };
  localStorage.setItem(key, JSON.stringify(value));
}

function redirectToCart() {
  window.location.href = "cart.html";
}
