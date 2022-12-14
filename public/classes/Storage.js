import { currencies } from "../app.js";
import { noOfItemsElement } from "../app.js";
export class Storage {
    constructor(listItems, ids, cash, currency) {
        this.listItems = listItems;
        this.ids = ids;
        this.cash = cash;
        this.currency = currency;
    }
    getItems() {
        return this.listItems;
    }
    addItem(item) {
        this.listItems.push(item);
    }
    emptyItems() {
        this.listItems = [];
    }
    removeItem(item, id, itemsTypes) {
        let idx = this.listItems.indexOf(item);
        if (idx > -1) {
            this.listItems.splice(idx, 1);
            if (id === "i") {
                this.ids.invoiceId -= 1;
                let cashIndex = 0;
                itemsTypes.splice(idx);
                for (const i in itemsTypes) {
                    if (itemsTypes[i][0] === "i") {
                        cashIndex += 1;
                    }
                }
                this.cash.cashIn = this.cash.cashIn.filter((c, index) => index !== cashIndex);
                // console.log(this.cash.cashIn, cashIndex);
                this.removeFromLocalStorage(idx, id);
            }
            if (id === "p") {
                this.ids.paymentId -= 1;
                let cashIndex = 0;
                itemsTypes.splice(idx);
                for (const i in itemsTypes) {
                    if (itemsTypes[i][0] === "p") {
                        cashIndex += 1;
                    }
                }
                this.cash.cashOut = this.cash.cashOut.filter((c, index) => index !== cashIndex);
                // console.log(this.cash.cashOut, cashIndex);
                this.removeFromLocalStorage(idx, id);
            }
            let noOfItems = this.getItems().length;
            noOfItemsElement.innerText = `${noOfItems} Item${noOfItems > 1 ? "s" : ""}`;
        }
    }
    addCash(type, amount) {
        if (type === "invoice") {
            this.cash.cashIn.push(amount);
        }
        if (type === "payment") {
            this.cash.cashOut.push(amount);
        }
    }
    getCash(type) {
        if (type === "in") {
            return this.cash.cashIn.reduce((a, b) => a + b, 0);
        }
        if (type === "out") {
            return this.cash.cashOut.reduce((a, b) => a + b, 0);
        }
        if (type === "total") {
            let inCash = this.cash.cashIn.reduce((a, b) => a + b, 0);
            let outCash = this.cash.cashOut.reduce((a, b) => a + b, 0);
            return (inCash - outCash);
        }
        return 0.00;
    }
    convertCashToCurrency(newCurrency) {
        const oldCurrency = currencies.filter(_currency => _currency.code === this.currency)[0];
        const newCashIns = this.cash.cashIn.map(_oldCash => {
            return _oldCash / oldCurrency.rate * newCurrency.rate;
        });
        const newCashOuts = this.cash.cashOut.map(_oldCash => {
            return _oldCash / oldCurrency.rate * newCurrency.rate;
        });
        this.cash = {
            cashIn: [...newCashIns],
            cashOut: [...newCashOuts]
        };
        this.currency = newCurrency.code;
        console.log("cash: ", this.cash);
        console.log("currency: ", this.currency);
        this.updateCurrencyOfDataInLocalStorage();
    }
    addId(type) {
        if (type === "invoice") {
            this.ids.invoiceId += 1;
            return `i${this.ids.invoiceId}`;
        }
        if (type === "payment") {
            this.ids.paymentId += 1;
            return `p${this.ids.paymentId}`;
        }
    }
    getIds(type) {
        if (type === "invoice") {
            return this.ids.invoiceId;
        }
        if (type === "payment") {
            return this.ids.paymentId;
        }
    }
    getCurrency() {
        return this.currency;
    }
    setCurrency(value) {
        this.currency = value;
    }
    updateCurrencyOfDataInLocalStorage() {
        const dataInJSON = localStorage.getItem("fin-log-data");
        const data = JSON.parse(dataInJSON);
        const oldCurrencyData = currencies.filter(_currency => _currency.code === data.currency)[0];
        const newCurrencyData = currencies.filter(_currency => _currency.code === this.currency)[0];
        const newData = {
            itemsData: data.itemsData.map(_item => {
                return Object.assign(Object.assign({}, _item), { amount: _item.amount / oldCurrencyData.rate * newCurrencyData.rate });
            }),
            ids: this.ids,
            cash: this.cash,
            currency: this.currency,
        };
        localStorage.setItem("fin-log-data", JSON.stringify(newData));
        this.currency = newData.currency;
    }
    setInitialDataInLocalStorage() {
        const data = {
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
    sendToLocalStorage(values, type) {
        const dataInJSON = localStorage.getItem("fin-log-data");
        const data = JSON.parse(dataInJSON);
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
        const dataInJSON = localStorage.getItem("fin-log-data");
        const data = JSON.parse(dataInJSON);
        this.ids = data.ids;
        this.cash = data.cash;
        this.currency = data.currency;
        let itemsData = data.itemsData;
        return itemsData;
    }
    removeFromLocalStorage(idx, id) {
        const dataInJSON = localStorage.getItem("fin-log-data");
        const data = JSON.parse(dataInJSON);
        data.itemsData.splice(idx, 1);
        if (id === "i") {
            data.cash.cashIn = this.cash.cashIn;
        }
        if (id === "p") {
            data.cash.cashOut = this.cash.cashOut;
        }
        console.log(data.cash);
        data.ids = this.ids;
        localStorage.setItem("fin-log-data", JSON.stringify(data));
    }
}
