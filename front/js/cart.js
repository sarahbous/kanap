let queryString_url_id = window.location.search;
console.log(queryString_url_id);

let urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

let _id = urlSearchParams.get("id");
console.log(_id);

const getprice= async () => {
  await fetch(`http://localhost:3000/api/products/`)
    .then((res) => res.json())
    .then((promise) => {
      articlePrix = promise;
      console.log(articlePrix)
      let prix = document.getElementById("price");
  console.log(prix);

  console.log(articlePrix.price);
    })
  
  }

/////////////////////////////

let articlePrix=[]
let someProduct = [];

let sommeTotalProduit;
let addProduit = JSON.parse(localStorage.getItem("product"));

   
  getprice() 




//Afficher un tableau récapitulatif des achats dans le panier
const panierDisplay = async () => {
  if (addProduit) {
    await addProduit;
    console.log(addProduit);

    document.getElementById(panier_vide);
    panier_vide.parentNode.removeChild(panier_vide);

    document.getElementById("cartAndFormContainer").innerHTML = addProduit
      .map(
        (product) =>
          `
    <article class="cart__item" data-id="${product.id}" data-color="${
            product.teinte
          }">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}"alt="${product.altTxt}">
   </img>             </div>
               <div class="cart__item__content">
                  <div class="cart__item__content__description">
                   <h2>${product.nomProduit}</h2>
                    <p>${product.teinte}</p>
                   
                  <div class="cart__item__content__settings">
                   <div class="cart__item__content__settings__quantity">
                     <p>Qté :  </p>
                     <div class="bouton_plus_moins">
                     <button class="bouton_moins" data-id="${
                       product.id
                     }" data-color="${product.teinte}">
                     <span id="bouton_moins" class="fa-solid fa-circle-minus"></span>
                     </button> 
                      <input type="number" class="itemQuantity" data-id="${
                        product.id
                      }" min="1" max="100" value="${product.quantite}">
                     
                      <button class="bouton_plus"  data-id="${
                        product.id
                      }" data-color="${product.teinte}" >
                      <span id="bouton_plus" class="fa-solid fa-circle-plus"></span>
                      </button>
                    </div>
                    </div>
                    <div>
                    <p class="total_article">Total par article : €</p>
                  </div>
                    <div class="cart__item__content__settings__delete">
                   <p class="deleteItem" data-id="${product.id}" data-colors="${
            product.teinte
          }">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
              
          
     
     `
      )

      .join("");
    

    calculProduit();

    plusQuantite();

    removeProduct();

    minQuantite();

    return;
  } else {
    addProduit === null;
    limitedWidthBlock.classList.add("display-none");
  }
};
panierDisplay();

//supprimer un  produit
const removeProduct = async (panierDisplay) => {
  await panierDisplay;
  console.log("je suis la fonction removeProduct");
  let corbeilles = document.querySelectorAll(".deleteItem");
  console.log(corbeilles);

  corbeilles.forEach((supprimer) => {
    supprimer.addEventListener("click", () => {
      console.log(supprimer);

      let totalAddProduitRemove = addProduit.length;

      console.log(totalAddProduitRemove);

      if (totalAddProduitRemove == 1) {
        return (
          localStorage.removeItem("product"),
          console.log("supprime tout le panier"),
          (location.href = "cart.html")
        );
      } else {
        someProduct = addProduit.filter((el) => {
          if (supprimer.dataset.id != el._id) {
            return true;
          }
        });
        console.log(someProduct);
        localStorage.setItem("product", JSON.stringify(someProduct));
        calculProduit();
        console.log("supprimer le produit en question");
        location.href = "cart.html";
      }
    });
  });
};

//Bouton plus ajouter des quantités/

const plusQuantite = async (panierDisplay) => {
  await panierDisplay;
  console.log("fonction plus");
  let plus = document.querySelectorAll(".bouton_plus");
  console.log(plus);
  plus.forEach((positive) => {
    positive.addEventListener("click", () => {
      console.log(positive);

      for (i = 0; i < addProduit.length; i++) {
        if (addProduit[i]._id == positive.dataset.id) {
          return (
            addProduit[i].quantite++,
            console.log("quantite ++"),
            localStorage.setItem("product", JSON.stringify(addProduit)),
            (document.querySelector(
              '.itemQuantity[data-id="' + positive.dataset.id + '"]'
            ).value = addProduit[i].quantite),
            (document.querySelectorAll(".total_article")[
              i
            ].textContent = ` Total par article ${
              addProduit[i].quantite *
              addProduit[i].price.toString().replace(/00/, "")
            } €`),
            calculProduit(),
            console.log("quantite ++")
          );
        }
      }
    });
  });
};

//Bouton moins diminuer ou supprimer des quantités /
const minQuantite = async (panierDisplay) => {
  await panierDisplay;
  let moins = document.querySelectorAll(".bouton_moins");
  console.log(moins);
  moins.forEach((negative) => {
    negative.addEventListener("click", () => {
      console.log(negative);

      let totalAddProduit = addProduit.length;

      for (i = 0; i < totalAddProduit; i++) {
        console.log(totalAddProduit);
        if (addProduit[i].quantite == 1 && totalAddProduit == 1) {
          return (
            localStorage.removeItem("product"),
            (location.href = "cart.html"),
            console.log("remove moins tout")
          );
        }
        if (addProduit[i].quantite == 1 && totalAddProduit != 1) {
          addProduit.splice(i, 1);
          localStorage.setItem("product", JSON.stringify(addProduit));
          location.href = "cart.html";
          console.log("remove le produit en question");
        }
        if (
          (addProduit[i].quantite != 1 &&
            totalAddProduit != 11 &&
            addProduit[i]._id == negative.dataset.id) ||
          (addProduit[i].quantite == 1 &&
            totalAddProduit == 1 &&
            addProduit[i]._id == negative.dataset.id)
        ) {
          return (
            addProduit[i].quantite--,
            localStorage.setItem(
              "product",
              JSON.stringify(addProduit),
              (document.querySelector(
                '.itemQuantity[data-id="' + negative.dataset.id + '"]'
              ).value = addProduit[i].quantite),
              (document.querySelectorAll(".total_article")[i].textContent = ` ${
                addProduit[i].quantite *
                addProduit[i].price.toString().replace(/00/, "")
              } €`)
            ),
            calculProduit(),
            console.log("quantite --")
          );
        }
      }
    });
  });
};

//Calcul des produits/
const calculProduit = async (
  panierDisplay,
  minQuantite,
  plusQuantite,
  removeProduct
) => {
  await panierDisplay;
  await minQuantite;
  await plusQuantite;
  await removeProduct;

  console.log("je calcule les produits");

  let produitPrice = [];
  let quantiteTotalProduit = [];

  let newTableau = JSON.parse(localStorage.getItem("product"));
  console.log(newTableau);
  let afficheQuantite = document.querySelectorAll(".itemQuantity");
  console.log(afficheQuantite);

  newTableau.forEach((produit) => {
    produitPrice.push(
      produit.price.toString().replace(/00/, "") * produit.quantite
    );
    quantiteTotalProduit.push(produit.quantite);
  });
  console.log(produitPrice);
  console.log(quantiteTotalProduit);

  document.getElementById("totalQuantity").textContent = `${eval(
    quantiteTotalProduit.join("+")
  )}`;

  console.log(produitPrice.toString());

  sommeTotalProduit = eval(produitPrice.toString().replace(/,/g, "+"));
  console.log(sommeTotalProduit);

  totalPrice.textContent = sommeTotalProduit;
};

//Formulaire de contacte/

const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
console.log(nom);
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const email = document.getElementById("email");

let valuePrenom, valueNom, valueEmail, valueAdresse, valueVille;
//analyse les données saisies dans l'input prénom
prenom.addEventListener("input", function (e) {
  console.log(prenom.value);
  valuePrenom;
  if (e.target.value.length == 0) {
    firstNameErrorMsg.innerHTML = "";
    console.log("rien");
    valuePrenom = null;
    console.log(valuePrenom);
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    firstNameErrorMsg.innerHTML =
      "Prenom doit contenir entre 3 et 25 caractères";
    valuePrenom = null;
    console.log("trop court ou trop long");
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    firstNameErrorMsg.innerHTML = "";
    valuePrenom = e.target.value;
    console.log("success");
    console.log(valuePrenom);
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    firstNameErrorMsg.innerHTML =
      "Le champs prénom ne doit pas contenir de chiffres et caractères spéciaux";
    valuePrenom = null;
    console.log("trop caratère special");
  }
});

nom.addEventListener("input", function (e) {
  console.log(nom.value);
  valueNom;
  if (e.target.value.length == 0) {
    lastNameErrorMsg.innerHTML = "";
    console.log("rien");
    valueNom = null;
    console.log(valuePrenom);
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    lastNameErrorMsg.innerHTML = "Nom doit contenir entre 3 et 25 caractères";
    valueNom = null;
    console.log("trop court ou trop long");
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    lastNameErrorMsg.innerHTML = "";
    valueNom = e.target.value;
    console.log("success");
    console.log(valueNom);
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    lastNameErrorMsg.innerHTML =
      "Le champs nom ne doit pas contenir de chiffres et caractères spéciaux";
    valueNom = null;
    console.log("trop caratère special");
  }
});
//analyse les données saisies dans l'input adresse

adresse.addEventListener("input", function (e) {
  console.log(prenom.value);
  valueAdresse;
  if (e.target.value.length == 0) {
    addressErrorMsg.innerHTML = "";
    console.log("rien");
    valueAdresse = null;
    console.log(valueAdresse);
  } else if (e.target.value.length < 3 || e.target.value.length > 35) {
    addressErrorMsg.innerHTML =
      "Adresse doit contenir entre 3 et 35 caractères";
    valueAdresse = null;
    console.log("trop court ou trop long");
  }
  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,25}$/)) {
    addressErrorMsg.innerHTML = "";
    valueAdresse = e.target.value;
    console.log("success");
    console.log(valueAdresse);
  }
  if (
    !e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 35
  ) {
    addressErrorMsg.innerHTML =
      "Le champs adresse ne doit pas contenir de caractères spéciaux et doit commencer par un chiffre";
    valueAdresse = null;
    console.log("trop caratère special");
  }
});
//analyse les données saisies dans l'input ville

ville.addEventListener("input", function (e) {
  valueVille;
  if (e.target.value.length == 0) {
    cityErrorMsg.innerHTML = "";
    console.log("rien");
    valueVille = null;
    console.log(valueVille);
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    cityErrorMsg.innerHTML = "Ville doit contenir entre 3 et 25 caractères";
    valueVille = null;
    console.log("trop court ou trop long");
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    cityErrorMsg.innerHTML = "";
    valueVille = e.target.value;
    console.log("success");
    console.log(valueVille);
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    cityErrorMsg.innerHTML =
      "Le champs ville ne doit pas contenir de chiffres et caractères spéciaux";
    valueVille = null;
    console.log("trop caratère special");
  }
});
//analyse les données saisies dans l'input email

email.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    emailErrorMsg.innerHTML = "";
    valueEmail = null;
    console.log(valueEmail);
  } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    emailErrorMsg.innerHTML = "";
    valueEmail = e.target.value;
    console.log(valueEmail);
  }
  if (
    !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
    !e.target.value.length == 0
  ) {
    emailErrorMsg.innerHTML = "Email non valide ex :sarah@hotmail.fr";
    valueEmail = null;
  }
});
//requête post sur l'api
formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("post stop");

  if (valuePrenom && valueEmail && valueNom && valueAdresse && valueVille) {
    console.log("envoie ");
    const commandeFinal = JSON.parse(localStorage.getItem("product"));
    let commandeId = [];
    console.log(commandeFinal);
    console.log(commandeId);

    commandeFinal.forEach((commande) => {
      commandeId.push(commande._id);

      //location.href = "confirmation.html";
    });
    console.log(commandeId);

    const data = {
      contact: {
        firstName: valuePrenom,
        lastName: valueNom,
        address: valueAdresse,
        email: valueEmail,
        city: valueVille,
      },
      products: commandeId,
    };
    envoyerServeur(data)
    console.log(data);
    localStorage.setItem("formulairevalues", JSON.stringify(data));
    //localStorage.setItem("numcommande", JSON.stringify(numcommande));
  } else alert("remplir le formulaire");
});
function envoyerServeur(data){
  //Envoie de l'objet vers le serveur
  const promise01 = fetch("http://localhost:3000/api/products/order", {
    method:"POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  })
  //.then((res) => res.json())
  //.then((value) => {
     //Permet d'effacer ce qui est stocké dans le localStorage
    //localStorage.clear();
   //window.location.href = `../html/confirmation.html?id=${value.orderId}`;
  //})
  //.catch((err) => console.log(err));






  //pour voir le resultat du serveur dan sla console
promise01.then(async(response)=>{
  //Si la promesse n'est pas resolu, si ell est rejeté
  try{
    const contenu = await response.json();
    console.log("contenu de response")
    console.log(contenu);

    if(response.ok){
      console.log(`Resultat de response.ok : ${response.ok}`);
      //Recupération de l'id de la response du serveur
      console.log("id de la response")
      console.log(contenu.orderId)
       //mettre l'ID dans le localstorage
       localStorage.setItem("responseId", contenu.orderId);
       //Aller vers la,page confirmation commande
       window.location = "confirmation.html";
   } else{
      console.log(`reponse du serveur : ${response.status}`)
     alert(`Problème avec le serveur : erreur ${response.status}`)
   }
  }catch(e){
    console.log("erreur qui vient du catch()");
    console.log(e);
    alert(`ERREUR qui vient du catch() ${e}`)
  }
})
}
