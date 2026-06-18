// /src/chat/chat.service.ts

import { Injectable } from "@nestjs/common"

import { OpenAIService } from "../openai/openai.service"
import { ProductsService } from "../products/products.service"
import { CurrencyService } from "../currency/currency.service"

@Injectable()
export class ChatService {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly productsService: ProductsService,
    private readonly currencyService: CurrencyService,
  ) {}

  async ask(
    message: string,
  ): Promise<string> {

    return `Received: ${message}`
  }
}