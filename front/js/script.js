// Récupération des données
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  //Répartition des données pour chaque produit
  .then((kanaps) => {
    kanaps.forEach((kanap) => {
      //Création du lien pour chaque produit
      let sectionItems = document.querySelector("#items");
      let anchor = document.createElement("a");
      anchor.href = "product.html?id=" + kanap.id;
      sectionItems.appendChild(anchor);
      //création de l'article pour chaque produit
      let article = document.createElement("article");
      anchor.appendChild(article);
      //création de l'image pour chaque produit
      let img = document.createElement("img");
      img.src = kanap.imageUrl;
      img.textContent = kanap.altTxt;
      article.appendChild(img);
      //création du titre pour chaque produit
      let h3 = document.createElement("h3");
      h3.classList.add("productName");
      h3.textContent = kanap.name;
      article.appendChild(h3);
      //création de la description pour chaque produit
      let p = document.createElement("p");
      p.classList.add("productDescription");
      p.textContent = kanap.description;
      article.appendChild(p);
    });
  })
  .catch((error) => {
    console.error("Erreur : " + error);
  });
