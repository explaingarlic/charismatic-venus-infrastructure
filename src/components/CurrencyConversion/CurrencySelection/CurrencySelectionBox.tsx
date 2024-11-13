"use client"

interface CurrencySelectionBoxProps {
    currentCurrency?: string
    currenciesAvailable: InternalCurrencyType[],
    newCurrencyAction: (shortcode: string) => void
}

export default function CurrencySelectionBox({
    currentCurrency = "USD",
    currenciesAvailable,
    newCurrencyAction
} : CurrencySelectionBoxProps) {
    return (
        <select
            className="text-black text-center"
            onChange={(e) => newCurrencyAction(e.target.value)}
            defaultValue={currentCurrency}
            disabled={!!!currenciesAvailable.length}
            >
                {
                    currenciesAvailable.map((currency, index) => (
                        <option key={index} value={currency.short_code}>
                            {currency.name} ({currency.symbol})
                        </option>
                    ))
                }
            
            
        </select>
    )
}