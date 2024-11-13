export default function getCurrencyString(
    currencyAmount: number,
    currencyType:  Omit<InternalCurrencyType, "name" | "short_code" | "subunit">
) {
    const {
        mainSymbolLocation,
        symbol,
        decimalSymbol,
        thousandsSymbol,
        precision
    } = currencyType;

    // TODO: true decimal precision - this will natively use floats. Imprecise. Try `toPrecision`
    let decimalsPart = (currencyAmount % (10 ** precision)).toString();

    if(decimalsPart.length === 1) {
        decimalsPart += 0;
    }

    const fullPart = (Math.floor(currencyAmount / (10 ** precision))).toString();

    // "?" is justified as `fullPart` is a `toString()`'d number.
    // I came up with this myself - it's not the prettiest thing but it does work.
    const fullPartSplit = fullPart.split("").reverse().join("").match(/.{1,3}/g)?.map(a=>a.split("").reverse().join("")).reverse().join(thousandsSymbol);

    // Unfortunately this has to be on one line.
    // Can use `replace(/\n/g)` but this seems messy and bugprone. Will need to test further.
    return `${mainSymbolLocation === "front" ? symbol : ""}${fullPartSplit}${decimalSymbol}${decimalsPart}${mainSymbolLocation === "back" ? symbol : ""}`
}