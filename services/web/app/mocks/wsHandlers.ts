import { ws } from "msw";

const inbox = ws.link("ws://localhost:8000/inbox");
const chat = ws.link("ws://localhost:8000/chat");

export const wsHandlers = [
  inbox.addEventListener("connection", ({ client }) => {
    const interval = setInterval(() => {
      client.send(
        JSON.stringify({
          type: "notification",
          data: {
            id: Date.now(),
            title: "Reminder",
            message: "Please review your pending tasks.",
            timestamp: new Date().toISOString(),
            priority: "normal",
          },
        })
      );
    }, 120000);

    client.addEventListener("close", () => {
      clearInterval(interval);
      console.log("Websocket client disconnected from inbox ");
    });
  }),
  chat.addEventListener("connection", ({ client }) => {
    console.log("Websocket client connecting to chat ");

    client.addEventListener("message", (event) => {
      const message = JSON.parse(event.data.toString());

      console.log("Received message from client:", message);

      setTimeout(() => {
        client.send(
          JSON.stringify({
            type: "ai_response",
            data: {
              id: Math.random().toString(),
              content: `AI response to: ${message.content}`,
              timestamp: new Date().toISOString(),
            },
          })
        );
      });
    });
  }),
];
