import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: any) {
    console.log("Socket Initialized");
  }
  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;
    console.log("ClientId:" + client.id + " connected");
    console.log("Online Users:" + sockets.size);
  }
  handleDisconnect(client: any) {
    const { sockets } = this.server.sockets;
    console.log("ClientId:" + client.id + " disconnected");
    console.log("Online Users:" + sockets.size);
  }
  @SubscribeMessage("ping")
  pingHandler(client: any, data: any) {
    console.log("Message Recived From thi Client Id: " + client.id);
    console.log("Data: ", data);
    client.emit("pong", { message: "Hello Client from  nestjs" });
  }
}
