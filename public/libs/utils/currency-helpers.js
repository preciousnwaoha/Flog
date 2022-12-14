export const formatCurrencyAmount = (_amount, _value = 2) => {
    const amountToString = `${_amount}`;
    // console.log("amount:", _amount)
    const amountSplit = amountToString.split(".");
    // console.log("amountSplit :", amountSplit )
    const beforeDecimal = amountSplit[0];
    const afterDecimalPre = parseFloat("0." + amountSplit[1]).toPrecision(_value);
    // console.log(afterDecimalPre)
    const afterDecimal = afterDecimalPre.split(".")[1];
    return beforeDecimal + "." + afterDecimal;
};
