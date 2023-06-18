import type { LoaderArgs } from "@remix-run/node";

import { emitter } from "~/services/emitter.server";

import { eventStream } from "remix-utils";

export async function loader({ request }: LoaderArgs) {
  return eventStream(request.signal, function setup(send) {
    const handleChatEvent = ({
      event,
      chatId,
      pseudo,
      newMessage,
    }: {
      event: string;
      chatId: string;
      pseudo: string;
      newMessage: string;
    }) => {
      switch (event) {
        case "new-message":
          return send({
            event: `new-message-${chatId}`,
            data: JSON.stringify({
              type: "MESSAGE",
              timestamp: Date.now(),
              pseudo,
              message: newMessage,
            }),
          });
        case "user-joined":
          return send({
            event: `new-message-${chatId}`,
            data: JSON.stringify({
              type: "USER_JOINED",
              timestamp: Date.now(),
              pseudo,
            }),
          });
        case "user-left":
          return send({
            event: `new-message-${chatId}`,
            data: JSON.stringify({
              type: "USER_LEFT",
              timestamp: Date.now(),
              pseudo,
            }),
          });
        default:
          return;
      }
    };

    emitter.on("chat", handleChatEvent);

    return function clear() {
      emitter.off("chat", handleChatEvent);
    };
  });
}
