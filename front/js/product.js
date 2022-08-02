// Récupération de la querystring du produit
const queryString = window.location.search;
// Récupération de l'id du produit
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

console.log(queryString);
console.log(id);

// Récupération des données du produit
fetch("http://localhost:3000/api/products/" + id)
  .then((response) => response.json())
  .then((kanap) => displayKanaps(kanap))
  .catch((error) => {
    alert("Oops, il semblerait que nous n'ayons pas pu récupérer les données");
    console.log(error);
  });

// Affichage des produits
function displayKanaps(kanap) {
  imgUrl = kanap.imageUrl;
  altText = kanap.altTxt;
  articleName = kanap.name;
  createDivImg(kanap);
  createH1(kanap);
  createPrice(kanap);
  createP(kanap);
  createColorsOptions(kanap);
}

// Création de l'image pour chaque produit
function createDivImg(kanap) {
  const divImg = document.querySelector(".item__img");
  const img = document.createElement("img");
  img.src = kanap.imageUrl;
  img.alt = kanap.altTxt;
  divImg.appendChild(img);
  return divImg;
}

// Création du titre pour chaque produit
function createH1(kanap) {
  const h1 = document.querySelector("#title");
  h1.textContent = kanap.name;
  return h1;
}

// Création du prix pour chaque produit
function createPrice(kanap) {
  const price = document.querySelector("#price");
  price.textContent = kanap.price;
  return price;
}

// Création de la description pour chaque produit
function createP(kanap) {
  const p = document.querySelector("#description");
  p.textContent = kanap.description;
  return p;
}

// Création des options de couleur pour chaque produit
function createColorsOptions(kanap) {
  const colorsSelect = document.querySelector("#colors");
  kanap.colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    colorsSelect.appendChild(option);
  });
}

//---------------------------------------------------------------------------------------------------------------------

const button = document.querySelector("#addToCart");
button.addEventListener("click", clickEvent);

// Ajout d'un évènement click sur le bouton
function clickEvent() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  if (isOrderInvalid(color, quantity)) return;
  addToCart(color, quantity);
  redirectToCart();
}

// Vérifie si l'ordre est invalide
function isOrderInvalid(color, quantity) {
  if (color == "" || color == null || quantity == null || quantity < 1) {
    alert("Veuillez remplir tous les champs");
    return true;
  }
}

// Ajout d'un produit au panier
function addToCart(color, quantity) {
  const key = `${id}-${color}`;
  const value = {
    id: id,
    color: color,
    quantity: Number(quantity),
    imageUrl: imgUrl,
    altTxt: altText,
    name: articleName,
  };
  if (localStorage.getItem(key) == null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    const oldValue = JSON.parse(localStorage.getItem(key));
    oldValue.quantity += Number(quantity);
    localStorage.setItem(key, JSON.stringify(oldValue));
  }
}

// Redirection vers la page panier
function redirectToCart() {
  window.location.href = "cart.html";
}
