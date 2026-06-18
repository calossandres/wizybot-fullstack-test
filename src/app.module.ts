// /src/app.module.ts

import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { ChatController } from "./chat/chat.controller"
import { ChatService } from "./chat/chat.service"

import { ProductsService } from "./products/products.service"
import { CurrencyService } from "./currency/currency.service"
import { OpenAIService } from "./openai/openai.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    ChatController,
  ],
  providers: [
    ChatService,
    ProductsService,
    CurrencyService,
    OpenAIService,
  ],
})
export class AppModule {}