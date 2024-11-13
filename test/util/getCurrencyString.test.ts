// TODO: setup aliases with jest. Or use better testing framework.
import getCurrencyString from "../../src/util/getCurrencyString";

describe("util/getCurrencyString works correctly for several examples.", () => {
    it("Works for dollars", () => {
        expect(getCurrencyString(
            1234,
            {
                symbol: "$",
                mainSymbolLocation: "front",
                decimalSymbol: ".",
                precision: 2,
                thousandsSymbol: ","
            }
        )).toEqual("$12.34")
    }),

    it("Works for PLN", () => {
        expect(getCurrencyString(
            434343,
            {
                symbol: "zl",
                mainSymbolLocation: "front",
                decimalSymbol: ",",
                precision: 2,
                thousandsSymbol: "."
            }
        )).toEqual("zl4.343,43")
    })

    it("Works for dollars (pennies", () => {
        expect(getCurrencyString(
            12,
            {
                symbol: "$",
                mainSymbolLocation: "front",
                decimalSymbol: ".",
                precision: 2,
                thousandsSymbol: ","
            }
        )).toEqual("$0.12")
    })
})