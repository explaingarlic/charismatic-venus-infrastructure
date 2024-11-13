"use client"
import { useEffect, useState } from "react"

import { CurrencyInputBox } from "./CurrencyInputBox";
import CurrencySelection from "./CurrencySelection";
import getCurrencyString from "@/util/getCurrencyString";

interface CurrencyConversionProps {
    currenciesAvailable: Map<string, InternalCurrencyType>,
}

export default function CurrencyConversion({
    currenciesAvailable
}: CurrencyConversionProps) {
    const [currencyFrom, setCurrencyFrom] = useState("USD");
    const [currencyTo, setCurrencyTo] = useState("USD");

    const [amount, setAmount] = useState(0);

    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

    // Set converted amount to null whne we change amount.
    // Note that the conversion will still work with different fromattings!
    useEffect(() => {
        setConvertedAmount(null);
    }, [amount, currencyFrom, currencyTo])

    function convert() {
        const req = fetch(`/api/convert?from=${currencyFrom}&to=${currencyTo}&amount=${amount}`)
            .then(res => res.json()).then(({amount} : { amount: number} ) => {
                setConvertedAmount(amount);
            })
    }

    useEffect(() => {
        console.log("currency from changed", currencyFrom)
    }, [currencyFrom])

    return (
        <div className="w-max mx-auto my-6 md:my-20">
            <CurrencySelection
                currenciesAvailable={Array.from(currenciesAvailable.values())}
                setCurrencyFrom={setCurrencyFrom}
                setCurrencyTo={setCurrencyTo}
            />

            <CurrencyInputBox
                MainSymbol={currenciesAvailable.get(currencyFrom)!.symbol}
                DecimalSymbol={currenciesAvailable.get(currencyFrom)!.decimalSymbol}
                Decimals={currenciesAvailable.get(currencyFrom)!.precision}
                MainSymbolLocation={currenciesAvailable.get(currencyFrom)!.mainSymbolLocation}
                ThousandsSymbol={currenciesAvailable.get(currencyFrom)!.thousandsSymbol}
                newValue={setAmount}
            />

            <button onClick={convert} 
                className="mx-auto w-max bg-white text-black rounded-lg px-4 py-2 hover:bg-sky-700 hover:text-white transition-all block">
                Convert!
            </button>

            {
                convertedAmount !== null ?
                    <div>
                        Your sum total is {getCurrencyString(convertedAmount, currenciesAvailable.get(currencyTo)!)}
                    </div>
                    : null
            }
        </div>
    )
}