// src/chat/chat.service.ts

import { Injectable } from '@nestjs/common'
import { OpenAIService } from '../openai/openai.service'
import { ProductsService } from '../products/products.service'
import { CurrencyService } from '../currency/currency.service'

@Injectable()
export class ChatService {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly productsService: ProductsService,
    private readonly currencyService: CurrencyService,
  ) {}

  async ask(message: string): Promise<string> {
    const client = this.openAIService.getClient()

    const tools: any[] = [
      {
        type: 'function',
        function: {
          name: 'searchProducts',
          description: 'Search for products in the store. ALWAYS use this tool when the user is looking for a product, gift, or present.',
          parameters: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'Search query' },
            },
            required: ['query'],
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'convertCurrencies',
          description: 'Convert an amount from one currency to another.',
          parameters: {
            type: 'object',
            properties: {
              amount: { type: 'number', description: 'Amount to convert' },
              from: { type: 'string', description: 'Source currency code (e.g. USD)' },
              to: { type: 'string', description: 'Target currency code (e.g. EUR)' },
            },
            required: ['amount', 'from', 'to'],
          },
        },
      },
    ]

    const messages: any[] = [
      { role: 'user', content: message },
    ]

    // Agentic loop: keep executing tools until LLM gives a final response
    const MAX_ITERATIONS = 5
    let iterations = 0

    while (iterations < MAX_ITERATIONS) {
      iterations++

      const response = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        tools,
        tool_choice: 'auto',
      })

      const choice = response.choices[0].message

      // Add assistant message to history
      messages.push(choice)

      // If no tool calls, return final response
      if (!choice.tool_calls || choice.tool_calls.length === 0) {
        return choice.content ?? ''
      }

      // Execute ALL tool calls requested in this turn
      for (const toolCall of choice.tool_calls) {
        const toolName = (toolCall as any).function.name
        const toolArgs = JSON.parse((toolCall as any).function.arguments)

        let toolResult: string

        if (toolName === 'searchProducts') {
          const products = this.productsService.searchProducts(toolArgs.query)
          toolResult = JSON.stringify(products)
        } else if (toolName === 'convertCurrencies') {
          toolResult = await this.currencyService.convertCurrencies(
            toolArgs.amount,
            toolArgs.from,
            toolArgs.to,
          )
        } else {
          toolResult = 'Tool not found'
        }

        // Add each tool result to messages
        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: toolResult,
        })
      }
    }

    return 'Unable to generate a response. Please try again.'
  }
}