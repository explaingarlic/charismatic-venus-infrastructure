import { useEffect, useState } from "react";
import CurrencySelectionBox from "./CurrencySelectionBox";

interface CurrencySelectionProps {
    currenciesAvailable : InternalCurrencyType[],
    setCurrencyFrom: (code: string) => void
    setCurrencyTo: (code: string) => void
}

export default function CurrencySelection({
    currenciesAvailable,
    setCurrencyFrom,
    setCurrencyTo
    
} : CurrencySelectionProps) {
    const [currCurrencyFrom, setCurrCurrencyFrom] = useState("USD");
    const [currCurrencyTo, setCurrCurrencyTo] = useState("USD");

    useEffect(() => {
        setCurrencyFrom(currCurrencyFrom);
    }, [currCurrencyFrom])

    useEffect(() => {
        setCurrencyTo(currCurrencyTo);
    }, [currCurrencyTo])

    return (
        <div className="flex gap-1">
            <div>
                <h2 className="w-max mx-auto">
                    From
                </h2>
                <CurrencySelectionBox
                    currentCurrency={currCurrencyFrom}
                    // TODO: handle this with a react.context
                    currenciesAvailable={currenciesAvailable}
                    newCurrencyAction={setCurrCurrencyFrom}
                />
            </div>
            <div>
                <h2 className="w-max mx-auto">
                    To
                </h2>
                <CurrencySelectionBox
                    currentCurrency={currCurrencyTo}
                    // TODO: handle this with a react.context
                    currenciesAvailable={currenciesAvailable}
                    newCurrencyAction={setCurrCurrencyTo}
                />
            </div>
            
        </div>
        
    )
}