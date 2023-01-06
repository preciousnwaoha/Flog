import { currencies, currencyType } from "../app.js";
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
  currency: string;
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
    },
    private currency: string
  ) {}

  getItems() {
    return this.listItems;
  }

  addItem(item: HTMLLIElement) {
    this.listItems.push(item);
  }
  emptyItems() {
    this.listItems = []
  }
  removeItem(item: HTMLLIElement, id: string, itemsTypes: string[]) {
    let idx = this.listItems.indexOf(item);

    if (idx > -1) {
      this.listItems.splice(idx, 1);
      if (id === "i") {
        this.ids.invoiceId -= 1;
        let cashIndex: number = 0;

        itemsTypes.splice(idx);
        for (const i in itemsTypes) {
          if (itemsTypes[i][0] === "i") {
            cashIndex += 1;
          }
        }

        this.cash.cashIn = this.cash.cashIn.filter(
          (c, index) => index !== cashIndex
        );
        // console.log(this.cash.cashIn, cashIndex);
        this.removeFromLocalStorage(idx, id);
      }
      if (id === "p") {
        this.ids.paymentId -= 1;
        let cashIndex: number = 0;

        itemsTypes.splice(idx);
        for (const i in itemsTypes) {
          if (itemsTypes[i][0] === "p") {
            cashIndex += 1;
          }
        }

        this.cash.cashOut = this.cash.cashOut.filter(
          (c, index) => index !== cashIndex
        );
        // console.log(this.cash.cashOut, cashIndex);
        this.removeFromLocalStorage(idx, id);
      }
      
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
      return this.cash.cashIn.reduce((a: number, b: number) => a + b, 0)
      
    }
    if (type === "out") {
      return this.cash.cashOut.reduce((a: number, b: number) => a + b, 0)
    }
    if (type === "total") {
      let inCash = this.cash.cashIn.reduce((a: number, b: number) => a + b, 0);
      let outCash = this.cash.cashOut.reduce(
        (a: number, b: number) => a + b,
        0
      );

      return (inCash - outCash);
    }
    return 0.00;
  }

  convertCashToCurrency(newCurrency: currencyType) {
    const oldCurrency = currencies.filter(_currency => _currency.code === this.currency)[0]
    const newCashIns = this.cash.cashIn.map(_oldCash => {
      return _oldCash / oldCurrency.rate * newCurrency.rate
    })

    const newCashOuts = this.cash.cashOut.map(_oldCash => {
      return _oldCash / oldCurrency.rate * newCurrency.rate
    })

    this.cash = {
      cashIn: [...newCashIns],
      cashOut: [...newCashOuts]
    }

    this.currency = newCurrency.code
    // console.log("cash: ", this.cash)
    // console.log("currency: ", this.currency)
    this.updateCurrencyOfDataInLocalStorage();
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

  getCurrency() {
    return this.currency
  }
  setCurrency (value: string) {
    this.currency = value
  }

  updateCurrencyOfDataInLocalStorage() {
    const dataInJSON = localStorage.getItem("fin-log-data")!;
    const data: Data = JSON.parse(dataInJSON);

    const oldCurrencyData = currencies.filter(_currency => _currency.code === data.currency)[0]
    const newCurrencyData = currencies.filter(_currency => _currency.code === this.currency)[0]
    
    const newData: Data = {
      itemsData: data.itemsData.map(_item => {
        return {
          ..._item,
          amount: _item.amount / oldCurrencyData.rate * newCurrencyData.rate,
        }
      }),
      ids: this.ids,
      cash: this.cash,
      currency: this.currency,
    };
    localStorage.setItem("fin-log-data", JSON.stringify(newData));this.currency = newData.currency;
    
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
      currency: "USD",
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
    data.currency = this.currency;
    localStorage.setItem("fin-log-data", JSON.stringify(data));
  }

  getFromLocalStorage() {
    const dataInJSON = localStorage.getItem("fin-log-data")!;
    const data: Data = JSON.parse(dataInJSON);
    this.ids = data.ids;
    this.cash = data.cash;
    this.currency = data.currency;
    
    let itemsData: ItemData[] = data.itemsData;
    return itemsData;
  }

  removeFromLocalStorage(idx: number, id: string) {
    const dataInJSON = localStorage.getItem("fin-log-data")!;
    const data: Data = JSON.parse(dataInJSON);

    data.itemsData.splice(idx, 1);
    if (id === "i") {
      data.cash.cashIn = this.cash.cashIn;
    }
    if (id === "p") {
      data.cash.cashOut = this.cash.cashOut;
    }
    // console.log(data.cash);
    data.ids = this.ids;

    localStorage.setItem("fin-log-data", JSON.stringify(data));
  }
}

