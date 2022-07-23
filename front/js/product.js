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
  let divImg = createDivImg(kanap);
  let h1 = createH1(kanap);
  let p = createP(kanap);
  let colorsSelect = createColorsOptions(kanap);
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
