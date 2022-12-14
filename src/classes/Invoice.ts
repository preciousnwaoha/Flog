import { HasFormatter } from "../interfaces/HasFormatter.js"
import { formatCurrencyAmount } from "../libs/utils/currency-helpers.js";

//  classes
export class Invoice implements HasFormatter {
  constructor(
    readonly client: string,
    private details: string,
    public amount: number,
    private currency: string,
  ) {}

  format() {
    return `${this.client} owes <span class='green-amount amount-in-item'>${this.currency}${formatCurrencyAmount(this.amount)}</span> for ${this.details}`;
  }
}
