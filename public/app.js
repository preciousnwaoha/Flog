import { Storage } from "./classes/Storage.js";
import { Payment } from "./classes/Payment.js";
import { Invoice } from "./classes/Invoice.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { formatCurrencyAmount } from "./libs/utils/currency-helpers.js";
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "a1fbba2694mshc64927b9a391e36p1ada09jsnea91e9f526ca",
        "X-RapidAPI-Host": "fixer-fixer-currency-v1.p.rapidapi.com",
    },
};
// About logic
const logo = document.querySelector(".main-logo");
const about = document.querySelector(".about-sec");
const aboutExit = document.querySelector(".exit-about");
export const currencyPicker = document.querySelector("#currency");
export const cashWrapper = document.querySelectorAll(".cash");
const amountLabelSpan = document.querySelector("#field-amount-currency");
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
}, "USD");
export let currencies = [];
console.log("loading..");
fetch("https://fixer-fixer-currency-v1.p.rapidapi.com/latest?base=USD", options)
    .then((response) => response.json())
    .then((response) => {
    currencyPicker.innerHTML = `<option value=${storage.getCurrency()}>${storage.getCurrency()}</option>`;
    console.log("go go go");
    for (let currencyCode in response.rates) {
        currencies.push({
            rate: response.rates[currencyCode],
            symbol: "$",
            code: currencyCode,
        });
        currencyPicker.innerHTML += `<option value=${currencyCode}>${currencyCode}</option>`;
    }
})
    .catch((err) => {
    currencies = [
        {
            rate: 445.45,
            symbol: "N",
            code: "NGN",
        },
        {
            rate: 1,
            symbol: "$",
            code: "USD",
        },
    ];
    currencyPicker.innerHTML = `<option value=${storage.getCurrency()}>${storage.getCurrency()}</option>`;
    currencyPicker.innerHTML += `<option value=${storage.getCurrency() === "NGN" ? currencies[1].code : currencies[0].code}>${storage.getCurrency() === "NGN" ? currencies[1].code : currencies[0].code}</option>`;
    console.error(err);
});
export const updateCashWapper = () => {
    cashWrapper.forEach((item) => {
        item.innerHTML = `<span class="cash-in">${storage.getCurrency()}${formatCurrencyAmount(storage
            .getCash("in"))}</span>
    <span class="cash-out">${storage.getCurrency()}${formatCurrencyAmount(storage
            .getCash("out"))}</span>
    <span class="cash-equal-to">=</span>
    <span class="cash-total">${storage.getCash("total") < 0
            ? "-" +
                storage.getCurrency() +
                formatCurrencyAmount(storage.getCash("total") * -1)
            : storage.getCurrency() + formatCurrencyAmount(storage.getCash("total"))}</span>`;
    });
};
if (localStorage.getItem("fin-log-data")) {
    const itemsData = storage.getFromLocalStorage();
    updateCashWapper();
    amountLabelSpan.innerHTML = `(${storage.getCurrency()})`;
    let doc;
    for (const index in itemsData) {
        let values = [
            itemsData[index].toFrom,
            itemsData[index].details,
            itemsData[index].amount,
        ];
        if (itemsData[index].type === "invoice") {
            doc = new Invoice(...values, storage.getCurrency());
        }
        else {
            doc = new Payment(...values, storage.getCurrency());
        }
        list.render(doc, itemsData[index].type, "end", storage);
        let noOfItems = storage.getItems().length;
        noOfItemsElement.innerText = `${noOfItems} Item${noOfItems > 1 ? "s" : ""}`;
    }
}
else {
    storage.setInitialDataInLocalStorage();
    updateCashWapper();
    amountLabelSpan.innerHTML = `(${storage.getCurrency()})`;
}
currencyPicker.addEventListener("click", () => {
    if (currencyPicker.value === storage.getCurrency()) {
        return;
    }
    let newCurrencyData = currencies.filter((_currency) => _currency.code === currencyPicker.value)[0];
    storage.convertCashToCurrency(newCurrencyData);
    const itemsData = storage.getFromLocalStorage();
    console.log(" itemsData: ", itemsData);
    let doc;
    list.empty(storage);
    for (const index in itemsData) {
        let values = [
            itemsData[index].toFrom,
            itemsData[index].details,
            itemsData[index].amount,
        ];
        if (itemsData[index].type === "invoice") {
            doc = new Invoice(...values, storage.getCurrency());
        }
        else {
            doc = new Payment(...values, storage.getCurrency());
        }
        list.render(doc, itemsData[index].type, "end", storage);
    }
    console.log(storage.getItems().length);
    let noOfItems = storage.getItems().length;
    noOfItemsElement.innerText = `${noOfItems} Item${noOfItems > 1 ? "s" : ""}`;
    updateCashWapper();
    amountLabelSpan.innerHTML = `(${storage.getCurrency()})`;
});
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
        doc = new Invoice(...values, storage.getCurrency());
        storage.addId("invoice");
        storage.addCash("invoice", values[2]);
    }
    else {
        doc = new Payment(...values, storage.getCurrency());
        storage.addId("payment");
        storage.addCash("payment", values[2]);
    }
    updateCashWapper();
    list.render(doc, type.value, "end", storage);
    let noOfItems = storage.getItems().length;
    noOfItemsElement.innerText = `${noOfItems} Item${noOfItems > 1 ? "s" : ""}`;
    storage.sendToLocalStorage(values, type.value);
});
