interface InternalCurrencyType {
    name: string,
    precision: number,
    subunit: number,
    short_code: string,
    symbol: string,
    decimalSymbol: string,
    // TODO: for serialization to frontend this isn't the best.
    mainSymbolLocation: "front" | "back",
    thousandsSymbol: string
}