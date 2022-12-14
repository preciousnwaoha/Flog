import { currencyPicker } from "../app";
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a1fbba2694mshc64927b9a391e36p1ada09jsnea91e9f526ca',
        'X-RapidAPI-Host': 'fixer-fixer-currency-v1.p.rapidapi.com'
    }
};
export class Currency {
    constructor(currencies = []) {
        this.currencies = currencies;
    }
    getCurrencies() {
        return this.currencies;
    }
    fetchCurrenciesIntoApp() {
        console.log("loading..");
        fetch('https://fixer-fixer-currency-v1.p.rapidapi.com/latest?base=USD', options)
            .then(response => response.json())
            .then(response => {
            for (let currencyCode in response.rates) {
                this.currencies.push({
                    rate: response.rates[currencyCode],
                    symbol: "$",
                    code: currencyCode
                });
                currencyPicker.innerHTML += currencyPicker.innerHTML += `<option value=${currencyCode}>${currencyCode}</option>`;
            }
        })
            .catch(err => console.error(err));
    }
}
