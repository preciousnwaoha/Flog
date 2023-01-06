
import { Storage } from "./classes/Storage.js";
import { Payment } from "./classes/Payment.js";
import { Invoice } from "./classes/Invoice.js";
import { HasFormatter } from "./interfaces/HasFormatter.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { formatCurrencyAmount } from "./libs/utils/currency-helpers.js";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a1fbba2694mshc64927b9a391e36p1ada09jsnea91e9f526ca",
    "X-RapidAPI-Host": "fixer-fixer-currency-v1.p.rapidapi.com",
    mode: 'no-cors',
  },
  
};





export const currencyPicker = document.querySelector(
  "#currency"
) as HTMLSelectElement;

export const cashWrapper = document.querySelectorAll(".cash");

const amountLabelSpan = document.querySelector("#field-amount-currency") as HTMLSpanElement

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
const ul = document.querySelector(".items-list") as HTMLUListElement;
const list = new ListTemplate(ul);

// Rates Section
const ratesSearchForm = document.querySelector(".rate-search-form") as HTMLFormElement
const ratesList = document.querySelector(".rates-list") as HTMLUListElement;
const loadingElem = document.querySelector(".loading-rates-data") as HTMLParagraphElement;
const rateSearch = document.querySelector("#rate-search") as HTMLInputElement;
const cannotFetchRates = document.querySelector(".cannot-fetch-rates") as HTMLDivElement


let ratesGlobal: {
  success: boolean,
  timestamp: string,
base: string,
date: string,
rates: any,
};
let rateSearchValue = ""
let ratesRendered: Object;


// Initialize storage
const storage = new Storage(
  [],
  {
    invoiceId: 0,
    paymentId: 0,
  },
  {
    cashIn: [],
    cashOut: [],
  },
  "USD"
);


// currency Setup
export type currencyType = {
  rate: number;
  symbol: string;
  code: string;
};
export let currencies: currencyType[] = [];


const renderRatesList = ( rates: any ) => {
  if (rates === undefined) {
    return
  }
  
  ratesList.innerHTML = `<li class="rates-li">
  <p>USD</p>
  <p>${rates['USD'] || 1}</>
  </li>`

  Object.keys(rates).forEach((code: string) => {
    let li = document.createElement("li") as HTMLLIElement;
      li.classList.add("rates-li")
      li.innerHTML = `
        <p>${code}</p>
        <p>${rates[code]}</>
      `
      ratesList.append(li)
  }) 
  
}


ratesSearchForm.onclick = (event) => {
  event.preventDefault()

  let ratesFilteredToList: string[];
  
  ratesFilteredToList = Object.keys(ratesGlobal.rates).filter((rate) => {
      return (rate.includes(rateSearchValue.toLowerCase()) || rate.includes(rateSearchValue.toUpperCase()))
  })

  // console.log("rateSearchValue: ", rateSearchValue)
  // console.log("ratesFilteredToList: ", ratesFilteredToList)
  ratesRendered = {}

  ratesFilteredToList.forEach(code => {
    Object.assign(ratesRendered, {
      [code]: ratesGlobal.rates[code]
    })
  })

  // console.log(ratesRendered)
  renderRatesList(ratesRendered)
}

rateSearch.onchange = (event) => {
  rateSearchValue = event.target!.value
}


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
    loadingElem.classList.add("hide")
    ratesGlobal = response
    ratesRendered = response.rates
    renderRatesList(response.rates)
    ratesSearchForm.classList.add("show")
  })
  .catch((err) => {
    
    currencies = [
      // {
      //   rate: 445.45,
      //   symbol: "N",
      //   code: "NGN",
      // },
      {
        rate: 1,
        symbol: "$",
        code: "USD",
      },
    ];
    // currencyPicker.innerHTML = `<option value=${storage.getCurrency()}>${storage.getCurrency()}</option>`;
    // currencyPicker.innerHTML += `<option value=${storage.getCurrency() === "NGN" ? currencies[1].code : currencies[0].code}>${storage.getCurrency() === "NGN" ? currencies[1].code : currencies[0].code}</option>`;

    console.error(err);

    loadingElem.classList.add("hide")
    cannotFetchRates.classList.add(".show")
  });

export const updateCashWapper = () => {
  cashWrapper.forEach((item) => {
    item.innerHTML = `<span class="cash-in">${storage.getCurrency()}${formatCurrencyAmount(storage
      .getCash("in"))
      }</span>
    <span class="cash-out">${storage.getCurrency()}${formatCurrencyAmount(storage
      .getCash("out"))
      }</span>
    <span class="cash-equal-to">=</span>
    <span class="cash-total">${
      storage.getCash("total") < 0
        ? "-" +
          storage.getCurrency() +
          formatCurrencyAmount(storage.getCash("total") * -1)
        : storage.getCurrency() + formatCurrencyAmount(storage.getCash("total"))
    }</span>`;
  });
};

if (localStorage.getItem("fin-log-data")) {
  const itemsData = storage.getFromLocalStorage();

  updateCashWapper();
  amountLabelSpan.innerHTML = `(${storage.getCurrency()})`
  

  let doc: HasFormatter;

  for (const index in itemsData) {
    let values: [string, string, number] = [
      itemsData[index].toFrom,
      itemsData[index].details,
      itemsData[index].amount,
    ];
    if (itemsData[index].type === "invoice") {
      doc = new Invoice(...values, storage.getCurrency());
    } else {
      doc = new Payment(...values, storage.getCurrency());
    }
    list.render(doc, itemsData[index].type, "end", storage);
    let noOfItems = storage.getItems().length;
    noOfItemsElement.innerText = `${noOfItems} Item${noOfItems > 1 ? "s" : ""}`;
  }
} else {
  storage.setInitialDataInLocalStorage();
  updateCashWapper();
  amountLabelSpan.innerHTML = `(${storage.getCurrency()})`
}


currencyPicker.addEventListener("change", (event) => {
  console.log("red", (event.target as HTMLInputElement).value); // 👉️ get selected VALUE
  if ((event.target as HTMLInputElement).value === storage.getCurrency()) {
    return;
  }

  let newCurrencyData = currencies.filter(
    (_currency) => _currency.code === (event.target as HTMLInputElement).value
  )[0];

  storage.convertCashToCurrency(newCurrencyData);

  const itemsData = storage.getFromLocalStorage();
  console.log(" itemsData: ", itemsData);

  let doc: HasFormatter;
  list.empty(storage);
  for (const index in itemsData) {
    let values: [string, string, number] = [
      itemsData[index].toFrom,
      itemsData[index].details,
      itemsData[index].amount,
    ];
    if (itemsData[index].type === "invoice") {
      doc = new Invoice(...values, storage.getCurrency());
    } else {
      doc = new Payment(...values, storage.getCurrency());
    }
    
    list.render(doc, itemsData[index].type, "end", storage);
    
  }
  console.log(storage.getItems().length)
    let noOfItems = storage.getItems().length;
    noOfItemsElement.innerText = `${noOfItems} Item${noOfItems > 1 ? "s" : ""}`;

  updateCashWapper();
  amountLabelSpan.innerHTML = `(${storage.getCurrency()})`
});



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
    doc = new Invoice(...values, storage.getCurrency());
    storage.addId("invoice");
    storage.addCash("invoice", values[2]);
  } else {
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
