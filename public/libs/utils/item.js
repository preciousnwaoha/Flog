export const currencies = [
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
];
export const convertToCurrency = (toCurrency, currencyText, fromCurrency) => {
    if (toCurrency === fromCurrency) {
        return currencyText;
    }
    let fromValue = parseFloat(currencyText.replace(/[$EYN]/, ""));
    let fromCurrencyUnitValue = [...currencies].filter(cur => cur.symbol === fromCurrency)[0].unit;
    let toCurrencyUnitValue = [...currencies].filter(cur => cur.symbol === toCurrency)[0].unit;
    let fromValueToDollar = fromValue / fromCurrencyUnitValue;
    let toValue = (fromValueToDollar * toCurrencyUnitValue).toFixed(3);
    return `${toCurrency}${toValue}`;
};
