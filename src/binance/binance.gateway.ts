// src/gateways/binance.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BinanceService } from './binance.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class BinanceGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;
  private logger = new Logger(BinanceGateway.name);

  constructor(private readonly binanceService: BinanceService) {}

  afterInit() {
    this.logger.log('WebSocket Initialized');
    this.binanceService.connectToBinanceStreams(this.server);
  }
}
