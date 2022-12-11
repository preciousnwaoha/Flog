type CurrencyData = {
    name: string,
    symbol: string,
    unit: number,
}

export const currencies: CurrencyData[] = [
    {
        name: "Dollar",
        symbol: "$",
        unit: 1,
    },
    {
        name: "Yen",
        symbol: "Y",
        unit: 100,
    },
    {
        name: "Euro",
        symbol: "E",
        unit: 1,
    },
    {
        name: "Naira",
        symbol: "N",
        unit: 414,
    },
]

export const convertToCurrency = (toCurrency: string, currencyText: string, fromCurrency: string): string => {
    if (toCurrency === fromCurrency) {
        return currencyText
    }
    let fromValue: number = parseFloat(currencyText.replace(/[$EYN]/, ""))
    let fromCurrencyUnitValue: number = [...currencies].filter(cur => cur.symbol === fromCurrency)[0].unit
    let toCurrencyUnitValue: number = [...currencies].filter(cur => cur.symbol === toCurrency)[0].unit
    let fromValueToDollar = fromValue / fromCurrencyUnitValue;

    let toValue = (fromValueToDollar * toCurrencyUnitValue).toFixed(3);

    return `${toCurrency}${toValue}`;
}