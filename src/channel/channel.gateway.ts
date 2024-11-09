import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" }, namespace: "channel" })
export class ChannelGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage("list")
  getList(client: any, data: any) {
    console.log(data);
    client.emit("list", [{ name: "ch1" }, { name: "ch2" }, { name: "ch3" }]);
  }
}
