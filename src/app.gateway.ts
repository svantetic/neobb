import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('appGateway');

  handleDisconnect(client: any) {
    this.logger.log('Client disconnected', client);
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log('Client connected');
  }

  afterInit(server: any) {
    this.logger.log('Initialized');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): WsResponse<string> {
    this.logger.log(payload);
    return {
      event: 'message',
      data: payload,
    };
  }
}
