# Wizybot Fullstack Technical Test

NestJS chatbot using OpenAI Function Calling with product search and currency conversion.

## Requirements

- Node.js >= 18
- npm
- OpenAI API key
- Open Exchange Rates API key

## Setup

1. Clone the repository:
   git clone https://github.com/YOUR_USER/wizybot-fullstack-test.git
   cd wizybot-fullstack-test

2. Install dependencies:
   npm install

3. Create your environment file:
   cp .env.example .env

4. Fill in your keys in .env:
   OPENAI_API_KEY=your_openai_api_key_here
   OPEN_EXCHANGE_APP_ID=your_open_exchange_app_id_here

5. Run the development server:
   npm run start:dev

## API Documentation

Swagger UI available at:
http://localhost:3000/api

## Endpoint

POST /chat

Request body:
{
  "message": "I am looking for a phone"
}

Response:
{
  "response": "Here are some phones we have available..."
}

## Example queries

- "I am looking for a phone"
- "I am looking for a present for my dad"
- "How much does a watch cost?"
- "What is the price of the watch in Euros"
- "How many Canadian Dollars are 350 Euros"

## Architecture

- ChatController — handles HTTP input/output
- ChatService — orchestrates OpenAI Function Calling pipeline
- ProductsService — keyword search over products_list.csv
- CurrencyService — real-time conversion via Open Exchange Rates
- OpenAIService — OpenAI client wrapper