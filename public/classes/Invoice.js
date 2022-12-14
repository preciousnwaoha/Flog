import { formatCurrencyAmount } from "../libs/utils/currency-helpers.js";
//  classes
export class Invoice {
    constructor(client, details, amount, currency) {
        this.client = client;
        this.details = details;
        this.amount = amount;
        this.currency = currency;
    }
    format() {
        return `${this.client} owes <span class='green-amount amount-in-item'>${this.currency}${formatCurrencyAmount(this.amount)}</span> for ${this.details}`;
    }
}
