// /src/openai/openai.service.ts

import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import OpenAI from "openai"

@Injectable()
export class OpenAIService {
  private readonly openai: OpenAI

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey:
        this.configService.get<string>(
          "OPENAI_API_KEY",
        ),
    })
  }

  getClient() {
    return this.openai
  }
}