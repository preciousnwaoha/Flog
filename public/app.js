import { Storage } from "./classes/Storage.js";
import { Payment } from "./classes/Payment.js";
import { Invoice } from "./classes/Invoice.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { changeTheme } from "./classes/Theme.js";
// Theme
const theme = document.querySelector(".theme");
theme.addEventListener("click", changeTheme);
const storage = new Storage([], {
    invoiceId: 0,
    paymentId: 0,
}, {
    cashIn: [],
    cashOut: [],
});
export const cashIn = document.querySelector(".cash-in");
export const cashOut = document.querySelector(".cash-out");
export const cashTotal = document.querySelector(".cash-total");
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
        cashIn.innerText = `$${storage.getCash("in")}`;
    }
    else {
        doc = new Payment(...values);
        storage.addId("payment");
        storage.addCash("payment", values[2]);
        cashOut.innerText = `$${storage.getCash("out")}`;
    }
    cashTotal.innerHTML = `${storage.getCash("total") < 0 ? "-$" + storage.getCash("total") : "$" + storage.getCash("total")}`;
    list.render(doc, type.value, "end", storage);
    let noOfItems = storage.getItems().length;
    noOfItemsElement.innerText = `${noOfItems} Item${noOfItems > 1 ? "s" : ""}`;
    storage.sendToLocalStorage(values, type.value);
});
