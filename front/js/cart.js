let addProduit = JSON.parse(localStorage.getItem("product"));

//*********************************************** */




//---------------------------------------------------//
async function panierDisplay() {
  if (addProduit) {
    await addProduit;
    console.log(addProduit);

    document.getElementById("cartAndFormContainer").innerHTML = addProduit.map((product) => 
    `
    <article class="cart__item" data-id="${product.id}" data-color="${product.teinte}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}"alt="${product.altTxt}">
   </img>             </div>
               <div class="cart__item__content">
                  <div class="cart__item__content__description">
                   <h2>${product.name}</h2>
                    <p>${product.teinte}</p>
                    <p>${product.price.toString().replace(/00/,"")} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                   <div class="cart__item__content__settings__quantity">
                     <p>Qté :  </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantite}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                   <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
     
     `).join("");
  };
}
   panierDisplay();

//******************************************************************** */

const moinsQuantite = async (panierDisplay) => {
  await panierDisplay;
  console.log("fonction moins");
  let moins = document.querySelectorAll(".deleteItem");
  console.log(moins);
  moins.forEach((negative) => {
  negative.addEventListener("click",() => {
  console.log(negative);

let totalAddProduit = addProduit.length;

  for(i = 0; i < totalAddProduit; i++) {
    console.log(totalAddProduit)
    if(addProduit[i].quantite == 1 && totalAddProduit == 1) {
      return (
       localStorage.removeItem("product"), 
        (location.href = "cart.html"),
        console.log("remove moins tout")
     );
   }
  
 
  //return (addProduit[i].quantite--,
   // localStorage.setItem("product" ,
    // JSON.stringify(addProduit),
    // (document.querySelectorAll(".itemQuantity")[i].textContent = 
    // addProduit[i].quantite)[i]
    // .textContent = `
    // ${
     // addProduit[i].quantite*
     // addProduit[i].price.toString().replace(/00/, "")
//} //€`,
//console.log("quantite--")
     // )
   // );
  
  }
 
});
  });
}


moinsQuantite();