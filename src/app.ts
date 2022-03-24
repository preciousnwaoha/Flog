import { Storage } from "./classes/Storage.js";
import { Payment } from "./classes/Payment.js";
import { Invoice } from "./classes/Invoice.js";
import { HasFormatter } from "./interfaces/HasFormatter.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { changeTheme } from "./classes/Theme.js";

// Theme
const theme = document.querySelector(".theme") as HTMLDivElement;

theme.addEventListener("click", changeTheme);

const storage = new Storage(
  [],
  {
    invoiceId: 0,
    paymentId: 0,
  },
  {
    cashIn: [],
    cashOut: [],
  }
);

export const cashIn = document.querySelector(".cash-in") as HTMLDivElement;
export const cashOut = document.querySelector(".cash-out") as HTMLDivElement;
export const cashTotal = document.querySelector(
  ".cash-total"
) as HTMLDivElement;

export const noOfItemsElement = document.querySelector(
  ".no-of-items"
) as HTMLDivElement;

const form = document.querySelector(".new-item-form") as HTMLFormElement;

// inputs
const type = document.querySelector("#type") as HTMLSelectElement;
const toFrom = document.querySelector("#tofrom") as HTMLInputElement;
const details = document.querySelector("#details") as HTMLInputElement;
const amount = document.querySelector("#amount") as HTMLInputElement;

// List template instance
const ul = document.querySelector("ul") as HTMLUListElement;
const list = new ListTemplate(ul);

if (localStorage.getItem("fin-log-data")) {
  const itemsData = storage.getFromLocalStorage();
  let doc: HasFormatter;

  for (const index in itemsData) {
    let values: [string, string, number] = [
      itemsData[index].toFrom,
      itemsData[index].details,
      itemsData[index].amount,
    ];
    if (itemsData[index].type === "invoice") {
      doc = new Invoice(...values);
    } else {
      doc = new Payment(...values);
    }
    list.render(doc, itemsData[index].type, "end", storage);
    let noOfItems = storage.getItems().length;
    noOfItemsElement.innerText = `${noOfItems} Item${noOfItems > 1 ? "s" : ""}`;
  }
} else {
  storage.setInitialDataInLocalStorage();
}

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  let values: [string, string, number] = [
    toFrom.value,
    details.value,
    amount.valueAsNumber,
  ];

  for (const val in values) {
    if (!val) {
      return;
    }
  }

  let doc: HasFormatter;

  if (type.value === "invoice") {
    doc = new Invoice(...values);
    storage.addId("invoice");
    storage.addCash("invoice", values[2]);
    cashIn.innerText = `$${storage.getCash("in")}`;
  } else {
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
