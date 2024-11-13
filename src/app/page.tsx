import CurrencyConversion from "@/components/CurrencyConversion";
import { CurrencyInputBox } from "@/components/CurrencyConversion/CurrencyInputBox";
import CurrencySelection from "@/components/CurrencyConversion/CurrencySelection";
import getCurrencies from "@/util/getCurrencies";

export default async function Home() {
  const currencies = await getCurrencies();

  return (
    <div>
        <CurrencyConversion
          currenciesAvailable={currencies}
        />
    </div>
   
  )
}
