import { Storage } from "./classes/Storage.js";
import { Payment } from "./classes/Payment.js";
import { Invoice } from "./classes/Invoice.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { changeTheme } from "./classes/Theme.js";
import { convertToCurrency } from "./libs/utils/item.js";
// Theme
const theme = document.querySelector(".theme");
theme.addEventListener("click", changeTheme);
// About logic
const logo = document.querySelector(".main-logo");
const about = document.querySelector(".about-sec");
const aboutExit = document.querySelector(".exit-about");
const currencyPicker = document.querySelector("#currency");
export const cashIn = document.querySelectorAll(".cash-in");
export const cashOut = document.querySelectorAll(".cash-out");
export const cashTotal = document.querySelectorAll(".cash-total");
export const noOfItemsElement = document.querySelector(".no-of-items");
const form = document.querySelector(".new-item-form");
// inputs
const type = document.querySelector("#type");
const toFrom = document.querySelector("#tofrom");
const details = document.querySelector("#details");
const amount = document.querySelector("#amount");
// List template instance
const ul = document.querySelector("ul");
const list = new ListTemplate(ul);
// Initialize storage
const storage = new Storage([], {
    invoiceId: 0,
    paymentId: 0,
}, {
    cashIn: [],
    cashOut: [],
}, "$");
logo.addEventListener("click", () => {
    console.log("Clicke3d");
    if (about.classList.length > 1) {
        about.className = "about-sec";
    }
    else {
        about.className = "about-sec slide-in-about";
    }
});
aboutExit.addEventListener("click", () => {
    if (about.classList.length > 1) {
        about.className = "about-sec";
    }
    else {
        about.className = "about-sec slide-in-about";
    }
});
console.log(storage.getCurrency());
currencyPicker.addEventListener("click", () => {
    const itemsOnScreen = document.querySelectorAll(".amount-in-item");
    for (const item of itemsOnScreen) {
        item.innerHTML = convertToCurrency(currencyPicker.value, item.innerHTML, storage.getCurrency());
        console.log(currencyPicker.value, item.innerHTML);
    }
    cashIn.forEach(x => {
        x.innerHTML = convertToCurrency(currencyPicker.value, x.innerHTML, storage.getCurrency());
    });
    cashOut.forEach(x => {
        x.innerHTML = convertToCurrency(currencyPicker.value, x.innerHTML, storage.getCurrency());
    });
    cashTotal.forEach(x => {
        x.innerHTML = convertToCurrency(currencyPicker.value, x.innerHTML, storage.getCurrency());
    });
    storage.setCurrency(currencyPicker.value);
});
if (localStorage.getItem("fin-log-data")) {
    const itemsData = storage.getFromLocalStorage();
    let doc;
    for (const index in itemsData) {
        let values = [
            itemsData[index].toFrom,
            itemsData[index].details,
            itemsData[index].amount,
        ];
        if (itemsData[index].type === "invoice") {
            doc = new Invoice(...values);
        }
        else {
            doc = new Payment(...values);
        }
        list.render(doc, itemsData[index].type, "end", storage);
        let noOfItems = storage.getItems().length;
        noOfItemsElement.innerText = `${noOfItems} Item${noOfItems > 1 ? "s" : ""}`;
    }
}
else {
    storage.setInitialDataInLocalStorage();
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let values = [
        toFrom.value,
        details.value,
        amount.valueAsNumber,
    ];
    for (const val in values) {
        if (!val) {
            return;
        }
    }
    let doc;
    if (type.value === "invoice") {
        doc = new Invoice(...values);
        storage.addId("invoice");
        storage.addCash("invoice", values[2]);
        cashIn.forEach(x => {
            console.log(x);
            x.textContent = `${storage.getCurrency()}${storage.getCash("in")}`;
        });
    }
    else {
        doc = new Payment(...values);
        storage.addId("payment");
        storage.addCash("payment", values[2]);
        cashOut.forEach(x => {
            x.textContent = `${storage.getCurrency()}${storage.getCash("out")}`;
        });
    }
    cashTotal.forEach(x => {
        x.innerHTML = `${storage.getCash("total") < 0 ? "-$" + (storage.getCash("total") * -1) : "$" + storage.getCash("total")}`;
    });
    list.render(doc, type.value, "end", storage);
    let noOfItems = storage.getItems().length;
    noOfItemsElement.innerText = `${noOfItems} Item${noOfItems > 1 ? "s" : ""}`;
    storage.sendToLocalStorage(values, type.value);
});
