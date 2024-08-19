from channels.generic.websocket import AsyncJsonWebsocketConsumer


class Commands:
    JOIN = "join"
    LEAVE = "leave"
    MESSAGE = "message"


class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self) -> None:
        self.group_name = "chat"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code: int) -> None:
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        await super().disconnect(close_code)

    async def receive_json(self, content: dict, **kwargs) -> None:
        command = content["command"]
        user = content["user"]
        data = {"type": "websocket_message", "user": user}
        if command == Commands.JOIN:
            data.update({"command": Commands.JOIN, "message": f"{user} has joined"})
        elif command == Commands.LEAVE:
            data.update({"command": Commands.LEAVE, "message": f"{user} has left"})
        else:
            data.update({"command": Commands.MESSAGE, "message": content["message"]})
        await self.channel_layer.group_send(self.group_name, data)

    async def websocket_message(self, event: dict) -> None:
        payload = {
            "command": event["command"],
            "user": event["user"],
            "message": event["message"],
        }
        await self.send_json(payload)
