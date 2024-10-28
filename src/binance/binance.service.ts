import { Injectable, Logger } from '@nestjs/common';
import { WebSocket } from 'ws';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

@Injectable()
export class BinanceService {
  private readonly logger = new Logger(BinanceService.name);
  private readonly binanceWSBase: string;
  private readonly futuresWSBase: string;

  private streams = {
    ticker: 'btcusdt@ticker',
    depth: 'btcusdt@depth',
    kline: 'btcusdt@kline_1m',
    trades: 'btcusdt@trade',
  };

  private wsConnections: WebSocket[] = [];

  constructor(private configService: ConfigService) {
    // Get WebSocket URLs from environment variables
    this.binanceWSBase = this.configService.get<string>('BINANCE_WS_BASE');
    this.futuresWSBase = this.configService.get<string>('FUTURES_WS_BASE');
  }

  connectToBinanceStreams(server: any) {
    Object.keys(this.streams).forEach((stream) => {
      const ws = new WebSocket(`${this.binanceWSBase}/${this.streams[stream]}`);
      
      ws.on('open', () => {
        this.logger.log(`Connected to Binance WebSocket stream: ${stream}`);
      });

      ws.on('message', (event) => {
        if (event === null || event === undefined) return;

        try {
          const data = JSON.parse(event);
          switch (stream) {
            case 'ticker':
              server.emit(stream, this.transformTickerData(data));
              break;
            case 'depth':
              server.emit(stream, this.transformDepthData(data));
              break;
            case 'trades':
              server.emit(stream, this.transformTradeData(data));
              break;
            case 'kline':
              server.emit(stream, this.transformKlineData(data));
              break;
            default:
              break;
          }
        } catch (error) {
          this.logger.error(`Stream ${stream} - error parsing message: ${error}`);
        }
      });
      this.wsConnections.push(ws);
    });
  }

  // Transformation methods
  private transformTickerData(data: any) {
    if (!data || !data.s || !data.c || !data.p) {
      this.logger.warn('Ticker data - event.data was null or undefined or missing s, c, or p');
      return;
    }
    try {
      return {
        symbol: data.s,
        price: parseFloat(data.c), // Current price
        change: parseFloat(data.p), // Price change
      };
    } catch (error) {
      this.logger.error('Ticker data - error parsing message: ' + error);
    }
  }

  private transformDepthData(data: any) {
    if (!data || !data.b || !data.a) {
      this.logger.warn('Depth data - event.data was null or undefined or missing b or a');
      return;
    }
    try {
      return {
        b: data.b.map((bid: any) => parseFloat(bid[0])).join(', '), // Bids as a string
        a: data.a.map((ask: any) => parseFloat(ask[0])).join(', '), // Asks as a string
      };
    } catch (error) {
      this.logger.error('Depth data - error parsing message: ' + error);
    }
  }

  private transformTradeData(data: any) {
    if (!data || !data.p || !data.q || !data.T) {
      this.logger.warn('Trade data - event.data was null or undefined or missing p, q, or T');
      return;
    }
    try {
      return {
        p: parseFloat(data.p), // Price
        q: parseFloat(data.q), // Quantity
        time: new Date(data.T).toLocaleTimeString(), // Optional: format timestamp if needed
      };
    } catch (error) {
      this.logger.error('Trade data - error parsing message: ' + error);
    }
  }

  private transformKlineData(data: any) {
    if (!data || !data.k) {
      this.logger.warn('Kline data - event.data was null or undefined or missing k');
      return;
    }
    try {
      return {
        o: parseFloat(data.k.o), // Open price
        c: parseFloat(data.k.c), // Close price
        h: parseFloat(data.k.h), // High price
        l: parseFloat(data.k.l), // Low price
      };
    } catch (error) {
      this.logger.error('Kline data - error parsing message: ' + error);
    }
  }
}
