import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const firebaseConfig = {
  ...
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addBtnEl = document.getElementById("add-button");
const shoppingListEL = document.getElementById("shopping-list");

addBtnEl.addEventListener( "click", () => {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);

  clearInputFieldEl();
});

onValue(shoppingListInDB, (snapshot) => {
  if (snapshot.exists()) {
    let itemArr = Object.entries(snapshot.val());

    console.log(itemArr);
    clearShoppingListEL();

    itemArr.forEach(item => {
      appendItemToShoppingListEl(item);
    });
  } else {
    shoppingListEL.innerHTML = "No items here... yet";
  }

});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearShoppingListEL() {
  shoppingListEL.innerHTML = "";
}

function appendItemToShoppingListEl(item) {
  let newEl = document.createElement("li");
  let itemID = item[0];
  let itemValue = item[1];

  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", () => {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  shoppingListEL.append(newEl);
}
