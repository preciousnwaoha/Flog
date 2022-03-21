import { Payment } from "./classes/Payment.js";
import { Invoice } from "./classes/Invoice.js";
import { HasFormatter } from "./interfaces/HasFormatter.js";
import { ListTemplate } from "./classes/ListTemplate.js";

const noOfItemsElement = document.querySelector(".no-of-items") as HTMLDivElement;

const form = document.querySelector(".new-item-form") as HTMLFormElement;

// inputs
const type = document.querySelector("#type") as HTMLSelectElement;
const toFrom = document.querySelector("#tofrom") as HTMLInputElement;
const details = document.querySelector("#details") as HTMLInputElement;
const amount = document.querySelector("#amount") as HTMLInputElement;

// List template instance
const ul = document.querySelector("ul") as HTMLUListElement;
const list  = new ListTemplate(ul)

let noOfItems: number =  0;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  let values: [string, string, number] = [toFrom.value, details.value, amount.valueAsNumber]

  let doc: HasFormatter;

  if (type.value) {
    doc = new Invoice(...values);
  } else {
    doc = new Payment(...values);
  }

  list.render(doc, type.value, "end")
  noOfItems++;
  noOfItemsElement.innerText = `${noOfItems} Item${noOfItems > 1 ? "s" : ""}`
});


// Turple

let arr = ["ryu", 25, true]

let tup: [string, number, boolean] = ["ryu", 25, true]
tup[0] = "kens"
tup[1] = 20
// tup[0] = 5