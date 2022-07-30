const orderId = getOrderId();
displayOrderId(orderId);
clearLocalStorage();

function getOrderId() {
  const urlQueryString = window.location.search;
  const urlParams = new URLSearchParams(urlQueryString);
  return urlParams.get("orderId");
}

function displayOrderId(orderId) {
  const orderIdElement = document.querySelector("#orderId");
  orderIdElement.textContent = orderId;
}

function clearLocalStorage() {
  localStorage.clear();
}
