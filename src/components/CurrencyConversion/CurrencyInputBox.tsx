"use client"
import getCurrencyString from "@/util/getCurrencyString";
import { useEffect, useState } from "react";

interface CurrencyInputBoxProps {
    MainSymbol: string;
    MainSymbolLocation?: "front" | "back";
    Decimals?: number;
    DecimalSymbol?: string;
    ThousandsSymbol?: string;
    newValue?: (value: number) => void
};

export function CurrencyInputBox(
    {
        MainSymbol,
        MainSymbolLocation = "front",
        Decimals = 2,
        DecimalSymbol = ".", // "," May be a more accurate one for the majority of the world.
        ThousandsSymbol = ",", // Swap with above? See above comment.
        newValue
    } : CurrencyInputBoxProps
) {
    const [actualValue, setActualValue] = useState(0);
    const [displayedValue, setDisplayedValue] = useState(
        getCurrencyString(0, 
            {
                symbol: MainSymbol,
                mainSymbolLocation: MainSymbolLocation,
                precision: Decimals,
                decimalSymbol: DecimalSymbol,
                thousandsSymbol: ThousandsSymbol
            }    
        )
    );
    const [error, setError] = useState("");

    useEffect(() => {
        // May seem unnecessary but sometimes we don't want a callback at all.

        if(isNaN(actualValue)) {
            setError("Value is not a real amount.")
        } else {
            if(newValue) {
                newValue(actualValue)
            }
        }
    }, [actualValue])

    useEffect(() => {
        setActualValue(0);
        setDisplayedValue(
            getCurrencyString(0, {
                symbol: MainSymbol,
                mainSymbolLocation: MainSymbolLocation,
                precision: Decimals,
                decimalSymbol: DecimalSymbol,
                thousandsSymbol: ThousandsSymbol
            })
        );
    }, [MainSymbol, MainSymbolLocation, Decimals, DecimalSymbol, ThousandsSymbol])

    return (
        <div className="mx-auto w-max py-1">
            <input
                className="px-3 py-1 text-center mx-auto w-100 text-black"
                value={displayedValue}
                onChange={(e) => {
                    const value = e.currentTarget.value;

                    // TODO: replace with greedy regex
                    const cleanedValue = value
                        .replaceAll(ThousandsSymbol, "")
                        .replaceAll(MainSymbol, "")
                        .replaceAll(DecimalSymbol, "")

                    const parsedValue = parseInt(cleanedValue);


                    if (isNaN(parsedValue) || parsedValue < 1) {
                        setError("Invalid input");
                        setDisplayedValue(value);
                        return;
                    }
                    else {
                        setActualValue(parsedValue);
                        setDisplayedValue(getCurrencyString(
                            parsedValue,
                            {
                                symbol: MainSymbol,
                                mainSymbolLocation: MainSymbolLocation,
                                precision: Decimals,
                                decimalSymbol: DecimalSymbol,
                                thousandsSymbol: ThousandsSymbol
                            }
                        )
                        )
                    }
                }
                }
            >
            </input>
        </div>

    )
}