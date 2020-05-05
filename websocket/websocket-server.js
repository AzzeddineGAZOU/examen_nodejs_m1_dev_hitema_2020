const WebSocket = require("ws");
const webSocketServer = new WebSocket.Server({ port: 3003 });
const messageList = [];

webSocketServer.on("connection", (webSocket) => {
  webSocket.send(JSON.stringify(messageList));

  webSocket.onmessage = (messageEvent) => {
    const message = messageEvent.data;
    messageList.push(message);

    webSocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  };
});

module.exports = webSocketServer;
