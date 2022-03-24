import { cashIn } from "../app.js";
import { cashOut } from "../app.js";
import { cashTotal } from "../app.js";
import { noOfItemsElement } from "../app.js";

export interface ItemData {
  toFrom: string;
  details: string;
  amount: number;
  type: string;
}

interface Data {
  itemsData: ItemData[];
  ids: {
    invoiceId: number;
    paymentId: number;
  };
  cash: {
    cashIn: number[];
    cashOut: number[];
  };
}

export class Storage {
  constructor(
    private listItems: HTMLLIElement[],

    private ids: {
      invoiceId: number;
      paymentId: number;
    },
    private cash: {
      cashIn: number[];
      cashOut: number[];
    }
  ) {}

  getItems() {
    return this.listItems;
  }

  addItem(item: HTMLLIElement) {
    this.listItems.push(item);
  }
  removeItem(item: HTMLLIElement, id: string) {
    let idx = this.listItems.indexOf(item);
    console.log(id, idx)
    if (idx > -1) {
      this.listItems.splice(idx, 1);
      if (id === "i") {
        this.ids.invoiceId -= 1;
        this.cash.cashIn.splice(idx, 1);
        cashIn.innerText = `$${this.getCash("in")}`;
        this.removeFromLocalStorage(idx, id);
      }
      if (id === "p") {
        this.ids.paymentId -= 1;
        this.cash.cashOut.splice(idx, 1);
        cashOut.innerText = `$${this.getCash("out")}`;
        this.removeFromLocalStorage(idx, id);
      }
      cashTotal.innerHTML = `${this.getCash("total") < 0 ? "-$" + (this.getCash("total")*-1) : "$" + this.getCash("total")}`;
      let noOfItems = this.getItems().length;
      noOfItemsElement.innerText = `${noOfItems} Item${
        noOfItems > 1 ? "s" : ""
      }`;
    }
  }

  addCash(type: string, amount: number) {
    if (type === "invoice") {
      this.cash.cashIn.push(amount);
    }
    if (type === "payment") {
      this.cash.cashOut.push(amount);
    }
  }

  getCash(type: string): number {
    if (type === "in") {
      return parseFloat(this.cash.cashIn
        .reduce((a: number, b: number) => a + b, 0)
        .toFixed(2));
    }
    if (type === "out") {
      return parseFloat(this.cash.cashOut
        .reduce((a: number, b: number) => a + b, 0)
        .toFixed(2));
    }
    if (type === "total") {
      let inCash = this.cash.cashIn.reduce((a: number, b: number) => a + b, 0);
      let outCash = this.cash.cashOut.reduce(
        (a: number, b: number) => a + b,
        0
      );

      return parseFloat((inCash - outCash).toFixed(2));
    }
    return 0.0;
  }

  addId(type: string) {
    if (type === "invoice") {
      this.ids.invoiceId += 1;
      return `i${this.ids.invoiceId}`;
    }
    if (type === "payment") {
      this.ids.paymentId += 1;
      return `p${this.ids.paymentId}`;
    }
  }
  getIds(type: string) {
    if (type === "invoice") {
      return this.ids.invoiceId;
    }
    if (type === "payment") {
      return this.ids.paymentId;
    }
  }

  setInitialDataInLocalStorage() {
    const data: Data = {
      itemsData: [],
      ids: {
        invoiceId: 0,
        paymentId: 0,
      },
      cash: {
        cashIn: [],
        cashOut: [],
      },
    };
    localStorage.setItem("fin-log-data", JSON.stringify(data));
  }

  sendToLocalStorage(values: [string, string, number], type: string) {
    const dataInJSON = localStorage.getItem("fin-log-data")!;
    const data: Data = JSON.parse(dataInJSON);
    const itemData = {
      toFrom: values[0],
      details: values[1],
      amount: values[2],
      type: type,
    };
    data.itemsData.push(itemData);
    data.ids = this.ids;
    data.cash = this.cash;
    localStorage.setItem("fin-log-data", JSON.stringify(data));
  }

  getFromLocalStorage() {
    const dataInJSON = localStorage.getItem("fin-log-data")!;
    const data: Data = JSON.parse(dataInJSON);
    this.ids = data.ids;
    this.cash = data.cash;
    cashOut.innerText = `$${this.getCash("out")}`;
    cashIn.innerText = `$${this.getCash("in")}`;
    cashTotal.innerHTML = `${this.getCash("total") < 0 ? "-$" + (this.getCash("total")*-1) : "$" + this.getCash("total")}`;
    let itemsData: ItemData[] = data.itemsData;
    return itemsData;
  }

  removeFromLocalStorage(idx: number, id: string) {
    const dataInJSON = localStorage.getItem("fin-log-data")!;
    const data: Data = JSON.parse(dataInJSON);

    data.itemsData.splice(idx, 1);
    data.cash = this.cash;
    data.ids = this.ids;

    localStorage.setItem("fin-log-data", JSON.stringify(data));
  }
}
