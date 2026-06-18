// /src/currency/currency.service.ts

import { Injectable } from "@nestjs/common"

@Injectable()
export class CurrencyService {

  async convertCurrencies(
    amount: number,
    from: string,
    to: string,
  ) {
    return null
  }

}