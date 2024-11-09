import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" }, namespace: "group" })
export class GroupGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage("list")
  getGroupList(client: any, data: any) {
    console.log(data);
    client.emit("list", [{ name: "g1" }, { name: "g5" }, { name: "G6" }]);
  }
}
