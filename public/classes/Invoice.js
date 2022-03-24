//  classes
export class Invoice {
    constructor(client, details, amount) {
        this.client = client;
        this.details = details;
        this.amount = amount;
    }
    format() {
        return `${this.client} owes <span class='green-amount amount-in-item'>$${this.amount}</span> for ${this.details}`;
    }
}
