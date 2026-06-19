// src/products/products.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'

/** Shape of a parsed product row */
export interface Product {
  displayTitle: string
  embeddingText: string
  url: string
  imageUrl: string
  productType: string
  discount: string
  price: string
  variants: string
}

@Injectable()
export class ProductsService implements OnModuleInit {
  private products: Product[] = []

  /** Load CSV once when the module starts */
  onModuleInit() {
    const csvPath = path.join(process.cwd(), 'data', 'products_list.csv')
    const fileContent = fs.readFileSync(csvPath, 'utf-8')

    this.products = parse(fileContent, {
      columns: true,        // use first row as keys
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,  // handles rows with extra commas
      relax_quotes: true,        // ← agrega esta línea
      quote: false,
    }) as Product[]
  }

  /**
   * Returns the 2 products whose embeddingText best matches the query.
   * Strategy: count how many query words appear in the embeddingText (case-insensitive).
   */
  searchProducts(query: string): Product[] {
    const queryWords = query.toLowerCase().split(/\s+/)

    const scored = this.products.map((product) => {
      const text = product.embeddingText.toLowerCase()
      const score = queryWords.reduce(
        (acc, word) => acc + (text.includes(word) ? 1 : 0),
        0,
      )
      return { product, score }
    })

    return scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      .map((item) => item.product)
  }
}