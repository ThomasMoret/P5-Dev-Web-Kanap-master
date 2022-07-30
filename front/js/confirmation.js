const orderId = getOrderId();
displayOrderId(orderId);
clearLocalStorage();

// Récupération de l'id de la commande
function getOrderId() {
  const urlQueryString = window.location.search;
  const urlParams = new URLSearchParams(urlQueryString);
  return urlParams.get("orderId");
}
// Affichage de l'id de la commande
function displayOrderId(orderId) {
  const orderIdElement = document.querySelector("#orderId");
  orderIdElement.textContent = orderId;
}

// Suppression du localStorage après la confirmation de la commande
function clearLocalStorage() {
  localStorage.clear();
}
