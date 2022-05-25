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
       <p>Prix : <span id="price">${productData.price}</span>€</p>
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
                <button id="addToCart">Ajouter au panier</button>
              </div>

            </div>
          </article>
   `;
 
  




 let select = document.getElementById("colors")
 console.log(select)

 console.log(productData.colors)

 productData.colors.forEach(couleur => {
  console.log(document.createElement("option"));
  let tagOption = document.createElement("option");
  tagOption.innerText = `${couleur}`;
  tagOption.value = `${couleur}`;
  
  select.appendChild(tagOption);
 });
console.log(colors)

addCart(productData);
};

productDisplay();

const addCart = () => {
    console.log("bonjour");
    let bouton = document.getElementById(productData._id);
    console.log(bouton)
    bouton.addEventListener("click", () =>{
        let select = document.getElementById("colors");
        console.log(select);
    });
};
