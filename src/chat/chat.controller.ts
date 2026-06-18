// /src/chat/chat.controller.ts

import {
  Body,
  Controller,
  Post,
} from "@nestjs/common"

import { ChatService } from "./chat.service"
import { ChatDto } from "./dto/chat.dto"

@Controller("chat")
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
  ) {}

  @Post()
  async chat(
    @Body() body: ChatDto,
  ) {
    const response =
      await this.chatService.ask(
        body.message,
      )

    return {
      response,
    }
  }
}