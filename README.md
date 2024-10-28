This is a NestJS-based backend project that connects to the Binance WebSocket API to stream real-time cryptocurrency market data. The service listens to multiple streams (e.g., ticker, depth, trades, kline) and transforms the data for use in a frontend application.

## Features

- **Real-time Market Data**: Connects to Binance WebSocket streams to get real-time data for ticker prices, order book depth, trades, and kline (candlestick) data.
- **Futures Market Data**: Connects to Binance futures WebSocket streams.
- **Transformation of Data**: Data received from Binance is transformed to a format suitable for the frontend.
- **WebSocket Connections**: Multiple WebSocket connections to Binance are managed in parallel.
- **Environment Configuration**: Uses environment variables for configuration like WebSocket base URLs.

## Tech Stack

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) - Used for streaming real-time data from Binance.
- [Binance API](https://binance-docs.github.io/apidocs/spot/en/#introduction) - The Binance API for spot and futures market data.
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from `.env` files.
- [@nestjs/config](https://docs.nestjs.com/techniques/configuration) - Provides configuration management via environment variables.


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Clone the repository
Clone the repo using git clone https://github.com/hassantahir7/crypto-exchange-be.git

## latest branch 
  main 
  
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
