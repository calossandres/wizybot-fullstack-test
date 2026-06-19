// src/currency/currency.service.ts

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class CurrencyService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  /**
   * Converts an amount from one currency to another
   * using the Open Exchange Rates API.
   */
  async convertCurrencies(
    amount: number,
    from: string,
    to: string,
  ): Promise<string> {
    const appId = this.configService.get<string>('OPEN_EXCHANGE_APP_ID')

    const response = await axios.get(
      `https://openexchangerates.org/api/latest.json?app_id=${appId}&base=USD`,
    )

    const rates = response.data.rates

    // Convert: amount in 'from' → USD → 'to'
    const fromRate = rates[from.toUpperCase()]
    const toRate = rates[to.toUpperCase()]

    if (!fromRate || !toRate) {
      return `Currency not found: ${from} or ${to}`
    }

    const amountInUsd = amount / fromRate
    const result = amountInUsd * toRate

    return `${amount} ${from.toUpperCase()} = ${result.toFixed(2)} ${to.toUpperCase()}`
  }
}