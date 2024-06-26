let menus = [
  {
    name: "Pizza Margherita",
    description: "mit Mozarella,Tomaten und Basilikum",
    plusImage: "./icon/plus.png",
    minusImage: "./icon/minus.png",
    price: 8.99,
    amount: 1,
    dishesImage: "./img/pizzamargherita.jpg",
  },
  {
    name: "Pizza Prosciutto",
    description: "mit Schinken,Mozarella und Pepperoni",
    plusImage: "./icon/plus.png",
    minusImage: "./icon/minus.png",
    price: 9.99,
    amount: 1,
    dishesImage: "./img/mozarella.jpg",
  },
  {
    name: "Pizza Salami",
    description: "mit Schinken,Mozarella und Pepperoni",
    plusImage: "./icon/plus.png",
    minusImage: "./icon/minus.png",
    price: 11.99,
    amount: 1,
    dishesImage: "./img/salami.jpg",
  },
  {
    name: "Pizza Spinaci",
    description: "mit Spinat und Käse",
    plusImage: "./icon/plus.png",
    minusImage: "./icon/minus.png",
    price: 10.99,
    amount: 1,
    dishesImage: "./img/spinaci.jpg",
  },
  {
    name: "Pizza Mexicana",
    description: "mit Mais,Paprika und Mozarella",
    plusImage: "./icon/plus.png",
    minusImage: "./icon/minus.png",
    price: 11.99,
    amount: 1,
    dishesImage: "./img/pizzamargherita.jpg",
  },
  {
    name: "Pizza Vegetaria",
    description: "mit allerlei Gemüse",
    plusImage: "./icon/plus.png",
    minusImage: "./icon/minus.png",
    price: 12.99,
    amount: 1,
    dishesImage: "./img/vegetaria.jpg",
  },
];

let shoppingBasket = [];
let priceBasket = [];
let amountBasket = [];
let total = 0;

function init() {
  loadArray();
  render();
  renderBasket();
}

function render() {
  let content = document.getElementById("content");
  content.innerHTML = ""; //Inhalt leeren
  for (let i = 0; i < menus.length; i++) { // durch Array iterieren
    const menu = menus[i];
    content.innerHTML += contentTemplate(i, menu); //Inhalt hinzufügen
  }
}

function contentTemplate(i, menu) {
  return /*html*/ `
        <div class="dishes-div">
           <div class="dishes-name-div">
              <h4 class="menu-name">${menu.name}</h4>
              <img class="plusImg" src="./icon/plus.png" onclick="addFoodToBasket(${i})" alt="Plus">
          </div>
        <div class="dishes-description-img-div">
          <div>
              <p class="dishes-description">${menu.description}</p>
              <p class="dishes-price"><b>${menu.price.toFixed(2).replace(".", ",")}€</b></p>
         </div>
         <div>
             <img class="dishes-img" src="${menu.dishesImage}" alt="${menu.name}">
          </div>
        </div>
     </div>`;
}

function renderBasket() {
  let basketContent = document.getElementById("basket-content");
  let basketTotal = document.getElementById("total-price");
  let basketTotalMobile = document.getElementById("mobile-payment-cost");
  let total = calculateCost();
  basketContent.innerHTML = "";
  if (shoppingBasket.length <= 0) {// wenn der Warenkorb leer ist
    basketContent.innerHTML = generateEmptyShoppingBasketHTML();
  } else {
    for (let i = 0; i < shoppingBasket.length; i++) {
      basketContent.innerHTML += basketContentTemplate(i);
    }
  }
  basketTotal.innerHTML = `Total: ${total}€`;
  basketTotalMobile.innerHTML = `Total: ${total}€`;
  changeBasketCounter();
}

function basketContentTemplate(i) {
  let price = priceBasket[i];
  let quantity = amountBasket[i];
  let totalItemPrice = (price * quantity).toFixed(2).toString().replace('.', ','); // Gesamtpreis des Artikels formatieren
  let formattedPrice = price.toFixed(2).toString().replace('.', ',');  // Einzelpreis formatieren

  return /*html*/ `
    <div class="basket-item">
      <span>${shoppingBasket[i]}</span>
      <span>${quantity} x ${formattedPrice}€ = ${totalItemPrice}€</span>
    </div>
    <div class="shoppingbasket-div">
      <img class="minusImg" src="./icon/minus.png" onclick="removeFoodFromBasket(${i})" alt="Minus">
      <img class="plusImg" src="./icon/plus.png" onclick="morePizza(${i})" alt="Plus">
    </div>
  `;
}

function morePizza(i) {
  amountBasket[i]++;
  renderBasket();
}

function generateEmptyShoppingBasketHTML() {
  
  return /*html*/ `	
     <div id="empty-basket-text">
        <img src="./icon/shopping-bag.png" alt="bag">
        <h2>Dein Warenkorb ist leer</h2>
        <p>Füge bitte Gerichte aus der <br> Speisekarte hinzu und bestelle dein Essen.</p>
     </div>
    `;
}

function generateDialogHtml() {
  return /*html*/ `
    <div class="dialog-content"> 
         <h3 class = "basket-title">Vielen Dank für Ihre Bestellung</h3>
         <button class ="button" onclick="closeDialog()">Schließen</button>
    </div>
    `;
}

function addFoodToBasket(i) {
  let menu = menus[i];
  let menuName = menu.name;
  let price = menu.price;
  let index = shoppingBasket.indexOf(menuName);
  if (index === -1) {
    shoppingBasket.push(menuName);
    priceBasket.push(price);
    amountBasket.push(1);
  } else {
    amountBasket[index]++;
  }
  renderBasket();
}

function removeFoodFromBasket(index) {
  const currentQuantity = amountBasket[index]; //definiert die aktuelle Menge
  if (currentQuantity > 1) {//falls mehr als 1
    amountBasket[index]--; //Menge reduzieren
    renderBasket();
    return;
  }
  shoppingBasket.splice(index, 1); //ein Element aus dem Array entfernen
  priceBasket.splice(index, 1); //Preis entfernen
  amountBasket.splice(index, 1); // Menge entfernen
  renderBasket(); //warenkorb aktualisieren
}

function selectShipment() {
  let shipment = document.getElementById("basket-order-take");
  const takeAway = document.getElementById("basket-take-order");
  shipment.style.backgroundColor = "grey";
  takeAway.style.backgroundColor = "transparent";
}

function selectTakeAway() {
  let takeAway = document.getElementById("basket-take-order");
  const shipment = document.getElementById("basket-order-take");
  takeAway.style.backgroundColor = "grey";
  shipment.style.backgroundColor = "transparent";
}

function closeButton() {
  const basketMain = document.getElementById("basketMain");
  const mobilePayment = document.getElementById("mobile-payment-container");
  basketMain.style.display = "none";
  mobilePayment.style.display = "flex";
  renderBasket();
}

function openButton() {
  const basketMain = document.getElementById("basketMain");
  const mobilePayment = document.getElementById("mobile-payment-container");
  mobilePayment.style.display = "none";
  basketMain.style.display = "flex";
  renderBasket();
}

function changeLike() {
  let likeBtn = document.getElementById("likebtn"); //Elem. aufrufen
  if (likeBtn.src.includes("love-circled.png")) {//wenn das Bild "love-circled.png" enthält dann true
    likeBtn.src = "./icon/heart-suit.png"; //
  } else {
    likeBtn.src = "./icon/love-circled.png";
  }
}

function saveArray() {
  let menusAsText = JSON.stringify(menus);
  localStorage.setItem(menus, menusAsText);
}

function loadArray() {
  let menusAsText = localStorage.getItem("menus");
  if (menusAsText) {
    menus = JSON.parse(menusAsText);
  }
}

function openDialog() {
  let dialog = document.getElementById("dialog-container");
  dialog.innerHTML = generateDialogHtml();
  dialog.style.display = "flex";
}

function closeDialog() {
  let dialog = document.getElementById("dialog-container");
  dialog.style.display = "none";
}

function calculateCost() {
  let sum = 0; //Summe auf 0 setzen
  for (let i = 0; i < priceBasket.length; i++) {// durch das Array iterieren
    sum += priceBasket[i] * amountBasket[i]; // Preis * Menge und zur Summe addiert
  }
  let formattedSum = sum.toFixed(2).toString().replace('.', ','); // Summe . mit , ersetzen
  return formattedSum; // Formatierte Summe zurückgeben
}

function generateDialogContent() {
  return /*html*/ `
     <div class="dialog-content"> 
        <h3 id="basket-title" class = "basket-title">Vielen Dank für Ihre Bestellung</h3>
        <button class ="button" onclick="closeDialog()">Schließen</button>
     </div>
`;
}

function payment() {
  if (shoppingBasket.length <= 0) {//  wenn der Warenkorb leer ist
    
  } else {
    openDialog();
    clearBasket(); // Warenkorb leeren
    renderBasket(); // Warenkorb aktualisieren
    closeButton();
    return generateDialogContent();
  }
}

function clearBasket() {
  shoppingBasket = [];
  priceBasket = [];
  amountBasket = [];
  total = 0;
}

function addClassList() {
  document.getElementById("basket-title").classList.add("display-none");
  document.getElementById("dialog-container").classList.add("display-none");
  document.getElementById("empty-basket-text").classList.add("display-none");
}

function removeClassList() {
  document.getElementById("basket-title").classList.remove("display-none");
  document.getElementById("dialog-container").classList.remove("display-none");
  document.getElementById("empty-basket-text").classList.remove("display-none");
}

function changeBasketCounter() {
  const basketCounter = document.getElementById("basketCounter");
  let sumAmountBasket = 0;
  for (let i = 0; i < amountBasket.length; i++) {
    const pizzaAmount = amountBasket[i];
    sumAmountBasket += pizzaAmount;
  }
  basketCounter.innerHTML = sumAmountBasket;
}
