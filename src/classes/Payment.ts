import { HasFormatter } from "../interfaces/HasFormatter.js"

//  classes
export class Payment implements HasFormatter {
  constructor(
    readonly recipient: string,
    private details: string,
    public amount: number,
  ) {}

  format() {
    return `${this.recipient} is owed <span class='red-amount amount-in-item'>$${this.amount}</span> for ${this.details}`;
  }
}
