import { HasFormatter } from "../interfaces/HasFormatter.js"
import { formatCurrencyAmount } from "../libs/utils/currency-helpers.js";

//  classes
export class Payment implements HasFormatter {
  constructor(
    readonly recipient: string,
    private details: string,
    public amount: number,
    private currency: string,
  ) {}

  format() {
    return `${this.recipient} is owed <span class='red-amount amount-in-item'>${this.currency}${formatCurrencyAmount(this.amount)}</span> for ${this.details}`;
  }
}
