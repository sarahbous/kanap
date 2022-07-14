// récupération de l'id de la commande (provenant du serveur) dans le local storage 

const responseId = localStorage.getItem("numcommande")
console.log(`responseId : ${responseId}`)

var timestamp = Math.round(new Date().getTime() / 1000);
//Notation courte
var timestamp = Math.round(+new Date() / 1000);
document.getElementById("orderId").textContent = timestamp;
