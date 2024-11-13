"use server"
// Explicitly defining "use server" makes this more readable; makes it acknowledged that the code can only be used on the server.

type APICurrencyType = {
    name: string,
    short_code: string,
    precision: number,
    subunit: number,
    symbol: string,
    symbol_first: boolean,
    decimal_mark: string,
    thousands_separator: string
}

export default async function getCurrencies() : Promise<Map<string, InternalCurrencyType>> {
    const apiKey = process.env.CURRENCY_API_TOKEN;

    const result = await fetch(`https://api.currencybeacon.com/v1/currencies?api_key=${apiKey}`);

    const resultJson = await result.json();

    // Though this map seems unnecessary, it helps cut down on the server prop population.
    // And therefore the initial load time, since server props need to be loaded in for our parent server component
    // to load.
    // We also wish to make these into a map to reduce lookup time (so we don't use .find to get our current currency).
    return (resultJson.response.map(({
        name,
        precision,
        short_code,
        subunit,
        symbol,
        symbol_first,
        decimal_mark,
        thousands_separator
    }: APICurrencyType) => ({
        name,
        precision,
        short_code,
        subunit,
        symbol,
        decimalSymbol: decimal_mark,
        // TODO: for serialization to frontend this isn't the best.
        mainSymbolLocation: symbol_first ? "front" : "back",
        thousandsSymbol: thousands_separator
    })) as InternalCurrencyType[]).reduce((acc, curr) => {
        return new Map(acc.set(curr.short_code, curr));
    }, new Map<string, InternalCurrencyType>())
}