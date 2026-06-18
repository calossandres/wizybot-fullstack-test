// /src/products/products.service.ts

import { Injectable } from "@nestjs/common"

@Injectable()
export class ProductsService {

  async searchProducts(
    query: string,
  ) {
    return []
  }

}