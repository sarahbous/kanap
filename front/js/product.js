let queryString_url_id = window.location.search;
console.log(queryString_url_id);

let urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams)

let _id = urlSearchParams.get("id")
console.log(_id)

let productData = [];


const fetchProducts = async () => {
    await fetch(`http://localhost:3000/api/products/${_id}`)
    .then((res) => res.json())
    .then((promise) => {
        productData = promise
       console.log(productData);
   });
}

const productDisplay = async () => {
    await fetchProducts();
    document.title = `${productData.name}`;
    
    
    document.getElementById("item").innerHTML  = 
   `
    
   <div class="item__img">
     <img src="${productData.imageUrl}" alt="${productData.altTxt}">
   </div>
   <div class="item__content">

     <div class="item__content__titlePrice">
       <h1 id="title">${productData.name}</h1>
       <p>Prix : <span id="price">${productData.price
      .toString()
      .replace(/0+$/,"")}</span>€</p>
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
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
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

  tagOption.innerHTML= `${colors}` ;
  tagOption.value =`${colors}`;

  select.appendChild(tagOption);
  console.log(tagOption)
  });

  addBasket(productData);
};
productDisplay();
  
 
const addBasket = () => {
console.log("bonjour");
let bouton = document.getElementById(productData._id);
console.log(bouton);
bouton.addEventListener("click", () => {
  let produitTableau = JSON.parse(localStorage.getItem("product"))
  console.log(produitTableau)
 let select = document.getElementById("colors")
  console.log(select.value)
  let quantite = document.getElementById("quantity")
  console.log(quantite)
  let nomProduit = document.getElementById("title")
  console.log(nomProduit);
  
  const fusionproduitColor = Object.assign({}, productData, {
    teinte:`${select.value}`,
    quantite: 1,
    nomProduit: `${productData.name}`
  })
console.log(fusionproduitColor);
//document.location.href="./cart.html"
 

//const popupConfirmation = () =>{
  //if(window.confirm(`${nomProduit} option: ${select.value} a bien été ajouté au panier Consultez le panier OK ou revenir a l'accueil ANNULER`)){
//window.location.href="cart.html";
 // }else{

 // }
//}




if(produitTableau){
  produitTableau.push(productData);
  localStorage.setItem("product", JSON.stringify(produitTableau))
//popupConfirmation();
}
  else  {
    produitTableau = [];
    produitTableau.push(productData);
    console.log(produitTableau);
    localStorage.setItem("product", JSON.stringify(produitTableau))
   //popupConfirmation();
  }
  
})
  }

  










