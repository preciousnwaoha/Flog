import { formatCurrencyAmount } from "../libs/utils/currency-helpers.js";
//  classes
export class Payment {
    constructor(recipient, details, amount, currency) {
        this.recipient = recipient;
        this.details = details;
        this.amount = amount;
        this.currency = currency;
    }
    format() {
        return `${this.recipient} is owed <span class='red-amount amount-in-item'>${this.currency}${formatCurrencyAmount(this.amount)}</span> for ${this.details}`;
    }
}
