let addProduit = JSON.parse(localStorage.getItem("product"));

//*********************************************** */




//---------------------------------------------------//
const panierDisplay = async () => {
   console.log("salut");
   if (addProduit) {
      await addProduit;
      console.log(addProduit);

      document.getElementById("cartAndFormContainer").innerHTML = addProduit.map((product) => 
    
    `
    <article class="cart__item" data-id="" data-color="">
                <div class="cart__item__img">
                  <img src=${product.imageUrl} alt="Photographie d'un canapé">
   </img>             </div>
               <div class="cart__item__content">
                  <div class="cart__item__content__description">
                   <h2>${product.name}</h2>
                    <p>${product.teinte}</p>
                    <p>${product.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                   <div class="cart__item__content__settings__quantity">
                     <p>Qté :  </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                   <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
     
     ` )
    };
}; 
   

panierDisplay();
