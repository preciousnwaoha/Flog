import { Payment } from "./classes/Payment.js";
import { Invoice } from "./classes/Invoice.js";
import { ListTemplate } from "./classes/ListTemplate.js";
const form = document.querySelector(".new-item-form");
// inputs
const type = document.querySelector("#type");
const toFrom = document.querySelector("#tofrom");
const details = document.querySelector("#details");
const amount = document.querySelector("#amount");
// List template instance
const ul = document.querySelector("ul");
const list = new ListTemplate(ul);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let values = [toFrom.value, details.value, amount.valueAsNumber];
    let doc;
    if (type.value) {
        doc = new Invoice(...values);
    }
    else {
        doc = new Payment(...values);
    }
    list.render(doc, type.value, "end");
});
// Turple
let arr = ["ryu", 25, true];
let tup = ["ryu", 25, true];
tup[0] = "kens";
tup[1] = 20;
// tup[0] = 5
