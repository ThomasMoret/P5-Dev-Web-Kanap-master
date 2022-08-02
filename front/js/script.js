// Récupération des données
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((kanaps) => displayKanaps(kanaps))
  // géstion des erreurs
  .catch((error) => {
    alert("Oops, il semblerait que nous n'ayons pas pu récupérer les données");
    console.log(error);
  });

// Affichage des produits
function displayKanaps(kanaps) {
  kanaps.forEach((kanap) => {
    const anchor = createAnchor(kanap);

    const article = document.createElement("article");
    anchor.appendChild(article);

    const img = createImg(kanap);
    article.appendChild(img);

    const h3 = createH3(kanap);
    article.appendChild(h3);

    const p = createP(kanap);
    article.appendChild(p);
  });
}

//Création des ancres pour chaque produit
function createAnchor(kanap) {
  const sectionItems = document.querySelector("#items");
  const anchor = document.createElement("a");
  anchor.href = "product.html?id=" + kanap._id;
  sectionItems.appendChild(anchor);
  return anchor;
}

//Création de l'image pour chaque produit
function createImg(kanap) {
  const img = document.createElement("img");
  img.src = kanap.imageUrl;
  img.alt = kanap.altTxt;
  return img;
}

//Création du titre pour chaque produit
function createH3(kanap) {
  const h3 = document.createElement("h3");
  h3.classList.add("productName");
  h3.textContent = kanap.name;
  return h3;
}

//Création de la description pour chaque produit
function createP(kanap) {
  const p = document.createElement("p");
  p.classList.add("productDescription");
  p.textContent = kanap.description;
  return p;
}
