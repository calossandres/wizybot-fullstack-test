// src/chat/dto/chat.dto.ts

import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class ChatDto {
  @ApiProperty({
    description: 'User message to the chatbot',
    example: 'I am looking for a phone',
  })
  @IsString()
  @IsNotEmpty()
  message!: string
}