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
        unit: 0.9,
    },
    {
        name: "Naira",
        symbol: "N",
        unit: 10,
    },
]