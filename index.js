import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import CurrencyAPI from '@everapi/currencyapi-js';

import { isSupportedCurrency } from "./modules/currencies.js";

const key = "cur_live_ln5g6u0Nn5DALPpaUD3KA5Xey3DCU9M2gyUBKRez";
const currencyApi = new CurrencyAPI(key);

const rl = readline.createInterface({ input, output });

const sourceCurrency = await rl.question("What is the source currency? ");
const baseCurrency = sourceCurrency.toUpperCase();

const destinationCurrency = await rl.question("What is the destination currency? ");
const targetCurrency = destinationCurrency.toUpperCase();

if ( isSupportedCurrency(baseCurrency) && isSupportedCurrency(targetCurrency))
{
    currencyApi.latest({
        base_currency: baseCurrency,
        currencies: targetCurrency
    }).then(response => {
        console.log(response);
    });
}

rl.close();