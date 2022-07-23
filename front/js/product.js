//faire le lien entre un produit de la page d'accueil et la page produit

let queryString_url_id = window.location.search;
console.log(queryString_url_id);

let urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

let _id = urlSearchParams.get("id");
console.log(_id);

let productData = [];
let quantiteTotal = [];
//récupérer l'id du produit à afficher
const fetchProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${_id}`)
    .then((res) => res.json())
    .then((promise) => {
      productData = promise;
      console.log(productData);
    });
};
//Insérer un produit et ses détails dans la page produit
const productDisplay = async () => {
  await fetchProduct();
  document.title = `${productData.name}`;

  document.getElementById("item").innerHTML = `
    
   <div class="item__img">
     <img src="${productData.imageUrl}" alt="${productData.altTxt}">
   </div>
   <div class="item__content">

     <div class="item__content__titlePrice">
       <h1 id="title">${productData.name}</h1>
       <p>Prix : <span id="price">${productData.price
         .toString()
         .replace(/0+$/, "")}</span>€</p>
     </div>

     <div class="item__content__description">
       <p class="item__content__description__title">Description :</p>
       <p id="description">${productData.description}</p>
     </div>

     <div class="item__content__settings">
       <div class="item__content__settings__color">
         <label for="color-select">Choisir une couleur :</label>
         <select name="color-select" id="colors">
            
         </select>
       </div>

       <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="1" id="quantity">
                </div>
              </div>
              
              <div class="item__content__addButton">
                <button id=${productData._id}>Ajouter au panier</button>
              </div>
              
            </div>
          </article>
   `;

  let select = document.getElementById("colors");
  console.log(select);

  console.log(productData.colors);

  productData.colors.forEach((colors) => {
    let tagOption = document.createElement("option");

    tagOption.innerHTML = `${colors}`;
    tagOption.value = `${colors}`;

    select.appendChild(tagOption);
    console.log(tagOption);
  });

  addBasket(productData);
};
productDisplay();

//Ajouter les produits sélectionnés dans la page produits  dans la page panier
const addBasket = () => {
  let bouton = document.getElementById(productData._id);
  console.log(bouton);
  bouton.addEventListener("click", () => {
    let produitTableau = JSON.parse(localStorage.getItem("product"));
    let select = document.getElementById("colors");
    console.log(select.value);
    let quantite = document.getElementById("quantity");
    console.log(quantite);

    const fusionproduitColor = Object.assign({}, productData, {
      teinte: `${select.value}`,
      quantite: `${quantite.value}`,
      nomProduit: `${productData.name}`,
      id: `${productData._id}`,
    });
    console.log(fusionproduitColor);

    document.location.href = "./cart.html";

    if (produitTableau == null) {
      produitTableau = [];
      produitTableau.push(fusionproduitColor);
      console.log(produitTableau);
      localStorage.setItem("product", JSON.stringify(produitTableau));
    } else if (produitTableau != null) {
      for (i = 0; i < produitTableau.length; i++) {
        console.log("test");
        if (
          produitTableau[i]._id == productData._id &&
          produitTableau[i].teinte == select.value
        ) {
          return (
            produitTableau[i].quantite++,
            console.log("quantite++"),
            localStorage.setItem("product", JSON.stringify(produitTableau)),
            (produitTableau = JSON.parse(localStorage.getItem("product")))
          );
        }
      }
      for (i = 0; i < produitTableau.length; i++) {
        if (
          (produitTableau[i]._id == productData._id &&
            produitTableau[i].teinte != select.value) ||
          produitTableau[i]._id != productData._id
        ) {
          return (
            console.log("nouveau"),
            produitTableau.push(fusionproduitColor),
            localStorage.setItem("product", JSON.stringify(produitTableau)),
            (produitTableau = JSON.parse(localStorage.getItem("product")))
          );
        }
      }
    }
  });

  return (produitTableau = JSON.parse(localStorage.getItem("product")));
};
