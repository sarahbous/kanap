// récupération de l'id de la commande (provenant du serveur) dans le local storage
const responseId = localStorage.getItem("responseId");
console.log(`responseId : ${responseId}`);

document.getElementById("orderId").textContent = responseId;

//effacer tout le local storage sauf le formulaire
function retirerCleLocalStorage(key){
    localStorage.removeItem(key)
}

retirerCleLocalStorage("responseId")